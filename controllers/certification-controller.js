import { certificateModel } from '../models/certificate.js';
import { userModel } from '../models/user-models.js';
import { postCertificateValidator } from '../validators/certificate-validator.js';

export const postCertificate = async (req, res, next) => {
    try {
        // Validate request body
        const { error, value } = postCertificateValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        const userId = req.auth.id;

        // Verify if `req.auth` is correctly populated
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        const { certificates, yearsOfPractice, category } = value;

        // Create new certificate
        const newCertificate = await certificateModel.create({
            user: userId,
            certificates,
            yearsOfPractice,
            category,
        });

        res.status(201).json("Certificate submitted for review");
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
        // const { certificateId } = req.params;  

        const certificate = await certificateModel.findOneAndUpdate({ _id: req.params.id }, { status }, { new: true });

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found.' });
        }

        const user = await userModel.findById(certificate.user);

        if (status === 'approved') {
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            user.role = 'professional-therapist';
            user.isApproved = true;
            await user.save();
        } else {
            user.role = 'user';
            user.isApproved = false;
        }

        res.status(200).json({
            message: `User status updated to ${status}`, userRole: user.role,
            isApproved: user.isApproved
        });
    } catch (error) {
        next(error);
    }
};

