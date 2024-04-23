import patientModel from "../models/patients.model.js";

export const addConstultationToPatient = async (req, res) => {
    const {patientId} = req.params
    const {date, treatment} = req.body
    
    try {
      const patient = await patientModel.findById(patientId);
  
      if(!patient) {
        return res.status(404).json({ message: 'Paciente no encontrado' });
      }
  
      patient.consultations.push({date, treatment})
  
      await patient.save();
      
      res.status(200).json(patient);
    } catch (error) {
      console.error('Error al agregar consulta:', error);
      res.status(500).send({ message: 'Error interno del servidor' });
    }
  }

  export const deleteConsult = async (req, res) => {
    const { patientId, consultationId } = req.params;

    try {
        const patient = await patientModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        const consultations = patient.consultations;

        const consultationIndex = consultations.findIndex(consultation => consultation._id.toString() === consultationId);

        if (consultationIndex === -1) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }

        patient.consultations.splice(consultationIndex, 1);

        await patient.save();

        res.status(200).json({ message: 'Consulta eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la consulta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
