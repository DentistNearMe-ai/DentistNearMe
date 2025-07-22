// apps/web/components/admin/sections/DoctorList.tsx
'use client';

import { useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  clinic: string;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  totalAppointments: number;
  rating: number;
  verified: boolean;
}

export function DoctorList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);

  // Mock data - replace with API call
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Michael Chen',
      email: 'dr.chen@example.com',
      phone: '(555) 123-4567',
      specialties: ['General Dentistry', 'Cosmetic Dentistry'],
      clinic: 'Smile Dental Care',
      status: 'active',
      joinDate: '2024-01-15',
      totalAppointments: 245,
      rating: 4.8,
      verified: true
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.j@dental.com',
      phone: '(555) 234-5678',
      specialties: ['Orthodontics', 'Pediatric Dentistry'],
      clinic: 'Downtown Dental Center',
      status: 'pending',
      joinDate: '2024-02-20',
      totalAppointments: 0,
      rating: 0,
      verified: false
    },
    {
      id: '3',
      name: 'Dr. Robert Davis',
      email: 'r.davis@dentalgroup.com',
      phone: '(555) 345-6789',
      specialties: ['Oral Surgery', 'Periodontics'],
      clinic: 'Elite Dental Group',
      status: 'active',
      joinDate: '2023-11-08',
      totalAppointments: 189,
      rating: 4.9,
      verified: true
    },
    {
      id: '4',
      name: 'Dr. Emily Rodriguez',
      email: 'emily@brightsmiles.com',
      phone: '(555) 456-7890',
      specialties: ['Endodontics', 'General Dentistry'],
      clinic: 'Bright Smiles Clinic',
      status: 'suspended',
      joinDate: '2023-09-12',
      totalAppointments: 156,
      rating: 4.2,
      verified: true
    },
    {
      id: '5',
      name: 'Dr. Amanda Wilson',
      email: 'a.wilson@dental.net',
      phone: '(555) 567-8901',
      specialties: ['Cosmetic Dentistry', 'Prosthodontics'],
      clinic: 'Premier Dental',
      status: 'active',
      joinDate: '2024-03-05',
      totalAppointments: 98,
      rating: 4.7,
      verified: true
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.clinic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctors(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDoctors.length === filteredDoctors.length) {
      setSelectedDoctors([]);
    } else {
      setSelectedDoctors(filteredDoctors.map(doctor => doctor.id));
    }
  };

  const handleStatusChange = (doctorId: string, newStatus: Doctor['status']) => {
    console.log(`Changing doctor ${doctorId} status to ${newStatus}`);
    // Implement API call here
  };

  const handleDelete = (doctorId: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      console.log(`Deleting doctor ${doctorId}`);
      // Implement API call here
    }
  };

  const getStatusBadge = (status: Doctor['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return styles[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Doctor Management</h2>
          <p className="text-gray-600">Manage registered doctors and their status</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
          Export Data
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search doctors by name, email, or clinic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </p>
        {selectedDoctors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{selectedDoctors.length} selected</span>
            <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
              Bulk Actions
            </button>
          </div>
        )}
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDoctors.length === filteredDoctors.length && filteredDoctors.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clinic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDoctors.includes(doctor.id)}
                      onChange={() => handleSelectDoctor(doctor.id)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-600 font-medium text-sm">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{doctor.name}</span>
                          {doctor.verified && (
                            <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{doctor.email}</div>
                        <div className="text-sm text-gray-500">{doctor.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {doctor.specialties.slice(0, 2).map((specialty, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {specialty}
                        </span>
                      ))}
                      {doctor.specialties.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{doctor.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doctor.clinic}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(doctor.status)}`}>
                      {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{doctor.totalAppointments} appointments</div>
                      {doctor.rating > 0 && (
                        <div className="flex items-center text-yellow-500">
                          <span className="text-sm text-gray-600">{doctor.rating}</span>
                          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => console.log('Edit doctor', doctor.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <select
                        value={doctor.status}
                        onChange={(e) => handleStatusChange(doctor.id, e.target.value as Doctor['status'])}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing 1 to {filteredDoctors.length} of {filteredDoctors.length} results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}