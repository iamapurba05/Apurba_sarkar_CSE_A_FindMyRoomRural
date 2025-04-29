
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Upload, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center justify-center ${isActive('/search') ? 'text-primary' : 'text-gray-500'}`}>
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link to="/upload" className={`flex flex-col items-center justify-center ${isActive('/upload') ? 'text-primary' : 'text-gray-500'}`}>
          <Upload size={24} />
          <span className="text-xs mt-1">Upload</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center justify-center ${isActive('/profile') ? 'text-primary' : 'text-gray-500'}`}>
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
