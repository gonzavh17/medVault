import { Schema, model } from "mongoose";

const consultationSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    treatment: {
        type: String,
        required: true
    }
})

const consultationModel = model('consultations', consultationSchema);

export default consultationModel;