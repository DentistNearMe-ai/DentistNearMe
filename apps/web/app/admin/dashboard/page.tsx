// apps/web/app/admin/dashboard/page.tsx
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Admin Dashboard | DentalCare+',
  description: 'Administrative dashboard for managing the DentalCare+ platform',
};

export default function AdminDashboardPage() {
  return <AdminDashboard/>;
}