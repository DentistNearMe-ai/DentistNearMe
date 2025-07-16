// src/components/dashboard/DoctorDashboard.tsx
'use client';

import { DashboardLayout } from '../layout/DashboardLayout';

export function DoctorDashboard() {
  const user = {
    name: 'Dr. Michael Chen',
    email: 'dr.chen@dentalclinic.com'
  };

  const todaySchedule = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '9:00 AM',
      type: 'Cleaning',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Robert Smith',
      time: '10:30 AM',
      type: 'Root Canal',
      status: 'in-progress'
    },
    {
      id: 3,
      patient: 'Emily Davis',
      time: '2:00 PM',
      type: 'Crown Fitting',
      status: 'pending'
    }
  ];

  const stats = [
    { label: 'Today\'s Patients', value: '8', change: '+2', color: 'blue' },
    { label: 'This Week', value: '42', change: '+5', color: 'green' },
    { label: 'Revenue (MTD)', value: '$12,450', change: '+8%', color: 'purple' },
    { label: 'Avg Rating', value: '4.9', change: '★', color: 'yellow' }
  ];

  const recentBookings = [
    {
      id: 1,
      patient: 'Alex Thompson',
      date: '2025-07-22',
      time: '11:00 AM',
      type: 'Consultation',
      status: 'new'
    },
    {
      id: 2,
      patient: 'Maria Garcia',
      date: '2025-07-23',
      time: '3:30 PM',
      type: 'Filling',
      status: 'new'
    }
  ];

  return (
    <DashboardLayout userType="doctor" user={user}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Good morning, {user.name}!</h2>
          <p className="text-green-100">You have 8 patients scheduled for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-yellow-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todaySchedule.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'in-progress' ? 'bg