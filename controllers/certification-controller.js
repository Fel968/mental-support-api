import { certificateModel } from '../models/certificate.js';
import { postCertificateValidator } from '../validators/certificate-validator.js';

export const postCertificate = async (req, res, next) => {
    try {
        const { error, value } = postCertificateValidator.validate(req.body); //I'll have to do a spread to enable file upload. I have to do a multer for posting certificates.

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        const { certificate, yearsOfPractice, fieldOfExpertise } = value;

        const newCertificate = await certificateModel.create({
            user: req.user._id,  
            certificate,
            yearsOfPractice,
            fieldOfExpertise,
        });

        res.status(201).json({
            message: 'Certificate submitted successfully for review.',
            data: newCertificate,
        });
    } catch (error) {
        next(error);  
    }
};

// Get one for certificates

export const getAllCertificates = async (req, res, next) => {
    try {
        const certificates = await certificateModel.find();

        if (!certificates) {
            return res.status(404).json("No certificates found");
        }

        res.status(200).json(certificates);
    } catch (error) {
        next(error);  
    }
};


export const updateCertificateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;  
        const { certificateId } = req.params;  

        const certificate = await certificateModel.findByIdAndUpdate(certificateId, { status }, { new: true });
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found.' });
        }

        if (status === 'approved') {
            const user = await userModel.findById(certificate.user);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            user.role = 'professional counselor';
            await user.save();  
        }

        res.status(200).json({
            message: 'Certificate status updated successfully.',
            data: certificate,
        });
    } catch (error) {
        next(error);  
    }
};

