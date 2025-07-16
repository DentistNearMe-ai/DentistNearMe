import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  // Auth / profile
  name: string;
  email: string;
  phone?: string;
  password: string;

  // Admin-specific
  roles?: string[]; // e.g., ['superadmin', 'staff']

  // Audit
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema({
  // Auth / profile
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },

  // Admin-specific
  roles: [{ type: String, enum: ['superadmin', 'staff'] }],

  // Audit
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-update updatedAt
AdminSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
