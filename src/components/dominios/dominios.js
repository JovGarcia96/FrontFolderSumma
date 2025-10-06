import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Globe, 
  TrendingUp, 
  Users, 
  Activity, 
  BarChart3,
  ChevronLeft
} from 'lucide-react';

const Dominios = () => {
  const navigate = useNavigate();

  const [dominios, setDominios] = useState([
    {
      id: 1,
      nombreDominio: "orion.com.mx",
      descripcion: "Dominio institucional",
      activo: true,
      fechaCreacion: "24/07/2025, 12:01:53",
      fechaModificacion: "24/07/2025, 12:01:53",
    },
    {
      id: 2,
      nombreDominio: "easytransfer.com",
      descripcion: "Dominio institucional",
      activo: true,
      fechaCreacion: "24/07/2025, 12:01:53",
      fechaModificacion: "24/07/2025, 12:01:53",
    },
    {
      id: 3,
      nombreDominio: "summa.mx",
      descripcion: "Dominio institucional",
      activo: true,
      fechaCreacion: "24/07/2025, 12:01:53",
      fechaModificacion: "24/07/2025, 12:01:53",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDominio, setEditingDominio] = useState(null);
  const [formData, setFormData] = useState({
    nombreDominio: "",
    descripcion: "",
  });

  const handleCreate = () => {
    const newDominio = {
      id: Math.max(...dominios.map((d) => d.id)) + 1,
      nombreDominio: formData.nombreDominio,
      descripcion: formData.descripcion,
      activo: true,
      fechaCreacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
      fechaModificacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
    };
    setDominios([...dominios, newDominio]);
    setFormData({ nombreDominio: "", descripcion: "" });
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (dominio) => {
    setEditingDominio(dominio);
    setFormData({
      nombreDominio: dominio.nombreDominio,
      descripcion: dominio.descripcion,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editingDominio) {
      setDominios(
        dominios.map((dom) =>
          dom.id === editingDominio.id
            ? { 
                ...dom, 
                ...formData, 
                fechaModificacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false })
              }
            : dom,
        ),
      );
      setIsEditDialogOpen(false);
      setEditingDominio(null);
      setFormData({ nombreDominio: "", descripcion: "" });
    }
  };

  const handleDelete = (id) => {
    setDominios(dominios.filter((dom) => dom.id !== id));
  };

  const toggleActivo = (id) => {
    setDominios(
      dominios.map((dom) =>
        dom.id === id
          ? {
              ...dom,
              activo: !dom.activo,
              fechaModificacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
            }
          : dom,
      ),
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const totalDominios = dominios.length;
  const dominiosActivos = dominios.filter((dom) => dom.activo).length;
  const dominiosInactivos = dominios.filter((dom) => !dom.activo).length;
  const tasaActividad = totalDominios > 0 ? Math.round((dominiosActivos / totalDominios) * 100) : 0;

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
                  <Globe className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Gestión de Dominios</h1>
                  <p className="text-blue-200 mt-1">
                    Sistema integral para la administración y control de dominios web
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-white text-blue-900 hover:bg-blue-50 font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Registrar Nuevo Dominio
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm border-l-4 border-l-blue-500">
              <CardHeader className="pb-1 pt-2 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <Globe className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900">
                    Total de Dominios
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  Dominios registrados
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3">
                <div className="text-2xl font-bold text-blue-600">{totalDominios}</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm border-l-4 border-l-green-500">
              <CardHeader className="pb-1 pt-2 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                    <Activity className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900">
                    Dominios Activos
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  Operando normalmente
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3">
                <div className="text-2xl font-bold text-green-600">{dominiosActivos}</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm border-l-4 border-l-red-500">
              <CardHeader className="pb-1 pt-2 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                    <Users className="h-3.5 w-3.5 text-red-600" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900">
                    Dominios Inactivos
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  Suspendidos temporalmente
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3">
                <div className="text-2xl font-bold text-red-600">{dominiosInactivos}</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm border-l-4 border-l-purple-500">
              <CardHeader className="pb-1 pt-2 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-3.5 w-3.5 text-purple-600" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900">
                    Tasa de Actividad
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  Dominios operativos
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3">
                <div className="text-2xl font-bold text-purple-600">{tasaActividad}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="mb-3 border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-1 pt-2 px-3 border-b bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-900">
                    Registro de Dominios
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    Listado completo de dominios registrados en el sistema
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-2 px-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 border-b">
                    <tr>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-gray-700">ID</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-gray-700">Nombre Dominio</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-gray-700">Descripción</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-gray-700">Estado</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-gray-700">Fecha Creación</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-gray-700">Fecha Modificación</th>
                      <th className="text-center py-2 px-4 text-xs font-semibold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dominios.map((dominio, index) => (
                      <tr
                        key={dominio.id}
                        className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                        }`}
                      >
                        <td className="py-2 px-4">
                          <span className="text-xs font-medium text-gray-600 font-mono">
                            #{dominio.id.toString().padStart(3, "0")}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Globe className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-900">{dominio.nombreDominio}</div>
                              <div className="text-xs text-gray-500">Dominio web</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-4">
                          <span className="text-xs text-gray-600">{dominio.descripcion}</span>
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              dominio.activo 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {dominio.activo ? "Activo" : "Inactivo"}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={dominio.activo}
                                onChange={() => toggleActivo(dominio.id)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </td>
                        <td className="py-2 px-4">
                          <span className="text-xs text-gray-600 font-mono">{dominio.fechaCreacion}</span>
                        </td>
                        <td className="py-2 px-4">
                          <span className="text-xs text-gray-600 font-mono">{dominio.fechaModificacion}</span>
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleEdit(dominio)}
                              className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`¿Está seguro que desea eliminar el dominio "${dominio.nombreDominio}"?`)) {
                                  handleDelete(dominio.id);
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
              <Globe className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Registrar Nuevo Dominio</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Complete la información del nuevo dominio</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Dominio</label>
                <input
                  type="text"
                  value={formData.nombreDominio}
                  onChange={(e) => setFormData({ ...formData, nombreDominio: e.target.value })}
                  placeholder="Ej: empresa.com.mx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Ej: Dominio institucional"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
                onClick={handleCreate}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Registrar Dominio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && editingDominio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Edit className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Editar Dominio</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Modifique la información del dominio</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Dominio</label>
                <input
                  type="text"
                  value={formData.nombreDominio}
                  onChange={(e) => setFormData({ ...formData, nombreDominio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
                onClick={handleUpdate}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Actualizar Dominio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dominios;
