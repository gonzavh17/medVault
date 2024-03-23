import patientModel from "../models/patients.model.js";

export const test = async (req, res) => {
    try {
        console.log('Cookie: ', req.session)
        
    } catch (error) {
        console.log(error)
    }
};

export const getAllPatients = async (req, res) => {
    try {
        const patients = await patientModel.find(); // Espera a que la consulta se complete
        res.status(200).send(patients);
    } catch (error) {
        console.error('Error al obtener todos los pacientes:', error);
        res.status(500).json({ error: 'Error al obtener todos los pacientes' });
    }
};