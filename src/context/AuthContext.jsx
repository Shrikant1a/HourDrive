import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hourdrive_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('hourdrive_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hourdrive_user');
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('hourdrive_users') || '[]');
    const existing = users.find(u => u.email === userData.email);
    if (existing) return { success: false, error: 'Email already registered.' };

    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      avatar: null,
    };
    users.push(newUser);
    localStorage.setItem('hourdrive_users', JSON.stringify(users));
    login(newUser);
    return { success: true };
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('hourdrive_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
