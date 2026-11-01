import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#030811] border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#00D4FF]/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl font-['Outfit'] text-white">Hour<span className="gradient-text">Drive</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              The premium hourly car rental and peer-to-peer car-sharing platform. Discover extraordinary vehicles and drive on your terms.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#00D4FF] mb-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>India 🇮🇳 • Mumbai, Delhi NCR, Bengaluru & Pan-India</span>
            </div>
            <p className="text-white/40 text-[11px] mb-4">
              Available across 12+ Indian cities with instant UPI, DigiLocker KYC & Fastag
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Twitter/X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#00D4FF]/10 border border-white/8 hover:border-[#00D4FF]/30 flex items-center justify-center text-white/40 hover:text-[#00D4FF] transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Explore Cars', 'How It Works', 'Become an Owner', 'About Us', 'Pricing'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-white/45 hover:text-[#00D4FF] text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-widest uppercase">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Contact Us', 'Live Chat', 'Booking Issues', 'Insurance Info', 'Safety & Trust', 'Cancellation Policy'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-white/45 hover:text-[#00D4FF] text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-widest uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Customer Support</p>
                  <a href="mailto:support@hourdrive.com" className="text-white/60 hover:text-[#00D4FF] text-sm transition-colors">support@hourdrive.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#6B6FFF] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Owner Support</p>
                  <a href="mailto:owners@hourdrive.com" className="text-white/60 hover:text-[#6B6FFF] text-sm transition-colors">owners@hourdrive.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/30 text-xs mb-0.5">24/7 India Helpline</p>
                  <a href="tel:18002094687" className="text-white/60 hover:text-[#00D4FF] text-sm transition-colors">1800-209-HOUR (4687)</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © {year} HourDrive. All rights reserved. Built with passion for extraordinary drives.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <Link key={link} to="#" className="text-white/25 hover:text-white/60 text-xs transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
