// apps/web/components/admin/AdminDashboard.tsx
'use client';

import { useState } from 'react';
import { AdminSidebar } from './layout/AdminSidebar';
import { AdminHeader } from './layout/AdminHeader';
import { DashboardOverview } from './sections/DashboardOverview';
import { AddDoctorForm } from './sections/AddDoctorForm';
import { AddClinicForm } from './sections/AddClinicForm';
import { DoctorList } from './sections/DoctorList';
import { ClinicList } from './sections/ClinicList';
import { UserManagement } from './sections/UserManagement';
import { PlatformAnalytics } from './sections/PlatformAnalytics';
import { SystemSettings } from './sections/SystemSettings';

export type AdminTab = 
  | 'overview' 
  | 'add-doctor' 
  | 'add-clinic' 
  | 'doctors' 
  | 'clinics' 
  | 'users' 
  | 'analytics' 
  | 'settings';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'add-doctor':
        return <AddDoctorForm onSuccess={() => setActiveTab('doctors')} />;
      case 'add-clinic':
        return <AddClinicForm onSuccess={() => setActiveTab('clinics')} />;
      case 'doctors':
        return <DoctorList />;
      case 'clinics':
        return <ClinicList />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <PlatformAnalytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          onMenuClick={() => setSidebarOpen(true)}
          activeTab={activeTab}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}