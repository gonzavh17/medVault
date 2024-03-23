import {Schema, model} from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import consultationModel from './consultations.model.js'

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type:String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    marital_status: {
        type: String,
        enum: ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Unión libre', 'Otros'],
        required: true
    },
    livingWith: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date, 
        required: true
    },
    phone_number: {
        type:String,
        required: true
    },
    frecuently_shoes:{
        type: String,
        required: true
    },
    shoe_size:{
        type: String,
        required: true
    },
    diabetes: {
        type: String,
        required: true,
        enum: ['Si', 'No', 'Desconoce']
    },
    diabetes_type: {
        type:String,
    },
    allergies: {
        type: String,
        required: true,
        enum: ['Si', 'No', 'Desconoce']
    },
    allergies_type: {
        type:String,
    },
    hta: {
        type: String,
        required: true,
    },
    vascular_anomalies: {
        type: String,
        required: true,
        enum: ['Si', 'No', 'Desconoce', 'A', 'V']
    },
    anticoagulated: {
        type:String,
        required: true
    },
    previous_consult: {
        type:String,
        enum: ['Si', 'No']
    },
    consult_reason: {
        type:String
    },
    toxic_habits: {
        type:String
    },
    family_background: {
        type:String
    },
    actual_medication: {
        type:String
    },
    consultations: [consultationModel.schema]
})

patientSchema.plugin(paginate)
const patientModel = model('patients', patientSchema)
export default patientModel