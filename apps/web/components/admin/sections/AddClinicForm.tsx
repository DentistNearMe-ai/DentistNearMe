// apps/web/components/admin/sections/AddClinicForm.tsx
'use client';

import { useState } from 'react';

interface AddClinicFormProps {
  onSuccess: () => void;
}

interface ClinicFormData {
  // Basic Information
  name: string;
  email: string;
  phone: string;
  website: string;
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Services & Insurance
  services: string[];
  acceptedInsurance: string[];
  
  // Operating Hours
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  
  // Additional Info
  description: string;
  parkingAvailable: boolean;
  wheelchairAccessible: boolean;
  emergencyServices: boolean;
}

export function AddClinicForm({ onSuccess }: AddClinicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ClinicFormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    services: [],
    acceptedInsurance: [],
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    description: '',
    parkingAvailable: false,
    wheelchairAccessible: false,
    emergencyServices: false
  });

  const serviceOptions = [
    'General Dentistry',
    'Teeth Cleaning',
    'Orthodontics',
    'Periodontics',
    'Endodontics',
    'Oral Surgery',
    'Pediatric Dentistry',
    'Cosmetic Dentistry',
    'Prosthodontics',
    'Emergency Dental Care',
    'Dental Implants',
    'Teeth Whitening'
  ];

  const insuranceOptions = [
    'Blue Cross Blue Shield',
    'Aetna',
    'Cigna',
    'MetLife',
    'Delta Dental',
    'Humana',
    'United Healthcare',
    'Guardian',
    'Principal',
    'Medicaid',
    'Medicare'
  ];

  const handleInputChange = (field: keyof ClinicFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field: 'services' | 'acceptedInsurance', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleScheduleChange = (day: keyof ClinicFormData['hours'], value: string) => {
    setFormData(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Clinic data:', formData);
      onSuccess();
    } catch (error) {
      console.error('Error adding clinic:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Dental Clinic</h2>
          <p className="text-gray-600 mt-1">Register a new dental practice on the platform</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Smile Dental Care"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="info@clinicname.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://www.clinicname.com"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="123 Main Street, Suite 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="New York"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="NY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {serviceOptions.map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleArrayToggle('services', service)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Insurance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {insuranceOptions.map((insurance) => (
                <label key={insurance} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.acceptedInsurance.includes(insurance)}
                    onChange={() => handleArrayToggle('acceptedInsurance', insurance)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{insurance}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h3>
            <div className="space-y-3">
              {Object.entries(formData.hours).map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-24">
                    <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                  </div>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => handleScheduleChange(day as keyof ClinicFormData['hours'], e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="9:00 AM - 5:00 PM (or 'Closed')"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Features</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.parkingAvailable}
                  onChange={(e) => handleInputChange('parkingAvailable', e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Parking Available</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.wheelchairAccessible}
                  onChange={(e) => handleInputChange('wheelchairAccessible', e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Wheelchair Accessible</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.emergencyServices}
                  onChange={(e) => handleInputChange('emergencyServices', e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Emergency Services</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Brief description about the clinic, its mission, and unique features..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Clinic...
                </>
              ) : (
                'Add Clinic'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}