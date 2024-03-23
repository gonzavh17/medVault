import patientModel from "../models/patients.model.js";
import userModel from "../models/user.model.js";
import patientListModel from "../models/patient-list.model.js";

export const createPatient = async (req, res) => {
  try {
    const {
      name,
      surname,
      address,
      occupation,
      marital_status,
      livingWith,
      birth_date,
      phone_number,
      frecuently_shoes,
      shoe_size,
      diabetes,
      diabetes_type,
      allergies,
      allergies_type,
      hta,
      vascular_anomalies,
      anticoagulated,
      previous_consult,
      consult_reason,
      toxic_habits,
      family_background,
      actual_medication,
    } = req.body;

    const newPatient = await patientModel.create({
      name,
      surname,
      address,
      occupation,
      marital_status,
      livingWith,
      birth_date,
      phone_number,
      frecuently_shoes,
      shoe_size,
      diabetes,
      diabetes_type,
      allergies,
      allergies_type,
      hta,
      vascular_anomalies,
      anticoagulated,
      previous_consult,
      consult_reason,
      toxic_habits,
      family_background,
      actual_medication,
    });

    const userId = req.user._id.toString();
    const patientListId = req.user.patientList.toString();

    const updatedPatientList = await patientListModel.findByIdAndUpdate(
      patientListId,
      { $push: { patientList: { id_doctor: userId, patient: newPatient._id } } },
      { new: true }
    );

    if (updatedPatientList) {
      console.log("Lista de pacientes actualizada:", updatedPatientList);
    } else {
      console.log("No se pudo actualizar la lista de pacientes asociada al usuario.");
    }

    console.log("ID del nuevo paciente:", newPatient._id);
    res.status(201).json(newPatient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
