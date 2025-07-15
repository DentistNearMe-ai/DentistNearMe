import mongoose, { Document, Schema } from 'mongoose';

export interface IClinic extends Document {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };

  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };

  services?: string[];
  acceptedInsurance?: string[];

  // Virtual field for doctors (populated when needed)
  doctors?: mongoose.Types.ObjectId[];

  // Audit
  createdAt: Date;
  updatedAt: Date;
}

const ClinicSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  website: { type: String },

  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number] // [lng, lat]
  },

  hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },

  services: [String],
  acceptedInsurance: [String],

  // Audit
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Geospatial index for location searches
ClinicSchema.index({ location: '2dsphere' });

// Virtual field to get all doctors for this clinic
ClinicSchema.virtual('doctors', {
  ref: 'Doctor',
  localField: '_id',
  foreignField: 'clinic'
});

// Ensure virtual fields are serialized
ClinicSchema.set('toJSON', { virtuals: true });
ClinicSchema.set('toObject', { virtuals: true });

// Auto-update updatedAt
ClinicSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IClinic>('Clinic', ClinicSchema);
