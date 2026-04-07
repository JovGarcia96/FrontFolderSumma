import React, { useState, useRef, useEffect } from 'react';
import { 
  Search,
  Bell,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Cerrar menú cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4">
      <div className="flex items-center justify-between w-full">
        {/* Left Section - Solo título */}
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-900">Inicio</h1>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar archivos y carpetas..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
            />
          </div>
        </div>

        {/* Right Section - Actions and User */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">1</span>
            </span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-gray-600" />
            ) : (
              <Moon className="h-4 w-4 text-gray-600" />
            )}
          </button>

          {/* User Avatar with Dropdown Menu */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer group relative"
              title="Menú de usuario"
            >
              <User className="h-4 w-4 text-white" />
              <ChevronDown className="h-3 w-3 text-white absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Usuario</p>
                  <p className="text-xs text-gray-500">usuario@example.com</p>
                </div>

                {/* Menu Items */}
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    // Ir a configuración
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </button>

                {/* Logout Button */}
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    handleLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-gray-200 mt-2 pt-2"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;