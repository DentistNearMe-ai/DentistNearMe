// apps/api/src/services/clinic.service.ts
import { Clinic, IClinic } from '../models';
import logger from '../config/logger.config';

interface ClinicFilters {
  search?: string;
  city?: string;
  state?: string;
}

interface SearchParams {
  location?: string;
  latitude?: number;
  longitude?: number;
  radius: number;
  services?: string;
  page: number;
  limit: number;
}

export class ClinicService {
  /**
   * Create a new clinic
   */
  static async createClinic(clinicData: Partial<IClinic>): Promise<IClinic> {
    // Check if clinic already exists
    const existingClinic = await Clinic.findOne({ 
      $or: [
        { email: clinicData.email },
        { name: clinicData.name, address: clinicData.address }
      ]
    });
    
    if (existingClinic) {
      throw new Error('Clinic with this email or name/address already exists');
    }

    // Create new clinic
    const clinic = new Clinic(clinicData);
    await clinic.save();

    logger.info(`New clinic created: ${clinic._id}`);
    return clinic;
  }

  /**
   * Get clinic by ID
   */
  static async getClinicById(id: string): Promise<IClinic | null> {
    const clinic = await Clinic.findById(id).populate('doctors');
    return clinic;
  }

  /**
   * Get all clinics with filters and pagination
   */
  static async getClinics(page: number = 1, limit: number = 10, filters: ClinicFilters = {}) {
    const skip = (page - 1) * limit;
    
    // Build query
    const query: any = {};
    
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
        { address: { $regex: filters.search, $options: 'i' } },
        { services: { $in: [new RegExp(filters.search, 'i')] } }
      ];
    }
    
    if (filters.city) {
      query.address = { $regex: filters.city, $options: 'i' };
    }
    
    if (filters.state) {
      query.address = { $regex: filters.state, $options: 'i' };
    }

    const [clinics, total] = await Promise.all([
      Clinic.find(query)
        .populate('doctors', 'name specialties')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Clinic.countDocuments(query)
    ]);

    return {
      clinics,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Update clinic
   */
  static async updateClinic(id: string, updateData: Partial<IClinic>): Promise<IClinic | null> {
    const clinic = await Clinic.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('doctors', 'name specialties');

    if (clinic) {
      logger.info(`Clinic updated: ${id}`);
    }

    return clinic;
  }

  /**
   * Delete clinic
   */
  static async deleteClinic(id: string): Promise<boolean> {
    const clinic = await Clinic.findByIdAndDelete(id);
    
    if (clinic) {
      logger.info(`Clinic deleted: ${id}`);
      return true;
    }
    
    return false;
  }

  /**
   * Search clinics by location and services
   */
  static async searchClinics(params: SearchParams) {
    const { latitude, longitude, radius, services, page, limit } = params;
    const skip = (page - 1) * limit;
    
    const query: any = {};
    
    // Add services filter
    if (services) {
      query.services = { $in: [services] };
    }
    
    // Add location filter if coordinates provided
    if (latitude && longitude) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      };
    }

    const [clinics, total] = await Promise.all([
      Clinic.find(query)
        .populate('doctors', 'name specialties rating')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Clinic.countDocuments(query)
    ]);

    return {
      clinics,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get clinic statistics
   */
  static async getClinicStats() {
    const [
      totalClinics,
      clinicsWithDoctors,
      serviceStats,
      locationStats
    ] = await Promise.all([
      Clinic.countDocuments(),
      Clinic.countDocuments({ doctors: { $exists: true, $ne: [] } }),
      Clinic.aggregate([
        { $unwind: '$services' },
        { $group: { _id: '$services', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Clinic.aggregate([
        { 
          $group: { 
            _id: { $substr: ['$address', -5, 5] }, // Simple zip code extraction
            count: { $sum: 1 } 
          } 
        },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    return {
      totalClinics,
      clinicsWithDoctors,
      clinicsWithoutDoctors: totalClinics - clinicsWithDoctors,
      serviceStats: serviceStats.map(stat => ({
        service: stat._id,
        count: stat.count
      })),
      locationStats: locationStats.map(stat => ({
        area: stat._id,
        count: stat.count
      }))
    };
  }

  /**
   * Get clinics with their doctors
   */
  static async getClinicsWithDoctors(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [clinics, total] = await Promise.all([
      Clinic.find()
        .populate({
          path: 'doctors',
          select: 'name email specialties status verified',
          match: { status: 'active' }
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Clinic.countDocuments()
    ]);

    return {
      clinics,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Bulk update clinics
   */
  static async bulkUpdateClinics(clinicIds: string[], updateData: any) {
    const result = await Clinic.updateMany(
      { _id: { $in: clinicIds } },
      updateData,
      { runValidators: true }
    );

    logger.info(`Bulk updated ${result.modifiedCount} clinics`);

    return {
      matched: result.matchedCount,
      modified: result.modifiedCount
    };
  }

  /**
   * Find clinic by name
   */
  static async getClinicByName(name: string): Promise<IClinic | null> {
    const clinic = await Clinic.findOne({ 
      name: { $regex: name, $options: 'i' } 
    }).populate('doctors', 'name specialties');
    return clinic;
  }

  /**
   * Get nearby clinics
   */
  static async getNearbyClinic(latitude: number, longitude: number, radius: number = 10) {
    const clinics = await Clinic.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    }).populate('doctors', 'name specialties rating').limit(20);

    return clinics;
  }

  /**
   * Add doctor to clinic
   */
  static async addDoctorToClinic(clinicId: string, doctorId: string): Promise<IClinic | null> {
    const clinic = await Clinic.findByIdAndUpdate(
      clinicId,
      { $addToSet: { doctors: doctorId } },
      { new: true }
    ).populate('doctors', 'name specialties');

    if (clinic) {
      logger.info(`Doctor ${doctorId} added to clinic ${clinicId}`);
    }

    return clinic;
  }

  /**
   * Remove doctor from clinic
   */
  static async removeDoctorFromClinic(clinicId: string, doctorId: string): Promise<IClinic | null> {
    const clinic = await Clinic.findByIdAndUpdate(
      clinicId,
      { $pull: { doctors: doctorId } },
      { new: true }
    ).populate('doctors', 'name specialties');

    if (clinic) {
      logger.info(`Doctor ${doctorId} removed from clinic ${clinicId}`);
    }

    return clinic;
  }
}