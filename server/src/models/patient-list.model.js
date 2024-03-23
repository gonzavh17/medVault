import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const patientListSchema = new Schema({
    patientList: [
        {
            patient: {
                type: Schema.Types.ObjectId,
                ref: 'patients', 
                required: true
            }
        }
    ]
}, { timestamps: true }); 

patientListSchema.plugin(mongoosePaginate);

patientListSchema.pre('find', function(next) {
    this.populate('patient'); 
    next();
});

const patientListModel = model('patientLists', patientListSchema);

export default patientListModel;