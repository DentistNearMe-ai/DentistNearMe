// apps/api/src/controllers/doctor.controller.ts
import { Request, Response, NextFunction } from 'express';
import { DoctorService } from '../services/doctor.service'';
import logger from '../config/logger.config';
import { IDoctor } from '../models';

export class DoctorController {
  /**
   * Create a new doctor (Admin only)
   */
  static async createDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const doctorData: Partial<IDoctor> = req.body;
      
      const doctor = await DoctorService.createDoctor(doctorData);

      // Remove password from response
      const doctorResponse = doctor.toObject();
      delete doctorResponse.password;
      
      res.status(201).json({
        success: true,
        message: 'Doctor created successfully',
        data: doctorResponse
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Doctor with this email already exists') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      logger.error('Error creating doctor:', error);
      next(error);
    }
  }

  /**
   * Get doctor by ID
   */
  static async getDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const doctor = await DoctorService.getDoctorById(id);
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }

      res.json({
        success: true,
        data: doctor
      });
    } catch (error) {
      logger.error('Error fetching doctor:', error);
      next(error);
    }
  }

  /**
   * Get all doctors with filters and pagination
   */
  static async getDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const status = req.query.status as string;
      const specialty = req.query.specialty as string;
      const clinic = req.query.clinic as string;

      const filters = {
        search,
        status,
        specialty,
        clinic
      };

      const result = await DoctorService.getDoctors(page, limit, filters);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Error fetching doctors:', error);
      next(error);
    }
  }

  /**
   * Update doctor
   */
  static async updateDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const doctor = await DoctorService.updateDoctor(id, updateData);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }

      res.json({
        success: true,
        message: 'Doctor updated successfully',
        data: doctor
      });
    } catch (error) {
      logger.error('Error updating doctor:', error);
      next(error);
    }
  }

  /**
   * Delete doctor
   */
  static async deleteDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deleted = await DoctorService.deleteDoctor(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }

      res.json({
        success: true,
        message: 'Doctor deleted successfully'
      });
    } catch (error) {
      logger.error('Error deleting doctor:', error);
      next(error);
    }
  }

  /**
   * Update doctor status (Admin only)
   */
  static async updateDoctorStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['active', 'pending', 'suspended'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be active, pending, or suspended'
        });
      }

      const doctor = await DoctorService.updateDoctorStatus(id, status);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }

      res.json({
        success: true,
        message: 'Doctor status updated successfully',
        data: doctor
      });
    } catch (error) {
      logger.error('Error updating doctor status:', error);
      next(error);
    }
  }

  /**
   * Verify doctor (Admin only)
   */
  static async verifyDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { verified } = req.body;

      const doctor = await DoctorService.verifyDoctor(id, verified);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }

      res.json({
        success: true,
        message: `Doctor ${verified ? 'verified' : 'unverified'} successfully`,
        data: doctor
      });
    } catch (error) {
      logger.error('Error verifying doctor:', error);
      next(error);
    }
  }

  /**
   * Search doctors by specialty and location
   */
  static async searchDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        specialty, 
        location, 
        latitude, 
        longitude, 
        radius = 10,
        page = 1,
        limit = 10 
      } = req.query;

      const searchParams = {
        specialty: specialty as string,
        location: location as string,
        latitude: latitude ? parseFloat(latitude as string) : undefined,
        longitude: longitude ? parseFloat(longitude as string) : undefined,
        radius: parseInt(radius as string),
        page: parseInt(page as string),
        limit: parseInt(limit as string)
      };

      const result = await DoctorService.searchDoctors(searchParams);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Error searching doctors:', error);
      next(error);
    }
  }

  /**
   * Get doctor statistics (Admin only)
   */
  static async getDoctorStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await DoctorService.getDoctorStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error('Error fetching doctor stats:', error);
      next(error);
    }
  }

  /**
   * Bulk update doctors (Admin only)
   */
  static async bulkUpdateDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const { doctorIds, updateData } = req.body;

      if (!Array.isArray(doctorIds) || doctorIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Doctor IDs array is required'
        });
      }

      const result = await DoctorService.bulkUpdateDoctors(doctorIds, updateData);

      res.json({
        success: true,
        message: 'Doctors updated successfully',
        data: result
      });
    } catch (error) {
      logger.error('Error bulk updating doctors:', error);
      next(error);
    }
  }
}