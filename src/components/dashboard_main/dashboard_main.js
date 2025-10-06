import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import DashboardCard from '../dashboard-card/dashboard-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  ChevronRight,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  Settings,
  BarChart3,
  Shield,
  FolderOpen,
  CreditCard,
  Smartphone
} from 'lucide-react';

const DashboardMain = () => {
  const navigate = useNavigate();

  // Función para manejar navegación
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Datos de las tarjetas principales
  const mainStats = [
    {
      title: "Banca Primer Piso",
      subtitle: "Operaciones tradicionales",
      icon: FolderOpen,
      stats: [
        { label: "Documentos activos", value: "24" },
        { label: "Pendientes de revisión", badge: { value: "3", color: "orange" } }
      ],
      buttonText: "Acceder al módulo",
      path: "/banca-primer-piso"
    },
    {
      title: "Segundo Piso",
      subtitle: "Banca de inversión",
      icon: Smartphone,
      stats: [
        { label: "Proyectos activos", value: "12" },
        { label: "En revisión", badge: { value: "5", color: "blue" } }
      ],
      buttonText: "Acceder al módulo",
      path: "/banca_segundopiso"
    },
    {
      title: "Configuración",
      subtitle: "Ajustes del sistema",
      icon: Settings,
      stats: [
        { label: "Configuraciones", value: "8" },
        { label: "Actualizaciones", badge: { value: "2", color: "green" } }
      ],
      buttonText: "Configurar sistema",
      path: "/configuraciones"
    }
  ];

  // Datos de las tarjetas secundarias
  const secondaryStats = [
    {
      title: "Control de Permisos",
      subtitle: "Seguridad y acceso",
      icon: Shield,
      stats: [
        { label: "Usuarios activos", value: "156" },
        { label: "Roles configurados", badge: { value: "12", color: "blue" } }
      ],
      buttonText: "Gestionar permisos",
      path: "/control-permisos"
    },
    {
      title: "Trámites Notariales",
      subtitle: "Documentos legales",
      icon: FileText,
      stats: [
        { label: "En proceso", badge: { value: "7", color: "orange" } },
        { label: "Completados", value: "23" }
      ],
      buttonText: "Ver trámites",
      path: "/tramites_notariales"
    },
    {
      title: "Panel de Control",
      subtitle: "Estadísticas generales",
      icon: BarChart3,
      stats: [
        { label: "Total documentos", value: "1247" },
        { label: "Actividad hoy", value: "89" }
      ],
      buttonText: "Ver estadísticas",
      path: "/panel-control"
    }
  ];

  // Datos de actividad reciente
  const recentActivity = [
    {
      id: 1,
      type: "document",
      title: "Documento subido",
      description: "Contrato de préstamo - Banca Primer Piso",
      time: "Hace 5 min",
      icon: FileText
    },
    {
      id: 2,
      type: "permission",
      title: "Permisos actualizados",
      description: "Usuario Sarah Wilson - Acceso de editor",
      time: "Hace 15 min",
      icon: CheckCircle
    },
    {
      id: 3,
      type: "project",
      title: "Proyecto completado",
      description: "Análisis de inversión Q4 - Segundo Piso",
      time: "Hace 1 hora",
      icon: TrendingUp
    }
  ];

  const renderBadge = (badge) => {
    const colorClasses = {
      orange: "bg-orange-100 text-orange-800",
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800"
    };

    return (
      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[badge.color]}`}>
        {badge.value}
      </span>
    );
  };

  const renderStatItem = (stat) => {
    return (
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600">{stat.label}:</span>
        <div className="flex items-center gap-1">
          {stat.badge ? renderBadge(stat.badge) : (
            <span className="font-semibold text-gray-900">{stat.value}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-60">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-3">
          {/* Welcome Section */}
          <div className="mb-4">
            <h1 className="text-lg font-bold text-gray-900 mb-1">
              Bienvenido de vuelta, Fabiola Nené
            </h1>
            <p className="text-xs text-gray-600">
              Gestiona tus documentos financieros y procesos bancarios de manera eficiente.
            </p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {mainStats.map((item, index) => (
              <Card key={index} className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                <CardHeader className="pb-1 pt-2 px-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-gray-600" />
                    </div>
                    <CardTitle className="text-xs font-semibold text-gray-900">
                      {item.title}
                    </CardTitle>
                    <ChevronRight className="h-3 w-3 text-gray-400 ml-auto" />
                  </div>
                  <CardDescription className="text-xs text-gray-500">
                    {item.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-2 px-3">
                  <div className="space-y-1 mb-2">
                    {item.stats.map((stat, statIndex) => (
                      <div key={statIndex}>
                        {renderStatItem(stat)}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleNavigation(item.path)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium transition-colors"
                  >
                    {item.buttonText}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {secondaryStats.map((item, index) => (
              <Card key={index} className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                <CardHeader className="pb-1 pt-2 px-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-gray-600" />
                    </div>
                    <CardTitle className="text-xs font-semibold text-gray-900">
                      {item.title}
                    </CardTitle>
                    <ChevronRight className="h-3 w-3 text-gray-400 ml-auto" />
                  </div>
                  <CardDescription className="text-xs text-gray-500">
                    {item.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-2 px-3">
                  <div className="space-y-1 mb-2">
                    {item.stats.map((stat, statIndex) => (
                      <div key={statIndex}>
                        {renderStatItem(stat)}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleNavigation(item.path)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium transition-colors"
                  >
                    {item.buttonText}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="mb-3 border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-1 pt-2 px-3">
              <CardTitle className="text-sm font-semibold text-gray-900">
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-2 px-3">
              <div className="space-y-2">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors bg-white shadow-sm"
                  >
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <activity.icon className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
                
                <div className="mt-2 p-2 border border-gray-200 rounded bg-gray-50 shadow-sm">
                  <p className="text-xs text-gray-500 text-center">No hay más actividad reciente para mostrar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer - ALINEADO CON SIDEBAR */}
        <footer className="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-3">
          <div className="text-xs text-gray-500">
            © 2025 FinDrive. Todos los derechos reservados.
          </div>
          <div className="text-xs text-gray-500">
            Sistema de gestión documental financiera
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardMain;