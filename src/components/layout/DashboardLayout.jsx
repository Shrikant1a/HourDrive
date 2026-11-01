import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Menu, X, LogOut, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout({ children, navItems, title }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050A14] flex">
      {/* Sidebar */}
      <>
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0A1628] border-r border-white/5 fixed top-0 left-0 bottom-0 z-40">
          <SidebarContent navItems={navItems} user={user} logout={handleLogout} location={location} />
        </aside>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed top-0 left-0 bottom-0 w-64 bg-[#0A1628] border-r border-white/5 z-50 flex flex-col"
              >
                <SidebarContent navItems={navItems} user={user} logout={handleLogout} location={location} onClose={() => setSidebarOpen(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#050A14]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg bg-white/5 text-white/60 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold font-['Outfit'] text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#00D4FF] rounded-full" />
            </button>
            <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center text-xs font-bold text-white">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">{user?.name?.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ navItems, user, logout, location, onClose }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg font-['Outfit'] text-white">Hour<span className="gradient-text">Drive</span></span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User profile */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center text-white font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-white/40 text-xs capitalize">{user?.role || 'Customer'}</p>
          </div>
          <div className="dot-online" />
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-[#00D4FF] text-[#050A14] text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <Link to="/" className="sidebar-item mb-1">
          <Car className="w-4 h-4" /> Back to Website
        </Link>
        <button onClick={logout} className="sidebar-item text-red-400 hover:text-red-300 hover:bg-red-500/5 w-full">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </>
  );
}
