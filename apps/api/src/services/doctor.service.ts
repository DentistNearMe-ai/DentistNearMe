// apps/api/src/services/doctor.service.ts
import { Doctor, IDoctor } from '../models';
import logger from '../config/logger.config';
import bcrypt from 'bcrypt';

interface DoctorFilters {
  search?: string;
  status?: string;
  specialty?: string;
  clinic?: string;
}

interface SearchParams {
  specialty?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  radius: number;
  page: number;
  limit: number;
}

export class DoctorService {
  /**
   * Create a new doctor
   */
  static async createDoctor(doctorData: Partial<IDoctor>): Promise<IDoctor> {
    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email: doctorData.email });
    if (existingDoctor) {
      throw new Error('Doctor with this email already exists');
    }

    // Hash password if provided
    if (doctorData.password) {
      doctorData.password = await bcrypt.hash(doctorData.password, 10);
    }

    // Set initial status
    if (!doctorData.status) {
      doctorData.status = 'pending';
    }

    // Create new doctor
    const doctor = new Doctor(doctorData);
    await doctor.save();

    logger.info(`New doctor created: ${doctor._id}`);
    return doctor;
  }

  /**
   * Get doctor by ID
   */
  static async getDoctorById(id: string): Promise<IDoctor | null> {
    const doctor = await Doctor.findById(id)
      .select('-password')
      .populate('clinic', 'name address phone');
    return doctor;
  }

  /**
   * Get all doctors with filters and pagination
   */
  static async getDoctors(page: number = 1, limit: number = 10, filters: DoctorFilters = {}) {
    const skip = (page - 1) * limit;
    
    // Build query
    const query: any = {};
    
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
        { specialties: { $in: [new RegExp(filters.search, 'i')] } }
      ];
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.specialty) {
      query.specialties = { $in: [filters.specialty] };
    }
    
    if (filters.clinic) {
      query.clinic = filters.clinic;
    }

    const [doctors, total] = await Promise.all([
      Doctor.find(query)
        .select('-password')
        .populate('clinic', 'name address phone')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Doctor.countDocuments(query)
    ]);

    return {
      doctors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Update doctor
   */
  static async updateDoctor(id: string, updateData: Partial<IDoctor>): Promise<IDoctor | null> {
    // Remove sensitive fields that shouldn't be updated directly
    const sanitizedData = { ...updateData };
    delete sanitizedData.password;
    delete sanitizedData.email;

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      sanitizedData,
      { new: true, runValidators: true }
    ).select('-password').populate('clinic', 'name address phone');

    if (doctor) {
      logger.info(`Doctor updated: ${id}`);
    }

    return doctor;
  }

  /**
   * Delete doctor
   */
  static async deleteDoctor(id: string): Promise<boolean> {
    const doctor = await Doctor.findByIdAndDelete(id);
    
    if (doctor) {
      logger.info(`Doctor deleted: ${id}`);
      return true;
    }
    
    return false;
  }

  /**
   * Update doctor status
   */
  static async updateDoctorStatus(id: string, status: 'active' | 'pending' | 'suspended'): Promise<IDoctor | null> {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-password').populate('clinic', 'name address phone');

    if (doctor) {
      logger.info(`Doctor status updated: ${id} -> ${status}`);
    }

    return doctor;
  }

  /**
   * Verify doctor
   */
  static async verifyDoctor(id: string, verified: boolean): Promise<IDoctor | null> {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { verified },
      { new: true, runValidators: true }
    ).select('-password').populate('clinic', 'name address phone');

    if (doctor) {
      logger.info(`Doctor verification updated: ${id} -> ${verified}`);
    }

    return doctor;
  }

  /**
   * Search doctors by location and specialty
   */
  static async searchDoctors(params: SearchParams) {
    const { specialty, latitude, longitude, radius, page, limit } = params;
    const skip = (page - 1) * limit;
    
    const query: any = {};
    
    // Add specialty filter
    if (specialty) {
      query.specialties = { $in: [specialty] };
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
    
    // Only show active doctors in search
    query.status = 'active';
    query.verified = true;

    const [doctors, total] = await Promise.all([
      Doctor.find(query)
        .select('-password')
        .populate('clinic', 'name address phone hours')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Doctor.countDocuments(query)
    ]);

    return {
      doctors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get doctor statistics
   */
  static async getDoctorStats() {
    const [
      totalDoctors,
      activeDoctors,
      pendingDoctors,
      suspendedDoctors,
      verifiedDoctors,
      specialtyStats
    ] = await Promise.all([
      Doctor.countDocuments(),
      Doctor.countDocuments({ status: 'active' }),
      Doctor.countDocuments({ status: 'pending' }),
      Doctor.countDocuments({ status: 'suspended' }),
      Doctor.countDocuments({ verified: true }),
      Doctor.aggregate([
        { $unwind: '$specialties' },
        { $group: { _id: '$specialties', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    return {
      totalDoctors,
      activeDoctors,
      pendingDoctors,
      suspendedDoctors,
      verifiedDoctors,
      specialtyStats: specialtyStats.map(stat => ({
        specialty: stat._id,
        count: stat.count
      }))
    };
  }

  /**
   * Bulk update doctors
   */
  static async bulkUpdateDoctors(doctorIds: string[], updateData: any) {
    const result = await Doctor.updateMany(
      { _id: { $in: doctorIds } },
      updateData,
      { runValidators: true }
    );

    logger.info(`Bulk updated ${result.modifiedCount} doctors`);

    return {
      matched: result.matchedCount,
      modified: result.modifiedCount
    };
  }

  /**
   * Find doctor by email
   */
  static async getDoctorByEmail(email: string): Promise<IDoctor | null> {
    const doctor = await Doctor.findOne({ email })
      .select('-password')
      .populate('clinic', 'name address phone');
    return doctor;
  }

  /**
   * Get doctors by clinic
   */
  static async getDoctorsByClinic(clinicId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [doctors, total] = await Promise.all([
      Doctor.find({ clinic: clinicId })
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Doctor.countDocuments({ clinic: clinicId })
    ]);

    return {
      doctors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }
}