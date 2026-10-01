import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FiLogOut, FiMenu, FiX, FiAward, FiHome } from 'react-icons/fi';
import { useState } from 'react';

/**
 * Navbar Component
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold
    ${isActive(path) 
      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
      : 'text-gray-700 hover:bg-gray-100'}
  `;

  if (!user) {
    return (
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <FiAward className="text-indigo-600" /> SAR System
            </Link>
            <div className="space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-semibold">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            <FiAward className="text-indigo-600" /> SAR System
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>

          {/* Desktop Menu */}
          <div className={`${menuOpen ? 'block absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md p-4 border-t' : 'hidden'} md:flex md:items-center md:space-x-2`}>
            {user.role === 'student' && (
              <>
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                  <FiHome size={18} /> Dashboard
                </Link>
                <Link to="/activities" className={navLinkClass('/activities')}>
                  Activities
                </Link>
                <Link to="/projects" className={navLinkClass('/projects')}>
                  Projects
                </Link>
                <Link to="/leaderboard" className={navLinkClass('/leaderboard')}>
                  Leaderboard
                </Link>
                <Link to="/profile" className={navLinkClass('/profile')}>
                  Profile
                </Link>
              </>
            )}
            {user.role === 'admin' && (
              <>
                <Link to="/admin" className={navLinkClass('/admin')}>
                  <FiHome size={18} /> Dashboard
                </Link>
                <Link to="/admin/approvals" className={navLinkClass('/admin/approvals')}>
                  Approvals
                </Link>
                <Link to="/admin/students" className={navLinkClass('/admin/students')}>
                  Students
                </Link>
              </>
            )}
            {user.role === 'faculty' && (
              <>
                <Link to="/faculty" className={navLinkClass('/faculty')}>
                  <FiHome size={18} /> Dashboard
                </Link>
                <Link to="/faculty/approvals" className={navLinkClass('/faculty/approvals')}>
                  Approvals
                </Link>
                <Link to="/faculty/students" className={navLinkClass('/faculty/students')}>
                  My Students
                </Link>
              </>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all font-semibold ml-4 border border-red-200"
            >
              <FiLogOut size={18} /> Logout
            </button>

            {/* User Info */}
            <div className="pl-4 border-l border-gray-200 ml-4 hidden md:block">
              <p className="text-sm text-gray-600">Logged in as</p>
              <p className="text-sm font-bold text-gray-800">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
