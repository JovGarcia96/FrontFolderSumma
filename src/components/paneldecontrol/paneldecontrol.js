import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { 
  Users,
  Shield,
  Settings,
  Activity,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Crown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Server,
  Cpu,
  Zap,
  ChevronLeft
} from "lucide-react";

const PanelControl = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Mock data
  const systemStats = {
    totalUsuarios: 24,
    usuariosActivos: 18,
    rolesConfigurados: 5,
    permisosAsignados: 156,
    sesionesActivas: 12,
    intentosFallidos: 3,
  };

  const users = [
    {
      id: "1",
      nombre: "Ana García",
      email: "ana.garcia@findrive.com",
      rol: "Administrador",
      nivel: "Alto",
      activo: true,
      fechaCreacion: "2025-01-15",
      ultimoAcceso: "2025-07-24 14:30:00",
      permisos: ["usuarios.crear", "usuarios.editar", "permisos.gestionar", "sistema.configurar"],
    },
    {
      id: "2",
      nombre: "Carlos Mendoza",
      email: "carlos.mendoza@findrive.com",
      rol: "Supervisor",
      nivel: "Medio",
      activo: true,
      fechaCreacion: "2025-02-20",
      ultimoAcceso: "2025-07-24 13:15:00",
      permisos: ["documentos.ver", "documentos.editar", "reportes.generar"],
    },
    {
      id: "3",
      nombre: "María López",
      email: "maria.lopez@findrive.com",
      rol: "Operador",
      nivel: "Básico",
      activo: false,
      fechaCreacion: "2025-03-10",
      ultimoAcceso: "2025-07-20 09:45:00",
      permisos: ["documentos.ver", "perfil.editar"],
    },
  ];

  const roles = [
    {
      id: "1",
      nombre: "Administrador",
      descripcion: "Acceso completo al sistema",
      nivel: 5,
      permisos: ["*"],
      activo: true,
      fechaCreacion: "2025-01-01",
    },
    {
      id: "2",
      nombre: "Supervisor",
      descripcion: "Gestión de documentos y reportes",
      nivel: 3,
      permisos: ["documentos.*", "reportes.*", "usuarios.ver"],
      activo: true,
      fechaCreacion: "2025-01-01",
    },
    {
      id: "3",
      nombre: "Operador",
      descripcion: "Acceso básico a documentos",
      nivel: 1,
      permisos: ["documentos.ver", "perfil.editar"],
      activo: true,
      fechaCreacion: "2025-01-01",
    },
  ];

  const availablePermissions = [
    { id: "usuarios.crear", name: "Crear Usuarios", category: "Usuarios" },
    { id: "usuarios.editar", name: "Editar Usuarios", category: "Usuarios" },
    { id: "usuarios.eliminar", name: "Eliminar Usuarios", category: "Usuarios" },
    { id: "usuarios.ver", name: "Ver Usuarios", category: "Usuarios" },
    { id: "documentos.crear", name: "Crear Documentos", category: "Documentos" },
    { id: "documentos.editar", name: "Editar Documentos", category: "Documentos" },
    { id: "documentos.eliminar", name: "Eliminar Documentos", category: "Documentos" },
    { id: "documentos.ver", name: "Ver Documentos", category: "Documentos" },
    { id: "reportes.generar", name: "Generar Reportes", category: "Reportes" },
    { id: "reportes.exportar", name: "Exportar Reportes", category: "Reportes" },
    { id: "sistema.configurar", name: "Configurar Sistema", category: "Sistema" },
    { id: "permisos.gestionar", name: "Gestionar Permisos", category: "Sistema" },
  ];

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      console.log(`Eliminando ${deleteTarget.type}: ${deleteTarget.name}`);
      setIsDeleteConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Componentes UI simplificados
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="p-6 pb-4">
      {children}
    </div>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );

  const CardDescription = ({ children }) => (
    <p className="text-sm text-gray-600 mt-1">
      {children}
    </p>
  );

  const Button = ({ children, className = "", variant = "default", size = "default", onClick, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      outline: "border border-gray-300 bg-white hover:bg-gray-50",
    };

    const sizes = {
      default: "h-10 py-2 px-4",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
      default: "bg-blue-100 text-blue-800",
      secondary: "bg-gray-100 text-gray-800",
      outline: "border border-gray-300 text-gray-700",
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  const Input = ({ className = "", ...props }) => (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  const Label = ({ children, htmlFor, className = "" }) => (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );

  const Textarea = ({ className = "", ...props }) => (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  const Switch = ({ id, defaultChecked = false, ...props }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        defaultChecked={defaultChecked}
        className="sr-only peer"
        {...props}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );

  const Tabs = ({ children, value, onValueChange, className = "" }) => (
    <div className={className}>
      {children}
    </div>
  );

  const TabsList = ({ children, className = "" }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-md p-1 ${className}`}>
      {children}
    </div>
  );

  const TabsTrigger = ({ children, value, className = "" }) => (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        activeTab === value 
          ? "bg-white text-gray-900 shadow-sm" 
          : "text-gray-600 hover:text-gray-900"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );

  const TabsContent = ({ children, value, className = "" }) => {
    if (activeTab !== value) return null;
    return (
      <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}>
        {children}
      </div>
    );
  };

  const Dialog = ({ children, open, onOpenChange }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)} />
        <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    );
  };

  const DialogContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );

  const DialogHeader = ({ children }) => (
    <div className="mb-4">
      {children}
    </div>
  );

  const DialogTitle = ({ children }) => (
    <h2 className="text-lg font-semibold">
      {children}
    </h2>
  );

  const DialogDescription = ({ children }) => (
    <p className="text-sm text-gray-600 mt-1">
      {children}
    </p>
  );

  const DialogFooter = ({ children }) => (
    <div className="flex justify-end gap-2 mt-4">
      {children}
    </div>
  );

  const Select = ({ children, onValueChange }) => (
    <div className="relative">
      {children}
    </div>
  );

  const SelectTrigger = ({ children }) => (
    <button className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
      {children}
    </button>
  );

  const SelectValue = ({ placeholder }) => (
    <span className="text-gray-500">{placeholder}</span>
  );

  const SelectContent = ({ children }) => (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
      {children}
    </div>
  );

  const SelectItem = ({ children, value }) => (
    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
      {children}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Botón Volver al Inicio */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-6">
          <button 
            onClick={() => handleNavigation('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al Inicio
          </button>
        </div>

        <main className="flex-1 overflow-auto p-6 space-y-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Panel de Control</h1>
                    <p className="text-blue-100 text-lg">Administración integral del sistema FinDrive</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-200">Última actualización</div>
                <div className="text-lg font-semibold">24/07/2025 14:30</div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Roles y Niveles
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configuraciones
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* System Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total de Usuarios</p>
                        <p className="text-3xl font-bold text-blue-600">{systemStats.totalUsuarios}</p>
                        <p className="text-sm text-gray-500">Registrados en el sistema</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                        <p className="text-3xl font-bold text-green-600">{systemStats.usuariosActivos}</p>
                        <p className="text-sm text-gray-500">Conectados actualmente</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Roles Configurados</p>
                        <p className="text-3xl font-bold text-purple-600">{systemStats.rolesConfigurados}</p>
                        <p className="text-sm text-gray-500">Niveles de acceso</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <Crown className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Permisos Asignados</p>
                        <p className="text-3xl font-bold text-orange-600">{systemStats.permisosAsignados}</p>
                        <p className="text-sm text-gray-500">Configuraciones activas</p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <Shield className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Sesiones Activas</p>
                        <p className="text-3xl font-bold text-cyan-600">{systemStats.sesionesActivas}</p>
                        <p className="text-sm text-gray-500">Usuarios conectados</p>
                      </div>
                      <div className="p-3 bg-cyan-100 rounded-xl">
                        <Zap className="h-6 w-6 text-cyan-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Intentos Fallidos</p>
                        <p className="text-3xl font-bold text-red-600">{systemStats.intentosFallidos}</p>
                        <p className="text-sm text-gray-500">Últimas 24 horas</p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-xl">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Actividad Reciente del Sistema
                  </CardTitle>
                  <CardDescription>Últimas acciones administrativas realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <UserPlus className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Nuevo usuario creado</p>
                        <p className="text-sm text-gray-600">María López fue agregada al sistema</p>
                      </div>
                      <span className="text-sm text-gray-500">Hace 2 horas</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Permisos actualizados</p>
                        <p className="text-sm text-gray-600">Rol Supervisor modificado exitosamente</p>
                      </div>
                      <span className="text-sm text-gray-500">Hace 4 horas</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Settings className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Configuración del sistema</p>
                        <p className="text-sm text-gray-600">Políticas de seguridad actualizadas</p>
                      </div>
                      <span className="text-sm text-gray-500">Ayer</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Gestión de Usuarios
                      </CardTitle>
                      <CardDescription>Administra usuarios, roles y permisos del sistema</CardDescription>
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsCreateUserOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Usuario
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar usuarios por nombre, email o rol..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                              {user.nombre.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{user.nombre}</h3>
                                <Badge variant={user.activo ? "default" : "secondary"}>
                                  {user.activo ? "Activo" : "Inactivo"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-gray-500">Rol: {user.rol}</span>
                                <span className="text-xs text-gray-500">Nivel: {user.nivel}</span>
                                <span className="text-xs text-gray-500">Último acceso: {user.ultimoAcceso}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setDeleteTarget({ type: "user", id: user.id, name: user.nombre });
                                setIsDeleteConfirmOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              {user.activo ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Roles Tab */}
            <TabsContent value="roles" className="space-y-6">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5" />
                        Gestión de Roles y Niveles
                      </CardTitle>
                      <CardDescription>Configura roles, niveles de acceso y permisos del sistema</CardDescription>
                    </div>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setIsCreateRoleOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Rol
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roles.map((role) => (
                      <div key={role.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <Crown className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{role.nombre}</h3>
                                <Badge variant="outline">Nivel {role.nivel}</Badge>
                                <Badge variant={role.activo ? "default" : "secondary"}>
                                  {role.activo ? "Activo" : "Inactivo"}
                                </Badge>
                              </div>
                              <p className="text-gray-600">{role.descripcion}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setDeleteTarget({ type: "role", id: role.id, name: role.nombre });
                                setIsDeleteConfirmOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Permisos asignados:</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {role.permisos.map((permiso, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {permiso === "*" ? "Todos los permisos" : permiso}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      Estado del Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Base de Datos</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Operativo</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Servidor Web</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Operativo</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">Respaldos</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      Recursos del Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memoria RAM</span>
                        <span>68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Almacenamiento</span>
                        <span>32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuraciones del Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maintenance">Modo Mantenimiento</Label>
                        <Switch id="maintenance" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="backups">Respaldos Automáticos</Label>
                        <Switch id="backups" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notifications">Notificaciones del Sistema</Label>
                        <Switch id="notifications" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="logging">Registro de Actividad</Label>
                        <Switch id="logging" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="security">Modo Seguridad Avanzada</Label>
                        <Switch id="security" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="updates">Actualizaciones Automáticas</Label>
                        <Switch id="updates" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Confirmar Eliminación
                </DialogTitle>
                <DialogDescription>
                  {deleteTarget && (
                    <>
                      ¿Estás seguro de que deseas eliminar {deleteTarget.type === "user" ? "el usuario" : "el rol"}{" "}
                      <strong>{deleteTarget.name}</strong>? Esta acción no se puede deshacer.
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDeleteConfirm}
                >
                  Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Create User Dialog */}
          <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Completa la información para crear un nuevo usuario en el sistema
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre Completo</Label>
                    <Input id="nombre" placeholder="Ej: Juan Pérez García" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="juan.perez@findrive.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rol">Rol del Usuario</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="operador">Operador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nivel">Nivel de Acceso</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alto">Alto</SelectItem>
                        <SelectItem value="medio">Medio</SelectItem>
                        <SelectItem value="basico">Básico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Permisos del Usuario</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-4 border rounded-lg">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <input type="checkbox" id={permission.id} className="rounded" />
                        <Label htmlFor={permission.id} className="text-sm">
                          <span className="font-medium">{permission.name}</span>
                          <span className="text-gray-500 ml-1">({permission.category})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="usuarioActivo" defaultChecked />
                  <Label htmlFor="usuarioActivo">Usuario activo</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsCreateUserOpen(false)}>Crear Usuario</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Create Role Dialog */}
          <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Rol</DialogTitle>
                <DialogDescription>
                  Define un nuevo rol con sus permisos y nivel de acceso correspondiente
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombreRol">Nombre del Rol</Label>
                    <Input id="nombreRol" placeholder="Ej: Analista Financiero" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nivelRol">Nivel de Acceso</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Nivel 5 - Administrador Total</SelectItem>
                        <SelectItem value="4">Nivel 4 - Administrador</SelectItem>
                        <SelectItem value="3">Nivel 3 - Supervisor</SelectItem>
                        <SelectItem value="2">Nivel 2 - Operador Avanzado</SelectItem>
                        <SelectItem value="1">Nivel 1 - Operador Básico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descripcionRol">Descripción</Label>
                  <Textarea
                    id="descripcionRol"
                    placeholder="Describe las responsabilidades y alcance de este rol..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permisos del Rol</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-4 border rounded-lg">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <input type="checkbox" id={`role-${permission.id}`} className="rounded" />
                        <Label htmlFor={`role-${permission.id}`} className="text-sm">
                          <span className="font-medium">{permission.name}</span>
                          <span className="text-gray-500 ml-1">({permission.category})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="rolActivo" defaultChecked />
                  <Label htmlFor="rolActivo">Rol activo</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsCreateRoleOpen(false)}>Crear Rol</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default PanelControl;
