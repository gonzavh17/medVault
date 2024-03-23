import userModel from "../models/user.model.js";
import patientListModel from "../models/patient-list.model.js";
import patientModel from "../models/patients.model.js";

export const isAuthenticated = (req, res, next) => {
  if (req.user) {
    
    next();
  } else {

    return res.status(401).json({ message: 'Not Logged' });
  }
};

export const getPatientList = async (req, res) => {
  try {
    const patientListId = req.user.patientList.toString();

    const options = {
      limit: parseInt(req.query.limit) || 100,
    };

    const patientList = await patientListModel
      .findById(patientListId)
      .populate({
        path: "patientList.patient",
      });

    if (!patientList) {
      return res
        .status(404)
        .json({ message: "Lista de pacientes no encontrada" });
    }

    let patients = patientList.patientList.map((item) => item.patient);

    // Ordenar pacientes alfabéticamente por nombre
    patients.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * options.limit;
    const endIndex = page * options.limit;
    const paginatedPatients = patients.slice(startIndex, endIndex);

    const totalPatients = patientList.patientList.length;

    const totalPages = Math.ceil(totalPatients / options.limit);

    res.status(200).send({
      patients: paginatedPatients,
      totalPages,
      currentPage: page,
      totalPatients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};




export const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    console.log("Id del paciente", patientId);

    const patient = await patientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    console.log(patient);
    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patientListId = req.user.patientList.toString();

    const updatedPatientList = await patientListModel.findByIdAndUpdate(
      patientListId,
      { $pull: { patientList: { patient: patientId } } },
      { new: true }
    );

    if (!updatedPatientList) {
      return res.status(404).json({ message: "Lista de pacientes no encontrada" });
    }

    const deletedPatient = await patientModel.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const cleanPatientList = updatedPatientList.patientList.filter(item => item !== null);

    await patientListModel.findByIdAndUpdate(
      patientListId,
      { patientList: cleanPatientList },
      { new: true }
    );

    res.status(200).json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const updatedData = req.body;

    const patient = await patientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    Object.assign(patient, updatedData);

    const updatedPatient = await patient.save();

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const filterPatientsAlphabetically = async (req, res) => {
  try {
    const letter = req.query.letter;

    const filteredPatients = await patientListModel.find({name: { $regex: `^${letter}`, $options: 'i' }})

    res.status(200).send(filteredPatients);
    console.log(filteredPatients)
  } catch (error) {
    console.error('Error al filtrar pacientes alfabéticamente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

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