import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
  // Auth / profile
  name: string;
  email: string;
  phone?: string;
  password: string;

  // Doctor-specific
  clinic?: mongoose.Types.ObjectId;
  bio?: string;
  specialties?: string[];
  acceptedInsurance?: string[];

  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };

  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };

  // Audit
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema = new Schema({
  // Auth / profile
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },

  // Doctor-specific
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  bio: { type: String },
  specialties: [String],
  acceptedInsurance: [String],

  hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },

  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number] // [lng, lat]
  },

  // Audit
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Geospatial index for clinic searches
DoctorSchema.index({ location: '2dsphere' });

// Auto-update updatedAt
DoctorSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
