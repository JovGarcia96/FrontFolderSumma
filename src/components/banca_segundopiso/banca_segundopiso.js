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

  // Estados para modales
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedPlataformaInfo, setSelectedPlataformaInfo] = useState(null);

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
      direccion: "Av. Paseo de la Reforma 250, Col. Juárez, Ciudad de México",
      telefono: "+52 55 1234 5678",
      email: "contacto@klu.mx",
      sitioWeb: "www.klu.mx",
      rfc: "KLU970519DU8",
      representanteLegal: "María González López",
      cuentas: [
        {
          id: 1,
          numeroCuenta: "1234567890123456",
          clabe: "012345678901234567",
          sucursal: "Centro Histórico",
          cliente: "Grupo Summa S.A. de C.V.",
          telefono: "+52 55 1234 5678",
          correo: "juan.perez@email.com",
          domicilio: "Av. Paseo de la Reforma 250, Juárez, CDMX",
          firmante: "María González López",
          estatus: "Activa"
        },
        {
          id: 2,
          numeroCuenta: "1234567890123457",
          clabe: "012345678901234568",
          sucursal: "Polanco",
          cliente: "Summa Financiera S.A.",
          telefono: "+52 55 8765 4321",
          correo: "ana.martinez@email.com",
          domicilio: "Av. Presidente Masaryk 111, Polanco, CDMX",
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
      direccion: "Av. Santa Fe 495, Col. Cruz Manca, Ciudad de México",
      telefono: "+52 55 2345 6789",
      email: "contacto@netpay.mx",
      sitioWeb: "www.netpay.mx",
      rfc: "NET970519DU9",
      representanteLegal: "Carlos Rodríguez Sánchez",
      cuentas: [
        {
          id: 3,
          numeroCuenta: "2345678901234567",
          clabe: "012345678901234569",
          sucursal: "Santa Fe",
          cliente: "Grupo Summa S.A. de C.V.",
          telefono: "+52 55 2345 6789",
          correo: "roberto.silva@email.com",
          domicilio: "Av. Santa Fe 495, Santa Fe, CDMX",
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
      direccion: "Av. Universidad 1200, Col. Xoco, Ciudad de México",
      telefono: "+52 55 3456 7890",
      email: "contacto@nu.mx",
      sitioWeb: "www.nu.mx",
      rfc: "NUB970519DU0",
      representanteLegal: "Patricia López Hernández",
      cuentas: [
        {
          id: 4,
          numeroCuenta: "3456789012345678",
          clabe: "012345678901234570",
          sucursal: "Roma Norte",
          cliente: "Grupo Summa S.A. de C.V.",
          telefono: "+52 55 3456 7890",
          correo: "patricia.lopez@email.com",
          domicilio: "Av. Álvaro Obregón 185, Roma Norte, CDMX",
          firmante: "Miguel Ángel Vargas",
          estatus: "Suspendida"
        },
        {
          id: 5,
          numeroCuenta: "3456789012345679",
          clabe: "012345678901234571",
          sucursal: "Condesa",
          cliente: "Summa Financiera S.A.",
          telefono: "+52 55 4567 8901",
          correo: "fernando.morales@email.com",
          domicilio: "Av. Nuevo León 150, Condesa, CDMX",
          firmante: "Isabel Ramírez Flores",
          estatus: "Activa"
        }
      ]
    },
    {
      id: 4,
      nombrePlataforma: "KLAR",
      descripcion: "Aplicación de banca móvil",
      activo: false,
      fechaCreacion: "24/07/2025, 12:02:46",
      direccion: "Av. Insurgentes Sur 1602, Col. Crédito Constructor, Ciudad de México",
      telefono: "+52 55 4567 8901",
      email: "contacto@klar.mx",
      sitioWeb: "www.klar.mx",
      rfc: "KLA970519DU1",
      representanteLegal: "Diego Herrera Campos",
      cuentas: [
        {
          id: 6,
          numeroCuenta: "4567890123456789",
          clabe: "012345678901234572",
          sucursal: "Insurgentes Sur",
          cliente: "Grupo Summa S.A. de C.V.",
          telefono: "+52 55 5678 9012",
          correo: "alejandra.ruiz@email.com",
          domicilio: "Av. Insurgentes Sur 1605, San José Insurgentes, CDMX",
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
  const [isViewCuentaDialogOpen, setIsViewCuentaDialogOpen] = useState(false);
  const [isDeleteCuentaDialogOpen, setIsDeleteCuentaDialogOpen] = useState(false);
  const [viewingCuenta, setViewingCuenta] = useState(null);
  const [deletingCuentaId, setDeletingCuentaId] = useState(null);
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
    domicilio: "",
    firmante: "",
    estatus: "Activa"
  });

  // Función para manejar vista de información
  const handleViewInfo = (plataforma) => {
    setSelectedPlataformaInfo(plataforma);
    setShowInfoModal(true);
  };

  const handleCreate = () => {
    const newPlataforma = {
      id: Math.max(...plataformas.map((p) => p.id)) + 1,
      nombrePlataforma: formData.nombrePlataforma,
      descripcion: formData.descripcion,
      activo: formData.activo,
      fechaCreacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
      direccion: "Dirección por definir",
      telefono: "+52 55 0000 0000",
      email: "contacto@plataforma.mx",
      sitioWeb: "www.plataforma.mx",
      rfc: "PLT970519DU0",
      representanteLegal: "Por definir",
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
      domicilio: "",
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
      domicilio: cuenta.domicilio || "",
      firmante: cuenta.firmante,
      estatus: cuenta.estatus
    });
    setIsEditCuentaDialogOpen(true);
  };

  // Nueva función para ver detalles de cuenta
  const handleViewCuenta = (cuenta) => {
    setViewingCuenta(cuenta);
    setIsViewCuentaDialogOpen(true);
  };

  // Nueva función para abrir modal de eliminar
  const openDeleteModal = (cuentaId) => {
    setDeletingCuentaId(cuentaId);
    setIsDeleteCuentaDialogOpen(true);
  };

  // Nueva función para confirmar eliminación
  const confirmDeleteCuenta = () => {
    if (!deletingCuentaId || !selectedPlataforma) return;
    
    const updatedCuentas = selectedPlataforma.cuentas.filter(cuenta => cuenta.id !== deletingCuentaId);
    const updatedPlataforma = { ...selectedPlataforma, cuentas: updatedCuentas };
    
    const updatedPlataformas = plataformas.map(plataforma =>
      plataforma.id === selectedPlataforma.id ? updatedPlataforma : plataforma
    );
    
    setPlataformas(updatedPlataformas);
    setSelectedPlataforma(updatedPlataforma);
    setIsDeleteCuentaDialogOpen(false);
    setDeletingCuentaId(null);
  };

  const handleUpdateCuenta = () => {
    if (!editingCuenta || !selectedPlataforma) return;
    
    const updatedCuentas = selectedPlataforma.cuentas.map(cuenta =>
      cuenta.id === editingCuenta.id ? { ...cuenta, ...cuentaFormData } : cuenta
    );
    
    const updatedPlataforma = { ...selectedPlataforma, cuentas: updatedCuentas };
    
    const updatedPlataformas = plataformas.map(plataforma =>
      plataforma.id === selectedPlataforma.id ? updatedPlataforma : plataforma
    );
    
    setPlataformas(updatedPlataformas);
    setSelectedPlataforma(updatedPlataforma);
    setEditingCuenta(null);
    setCuentaFormData({
      numeroCuenta: "",
      clabe: "",
      sucursal: "",
      cliente: "",
      telefono: "",
      correo: "",
      domicilio: "",
      firmante: "",
      estatus: "Activa"
    });
    setIsEditCuentaDialogOpen(false);
  };

  const handleDeleteCuenta = (cuentaId) => {
    if (!selectedPlataforma) return;
    
    const updatedCuentas = selectedPlataforma.cuentas.filter(cuenta => cuenta.id !== cuentaId);
    const updatedPlataforma = { ...selectedPlataforma, cuentas: updatedCuentas };
    
    const updatedPlataformas = plataformas.map(plataforma =>
      plataforma.id === selectedPlataforma.id ? updatedPlataforma : plataforma
    );
    
    setPlataformas(updatedPlataformas);
    setSelectedPlataforma(updatedPlataforma);
  };

  const toggleCuentaEstatus = (cuentaId) => {
    if (!selectedPlataforma) return;
    
    const updatedCuentas = selectedPlataforma.cuentas.map(cuenta =>
      cuenta.id === cuentaId 
        ? { ...cuenta, estatus: cuenta.estatus === 'Activa' ? 'Suspendida' : 'Activa' }
        : cuenta
    );
    
    const updatedPlataforma = { ...selectedPlataforma, cuentas: updatedCuentas };
    
    const updatedPlataformas = plataformas.map(plataforma =>
      plataforma.id === selectedPlataforma.id ? updatedPlataforma : plataforma
    );
    
    setPlataformas(updatedPlataformas);
    setSelectedPlataforma(updatedPlataforma);
  };

  // Calcular estadísticas
  const totalPlataformas = plataformas.length;
  const plataformasActivas = plataformas.filter(p => p.activo).length;
  const plataformasInactivas = totalPlataformas - plataformasActivas;
  const tasaActividad = totalPlataformas > 0 ? ((plataformasActivas / totalPlataformas) * 100).toFixed(1) : 0;

  // Calcular estadísticas de carpetas
  const totalCategorias = carpetas.length;
  const totalDocumentos = carpetas.reduce((sum, carpeta) => sum + carpeta.documentos, 0);
  const instituciones = 6; // Número fijo de instituciones
  const disponibilidad = "99.9%"; // Disponibilidad del sistema

  // Filtrar elementos según el término de búsqueda
  const filteredCarpetas = carpetas.filter(carpeta => 
    carpeta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carpeta.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPlataformas = plataformas.filter(plataforma => 
    plataforma.nombrePlataforma.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plataforma.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
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
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al Inicio
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-xl p-6 text-white shadow-xl mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Banca Segundo Piso</h1>
                <p className="text-blue-100 mt-1">Plataforma integral de gestión financiera con tecnología de vanguardia</p>
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-blue-100">Sistema Activo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-100">Seguridad Bancaria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-blue-100">Multi-Institución</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-100 px-6">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveView("carpetas")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeView === "carpetas"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <FolderOpen className="h-4 w-4" />
                  Gestión de Carpetas
                </button>
                <button
                  onClick={() => setActiveView("plataformas")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeView === "plataformas"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  Gestión de Plataformas
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={activeView === "carpetas" ? "Buscar en documentos financieros..." : "Buscar plataformas..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contenido condicional basado en la vista activa */}
          <div className="px-6 py-6">
            {activeView === "carpetas" && (
              <>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Categorías Activas</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{totalCategorias}</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FolderOpen className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Documentos</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{totalDocumentos}</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Instituciones</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{instituciones}</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Disponibilidad</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{disponibilidad}</p>
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
              <>
                {/* Stats Cards para Plataformas - Diseño como Banca Primer Piso */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total de Plataformas</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{totalPlataformas}</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Smartphone className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Plataformas Activas</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{plataformasActivas}</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Plataformas Inactivas</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{plataformasInactivas}</p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-lg">
                        <Ban className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tasa de Actividad</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{tasaActividad}%</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabla de Plataformas - Diseño como Gestión de Bancos */}
                <Card className="shadow-sm">
                  <CardHeader className="border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">Registro de Plataformas Fintech</CardTitle>
                          <CardDescription>Listado completo de plataformas financieras digitales registradas en el sistema</CardDescription>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Registrar Nueva Plataforma
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Plataforma Fintech</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Código</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Estado Operativo</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha de Registro</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPlataformas.map((plataforma, index) => (
                            <tr key={plataforma.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                              <td className="py-3 px-4">
                                <span className="text-sm text-gray-600 font-mono">
                                  #{plataforma.id.toString().padStart(3, "0")}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {getPlatformIcon(plataforma.nombrePlataforma) ? (
                                      <img 
                                        src={getPlatformIcon(plataforma.nombrePlataforma)}
                                        alt={`${plataforma.nombrePlataforma} logo`}
                                        className="w-8 h-8 object-contain"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                          e.target.nextSibling.style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    <div className={`w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center ${getPlatformIcon(plataforma.nombrePlataforma) ? 'hidden' : ''}`}>
                                      <Smartphone className="h-4 w-4 text-blue-600" />
                                    </div>
                                  </div>
                                  <div>
                                    <button
                                      onClick={() => handlePlataformaClick(plataforma)}
                                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left"
                                    >
                                      {plataforma.nombrePlataforma}
                                    </button>
                                    <div className="text-xs text-gray-500">{plataforma.descripcion}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm text-gray-600">
                                  FT{plataforma.id.toString().padStart(3, "0")}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
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
                              <td className="py-3 px-4">
                                <span className="text-sm text-gray-600 font-mono">{plataforma.fechaCreacion}</span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-center gap-2">
                                  {/* Botón Ver Información */}
                                  <button
                                    onClick={() => handleViewInfo(plataforma)}
                                    className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                                    title="Ver información"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  {/* Botón Editar */}
                                  <button
                                    onClick={() => handleEdit(plataforma)}
                                    className="text-green-600 hover:text-green-800 transition-colors p-1"
                                    title="Editar"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  {/* Botón Eliminar */}
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`¿Está seguro que desea eliminar la plataforma "${plataforma.nombrePlataforma}"?`)) {
                                        handleDelete(plataforma.id);
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-800 transition-colors p-1"
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
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Correo Electrónico</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Teléfono</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Firmante</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Domicilio</th>
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
                                <div className="text-xs text-gray-500">{cuenta.sucursal}</div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-900">{cuenta.correo || 'No especificado'}</td>
                              <td className="py-3 px-4 text-sm text-gray-900">{cuenta.telefono || 'No especificado'}</td>
                              <td className="py-3 px-4 text-sm text-gray-900">{cuenta.firmante || 'No especificado'}</td>
                              <td className="py-3 px-4 text-sm text-gray-900">
                                <div className="max-w-xs truncate" title={cuenta.domicilio}>
                                  {cuenta.domicilio || 'No especificado'}
                                </div>
                              </td>
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
                                    onClick={() => handleViewCuenta(cuenta)}
                                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                    title="Ver"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleEditCuenta(cuenta)}
                                    className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                                    title="Editar"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => openDeleteModal(cuenta.id)}
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

      {/* Modal de Información de Plataforma */}
      {showInfoModal && selectedPlataformaInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedPlataformaInfo.nombrePlataforma}</h2>
                    <p className="text-blue-100 text-sm">{selectedPlataformaInfo.descripcion}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información Básica */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Hash className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Hash className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Código:</span>
                        <span className="ml-2 font-medium">FT{selectedPlataformaInfo.id.toString().padStart(3, "0")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Estado:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedPlataformaInfo.activo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedPlataformaInfo.activo ? 'Operativo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Fecha de Registro:</span>
                        <span className="ml-2 font-medium">{selectedPlataformaInfo.fechaCreacion}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Representante Legal:</span>
                        <span className="ml-2 font-medium">{selectedPlataformaInfo.representanteLegal}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-500">Dirección:</span>
                        <p className="font-medium text-sm">{selectedPlataformaInfo.direccion}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Teléfono:</span>
                        <span className="ml-2 font-medium">{selectedPlataformaInfo.telefono}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Email:</span>
                        <span className="ml-2 font-medium">{selectedPlataformaInfo.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Sitio Web:</span>
                        <span className="ml-2 font-medium text-blue-600">{selectedPlataformaInfo.sitioWeb}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">RFC:</span>
                        <span className="ml-2 font-medium">{selectedPlataformaInfo.rfc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estadísticas de Cuentas */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Estadísticas de Cuentas</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedPlataformaInfo.cuentas.length}
                    </div>
                    <div className="text-sm text-blue-600">Total de Cuentas</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedPlataformaInfo.cuentas.filter(c => c.estatus === 'Activa').length}
                    </div>
                    <div className="text-sm text-green-600">Cuentas Activas</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedPlataformaInfo.cuentas.filter(c => c.estatus === 'Suspendida').length}
                    </div>
                    <div className="text-sm text-red-600">Cuentas Inactivas</div>
                  </div>
                </div>
              </div>

              {/* Cuentas Asociadas */}
              {selectedPlataformaInfo.cuentas.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Hash className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Cuentas Asociadas</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Cuenta</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Cliente</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Sucursal</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPlataformaInfo.cuentas.map((cuenta) => (
                          <tr key={cuenta.id} className="border-b border-gray-100">
                            <td className="py-2 px-3 font-mono text-xs">{cuenta.numeroCuenta}</td>
                            <td className="py-2 px-3">{cuenta.cliente}</td>
                            <td className="py-2 px-3">{cuenta.sucursal}</td>
                            <td className="py-2 px-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                cuenta.estatus === 'Activa' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {cuenta.estatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                disabled={!formData.nombrePlataforma || !formData.descripcion}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Registrar Plataforma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog para Plataformas */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Edit className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Editar Plataforma Fintech</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Modifique la información de la plataforma financiera digital</p>
            
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
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                disabled={!formData.nombrePlataforma || !formData.descripcion}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Agregar Nueva Cuenta</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Complete la información requerida para registrar una nueva cuenta bancaria</p>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                  <input
                    type="text"
                    value={cuentaFormData.numeroCuenta}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, numeroCuenta: e.target.value })}
                    placeholder="1234567890123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CLABE</label>
                  <input
                    type="text"
                    value={cuentaFormData.clabe}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, clabe: e.target.value })}
                    placeholder="012345678901234567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                  <input
                    type="text"
                    value={cuentaFormData.sucursal}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, sucursal: e.target.value })}
                    placeholder="Centro Histórico"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <input
                    type="text"
                    value={cuentaFormData.cliente}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, cliente: e.target.value })}
                    placeholder="Nombre del cliente"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={cuentaFormData.telefono}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, telefono: e.target.value })}
                    placeholder="+52 55 1234 5678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                  <input
                    type="email"
                    value={cuentaFormData.correo}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, correo: e.target.value })}
                    placeholder="cliente@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Domicilio del Cliente</label>
                <input
                  type="text"
                  value={cuentaFormData.domicilio}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, domicilio: e.target.value })}
                  placeholder="Calle, número, colonia, ciudad"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firmante</label>
                <input
                  type="text"
                  value={cuentaFormData.firmante}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, firmante: e.target.value })}
                  placeholder="Nombre del firmante autorizado"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estatus</label>
                <select
                  value={cuentaFormData.estatus}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, estatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                disabled={!cuentaFormData.numeroCuenta || !cuentaFormData.clabe || !cuentaFormData.cliente}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Agregar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog para Cuentas */}
      {isEditCuentaDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Edit className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Editar Cuenta</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Modifique la información de la cuenta bancaria</p>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                  <input
                    type="text"
                    value={cuentaFormData.numeroCuenta}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, numeroCuenta: e.target.value })}
                    placeholder="1234567890123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CLABE</label>
                  <input
                    type="text"
                    value={cuentaFormData.clabe}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, clabe: e.target.value })}
                    placeholder="012345678901234567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                  <input
                    type="text"
                    value={cuentaFormData.sucursal}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, sucursal: e.target.value })}
                    placeholder="Centro Histórico"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <input
                    type="text"
                    value={cuentaFormData.cliente}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, cliente: e.target.value })}
                    placeholder="Nombre del cliente"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={cuentaFormData.telefono}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, telefono: e.target.value })}
                    placeholder="+52 55 1234 5678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                  <input
                    type="email"
                    value={cuentaFormData.correo}
                    onChange={(e) => setCuentaFormData({ ...cuentaFormData, correo: e.target.value })}
                    placeholder="cliente@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Domicilio del Cliente</label>
                <input
                  type="text"
                  value={cuentaFormData.domicilio}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, domicilio: e.target.value })}
                  placeholder="Calle, número, colonia, ciudad"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firmante</label>
                <input
                  type="text"
                  value={cuentaFormData.firmante}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, firmante: e.target.value })}
                  placeholder="Nombre del firmante autorizado"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estatus</label>
                <select
                  value={cuentaFormData.estatus}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, estatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                disabled={!cuentaFormData.numeroCuenta || !cuentaFormData.clabe || !cuentaFormData.cliente}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Actualizar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Ver Detalles de Cuenta */}
      {isViewCuentaDialogOpen && viewingCuenta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Detalles de la Cuenta</h3>
              </div>
              <button
                onClick={() => setIsViewCuentaDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Número de Cuenta</p>
                  <p className="font-semibold text-gray-800">{viewingCuenta.numeroCuenta}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">CLABE</p>
                  <p className="font-semibold text-gray-800">{viewingCuenta.clabe}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Sucursal</p>
                  <p className="font-semibold text-gray-800">{viewingCuenta.sucursal}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Cliente</p>
                  <p className="font-semibold text-gray-800">{viewingCuenta.cliente}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                  <p className="font-semibold text-gray-800">{viewingCuenta.telefono || 'No especificado'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Correo Electrónico</p>
                  <p className="font-semibold text-gray-800">{viewingCuenta.correo || 'No especificado'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600 mb-1">Domicilio del Cliente</p>
                <p className="font-semibold text-gray-800">{viewingCuenta.domicilio || 'No especificado'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Firmante</p>
                  <p className="font-semibold text-gray-800">{viewingCuenta.firmante}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Estatus</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    viewingCuenta.estatus === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {viewingCuenta.estatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsViewCuentaDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Confirmar Eliminación de Cuenta */}
      {isDeleteCuentaDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Eliminar Cuenta</h3>
                <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                ¿Está seguro que desea eliminar esta cuenta bancaria? Todos los datos asociados se perderán permanentemente.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsDeleteCuentaDialogOpen(false);
                  setDeletingCuentaId(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteCuenta}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BancaSegundoPiso;