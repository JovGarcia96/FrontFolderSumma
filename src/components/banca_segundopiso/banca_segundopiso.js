import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Home, 
  Shield, 
  TrendingUp, 
  Users, 
  Smartphone,
  ChevronLeft,
  CreditCard,
  FolderOpen,
  Search,
  Building2,
  Phone,
  Mail,
  MapPin,
  Hash,
  User,
  FileText,
  Eye,
  X,
  CheckCircle,
  Globe,
  Calendar,
  ArrowLeft,
  Save,
  Ban
} from 'lucide-react';

const BancaSegundoPiso = () => {
  const navigate = useNavigate();
  
  // Estados para las nuevas funcionalidades
  const [activeView, setActiveView] = useState("carpetas"); // "carpetas" o "plataformas"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlataforma, setSelectedPlataforma] = useState(null);
  const [showCuentasView, setShowCuentasView] = useState(false);

  // Mapeo de iconos para cada plataforma
  const platformIcons = {
    'KLU': '/assets/logos/klu.png',
    'NETPAY': '/assets/logos/netpay.jpg',
    'NU': '/assets/logos/nu.jpg',
    'KLAR': '/assets/logos/klar.webp'
  };

  const [plataformas, setPlataformas] = useState([
    {
      id: 1,
      nombrePlataforma: "KLU",
      descripcion: "Plataforma de servicios financieros digitales",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      cuentas: [
        {
          id: 1,
          numeroCuenta: "1234567890123456",
          clabe: "012345678901234567",
          sucursal: "Centro Histórico",
          cliente: "Juan Pérez García",
          telefono: "+52 55 1234 5678",
          correo: "juan.perez@email.com",
          firmante: "María González López",
          estatus: "Activa"
        },
        {
          id: 2,
          numeroCuenta: "1234567890123457",
          clabe: "012345678901234568",
          sucursal: "Polanco",
          cliente: "Ana Martínez Ruiz",
          telefono: "+52 55 8765 4321",
          correo: "ana.martinez@email.com",
          firmante: "Carlos Rodríguez Sánchez",
          estatus: "Activa"
        }
      ]
    },
    {
      id: 2,
      nombrePlataforma: "NETPAY",
      descripcion: "Sistema de pagos y transferencias",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      cuentas: [
        {
          id: 3,
          numeroCuenta: "2345678901234567",
          clabe: "012345678901234569",
          sucursal: "Santa Fe",
          cliente: "Roberto Silva Mendoza",
          telefono: "+52 55 2345 6789",
          correo: "roberto.silva@email.com",
          firmante: "Laura Jiménez Torres",
          estatus: "Activa"
        }
      ]
    },
    {
      id: 3,
      nombrePlataforma: "NU",
      descripcion: "Banco digital y servicios financieros",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      cuentas: [
        {
          id: 4,
          numeroCuenta: "3456789012345678",
          clabe: "012345678901234570",
          sucursal: "Roma Norte",
          cliente: "Patricia López Hernández",
          telefono: "+52 55 3456 7890",
          correo: "patricia.lopez@email.com",
          firmante: "Miguel Ángel Vargas",
          estatus: "Suspendida"
        },
        {
          id: 5,
          numeroCuenta: "3456789012345679",
          clabe: "012345678901234571",
          sucursal: "Condesa",
          cliente: "Fernando Morales Castro",
          telefono: "+52 55 4567 8901",
          correo: "fernando.morales@email.com",
          firmante: "Isabel Ramírez Flores",
          estatus: "Activa"
        }
      ]
    },
    {
      id: 4,
      nombrePlataforma: "KLAR",
      descripcion: "Aplicación de banca móvil",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      cuentas: [
        {
          id: 6,
          numeroCuenta: "4567890123456789",
          clabe: "012345678901234572",
          sucursal: "Insurgentes Sur",
          cliente: "Alejandra Ruiz Moreno",
          telefono: "+52 55 5678 9012",
          correo: "alejandra.ruiz@email.com",
          firmante: "Diego Herrera Campos",
          estatus: "Activa"
        }
      ]
    },
  ]);

  // Mock data for folders
  const [carpetas, setCarpetas] = useState([
    {
      id: 1,
      nombre: "Contratos Bancarios",
      descripcion: "Documentos de contratos con instituciones bancarias",
      documentos: 45,
      fechaActualizacion: "15/01/2025",
      color: "blue",
      borderColor: "border-blue-100"
    },
    {
      id: 2,
      nombre: "Estados de Cuenta",
      descripcion: "Estados de cuenta mensuales de todas las instituciones",
      documentos: 128,
      fechaActualizacion: "10/01/2025",
      color: "green",
      borderColor: "border-green-500"
    },
    {
      id: 3,
      nombre: "Documentos Regulatorios",
      descripcion: "Documentación requerida por organismos reguladores",
      documentos: 23,
      fechaActualizacion: "08/01/2025",
      color: "purple",
      borderColor: "border-purple-500"
    },
    {
      id: 4,
      nombre: "Reportes Financieros",
      descripcion: "Reportes y análisis financieros institucionales",
      documentos: 67,
      fechaActualizacion: "05/01/2025",
      color: "orange",
      borderColor: "border-orange-500"
    },
    {
      id: 5,
      nombre: "Correspondencia Bancaria",
      descripcion: "Comunicaciones oficiales con entidades bancarias",
      documentos: 34,
      fechaActualizacion: "03/01/2025",
      color: "red",
      borderColor: "border-red-500"
    },
    {
      id: 6,
      nombre: "Auditorías",
      descripcion: "Documentos de auditorías internas y externas",
      documentos: 19,
      fechaActualizacion: "01/01/2025",
      color: "gray",
      borderColor: "border-gray-500"
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateCuentaDialogOpen, setIsCreateCuentaDialogOpen] = useState(false);
  const [isEditCuentaDialogOpen, setIsEditCuentaDialogOpen] = useState(false);
  const [editingPlataforma, setEditingPlataforma] = useState(null);
  const [editingCuenta, setEditingCuenta] = useState(null);
  const [formData, setFormData] = useState({
    nombrePlataforma: "",
    descripcion: "",
    activo: true,
  });
  const [cuentaFormData, setCuentaFormData] = useState({
    numeroCuenta: "",
    clabe: "",
    sucursal: "",
    cliente: "",
    telefono: "",
    correo: "",
    firmante: "",
    estatus: "Activa"
  });

  const handleCreate = () => {
    const newPlataforma = {
      id: Math.max(...plataformas.map((p) => p.id)) + 1,
      nombrePlataforma: formData.nombrePlataforma,
      descripcion: formData.descripcion,
      activo: formData.activo,
      fechaCreacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
      cuentas: []
    };
    setPlataformas([...plataformas, newPlataforma]);
    setFormData({ nombrePlataforma: "", descripcion: "", activo: true });
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (plataforma) => {
    setEditingPlataforma(plataforma);
    setFormData({
      nombrePlataforma: plataforma.nombrePlataforma,
      descripcion: plataforma.descripcion,
      activo: plataforma.activo,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editingPlataforma) {
      setPlataformas(
        plataformas.map((plataforma) =>
          plataforma.id === editingPlataforma.id ? { ...plataforma, ...formData } : plataforma,
        ),
      );
      setEditingPlataforma(null);
      setFormData({ nombrePlataforma: "", descripcion: "", activo: true });
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = (id) => {
    setPlataformas(plataformas.filter((plataforma) => plataforma.id !== id));
  };

  const toggleActivo = (id) => {
    setPlataformas(
      plataformas.map((plataforma) =>
        plataforma.id === id ? { ...plataforma, activo: !plataforma.activo } : plataforma,
      ),
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para obtener el icono de la plataforma
  const getPlatformIcon = (platformName) => {
    return platformIcons[platformName.toUpperCase()] || null;
  };

  const getFolderIcon = (color) => {
    const iconClass = `h-6 w-6`;
    switch(color) {
      case 'blue':
        return <FolderOpen className={`${iconClass} text-blue-500`} />;
      case 'green':
        return <FileText className={`${iconClass} text-green-500`} />;
      case 'purple':
        return <FileText className={`${iconClass} text-purple-500`} />;
      case 'orange':
        return <FolderOpen className={`${iconClass} text-orange-500`} />;
      case 'red':
        return <FolderOpen className={`${iconClass} text-red-500`} />;
      case 'gray':
        return <FileText className={`${iconClass} text-gray-500`} />;
      default:
        return <FolderOpen className={`${iconClass} text-blue-500`} />;
    }
  };

  // Función para manejar clic en plataforma
  const handlePlataformaClick = (plataforma) => {
    setSelectedPlataforma(plataforma);
    setShowCuentasView(true);
  };

  // Función para volver a la vista de plataformas
  const handleBackToPlataformas = () => {
    setShowCuentasView(false);
    setSelectedPlataforma(null);
  };

  // Funciones para CRUD de cuentas
  const handleCreateCuenta = () => {
    if (!selectedPlataforma) return;
    
    const newCuenta = {
      id: Math.max(...selectedPlataforma.cuentas.map((c) => c.id), 0) + 1,
      ...cuentaFormData
    };
    
    const updatedPlataformas = plataformas.map(plataforma => 
      plataforma.id === selectedPlataforma.id 
        ? { ...plataforma, cuentas: [...plataforma.cuentas, newCuenta] }
        : plataforma
    );
    
    setPlataformas(updatedPlataformas);
    setSelectedPlataforma({...selectedPlataforma, cuentas: [...selectedPlataforma.cuentas, newCuenta]});
    setCuentaFormData({
      numeroCuenta: "",
      clabe: "",
      sucursal: "",
      cliente: "",
      telefono: "",
      correo: "",
      firmante: "",
      estatus: "Activa"
    });
    setIsCreateCuentaDialogOpen(false);
  };

  const handleEditCuenta = (cuenta) => {
    setEditingCuenta(cuenta);
    setCuentaFormData({
      numeroCuenta: cuenta.numeroCuenta,
      clabe: cuenta.clabe,
      sucursal: cuenta.sucursal,
      cliente: cuenta.cliente,
      telefono: cuenta.telefono,
      correo: cuenta.correo,
      firmante: cuenta.firmante,
      estatus: cuenta.estatus
    });
    setIsEditCuentaDialogOpen(true);
  };

  const handleUpdateCuenta = () => {
    if (!selectedPlataforma || !editingCuenta) return;
    
    const updatedPlataformas = plataformas.map(plataforma => 
      plataforma.id === selectedPlataforma.id 
        ? { 
            ...plataforma, 
            cuentas: plataforma.cuentas.map(cuenta => 
              cuenta.id === editingCuenta.id 
                ? { ...cuentaFormData, id: cuenta.id }
                : cuenta
            )
          }
        : plataforma
    );
    
    setPlataformas(updatedPlataformas);
    setSelectedPlataforma({
      ...selectedPlataforma, 
      cuentas: selectedPlataforma.cuentas.map(cuenta => 
        cuenta.id === editingCuenta.id 
          ? { ...cuentaFormData, id: cuenta.id }
          : cuenta
      )
    });
    setEditingCuenta(null);
    setCuentaFormData({
      numeroCuenta: "",
      clabe: "",
      sucursal: "",
      cliente: "",
      telefono: "",
      correo: "",
      firmante: "",
      estatus: "Activa"
    });
    setIsEditCuentaDialogOpen(false);
  };

  const handleDeleteCuenta = (id) => {
    if (!selectedPlataforma) return;
    
    const updatedPlataformas = plataformas.map(plataforma => 
      plataforma.id === selectedPlataforma.id 
        ? { ...plataforma, cuentas: plataforma.cuentas.filter(cuenta => cuenta.id !== id) }
        : plataforma
    );
    
    setPlataformas(updatedPlataformas);
    setSelectedPlataforma({...selectedPlataforma, cuentas: selectedPlataforma.cuentas.filter(cuenta => cuenta.id !== id)});
  };

  const toggleCuentaEstatus = (id) => {
    if (!selectedPlataforma) return;
    
    const updatedPlataformas = plataformas.map(plataforma => 
      plataforma.id === selectedPlataforma.id 
        ? { 
            ...plataforma, 
            cuentas: plataforma.cuentas.map(cuenta => 
              cuenta.id === id 
                ? { ...cuenta, estatus: cuenta.estatus === "Activa" ? "Suspendida" : "Activa" }
                : cuenta
            )
          }
        : plataforma
    );
    
    setPlataformas(updatedPlataformas);
    setSelectedPlataforma({
      ...selectedPlataforma, 
      cuentas: selectedPlataforma.cuentas.map(cuenta => 
        cuenta.id === id 
          ? { ...cuenta, estatus: cuenta.estatus === "Activa" ? "Suspendida" : "Activa" }
          : cuenta
      )
    });
  };

  // Filtros
  const filteredCarpetas = carpetas.filter(carpeta =>
    carpeta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carpeta.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
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
        <main className="flex-1 overflow-auto">
          {/* Header Section con pestañas de navegación */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-xl p-6 text-white shadow-xl mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Banca Segundo Piso</h1>
                  <p className="text-blue-200 mt-1">Plataforma integral de gestión financiera con tecnología de vanguardia</p>
                  <div className="flex items-center gap-6 mt-3 text-sm text-blue-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Sistema Activo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span>Seguridad Bancaria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-purple-400" />
                      <span>Multi-Institución</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-100 px-6">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveView("carpetas")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeView === "carpetas"
                      ? "bg-blue-900 text-white"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <FolderOpen className="h-4 w-4" />
                  Gestión de Carpetas
                </button>
                <button
                  onClick={() => setActiveView("plataformas")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeView === "plataformas"
                      ? "bg-blue-900 text-white"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  Gestión de Plataformas
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    activeView === "plataformas" ? "Buscar plataformas..." :
                    "Buscar en documentos financieros..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Contenido condicional basado en la vista activa */}
          <div className="px-6 py-6">
            {activeView === "carpetas" && (
              /* Vista de Carpetas */
              <>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                  {/* Categorías Activas */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Categorías Activas</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">6</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FolderOpen className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Total Documentos */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Documentos</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">316</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  {/* Instituciones */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Instituciones</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">6</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* Disponibilidad */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Disponibilidad</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">99.9%</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Folders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCarpetas.map((carpeta) => (
                    <div key={carpeta.id} className="bg-white border border-gray-100 rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer">
                      {/* Barra de color superior */}
                      <div className={`h-1 ${carpeta.borderColor} bg-current rounded-t-lg`}></div>
                      
                      <div className="p-6">
                        {/* Header con icono y badge */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {getFolderIcon(carpeta.color)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              carpeta.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                              carpeta.color === 'green' ? 'bg-green-100 text-green-800' :
                              carpeta.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                              carpeta.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                              carpeta.color === 'red' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {carpeta.documentos} docs
                            </span>
                          </div>
                        </div>

                        {/* Título y descripción */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{carpeta.nombre}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{carpeta.descripcion}</p>
                        </div>

                        {/* Footer con fecha */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Última actualización: {carpeta.fechaActualizacion}</span>
                          </div>
                        </div>

                        {/* Botón de acceso */}
                        <div className="mt-4">
                          <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            Acceder a Documentos
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeView === "plataformas" && !showCuentasView && (
              /* Vista de Plataformas - Lista de plataformas */
              <>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                    <CardHeader className="pb-1 pt-2 px-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                          <Smartphone className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <CardTitle className="text-xs font-semibold text-gray-900">
                          Total de Plataformas
                        </CardTitle>
                      </div>
                      <CardDescription className="text-xs text-gray-500">
                        Plataformas registradas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2 px-3">
                      <div className="text-2xl font-bold text-gray-900">{plataformas.length}</div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                    <CardHeader className="pb-1 pt-2 px-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                          <Shield className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <CardTitle className="text-xs font-semibold text-gray-900">
                          Plataformas Activas
                        </CardTitle>
                      </div>
                      <CardDescription className="text-xs text-gray-500">
                        Operando normalmente
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2 px-3">
                      <div className="text-2xl font-bold text-green-700">
                        {plataformas.filter((p) => p.activo).length}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                    <CardHeader className="pb-1 pt-2 px-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                          <Users className="h-3.5 w-3.5 text-red-600" />
                        </div>
                        <CardTitle className="text-xs font-semibold text-gray-900">
                          Plataformas Inactivas
                        </CardTitle>
                      </div>
                      <CardDescription className="text-xs text-gray-500">
                        Suspendidas temporalmente
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2 px-3">
                      <div className="text-2xl font-bold text-red-700">
                        {plataformas.filter((p) => !p.activo).length}
                      </div>
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
                        Plataformas operativas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2 px-3">
                      <div className="text-2xl font-bold text-blue-700">
                        {plataformas.length > 0
                          ? Math.round((plataformas.filter((p) => p.activo).length / plataformas.length) * 100)
                          : 0}%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Botón para agregar nueva plataforma */}
                <div className="mb-4 flex justify-end">
                  <button 
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Registrar Nueva Plataforma
                  </button>
                </div>

                {/* Main Content */}
                <Card className="mb-3 border border-gray-200 bg-white shadow-sm">
                  <CardHeader className="pb-1 pt-2 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <Smartphone className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold text-gray-900">
                          Registro de Plataformas Fintech
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-500">
                          Listado completo de plataformas financieras digitales registradas en el sistema
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2 px-3">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">ID</th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Plataforma Fintech</th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Código</th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Estado Operativo</th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Fecha de Registro</th>
                            <th className="text-center py-2 px-2 text-xs font-semibold text-gray-700">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {plataformas.map((plataforma) => (
                            <tr key={plataforma.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                              <td className="py-2 px-2">
                                <span className="text-xs font-medium text-gray-600">
                                  #{plataforma.id.toString().padStart(3, "0")}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {getPlatformIcon(plataforma.nombrePlataforma) ? (
                                      <img 
                                        src={getPlatformIcon(plataforma.nombrePlataforma)}
                                        alt={`${plataforma.nombrePlataforma} logo`}
                                        className="w-6 h-6 object-contain"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                          e.target.nextSibling.style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    <div className={`w-6 h-6 bg-blue-100 rounded flex items-center justify-center ${getPlatformIcon(plataforma.nombrePlataforma) ? 'hidden' : ''}`}>
                                      <Smartphone className="h-3 w-3 text-blue-600" />
                                    </div>
                                  </div>
                                  <div>
                                    <button
                                      onClick={() => handlePlataformaClick(plataforma)}
                                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left"
                                    >
                                      {plataforma.nombrePlataforma}
                                    </button>
                                    <div className="text-xs text-gray-500">{plataforma.descripcion}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2 px-2">
                                <span className="text-xs text-gray-600">
                                  FT{plataforma.id.toString().padStart(3, "0")}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <div className="flex items-center gap-2">
                                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                    plataforma.activo 
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {plataforma.activo ? "Operativo" : "Inactivo"}
                                  </span>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={plataforma.activo}
                                      onChange={() => toggleActivo(plataforma.id)}
                                      className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                  </label>
                                </div>
                              </td>
                              <td className="py-2 px-2">
                                <span className="text-xs text-gray-600 font-mono">{plataforma.fechaCreacion}</span>
                              </td>
                              <td className="py-2 px-2">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => handleEdit(plataforma)}
                                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    title="Editar"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`¿Está seguro que desea eliminar la plataforma "${plataforma.nombrePlataforma}"?`)) {
                                        handleDelete(plataforma.id);
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
              </>
            )}

            {activeView === "plataformas" && showCuentasView && selectedPlataforma && (
              /* Vista de Cuentas de la Plataforma Seleccionada */
              <div>
                {/* Botón para volver a plataformas */}
                <div className="mb-4">
                  <button 
                    onClick={handleBackToPlataformas}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Plataformas
                  </button>
                </div>

                {/* Header de la plataforma seleccionada */}
                <Card className="mb-4 bg-gradient-to-r from-blue-800 to-indigo-800 border border-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {getPlatformIcon(selectedPlataforma.nombrePlataforma) ? (
                          <img 
                            src={getPlatformIcon(selectedPlataforma.nombrePlataforma)}
                            alt={`${selectedPlataforma.nombrePlataforma} logo`}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <Smartphone className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-200">{selectedPlataforma.nombrePlataforma}</h2>
                        <p className="text-sm text-gray-200">{selectedPlataforma.descripcion}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            selectedPlataforma.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {selectedPlataforma.activo ? "Operativo" : "Inactivo"}
                          </span>
                          <span className="text-xs text-gray-200">
                            {selectedPlataforma.cuentas.length} cuenta(s) registrada(s)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Botón para agregar nueva cuenta */}
                <div className="mb-4 flex justify-end">
                  <button 
                    onClick={() => setIsCreateCuentaDialogOpen(true)}
                    className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Nueva Cuenta
                  </button>
                </div>

                {/* Tabla de cuentas */}
                <Card className="shadow-sm">
                  <CardHeader className="border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">Cuentas de {selectedPlataforma.nombrePlataforma}</CardTitle>
                        <CardDescription>Listado de cuentas bancarias asociadas a esta plataforma</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Número de Cuenta</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Sucursal</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Estatus</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPlataforma.cuentas.map((cuenta, index) => (
                            <tr key={cuenta.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                              <td className="py-3 px-4">
                                <div className="text-sm font-medium text-gray-900">{cuenta.numeroCuenta}</div>
                                <div className="text-xs text-gray-500">CLABE: {cuenta.clabe}</div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-sm text-gray-900">{cuenta.cliente}</div>
                                <div className="text-xs text-gray-500">{cuenta.telefono}</div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-900">{cuenta.sucursal}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    cuenta.estatus === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {cuenta.estatus}
                                  </span>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={cuenta.estatus === 'Activa'}
                                      onChange={() => toggleCuentaEstatus(cuenta.id)}
                                      className="sr-only"
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors ${cuenta.estatus === 'Activa' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${cuenta.estatus === 'Activa' ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
                                    </div>
                                  </label>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button 
                                    onClick={() => handleEditCuenta(cuenta)}
                                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                    title="Editar"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => {
                                      if (window.confirm(`¿Está seguro que desea eliminar la cuenta "${cuenta.numeroCuenta}"?`)) {
                                        handleDeleteCuenta(cuenta.id);
                                      }
                                    }}
                                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
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
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
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

      {/* Create Dialog para Plataformas */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Registrar Nueva Plataforma Fintech</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Complete la información requerida para registrar una nueva plataforma financiera digital</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Plataforma</label>
                <input
                  type="text"
                  value={formData.nombrePlataforma}
                  onChange={(e) => setFormData({ ...formData, nombrePlataforma: e.target.value })}
                  placeholder="Ej: KLU, NETPAY, NU, KLAR"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Descripción de la plataforma"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700">Estado Operativo</label>
                  <p className="text-xs text-gray-500">Determina si la plataforma está habilitada para operaciones</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
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
                Registrar Plataforma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog para Plataformas */}
      {isEditDialogOpen && editingPlataforma && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Edit className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Modificar Plataforma Fintech</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Actualice la información de la plataforma financiera digital seleccionada</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Plataforma</label>
                <input
                  type="text"
                  value={formData.nombrePlataforma}
                  onChange={(e) => setFormData({ ...formData, nombrePlataforma: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700">Estado Operativo</label>
                  <p className="text-xs text-gray-500">Determina si la plataforma está habilitada para operaciones</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
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
                Actualizar Plataforma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Dialog para Cuentas */}
      {isCreateCuentaDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Agregar Nueva Cuenta</h3>
              </div>
              <button 
                onClick={() => setIsCreateCuentaDialogOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                <input
                  type="text"
                  value={cuentaFormData.numeroCuenta}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, numeroCuenta: e.target.value })}
                  placeholder="Ej: 1234567890123456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CLABE</label>
                <input
                  type="text"
                  value={cuentaFormData.clabe}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, clabe: e.target.value })}
                  placeholder="Ej: 012345678901234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                <input
                  type="text"
                  value={cuentaFormData.sucursal}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, sucursal: e.target.value })}
                  placeholder="Ej: Centro Histórico"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <input
                  type="text"
                  value={cuentaFormData.cliente}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, cliente: e.target.value })}
                  placeholder="Ej: Juan Pérez García"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={cuentaFormData.telefono}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, telefono: e.target.value })}
                  placeholder="Ej: +52 55 1234 5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={cuentaFormData.correo}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, correo: e.target.value })}
                  placeholder="Ej: juan.perez@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firmante Autorizado</label>
                <input
                  type="text"
                  value={cuentaFormData.firmante}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, firmante: e.target.value })}
                  placeholder="Ej: María González López"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700">Estado de la Cuenta</label>
                  <p className="text-xs text-gray-500">Determina si la cuenta está activa o suspendida</p>
                </div>
                <select
                  value={cuentaFormData.estatus}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, estatus: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Activa">Activa</option>
                  <option value="Suspendida">Suspendida</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsCreateCuentaDialogOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCuenta}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog para Cuentas */}
      {isEditCuentaDialogOpen && editingCuenta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Editar Cuenta</h3>
              </div>
              <button 
                onClick={() => setIsEditCuentaDialogOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                <input
                  type="text"
                  value={cuentaFormData.numeroCuenta}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, numeroCuenta: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CLABE</label>
                <input
                  type="text"
                  value={cuentaFormData.clabe}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, clabe: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                <input
                  type="text"
                  value={cuentaFormData.sucursal}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, sucursal: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <input
                  type="text"
                  value={cuentaFormData.cliente}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, cliente: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={cuentaFormData.telefono}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={cuentaFormData.correo}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, correo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firmante Autorizado</label>
                <input
                  type="text"
                  value={cuentaFormData.firmante}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, firmante: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700">Estado de la Cuenta</label>
                  <p className="text-xs text-gray-500">Determina si la cuenta está activa o suspendida</p>
                </div>
                <select
                  value={cuentaFormData.estatus}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, estatus: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Activa">Activa</option>
                  <option value="Suspendida">Suspendida</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditCuentaDialogOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateCuenta}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Actualizar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BancaSegundoPiso;