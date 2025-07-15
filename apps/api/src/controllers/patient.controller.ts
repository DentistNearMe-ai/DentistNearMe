import { Request, Response, NextFunction } from 'express';
import { Patient, IPatient } from '../models';
import logger from '../config/logger.config';

export class PatientController {
  /**
   * Create a new patient
   */
  static async createPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const patientData: Partial<IPatient> = req.body;
      
      // Check if patient already exists
      const existingPatient = await Patient.findOne({ email: patientData.email });
      if (existingPatient) {
        return res.status(400).json({
          success: false,
          message: 'Patient with this email already exists'
        });
      }

      // Create new patient
      const patient = new Patient(patientData);
      await patient.save();

      // Remove password from response
      const patientResponse = patient.toObject();
      delete patientResponse.password;

      logger.info(`New patient created: ${patient._id}`);
      
      res.status(201).json({
        success: true,
        message: 'Patient created successfully',
        data: patientResponse
      });
    } catch (error) {
      logger.error('Error creating patient:', error);
      next(error);
    }
  }

  /**
   * Get patient by ID
   */
  static async getPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const patient = await Patient.findById(id).select('-password');
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found'
        });
      }

      res.json({
        success: true,
        data: patient
      });
    } catch (error) {
      logger.error('Error fetching patient:', error);
      next(error);
    }
  }

  /**
   * Update patient
   */
  static async updatePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Remove sensitive fields that shouldn't be updated via this endpoint
      delete updateData.password;
      delete updateData.email;

      const patient = await Patient.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found'
        });
      }

      res.json({
        success: true,
        message: 'Patient updated successfully',
        data: patient
      });
    } catch (error) {
      logger.error('Error updating patient:', error);
      next(error);
    }
  }

  /**
   * Get all patients (with pagination)
   */
  static async getPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const patients = await Patient.find()
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await Patient.countDocuments();

      res.json({
        success: true,
        data: {
          patients,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      logger.error('Error fetching patients:', error);
      next(error);
    }
  }

  /**
   * Delete patient
   */
  static async deletePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const patient = await Patient.findByIdAndDelete(id);
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found'
        });
      }

      logger.info(`Patient deleted: ${id}`);

      res.json({
        success: true,
        message: 'Patient deleted successfully'
      });
    } catch (error) {
      logger.error('Error deleting patient:', error);
      next(error);
    }
  }
}
