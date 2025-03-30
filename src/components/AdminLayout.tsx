import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdmin();

  const isActive = (path: string) => {
    return location.pathname === `/admin${path}` ? 'bg-purple-700' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Safiyalar Admin</h1>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin"
            className={`flex items-center px-6 py-3 text-lg hover:bg-purple-700 ${isActive('')}`}
          >
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center px-6 py-3 text-lg hover:bg-purple-700 ${isActive('/products')}`}
          >
            <Package className="mr-3" size={20} />
            Ürünler
          </Link>
          <Link
            to="/admin/settings"
            className={`flex items-center px-6 py-3 text-lg hover:bg-purple-700 ${isActive('/settings')}`}
          >
            <Settings className="mr-3" size={20} />
            Ayarlar
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 text-lg hover:bg-purple-700 w-full"
          >
            <LogOut className="mr-3" size={20} />
            Çıkış
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-100">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;