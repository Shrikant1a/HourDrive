import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('hourdrive_users') || '[]');

    // Demo admin account
    const demoAccounts = [
      { email: 'admin@hourdrive.com', password: 'Admin@123', name: 'Admin User', role: 'admin', id: 'admin-1' },
      { email: 'owner@hourdrive.com', password: 'Owner@123', name: 'Demo Owner', role: 'owner', id: 'owner-1' },
      { email: 'customer@hourdrive.com', password: 'Customer@123', name: 'Demo Customer', role: 'customer', id: 'customer-1' },
    ];

    const allAccounts = [...demoAccounts, ...users];
    const found = allAccounts.find(u => u.email === form.email && u.password === form.password);

    setTimeout(() => {
      if (found) {
        login(found);
        if (found.role === 'admin') navigate('/admin');
        else if (found.role === 'owner') navigate('/owner/dashboard');
        else navigate('/customer/dashboard');
      } else {
        setError('Invalid email or password. Try demo: admin@hourdrive.com / Admin@123');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050A14] flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[#00D4FF]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#6B6FFF]/8 to-transparent blur-3xl pointer-events-none" />

      {/* Left panel - branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative">
        <Link to="/" className="flex items-center gap-3 w-fit">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl font-['Outfit'] text-white">Hour<span className="gradient-text">Drive</span></span>
        </Link>

        <div className="max-w-md">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold font-['Outfit'] text-white mb-4"
          >
            Drive the experience<br />
            <span className="gradient-text">you deserve.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-base leading-relaxed"
          >
            Access thousands of premium vehicles on demand. Book by the hour, drive in style.
          </motion.p>

          {/* Car preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 rounded-2xl overflow-hidden border border-white/8 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80"
              alt="Premium cars on HourDrive"
              className="w-full object-cover"
              style={{ aspectRatio: '16/9' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-semibold font-['Outfit']">Mercedes-Benz G63 AMG</p>
              <p className="text-[#00D4FF] text-sm">From $180/hour</p>
            </div>
          </motion.div>
        </div>

        <p className="text-white/20 text-sm">© 2026 HourDrive. Premium Car Rental Platform.</p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-6 py-12 lg:px-12">
        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg font-['Outfit'] text-white">Hour<span className="gradient-text">Drive</span></span>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-['Outfit'] text-white mb-2">Welcome back</h1>
            <p className="text-white/50">Sign in to your HourDrive account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Demo hint */}
          <div className="bg-[#00D4FF]/5 border border-[#00D4FF]/15 rounded-xl p-4 mb-6">
            <p className="text-[#00D4FF] text-xs font-semibold mb-1">Demo Credentials</p>
            <p className="text-white/40 text-xs">Admin: admin@hourdrive.com / Admin@123</p>
            <p className="text-white/40 text-xs">Owner: owner@hourdrive.com / Owner@123</p>
            <p className="text-white/40 text-xs">Customer: customer@hourdrive.com / Customer@123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="form-label">Email or Phone</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="form-input pl-11"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="form-label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password"
                  className="form-input pl-11 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="w-4 h-4 accent-[#00D4FF] rounded"
                />
                <span className="text-white/50 text-sm">Remember me</span>
              </label>
              <Link to="#" className="text-[#00D4FF] text-sm hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center text-white/40 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#00D4FF] font-medium hover:underline">Create one free</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
