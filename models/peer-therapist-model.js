import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const peerTherapistSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true},
    assessmentsPassed: [{ date: { type: Date, default: Date.now }, result: String }], //I may need another model for the assessment. I'll probably have to link it here
    approvedDate: { type: Date }, 
    specializations: [{ type: String }],
    sessionsConducted: [{ sessionId: mongoose.Schema.Types.ObjectId, date: Date }]
},{
    timestamps: true
});

peerTherapistSchema.plugin(toJSON);

export const peerTherapistModel = model('PeerTherapist', peerTherapistSchema);

