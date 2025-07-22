// apps/api/src/controllers/clinic.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ClinicService } from '../services/clinic.service';
import logger from '../config/logger.config';
import { IClinic } from '../models';

export class ClinicController {
  /**
   * Create a new clinic (Admin only)
   */
  static async createClinic(req: Request, res: Response, next: NextFunction) {
    try {
      const clinicData: Partial<IClinic> = req.body;
      
      const clinic = await ClinicService.createClinic(clinicData);
      
      res.status(201).json({
        success: true,
        message: 'Clinic created successfully',
        data: clinic
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Clinic with this email already exists') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      logger.error('Error creating clinic:', error);
      next(error);
    }
  }

  /**
   * Get clinic by ID
   */
  static async getClinic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const clinic = await ClinicService.getClinicById(id);
      if (!clinic) {
        return res.status(404).json({
          success: false,
          message: 'Clinic not found'
        });
      }

      res.json({
        success: true,
        data: clinic
      });
    } catch (error) {
      logger.error('Error fetching clinic:', error);
      next(error);
    }
  }

  /**
   * Get all clinics with filters and pagination
   */
  static async getClinics(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const city = req.query.city as string;
      const state = req.query.state as string;

      const filters = {
        search,
        city,
        state
      };

      const result = await ClinicService.getClinics(page, limit, filters);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Error fetching clinics:', error);
      next(error);
    }
  }

  /**
   * Update clinic
   */
  static async updateClinic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const clinic = await ClinicService.updateClinic(id, updateData);

      if (!clinic) {
        return res.status(404).json({
          success: false,
          message: 'Clinic not found'
        });
      }

      res.json({
        success: true,
        message: 'Clinic updated successfully',
        data: clinic
      });
    } catch (error) {
      logger.error('Error updating clinic:', error);
      next(error);
    }
  }

  /**
   * Delete clinic
   */
  static async deleteClinic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deleted = await ClinicService.deleteClinic(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Clinic not found'
        });
      }

      res.json({
        success: true,
        message: 'Clinic deleted successfully'
      });
    } catch (error) {
      logger.error('Error deleting clinic:', error);
      next(error);
    }
  }

  /**
   * Search clinics by location
   */
  static async searchClinics(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        location, 
        latitude, 
        longitude, 
        radius = 10,
        services,
        page = 1,
        limit = 10 
      } = req.query;

      const searchParams = {
        location: location as string,
        latitude: latitude ? parseFloat(latitude as string) : undefined,
        longitude: longitude ? parseFloat(longitude as string) : undefined,
        radius: parseInt(radius as string),
        services: services as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string)
      };

      const result = await ClinicService.searchClinics(searchParams);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Error searching clinics:', error);
      next(error);
    }
  }

  /**
   * Get clinic statistics (Admin only)
   */
  static async getClinicStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await ClinicService.getClinicStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error('Error fetching clinic stats:', error);
      next(error);
    }
  }

  /**
   * Get clinics with their doctors
   */
  static async getClinicsWithDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await ClinicService.getClinicsWithDoctors(page, limit);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Error fetching clinics with doctors:', error);
      next(error);
    }
  }

  /**
   * Bulk update clinics (Admin only)
   */
  static async bulkUpdateClinics(req: Request, res: Response, next: NextFunction) {
    try {
      const { clinicIds, updateData } = req.body;

      if (!Array.isArray(clinicIds) || clinicIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Clinic IDs array is required'
        });
      }

      const result = await ClinicService.bulkUpdateClinics(clinicIds, updateData);

      res.json({
        success: true,
        message: 'Clinics updated successfully',
        data: result
      });
    } catch (error) {
      logger.error('Error bulk updating clinics:', error);
      next(error);
    }
  }
}