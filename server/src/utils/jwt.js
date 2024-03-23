import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const generateToken = (user) => {
    try {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: '12h'
        });
        return token;
    } catch (error) {
        console.log('Error al generar el token:', error);
        return null; 
    }
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({error: 'User not found'})
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next(); 
    } catch (error) {
        res.status(403).send({ error: "Usuario no autorizado" });
    }
}
