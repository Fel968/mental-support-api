import { Schema, model, Types } from "mongoose";

const professionalTherapistSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    certification: { type: String, required: true }, //I'll have to create an upload for this. But do I need another model for this? since we're going to have different endpoints for the certificate upload and the dashboard.
    yearsOfExperience: { type: Number, required: true },
    expertiseAreas: [{ type: String }],
    approvedDate: { type: Date },
    sessionsConducted: [{ sessionId: Types.ObjectId }] //this sould reference something. Look into it later
}, {
        timestamps: true
    });
  
 export const professionalTherapistModel = model('ProfessionalTherapist', professionalTherapistSchema);
  