import { google } from 'googleapis';
import userModel from '../models/user.model.js';
import 'dotenv/config';
import { getAccessToken } from './session.controller.js';

const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export const createEvent = async (req, res) => {



    try {
        // Verificar si el usuario tiene un token de actualización
        const user = await userModel.findById(req.user);
        if (!user || !user.googleRefreshToken) {
            throw new Error('Usuario no encontrado o falta el token de actualización');
        }
    
        // Obtener el accessToken usando el refreshToken
        const accessToken = await getAccessToken(user.googleRefreshToken);
    
        console.log('Access Token:', accessToken); // Agregado para depurar
    
        // Establecer el accessToken en el cliente de OAuth2
        oauth2Client.setCredentials({
            access_token: accessToken
        });
    
        // Crear un cliente de Google Calendar usando el cliente de OAuth2
        const calendar = google.calendar({ version: 'v3' });
    
        // Obtener los datos del cuerpo de la solicitud
        const { summary, description, start, end } = req.body;
        const { dateTime: startDateTime } = start; // Accediendo al campo dateTime dentro de start
        const { dateTime: endDateTime } = end; // Accediendo al campo dateTime dentro de end
    
        console.log('summary:', summary);
        console.log('description:', description);
        console.log('start dateTime:', startDateTime);
        console.log('end dateTime:', endDateTime);
    
        // Validar los datos de entrada
        if (!summary || !description || !startDateTime || !endDateTime) {
            throw new Error('Faltan datos de entrada');
        }
    
        // Insertar un nuevo evento en el calendario
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            requestBody: {
                summary: summary,
                description: description,
                colorId: '7',
                start: {
                    dateTime: new Date(startDateTime)
                },
                end: {
                    dateTime: new Date(endDateTime)
                }
            }
        });
    
        // Enviar la respuesta al cliente
        res.send(response.data);
    } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear el evento' });
    }
    
};
