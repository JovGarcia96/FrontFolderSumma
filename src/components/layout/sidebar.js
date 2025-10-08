import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  FolderOpen,
  Share2,
  Clock,
  CreditCard,
  TrendingUp,
  Settings,
  Shield,
  FileText,
  BarChart3,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Briefcase,
  Smartphone,
  Globe
} from 'lucide-react';
import { a } from 'framer-motion/client';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Inicio', path: '/dashboard', active: location.pathname === '/dashboard' },
    { icon: FolderOpen, label: 'Mis Archivos', path: '/mis-archivos' },
    { icon: Share2, label: 'Compartidos', path: '/compartidos' },
    { icon: Clock, label: 'Recientes', path: '/recientes' }
  ];

  const moduleItems = [
    { icon: CreditCard, label: 'Banca Primer Piso', path: '/banca_primerpiso',active: location.pathname === '/banca_primerpiso'},
    { icon: Smartphone, label: 'Banca Segundo Piso', path: '/banca_segundopiso', active: location.pathname === '/banca_segundopiso' },
    { icon: Settings, label: 'Configuraciones', path: '/configuraciones' },
    { icon: Shield, label: 'Control de Permisos', path: '/control-permisos', active: location.pathname === '/control-permisos' },
    { icon: FileText, label: 'Trámites Notariales', path: '/tramites_notariales', active: location.pathname === '/tramites_notariales' },
    { icon: BarChart3, label: 'Panel de Control', path: '/paneldecontrol', active: location.pathname === '/paneldecontrol' },
    { icon: Landmark, label: 'Banco', path: '/bank', active: location.pathname === '/bank' },
    { icon: Briefcase, label: 'Giros Comerciales', path: '/giroscomerciales', active: location.pathname === '/giroscomerciales' },
    { icon: Globe, label: 'Dominios', path: '/dominios', active: location.pathname === '/dominios' },
    { icon: Bell, label: 'Enviar Notificaciones', path: '/notificaciones',active: location.pathname === '/notificaciones' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-screen`}>
      {/* Logo Section */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img 
              src="/assets/logos/logo.png" 
              alt="FinDrive Logo" 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hidden">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl text-gray-900">FinDrive</span>
          </div>
        )}
        
        {isCollapsed && (
          <div className="flex items-center justify-center w-full">
            <img 
              src="/assets/logos/logo.png" 
              alt="FinDrive Logo" 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hidden">
              <span className="text-white font-bold text-sm">F</span>
            </div>
          </div>
        )}

        {/* Flecha para colapsar/expandir */}
        <button 
          onClick={toggleSidebar}
          className="p-1 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600 hover:text-blue-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600 hover:text-blue-600" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4">
        {/* Main Menu */}
        <div className="space-y-1 mb-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
              {/* Tooltip para modo colapsado */}
              {isCollapsed && (
                <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modules Section */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              MÓDULOS
            </h3>
          )}
          <div className="space-y-1">
            {moduleItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
                {/* Tooltip para modo colapsado */}
                {isCollapsed && (
                  <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="h-12 px-4 border-t border-gray-200 flex items-center hover:bg-blue-50 transition-colors duration-200">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">FN</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Fabiola Nené</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">FN</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
  