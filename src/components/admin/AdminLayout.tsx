
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import { Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC = () => {
  const { user, loading, isAdmin } = useUserContext();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
