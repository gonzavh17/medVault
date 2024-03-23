import axios from 'axios'

const API = 'http://localhost:8080/api'

export const getPatientOnPatientList = (page = 1) => {
    return axios.get(`${API}/patientList/getPatientList`, {
        params: { page } // Pasar el número de página como parámetro de consulta
    });
};
export const getPatientById = (patient_id, patient) => axios.get(`${API}/patientList/getPatientById/${patient_id}`, patient)
export const createPatient = (patientData) => {
    return axios.post(`${API}/patient/createPatient`, patientData);
};
export const deletePatient = (patientId) => {
    return axios.delete(`${API}/patientList/deletePatient/${patientId}`);
};
export const addConsultationToPatient = (patientId, consultationData) => {
    return axios.put(`${API}/patientList/consultation/${patientId}`, consultationData);
};