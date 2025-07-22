// apps/web/components/admin/sections/DashboardOverview.tsx
'use client';

export function DashboardOverview() {
  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: 'Active Doctors',
      value: '1,205',
      change: '+8%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Total Clinics',
      value: '324',
      change: '+15%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Monthly Bookings',
      value: '8,924',
      change: '+22%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New doctor registered',
      details: 'Dr. Amanda Wilson - Seattle, WA',
      time: '2 hours ago',
      type: 'doctor',
      status: 'pending'
    },
    {
      id: 2,
      action: 'Clinic verification completed',
      details: 'Smile Dental Care - New York, NY',
      time: '4 hours ago',
      type: 'clinic',
      status: 'approved'
    },
    {
      id: 3,
      action: 'New patient registration',
      details: 'Sarah Mitchell - Los Angeles, CA',
      time: '6 hours ago',
      type: 'patient',
      status: 'completed'
    },
    {
      id: 4,
      action: 'Doctor profile updated',
      details: 'Dr. Michael Chen - Updated services',
      time: '8 hours ago',
      type: 'doctor',
      status: 'completed'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Doctor',
      name: 'Dr. Sarah Johnson',
      location: 'Chicago, IL',
      submitted: '2 days ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'Clinic',
      name: 'Downtown Dental Center',
      location: 'Miami, FL',
      submitted: '3 days ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'Doctor',
      name: 'Dr. Robert Davis',
      location: 'Phoenix, AZ',
      submitted: '1 week ago',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
            <p className="text-red-100">Manage your dental platform efficiently</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activity.type === 'doctor' ? 'bg-green-100' :
                    activity.type === 'clinic' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'doctor' ? '👨‍⚕️' :
                     activity.type === 'clinic' ? '🏥' : '👤'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {pendingApprovals.length} pending
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      item.type === 'Doctor' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {item.type === 'Doctor' ? '👨‍⚕️' : '🏥'}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.type} • {item.location}</p>
                      <p className="text-xs text-gray-500">Submitted {item.submitted}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.priority}
                    </span>
                    <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left group">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3 mr-4 group-hover:bg-green-200 transition-colors">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add New Doctor</h3>
              <p className="text-sm text-gray-600">Register a new dental professional</p>
            </div>
          </div>
        </button>

        <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left group">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3 mr-4 group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add New Clinic</h3>
              <p className="text-sm text-gray-600">Register a new dental practice</p>
            </div>
          </div>
        </button>

        <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left group">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3 mr-4 group-hover:bg-purple-200 transition-colors">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Analytics</h3>
              <p className="text-sm text-gray-600">Platform performance insights</p>
            </div>
          </div>
        </button>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-900">API Status</span>
              </div>
              <p className="text-xs text-gray-600">Operational</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-900">Database</span>
              </div>
              <p className="text-xs text-gray-600">Healthy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-900">Payments</span>
              </div>
              <p className="text-xs text-gray-600">Minor Issues</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-900">Email Service</span>
              </div>
              <p className="text-xs text-gray-600">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}