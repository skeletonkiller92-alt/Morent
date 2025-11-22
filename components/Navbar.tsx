import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, User, Heart, LogOut, MapPin, Car } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<'user' | 'notifications' | 'settings' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Temporary state to simulate authentication (localStorage for persistence across refreshes)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    // Listen for storage changes to update UI if login state changes
    const handleStorageChange = () => {
       setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: 'user' | 'notifications' | 'settings') => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setActiveDropdown(null);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200" ref={dropdownRef}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-brand-600 tracking-tighter">
              morent
            </Link>
          </div>

          {/* Desktop Search (Simplified for Turo-like feel) */}
          <div className="hidden md:flex items-center bg-gray-100 border border-transparent hover:border-gray-300 hover:bg-white rounded-full px-4 py-2.5 w-96 transition-all cursor-pointer group">
            <Search size={18} className="text-gray-500 group-hover:text-brand-600 mr-3 transition-colors" />
            <input 
              type="text" 
              placeholder="City, airport, or address" 
              className="w-full bg-transparent focus:outline-none text-sm text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Host CTA */}
            <Link to="/become-host" className="hidden lg:block text-sm font-bold text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors mr-2">
              Become a host
            </Link>

            {!isLoggedIn ? (
              // Guest View
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 font-bold hover:text-gray-900 px-3 py-2 text-sm">
                  Log in
                </Link>
                <Link to="/register" className="bg-brand-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-500/20">
                  Sign up
                </Link>
              </div>
            ) : (
              // Logged In View
              <>
                <Link to="/favorites" className="hidden md:flex p-2.5 text-gray-500 hover:bg-gray-100 hover:text-brand-600 rounded-full transition-colors">
                  <Heart size={20} />
                </Link>
                
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('notifications')}
                    className={`hidden md:flex p-2.5 text-gray-500 hover:bg-gray-100 hover:text-brand-600 rounded-full transition-colors relative ${activeDropdown === 'notifications' ? 'bg-gray-100 text-brand-600' : ''}`}
                  >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  
                  {activeDropdown === 'notifications' && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                      </div>
                      <div className="py-2">
                        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                          <p className="text-sm text-gray-800 font-semibold">Trip confirmed!</p>
                          <p className="text-xs text-gray-500 mt-1">Your trip to Baku starts tomorrow.</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                          <p className="text-sm text-gray-800 font-semibold">Complete your profile</p>
                          <p className="text-xs text-gray-500 mt-1">Add your driver's license to rent.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('settings')}
                    className={`hidden md:flex p-2.5 text-gray-500 hover:bg-gray-100 hover:text-brand-600 rounded-full transition-colors ${activeDropdown === 'settings' ? 'bg-gray-100 text-brand-600' : ''}`}
                  >
                    <Settings size={20} />
                  </button>
                  
                  {activeDropdown === 'settings' && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">Settings</h3>
                      </div>
                      <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 font-medium">Account</Link>
                      <div className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 font-medium cursor-pointer">Login & Security</div>
                      <div className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 font-medium cursor-pointer">Currency (AZN)</div>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('user')}
                    className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-transparent hover:border-brand-200 transition-all ml-2"
                  >
                    <img src="https://picsum.photos/100/100?random=999" alt="User" className="h-full w-full object-cover" />
                  </button>

                  {activeDropdown === 'user' && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-4 border-b border-gray-50 flex items-center gap-3">
                        <img src="https://picsum.photos/100/100?random=999" alt="User" className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100" />
                        <div>
                          <p className="text-sm font-bold text-gray-900">Murad Huseynov</p>
                          <p className="text-xs text-gray-500 font-medium">murad@example.com</p>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 font-medium">
                          <User size={18} /> Profile
                        </Link>
                        <Link to="/become-host" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 font-medium">
                          <Car size={18} /> List your car
                        </Link>
                        <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 font-medium cursor-pointer">
                          <MapPin size={18} /> Trips
                        </div>
                        <Link to="/favorites" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 font-medium">
                          <Heart size={18} /> Favorites
                        </Link>
                      </div>
                      <div className="border-t border-gray-50 py-2">
                        <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium">
                          <LogOut size={18} /> Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};