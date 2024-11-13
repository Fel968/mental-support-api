import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
    userName: {type: String},
    fullName: {type: String},
    email: {type: String, email: true, required: true, unique: true},
    role: {type: String, default: 'user', enum: ['user', 'peer-therapist', 'professional-therapist', 'admin']},
    isApproved: {type: Boolean, default: false},
    phone: {type: String},
    password: {type: String, required: true},
    profilePicture: {type: String},
},{
    timestamps: true
});

userSchema.plugin(toJSON);

export const userModel = model('User', userSchema);


// next


const peertDashboardSchema = new Schema({

    peerTherapist: { type: Types.ObjectId, ref: 'User' },

    assessment: { type: Types.ObjectId, ref: 'Assessment' },  

    assessmentStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

    clientsAssigned: [{ type: Types.ObjectId, ref: 'User' }],  

    // sessions: { type: Number, default: 0 }, I'll have a to-do endpoint for therapists

    averageSessionRating: { type: Number, min: 0, max: 5 },  // Rating given by clients
    
    bio: {type: String}
}, {
    timestamps: true
});

peertDashboardSchema.plugin(toJSON);


export const PeerTherapistDashboard = model('PeerTherapistDashboard', peertDashboardSchema);


// next


const proTherapistSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },

    certificates: [{ type: Schema.Types.ObjectId, ref: 'Certificate' }], //I'll have to create an upload for this. But do I need another model for this? since we're going to have different endpoints for the certificate upload and the dashboard.

    certificationStatus: {type: String, default: 'pending', enum: ['success', 'pending', 'rejected']},

    yearsOfExperience: { type: Number, required: true },

    expertiseAreas: [{ type: String }],
    // sessionsConducted: [{ sessionId: Types.ObjectId }], //this sould reference something. Look into it later
    
    bio: {type: String}
}, {
        timestamps: true
    });

    proTherapistSchema.plugin(toJSON);
 
 export const proTherapistModel = model('ProfessionalTherapist', proTherapistSchema);






  