import { addConsultationToPatient, createPatient, deletePatient } from "./patients";

export const postPatient = async (patientData) => {
    try {
        const res = await createPatient(patientData);
        const patientCreated = res.data;
        console.log('Paciente creado:', patientCreated);
    } catch (error) {
        console.log('Error al crear el paciente:', error);
    }
};

export const deletePatientPetition = async (patientId) => {
    try {
        
        const res = await deletePatient(patientId);
        console.log('Paciente eliminado exitosamente:', res.data);
        
    } catch (error) {
        console.log('Error al eliminar paciente:', error);
    }
};

export const addConsultation = async (patientId, consultationData) => {
    try {
        const res = await addConsultationToPatient(patientId, consultationData);
        console.log('Consulta agregada exitosamente al paciente:', res.data);
    } catch (error) {
        console.log('Error al agregar consulta al paciente:', error);
    }
};

export const deleteConsult = async (patientId, consultationId) => {
    try {
        const res = await deleteConsultation(patientId, consultationId);
        return res.data
    } catch (error) {
        console.log('Error al eliminar paciente:', error);
        throw error
    }
};