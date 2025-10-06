import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  TrendingUp, 
  Building, 
  Activity,
  Home,
  ChevronLeft
} from 'lucide-react';

const GirosComerciales = () => {
  const navigate = useNavigate();

  const [giros, setGiros] = useState([
    {
      id: 1,
      nombreGiro: "Tecnología",
      descripcion: "Empresas dedicadas al desarrollo de software, hardware y servicios tecnológicos",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:14",
    },
    {
      id: 2,
      nombreGiro: "Construcción",
      descripcion: "Empresas del sector construcción, infraestructura y desarrollo inmobiliario",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:14",
    },
    {
      id: 3,
      nombreGiro: "Retail",
      descripcion: "Comercio al por menor, tiendas departamentales y centros comerciales",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:14",
    },
    {
      id: 4,
      nombreGiro: "Salud",
      descripcion: "Instituciones de salud, hospitales, clínicas y servicios médicos",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:14",
    },
    {
      id: 5,
      nombreGiro: "Inmobiliarias",
      descripcion: "Empresas dedicadas a la compra, venta y administración de bienes raíces",
      activo: false,
      fechaCreacion: "28/07/2025, 17:20:37",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGiro, setEditingGiro] = useState(null);
  const [newGiro, setNewGiro] = useState({
    nombreGiro: "",
    descripcion: "",
    activo: true,
  });

  const filteredGiros = giros.filter(
    (giro) =>
      giro.nombreGiro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      giro.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const activeGiros = giros.filter((giro) => giro.activo).length;
  const inactiveGiros = giros.filter((giro) => !giro.activo).length;
  const activityRate = giros.length > 0 ? Math.round((activeGiros / giros.length) * 100) : 0;

  const handleCreateGiro = () => {
    const giro = {
      id: Math.max(...giros.map((g) => g.id)) + 1,
      ...newGiro,
      fechaCreacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
    };
    setGiros([...giros, giro]);
    setNewGiro({ nombreGiro: "", descripcion: "", activo: true });
    setIsCreateDialogOpen(false);
  };

  const handleEditGiro = () => {
    if (editingGiro) {
      setGiros(giros.map((giro) => (giro.id === editingGiro.id ? editingGiro : giro)));
      setEditingGiro(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteGiro = (id) => {
    setGiros(giros.filter((giro) => giro.id !== id));
  };

  const handleToggleStatus = (id) => {
    setGiros(giros.map((giro) => (giro.id === id ? { ...giro, activo: !giro.activo } : giro)));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Botón Volver al Inicio */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-3">
          <button 
            onClick={() => handleNavigation('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al Inicio
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-3">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-xl p-6 text-white shadow-xl mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Briefcase className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Gestión de Giros Comerciales</h1>
                  <p className="text-blue-200 mt-1">
                    Sistema integral para la administración y control de sectores económicos
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-white text-blue-900 hover:bg-blue-50 font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Registrar Nuevo Giro
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
              <CardHeader className="pb-1 pt-2 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-3.5 w-3.5 text-gray-600" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900">
                    Total de Giros
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  Sectores registrados
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3">
                <div className="text-2xl font-bold text-gray-900">{giros.length}</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
              <CardHeader className="pb-1 pt-2 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                    <Activity className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900">
                    Giros Activos
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  Operando normalmente
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3">
                <div className="text-2xl font-bold text-green-700">{activeGiros}</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
              <CardHeader className="pb-1 pt-2 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                    <Building className="h-3.5 w-3.5 text-red-600" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900">
                    Giros Inactivos
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  Suspendidos temporalmente
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3">
                <div className="text-2xl font-bold text-red-700">{inactiveGiros}</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
              <CardHeader className="pb-1 pt-2 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900">
                    Tasa de Actividad
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  Giros operativos
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3">
                <div className="text-2xl font-bold text-blue-700">{activityRate}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="mb-3 border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-1 pt-2 px-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold text-gray-900">
                      Registro de Giros Comerciales
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      Listado completo de sectores económicos registrados en el sistema
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Buscar giros..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-2 px-3">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">ID</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Giro Comercial</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Código</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Estado Operativo</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Fecha de Registro</th>
                      <th className="text-center py-2 px-2 text-xs font-semibold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGiros.map((giro) => (
                      <tr key={giro.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-2 px-2">
                          <span className="text-xs font-medium text-gray-600">
                            #{giro.id.toString().padStart(3, "0")}
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                              <Briefcase className="h-3 w-3 text-gray-600" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-900">{giro.nombreGiro}</div>
                              <div className="text-xs text-gray-500">{giro.descripcion}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <span className="text-xs text-gray-600">
                            GC{giro.id.toString().padStart(3, "0")}
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              giro.activo 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {giro.activo ? "Operativo" : "Inactivo"}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={giro.activo}
                                onChange={() => handleToggleStatus(giro.id)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <span className="text-xs text-gray-600 font-mono">{giro.fechaCreacion}</span>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setEditingGiro(giro);
                                setIsEditDialogOpen(true);
                              }}
                              className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`¿Está seguro que desea eliminar el giro comercial "${giro.nombreGiro}"?`)) {
                                  handleDeleteGiro(giro.id);
                                }
                              }}
                              className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-3">
          <div className="text-xs text-gray-500">
            © 2025 FinDrive. Todos los derechos reservados.
          </div>
          <div className="text-xs text-gray-500">
            Sistema de gestión documental financiera
          </div>
        </footer>
      </div>

      {/* Create Dialog */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Nuevo Giro Comercial</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Complete la información del nuevo giro comercial</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Giro</label>
                <input
                  type="text"
                  value={newGiro.nombreGiro}
                  onChange={(e) => setNewGiro({ ...newGiro, nombreGiro: e.target.value })}
                  placeholder="Ej: Tecnología, Construcción..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={newGiro.descripcion}
                  onChange={(e) => setNewGiro({ ...newGiro, descripcion: e.target.value })}
                  placeholder="Descripción detallada del giro comercial..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newGiro.activo}
                    onChange={(e) => setNewGiro({ ...newGiro, activo: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm text-gray-700">Estado Operativo</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateGiro}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Registrar Giro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && editingGiro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Edit className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Editar Giro Comercial</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Modifique la información del giro comercial</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Giro</label>
                <input
                  type="text"
                  value={editingGiro.nombreGiro}
                  onChange={(e) => setEditingGiro({ ...editingGiro, nombreGiro: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={editingGiro.descripcion}
                  onChange={(e) => setEditingGiro({ ...editingGiro, descripcion: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingGiro.activo}
                    onChange={(e) => setEditingGiro({ ...editingGiro, activo: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm text-gray-700">Estado Operativo</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditGiro}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Actualizar Giro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GirosComerciales;