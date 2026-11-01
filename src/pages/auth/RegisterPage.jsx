import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    role: 'customer', agreeTerms: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(form.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!form.agreeTerms) {
      setError('Please accept the Terms and Conditions.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(form);
      if (result.success) {
        if (form.role === 'owner') navigate('/owner/dashboard');
        else navigate('/customer/dashboard');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050A14] flex relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[#6B6FFF]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#00D4FF]/6 to-transparent blur-3xl pointer-events-none" />

      {/* Left panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12">
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
            Join the premium<br />
            <span className="gradient-text">car community.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-base leading-relaxed mb-8"
          >
            Whether you want to rent or list your car — HourDrive is the platform for you.
          </motion.p>

          {/* Benefits */}
          {['Free to join — no subscription fees', 'Verified & insured vehicles only', 'Earn while your car sits idle', '24/7 customer support included'].map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 mb-3"
            >
              <CheckCircle className="w-5 h-5 text-[#00D4FF] flex-shrink-0" />
              <span className="text-white/60 text-sm">{b}</span>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 rounded-2xl overflow-hidden border border-white/8"
          >
            <img
              src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80"
              alt="List your vehicle on HourDrive"
              className="w-full object-cover"
              style={{ aspectRatio: '16/9' }}
            />
          </motion.div>
        </div>

        <p className="text-white/20 text-sm">© 2026 HourDrive. Premium Car Rental Platform.</p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-6 py-12 lg:px-12 overflow-y-auto">
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
          <div className="mb-7">
            <h1 className="text-3xl font-bold font-['Outfit'] text-white mb-2">Create account</h1>
            <p className="text-white/50">Join HourDrive — it's completely free</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Account type */}
          <div className="mb-5">
            <label className="form-label">Account Type</label>
            <div className="grid grid-cols-2 gap-3">
              {['customer', 'owner'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({ ...form, role: type })}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold capitalize transition-all duration-300 ${
                    form.role === type
                      ? 'border-[#00D4FF] bg-[#00D4FF]/10 text-[#00D4FF]'
                      : 'border-white/10 text-white/50 hover:border-white/20'
                  }`}
                >
                  {type === 'customer' ? '🚗 Customer' : '🔑 Car Owner'}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="form-label">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input id="reg-name" type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name" className="form-input pl-11" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="form-label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input id="reg-email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com" className="form-input pl-11" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-phone" className="form-label">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input id="reg-phone" type="tel" required value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+971 50 000 0000" className="form-input pl-11" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="form-label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input id="reg-password" type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters" className="form-input pl-11 pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? strengthColors[strength] : 'rgba(255,255,255,0.1)' }} />
                    ))}
                  </div>
                  <p className="text-xs mt-1" style={{ color: strengthColors[strength] || 'transparent' }}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="reg-confirm" className="form-label">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input id="reg-confirm" type={showConfirm ? 'text' : 'password'} required value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Repeat password" className="form-input pl-11 pr-12" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && (
                <p className={`text-xs mt-1 ${form.password === form.confirmPassword ? 'text-emerald-400' : 'text-red-400'}`}>
                  {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input id="terms-checkbox" type="checkbox" checked={form.agreeTerms}
                onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                className="w-4 h-4 accent-[#00D4FF] mt-1 flex-shrink-0" />
              <label htmlFor="terms-checkbox" className="text-white/50 text-sm cursor-pointer">
                I agree to the{' '}
                <Link to="#" className="text-[#00D4FF] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="#" className="text-[#00D4FF] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center text-white/40 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00D4FF] font-medium hover:underline">Sign in here</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
