import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Shield,
  Users,
  UserCheck,
  Settings,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Eye,
  BookOpen,
  Download,
  ChevronLeft
} from 'lucide-react';

const ControlPermisos = () => {
const navigate = useNavigate();

  // Mock data for Permisos Rol
  const [permisosRol, setPermisosRol] = useState([
    {
      id: 1,
      idRol: 1,
      nombreRol: "Administrador",
      idMenu: 1,
      nombreMenu: "Dashboard",
      puedeVer: true,
      puedeLeer: true,
      puedeCrear: true,
      puedeModificar: true,
      puedeEliminar: true,
      puedeExportar: true,
      fechaAsignacion: "2025-07-24 12:02:14",
      fechaModificacion: "2025-07-24 12:02:14",
    },
    {
      id: 2,
      idRol: 2,
      nombreRol: "Usuario",
      idMenu: 2,
      nombreMenu: "Documentos",
      puedeVer: true,
      puedeLeer: true,
      puedeCrear: false,
      puedeModificar: false,
      puedeEliminar: false,
      puedeExportar: false,
      fechaAsignacion: "2025-07-24 12:02:14",
      fechaModificacion: "2025-07-24 12:02:14",
    },
    {
      id: 3,
      idRol: 3,
      nombreRol: "Supervisor",
      idMenu: 3,
      nombreMenu: "Reportes",
      puedeVer: true,
      puedeLeer: true,
      puedeCrear: true,
      puedeModificar: true,
      puedeEliminar: false,
      puedeExportar: true,
      fechaAsignacion: "2025-07-24 12:02:14",
      fechaModificacion: "2025-07-24 12:02:14",
    },
  ]);

  // Mock data for Permisos Usuario
  const [permisosUsuario, setPermisosUsuario] = useState([
    {
      id: 1,
      idUsuario: 1,
      nombreUsuario: "Juan Pérez",
      idMenu: 1,
      nombreMenu: "Dashboard",
      idCarpeta: 1,
      nombreCarpeta: "Documentos Generales",
      idEmpresa: 1,
      nombreEmpresa: "Bansi S.A. de C.V.",
      puedeVer: true,
      puedeLeer: true,
      puedeCrear: true,
      puedeModificar: false,
      puedeEliminar: false,
      puedeExportar: false,
      fechaAsignacion: "2025-07-24 12:02:14",
      fechaModificacion: "2025-07-24 12:02:14",
    },
    {
      id: 2,
      idUsuario: 2,
      nombreUsuario: "María González",
      idMenu: 2,
      nombreMenu: "Documentos",
      idCarpeta: 2,
      nombreCarpeta: "Contratos",
      idEmpresa: 2,
      nombreEmpresa: "EasyTransfer S.A.P.I",
      puedeVer: true,
      puedeLeer: true,
      puedeCrear: false,
      puedeModificar: false,
      puedeEliminar: false,
      puedeExportar: true,
      fechaAsignacion: "2025-07-24 12:02:14",
      fechaModificacion: "2025-07-24 12:02:14",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState("roles");
  const [formData, setFormData] = useState({
    nombreRol: "",
    nombreMenu: "",
    puedeVer: false,
    puedeLeer: false,
    puedeCrear: false,
    puedeModificar: false,
    puedeEliminar: false,
    puedeExportar: false
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nombreRol: item.nombreRol || "",
      nombreMenu: item.nombreMenu || "",
      puedeVer: item.puedeVer || false,
      puedeLeer: item.puedeLeer || false,
      puedeCrear: item.puedeCrear || false,
      puedeModificar: item.puedeModificar || false,
      puedeEliminar: item.puedeEliminar || false,
      puedeExportar: item.puedeExportar || false
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`¿Está seguro que desea eliminar este permiso?`)) {
      if (activeTab === "roles") {
        setPermisosRol(permisosRol.filter((p) => p.id !== item.id));
      } else {
        setPermisosUsuario(permisosUsuario.filter((p) => p.id !== item.id));
      }
    }
  };

  const handleCreate = () => {
    const newPermiso = {
      id: Math.max(...permisosRol.map(p => p.id)) + 1,
      idRol: Math.floor(Math.random() * 1000),
      nombreRol: formData.nombreRol,
      idMenu: Math.floor(Math.random() * 100),
      nombreMenu: formData.nombreMenu,
      puedeVer: formData.puedeVer,
      puedeLeer: formData.puedeLeer,
      puedeCrear: formData.puedeCrear,
      puedeModificar: formData.puedeModificar,
      puedeEliminar: formData.puedeEliminar,
      puedeExportar: formData.puedeExportar,
      fechaAsignacion: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
      fechaModificacion: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour12: false })
    };

    setPermisosRol([...permisosRol, newPermiso]);
    setFormData({
      nombreRol: "",
      nombreMenu: "",
      puedeVer: false,
      puedeLeer: false,
      puedeCrear: false,
      puedeModificar: false,
      puedeEliminar: false,
      puedeExportar: false
    });
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = () => {
    if (editingItem) {
      setPermisosRol(
        permisosRol.map((p) =>
          p.id === editingItem.id
            ? { 
                ...p, 
                ...formData, 
                fechaModificacion: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour12: false })
              }
            : p
        )
      );
      setIsEditDialogOpen(false);
      setEditingItem(null);
      setFormData({
        nombreRol: "",
        nombreMenu: "",
        puedeVer: false,
        puedeLeer: false,
        puedeCrear: false,
        puedeModificar: false,
        puedeEliminar: false,
        puedeExportar: false
      });
    }
  };

  const PermissionBadge = ({ permission, label, icon: Icon, description }) => (
    <div className="group relative">
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium gap-1 ${
          permission 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-gray-100 text-gray-500 border border-gray-200"
        }`}
      >
        <Icon className="h-3 w-3" />
        <span>{permission ? "✓" : "✗"}</span>
        <span>{label}</span>
      </span>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        {description}
      </div>
    </div>
  );

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
        <main className="flex-1 overflow-auto p-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-xl p-6 text-white shadow-xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Control de Permisos</h1>
                  <p className="text-blue-200 mt-1">
                    Sistema integral para la gestión y administración de permisos por roles y usuarios
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-white text-blue-900 hover:bg-blue-50 font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Asignar Nuevo Permiso
              </button>
            </div>
          </div>

          {/* Statistics Cards - NUEVO DISEÑO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total de Roles */}
            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total de Roles</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
                    <p className="text-xs text-gray-500">Roles configurados</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usuarios Activos */}
            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Usuarios Activos</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">2</p>
                    <p className="text-xs text-gray-500">Con permisos asignados</p>
                  </div>
                  <div className="flex-shrink-0">
                    <UserCheck className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Permisos Totales */}
            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Permisos Totales</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">5</p>
                    <p className="text-xs text-gray-500">Configuraciones activas</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nivel de Seguridad */}
            <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nivel de Seguridad</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">Alto</p>
                    <p className="text-xs text-gray-500">Sistema protegido</p>
                  </div>
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3 pt-4 px-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Gestión de Permisos</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Administra permisos por roles y usuarios específicos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                  onClick={() => setActiveTab("roles")}
                  className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    activeTab === "roles"
                      ? "bg-white border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Permisos por Rol</span>
                </button>
                <button
                  onClick={() => setActiveTab("usuarios")}
                  className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    activeTab === "usuarios"
                      ? "bg-white border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Permisos por Usuario</span>
                </button>
              </div>

              {/* Tab Content - Roles */}
              {activeTab === "roles" && (
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rol</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Menú</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Permisos</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fecha Asignación</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {permisosRol.map((permiso, index) => (
                          <tr
                            key={permiso.id}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                            }`}
                          >
                            <td className="py-3 px-4">
                              <span className="text-sm font-medium text-gray-600 font-mono">
                                #{permiso.id.toString().padStart(3, "0")}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Users className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-800">{permiso.nombreRol}</div>
                                  <div className="text-xs text-gray-500">ID: {permiso.idRol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                {permiso.nombreMenu}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                <PermissionBadge
                                  permission={permiso.puedeVer}
                                  label="Ver"
                                  icon={Eye}
                                  description="Permite visualizar el contenido del módulo"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeLeer}
                                  label="Leer"
                                  icon={BookOpen}
                                  description="Permite acceder y leer información detallada"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeCrear}
                                  label="Crear"
                                  icon={Plus}
                                  description="Permite crear nuevos registros o elementos"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeModificar}
                                  label="Modificar"
                                  icon={Edit}
                                  description="Permite editar y actualizar información existente"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeEliminar}
                                  label="Eliminar"
                                  icon={Trash2}
                                  description="Permite eliminar registros del sistema"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeExportar}
                                  label="Exportar"
                                  icon={Download}
                                  description="Permite exportar datos en diferentes formatos"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-xs text-gray-600 font-mono">{permiso.fechaAsignacion}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => handleEdit(permiso)}
                                  className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(permiso)}
                                  className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab Content - Usuarios */}
              {activeTab === "usuarios" && (
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Usuario</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Menú</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Empresa</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Permisos</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fecha Asignación</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {permisosUsuario.map((permiso, index) => (
                          <tr
                            key={permiso.id}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                            }`}
                          >
                            <td className="py-3 px-4">
                              <span className="text-sm font-medium text-gray-600 font-mono">
                                #{permiso.id.toString().padStart(3, "0")}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                  <UserCheck className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-800">{permiso.nombreUsuario}</div>
                                  <div className="text-xs text-gray-500">ID: {permiso.idUsuario}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                {permiso.nombreMenu}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm">
                                <div className="font-medium text-gray-800">{permiso.nombreEmpresa}</div>
                                <div className="text-gray-500 text-xs">{permiso.nombreCarpeta}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                <PermissionBadge
                                  permission={permiso.puedeVer}
                                  label="Ver"
                                  icon={Eye}
                                  description="Permite visualizar el contenido del módulo"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeLeer}
                                  label="Leer"
                                  icon={BookOpen}
                                  description="Permite acceder y leer información detallada"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeCrear}
                                  label="Crear"
                                  icon={Plus}
                                  description="Permite crear nuevos registros o elementos"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeModificar}
                                  label="Modificar"
                                  icon={Edit}
                                  description="Permite editar y actualizar información existente"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeEliminar}
                                  label="Eliminar"
                                  icon={Trash2}
                                  description="Permite eliminar registros del sistema"
                                />
                                <PermissionBadge
                                  permission={permiso.puedeExportar}
                                  label="Exportar"
                                  icon={Download}
                                  description="Permite exportar datos en diferentes formatos"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-xs text-gray-600 font-mono">{permiso.fechaAsignacion}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => handleEdit(permiso)}
                                  className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(permiso)}
                                  className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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
              <Shield className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Asignar Nuevo Permiso</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Complete la información del nuevo permiso</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Rol</label>
                <input
                  type="text"
                  value={formData.nombreRol}
                  onChange={(e) => setFormData({ ...formData, nombreRol: e.target.value })}
                  placeholder="Ej: Editor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Menú</label>
                <input
                  type="text"
                  value={formData.nombreMenu}
                  onChange={(e) => setFormData({ ...formData, nombreMenu: e.target.value })}
                  placeholder="Ej: Documentos"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Permisos</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'puedeVer', label: 'Ver' },
                    { key: 'puedeLeer', label: 'Leer' },
                    { key: 'puedeCrear', label: 'Crear' },
                    { key: 'puedeModificar', label: 'Modificar' },
                    { key: 'puedeEliminar', label: 'Eliminar' },
                    { key: 'puedeExportar', label: 'Exportar' }
                  ].map((permission) => (
                    <label key={permission.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData[permission.key]}
                        onChange={(e) => setFormData({ ...formData, [permission.key]: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{permission.label}</span>
                    </label>
                  ))}
                </div>
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
                Asignar Permiso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Edit className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Editar Permiso</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Modifique la información del permiso</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Rol</label>
                <input
                  type="text"
                  value={formData.nombreRol}
                  onChange={(e) => setFormData({ ...formData, nombreRol: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Menú</label>
                <input
                  type="text"
                  value={formData.nombreMenu}
                  onChange={(e) => setFormData({ ...formData, nombreMenu: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Permisos</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'puedeVer', label: 'Ver' },
                    { key: 'puedeLeer', label: 'Leer' },
                    { key: 'puedeCrear', label: 'Crear' },
                    { key: 'puedeModificar', label: 'Modificar' },
                    { key: 'puedeEliminar', label: 'Eliminar' },
                    { key: 'puedeExportar', label: 'Exportar' }
                  ].map((permission) => (
                    <label key={permission.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData[permission.key]}
                        onChange={(e) => setFormData({ ...formData, [permission.key]: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{permission.label}</span>
                    </label>
                  ))}
                </div>
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
                Actualizar Permiso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPermisos;
