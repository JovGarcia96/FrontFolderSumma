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
  Building2,
  ChevronLeft,
  CreditCard,
  FolderOpen,
  Search,
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
  Ban,
  Info,
  Clock,
  UserCheck
} from 'lucide-react';

const BancaPrimerPiso = () => {
  const navigate = useNavigate();
  
  // Estados para las nuevas funcionalidades
  const [activeView, setActiveView] = useState("carpetas"); // "carpetas" o "bancos"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBanco, setSelectedBanco] = useState(null);
  const [showCuentasView, setShowCuentasView] = useState(false);

  // Mapeo de iconos para cada banco
  const bankIcons = {
    'BBVA': '/assets/logos/bbva.png',
    'SANTANDER': '/assets/logos/santander.png',
    'BANAMEX': '/assets/logos/banamex.png',
    'BANORTE': '/assets/logos/banorte.png',
    'HSBC': '/assets/logos/hsbc.png'
  };

  const [bancos, setBancos] = useState([
    {
      id: 1,
      nombreBanco: "BBVA",
      descripcion: "Banco Bilbao Vizcaya Argentaria México",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      codigo: "FT001",
      direccion: "Av. Universidad 1200, Col. Xoco, Ciudad de México",
      telefono: "+52 55 5621 3344",
      email: "contacto@bbva.mx",
      sitioWeb: "www.bbva.mx",
      representanteLegal: "Carlos Rodríguez Mendoza",
      rfc: "BBV970519DU8",
      cuentas: [
        {
          id: 1,
          numeroCuenta: "0123456789012345",
          clabe: "012345678901234567",
          sucursal: "Centro Histórico",
          cliente: "Grupo Summa S.A. de C.V.",
          telefono: "+52 55 1234 5678",
          correo: "tesoreria@gruposumma.com",
          firmante: "María González López",
          estatus: "Activa"
        },
        {
          id: 2,
          numeroCuenta: "0123456789012346",
          clabe: "012345678901234568",
          sucursal: "Polanco",
          cliente: "Summa Financiera S.A.",
          telefono: "+52 55 8765 4321",
          correo: "operaciones@summafinanciera.com",
          firmante: "Carlos Rodríguez Sánchez",
          estatus: "Activa"
        }
      ]
    },
    {
      id: 2,
      nombreBanco: "SANTANDER",
      descripcion: "Banco Santander México S.A.",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      codigo: "FT002",
      direccion: "Av. Vasco de Quiroga 3900, Santa Fe, Ciudad de México",
      telefono: "+52 55 5269 6000",
      email: "atencion@santander.com.mx",
      sitioWeb: "www.santander.com.mx",
      representanteLegal: "Ana Patricia Jiménez",
      rfc: "SAN850315KL2",
      cuentas: [
        {
          id: 3,
          numeroCuenta: "6543210987654321",
          clabe: "014321098765432109",
          sucursal: "Santa Fe",
          cliente: "Summa Capital S.A. de C.V.",
          telefono: "+52 55 2345 6789",
          correo: "capital@summacapital.com",
          firmante: "Laura Jiménez Torres",
          estatus: "Activa"
        }
      ]
    },
    {
      id: 3,
      nombreBanco: "BANAMEX",
      descripcion: "Banco Nacional de México S.A.",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      codigo: "FT003",
      direccion: "Av. Isabel la Católica 44, Centro Histórico, Ciudad de México",
      telefono: "+52 55 1226 2663",
      email: "contacto@banamex.com",
      sitioWeb: "www.banamex.com",
      representanteLegal: "Miguel Ángel Herrera",
      rfc: "BNM921201QW5",
      cuentas: [
        {
          id: 4,
          numeroCuenta: "9876543210123456",
          clabe: "002876543210123456",
          sucursal: "Roma Norte",
          cliente: "Summa Inversiones S.A.",
          telefono: "+52 55 3456 7890",
          correo: "inversiones@summainversiones.com",
          firmante: "Miguel Ángel Vargas",
          estatus: "Suspendida"
        },
        {
          id: 5,
          numeroCuenta: "9876543210123457",
          clabe: "002876543210123457",
          sucursal: "Condesa",
          cliente: "Summa Holdings S.A. de C.V.",
          telefono: "+52 55 4567 8901",
          correo: "holdings@summaholdings.com",
          firmante: "Isabel Ramírez Flores",
          estatus: "Activa"
        }
      ]
    },
    {
      id: 4,
      nombreBanco: "BANORTE",
      descripcion: "Banco Mercantil del Norte S.A.",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      codigo: "FT004",
      direccion: "Av. Revolución 3000, San Ángel, Ciudad de México",
      telefono: "+52 81 8319 5000",
      email: "atencion@banorte.com",
      sitioWeb: "www.banorte.com",
      representanteLegal: "Diego Herrera Campos",
      rfc: "BMN880425RT7",
      cuentas: [
        {
          id: 6,
          numeroCuenta: "1357924680135792",
          clabe: "072135792468013579",
          sucursal: "Insurgentes Sur",
          cliente: "Summa Corporativo S.A.",
          telefono: "+52 55 5678 9012",
          correo: "corporativo@summacorp.com",
          firmante: "Diego Herrera Campos",
          estatus: "Activa"
        }
      ]
    },
    {
      id: 5,
      nombreBanco: "HSBC",
      descripcion: "HSBC México S.A.",
      activo: false,
      fechaCreacion: "24/07/2025, 12:02:46",
      codigo: "FT005",
      direccion: "Av. Paseo de la Reforma 347, Cuauhtémoc, Ciudad de México",
      telefono: "+52 55 5721 2222",
      email: "contacto@hsbc.com.mx",
      sitioWeb: "www.hsbc.com.mx",
      representanteLegal: "Ana Patricia Moreno",
      rfc: "HSB750618YU3",
      cuentas: [
        {
          id: 7,
          numeroCuenta: "2468013579246801",
          clabe: "021468013579246801",
          sucursal: "Interlomas",
          cliente: "Summa Servicios S.A. de C.V.",
          telefono: "+52 55 6789 0123",
          correo: "servicios@summaservicios.com",
          firmante: "Ana Patricia Moreno",
          estatus: "Inactiva"
        }
      ]
    }
  ]);

  // Mock data for folders - Adaptado para Banca Primer Piso
  const [carpetas, setCarpetas] = useState([
    {
      id: 1,
      nombre: "Contratos Bancarios",
      descripcion: "Contratos y convenios con bancos tradicionales",
      documentos: 52,
      fechaActualizacion: "15/01/2025",
      color: "blue",
      borderColor: "border-blue-500"
    },
    {
      id: 2,
      nombre: "Estados de Cuenta",
      descripcion: "Estados de cuenta mensuales de cuentas corporativas",
      documentos: 156,
      fechaActualizacion: "10/01/2025",
      color: "green",
      borderColor: "border-green-500"
    },
    {
      id: 3,
      nombre: "Líneas de Crédito",
      descripcion: "Documentación de líneas de crédito autorizadas",
      documentos: 28,
      fechaActualizacion: "08/01/2025",
      color: "purple",
      borderColor: "border-purple-500"
    },
    {
      id: 4,
      nombre: "Garantías Bancarias",
      descripcion: "Cartas de crédito y garantías bancarias",
      documentos: 34,
      fechaActualizacion: "05/01/2025",
      color: "orange",
      borderColor: "border-orange-500"
    },
    {
      id: 5,
      nombre: "Operaciones Internacionales",
      descripcion: "Documentos de comercio exterior y divisas",
      documentos: 19,
      fechaActualizacion: "03/01/2025",
      color: "red",
      borderColor: "border-red-500"
    },
    {
      id: 6,
      nombre: "Reportes Regulatorios",
      descripcion: "Reportes a CNBV y otras autoridades financieras",
      documentos: 41,
      fechaActualizacion: "01/01/2025",
      color: "gray",
      borderColor: "border-gray-500"
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateCuentaDialogOpen, setIsCreateCuentaDialogOpen] = useState(false);
  const [isEditCuentaDialogOpen, setIsEditCuentaDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false); // Nuevo estado para modal de información
  const [viewingBanco, setViewingBanco] = useState(null); // Banco que se está viendo
  const [editingBanco, setEditingBanco] = useState(null);
  const [editingCuenta, setEditingCuenta] = useState(null);
  const [formData, setFormData] = useState({
    nombreBanco: "",
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
    const newBanco = {
      id: Math.max(...bancos.map((b) => b.id)) + 1,
      nombreBanco: formData.nombreBanco,
      descripcion: formData.descripcion,
      activo: formData.activo,
      fechaCreacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
      codigo: `FT${String(bancos.length + 1).padStart(3, '0')}`,
      direccion: "",
      telefono: "",
      email: "",
      sitioWeb: "",
      representanteLegal: "",
      rfc: "",
      cuentas: []
    };
    setBancos([...bancos, newBanco]);
    setFormData({ nombreBanco: "", descripcion: "", activo: true });
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (banco) => {
    setEditingBanco(banco);
    setFormData({
      nombreBanco: banco.nombreBanco,
      descripcion: banco.descripcion,
      activo: banco.activo,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editingBanco) {
      setBancos(
        bancos.map((banco) =>
          banco.id === editingBanco.id ? { ...banco, ...formData } : banco,
        ),
      );
      setEditingBanco(null);
      setFormData({ nombreBanco: "", descripcion: "", activo: true });
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = (id) => {
    setBancos(bancos.filter((banco) => banco.id !== id));
  };

  const toggleActivo = (id) => {
    setBancos(
      bancos.map((banco) =>
        banco.id === id ? { ...banco, activo: !banco.activo } : banco,
      ),
    );
  };

  // Nueva función para mostrar información del banco
  const handleViewInfo = (banco) => {
    setViewingBanco(banco);
    setIsInfoDialogOpen(true);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para obtener el icono del banco
  const getBankIcon = (bankName) => {
    return bankIcons[bankName.toUpperCase()] || null;
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

  // Función para manejar clic en banco
  const handleBancoClick = (banco) => {
    setSelectedBanco(banco);
    setShowCuentasView(true);
  };

  // Función para volver a la vista de bancos
  const handleBackToBancos = () => {
    setShowCuentasView(false);
    setSelectedBanco(null);
  };

  // Funciones para CRUD de cuentas
  const handleCreateCuenta = () => {
    if (!selectedBanco) return;
    
    const newCuenta = {
      id: Math.max(...selectedBanco.cuentas.map((c) => c.id), 0) + 1,
      ...cuentaFormData
    };
    
    const updatedBancos = bancos.map(banco => 
      banco.id === selectedBanco.id 
        ? { ...banco, cuentas: [...banco.cuentas, newCuenta] }
        : banco
    );
    
    setBancos(updatedBancos);
    setSelectedBanco({ ...selectedBanco, cuentas: [...selectedBanco.cuentas, newCuenta] });
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
    setCuentaFormData(cuenta);
    setIsEditCuentaDialogOpen(true);
  };

  const handleUpdateCuenta = () => {
    if (!editingCuenta || !selectedBanco) return;
    
    const updatedCuentas = selectedBanco.cuentas.map(cuenta =>
      cuenta.id === editingCuenta.id ? { ...cuenta, ...cuentaFormData } : cuenta
    );
    
    const updatedBancos = bancos.map(banco =>
      banco.id === selectedBanco.id ? { ...banco, cuentas: updatedCuentas } : banco
    );
    
    setBancos(updatedBancos);
    setSelectedBanco({ ...selectedBanco, cuentas: updatedCuentas });
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

  const handleDeleteCuenta = (cuentaId) => {
    if (!selectedBanco) return;
    
    const updatedCuentas = selectedBanco.cuentas.filter(cuenta => cuenta.id !== cuentaId);
    const updatedBancos = bancos.map(banco =>
      banco.id === selectedBanco.id ? { ...banco, cuentas: updatedCuentas } : banco
    );
    
    setBancos(updatedBancos);
    setSelectedBanco({ ...selectedBanco, cuentas: updatedCuentas });
  };

  // Filtros para búsqueda
  const filteredBancos = bancos.filter(banco =>
    banco.nombreBanco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    banco.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCarpetas = carpetas.filter(carpeta =>
    carpeta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carpeta.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas calculadas
  const totalBancos = bancos.length;
  const bancosActivos = bancos.filter(b => b.activo).length;
  const bancosInactivos = totalBancos - bancosActivos;
  const tasaActividad = totalBancos > 0 ? Math.round((bancosActivos / totalBancos) * 100) : 0;

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
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Banca Primer Piso</h1>
                  <p className="text-blue-200 mt-1">Gestión integral de operaciones bancarias tradicionales</p>
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
                  onClick={() => setActiveView("bancos")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeView === "bancos"
                      ? "bg-blue-900 text-white"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  Gestión de Bancos
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    activeView === "bancos" ? "Buscar bancos..." :
                    "Buscar en documentos bancarios..."
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
                        <p className="text-3xl font-bold text-gray-900 mb-1">330</p>
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
                        <p className="text-3xl font-bold text-gray-900 mb-1">5</p>
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
                        <p className="text-3xl font-bold text-gray-900 mb-1">99.8%</p>
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
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
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

            {activeView === "bancos" && !showCuentasView && (
              /* Vista de Gestión de Bancos */
              <>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total de Bancos</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{totalBancos}</p>
                        <p className="text-xs text-gray-500">Bancos registrados</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Bancos Activos</p>
                        <p className="text-3xl font-bold text-green-600 mb-1">{bancosActivos}</p>
                        <p className="text-xs text-gray-500">Operando normalmente</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Bancos Inactivos</p>
                        <p className="text-3xl font-bold text-red-600 mb-1">{bancosInactivos}</p>
                        <p className="text-xs text-gray-500">Suspendidos temporalmente</p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-lg">
                        <Ban className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tasa de Actividad</p>
                        <p className="text-3xl font-bold text-blue-600 mb-1">{tasaActividad}%</p>
                        <p className="text-xs text-gray-500">Bancos operativos</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Header con botón de crear */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      Registro de Bancos Tradicionales
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Listado completo de bancos tradicionales registrados en el sistema</p>
                  </div>
                  <button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Registrar Nueva Plataforma
                  </button>
                </div>

                {/* Tabla de Bancos */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Banco Fintech</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Código</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Estado Operativo</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha de Registro</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredBancos.map((banco, index) => (
                          <tr key={banco.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <span className="text-sm font-medium text-gray-900">#{String(index + 1).padStart(3, '0')}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleBancoClick(banco)}>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <Building2 className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{banco.nombreBanco}</div>
                                  <div className="text-sm text-gray-500">{banco.descripcion}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-900">{banco.codigo}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  banco.activo 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {banco.activo ? 'Operativo' : 'Inactivo'}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={banco.activo}
                                    onChange={() => toggleActivo(banco.id)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-500">{banco.fechaCreacion}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleViewInfo(banco)}
                                  className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Ver información"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleEdit(banco)}
                                  className="p-1 text-green-600 hover:text-green-800 transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(banco.id)}
                                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
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
              </>
            )}

            {showCuentasView && selectedBanco && (
              /* Vista de Cuentas del Banco Seleccionado */
              <>
                {/* Header de navegación */}
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={handleBackToBancos}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Bancos
                  </button>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Cuentas de {selectedBanco.nombreBanco}</h2>
                    <p className="text-sm text-gray-600">{selectedBanco.descripcion}</p>
                  </div>
                </div>

                {/* Botón para crear nueva cuenta */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setIsCreateCuentaDialogOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Nueva Cuenta
                  </button>
                </div>

                {/* Tabla de Cuentas */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Número de Cuenta</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">CLABE</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Sucursal</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedBanco.cuentas.map((cuenta) => (
                          <tr key={cuenta.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-gray-400" />
                                <span className="font-mono text-sm">{cuenta.numeroCuenta}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-mono text-sm text-gray-600">{cuenta.clabe}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <div className="font-medium text-gray-900">{cuenta.cliente}</div>
                                <div className="text-sm text-gray-500">{cuenta.correo}</div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{cuenta.sucursal}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                cuenta.estatus === 'Activa' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {cuenta.estatus}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditCuenta(cuenta)}
                                  className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCuenta(cuenta.id)}
                                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
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
                  
                  {selectedBanco.cuentas.length === 0 && (
                    <div className="text-center py-12">
                      <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No hay cuentas registradas</h3>
                      <p className="text-gray-500 mb-4">Comienza agregando la primera cuenta para este banco.</p>
                      <button
                        onClick={() => setIsCreateCuentaDialogOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Crear Primera Cuenta
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Modal de Información del Banco */}
      {isInfoDialogOpen && viewingBanco && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{viewingBanco.nombreBanco}</h3>
                  <p className="text-sm text-gray-600">{viewingBanco.descripcion}</p>
                </div>
              </div>
              <button
                onClick={() => setIsInfoDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Información General */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Información Básica */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Información Básica
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Código:</span>
                    <span className="text-sm font-medium text-gray-900">{viewingBanco.codigo}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Estado:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      viewingBanco.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {viewingBanco.activo ? 'Operativo' : 'Inactivo'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Fecha de Registro:</span>
                    <span className="text-sm font-medium text-gray-900">{viewingBanco.fechaCreacion}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Representante Legal:</span>
                    <span className="text-sm font-medium text-gray-900">{viewingBanco.representanteLegal}</span>
                  </div>
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  Información de Contacto
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Dirección:</span>
                    <span className="text-sm font-medium text-gray-900">{viewingBanco.direccion}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Teléfono:</span>
                    <span className="text-sm font-medium text-gray-900">{viewingBanco.telefono}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-medium text-gray-900">{viewingBanco.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Sitio Web:</span>
                    <span className="text-sm font-medium text-blue-600">{viewingBanco.sitioWeb}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">RFC:</span>
                    <span className="text-sm font-medium text-gray-900">{viewingBanco.rfc}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas de Cuentas */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Estadísticas de Cuentas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{viewingBanco.cuentas.length}</div>
                  <div className="text-sm text-gray-600">Total de Cuentas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {viewingBanco.cuentas.filter(c => c.estatus === 'Activa').length}
                  </div>
                  <div className="text-sm text-gray-600">Cuentas Activas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {viewingBanco.cuentas.filter(c => c.estatus !== 'Activa').length}
                  </div>
                  <div className="text-sm text-gray-600">Cuentas Inactivas</div>
                </div>
              </div>
            </div>

            {/* Lista de Cuentas */}
            {viewingBanco.cuentas.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Hash className="h-5 w-5 text-purple-600" />
                  Cuentas Asociadas
                </h4>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-900">Cuenta</th>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-900">Cliente</th>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-900">Sucursal</th>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-900">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {viewingBanco.cuentas.map((cuenta) => (
                          <tr key={cuenta.id} className="hover:bg-gray-50">
                            <td className="py-2 px-3">
                              <span className="font-mono text-xs">{cuenta.numeroCuenta}</span>
                            </td>
                            <td className="py-2 px-3">
                              <span className="text-xs text-gray-900">{cuenta.cliente}</span>
                            </td>
                            <td className="py-2 px-3">
                              <span className="text-xs text-gray-600">{cuenta.sucursal}</span>
                            </td>
                            <td className="py-2 px-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
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
              </div>
            )}

            {/* Botón de cerrar */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsInfoDialogOpen(false)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Crear Banco */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Crear Nuevo Banco</h3>
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Banco *
                </label>
                <input
                  type="text"
                  value={formData.nombreBanco}
                  onChange={(e) => setFormData({ ...formData, nombreBanco: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: BBVA México"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Descripción del banco..."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activo"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="activo" className="text-sm text-gray-700">
                  Banco activo
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                disabled={!formData.nombreBanco.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
              >
                Crear Banco
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Banco */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Editar Banco</h3>
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Banco *
                </label>
                <input
                  type="text"
                  value={formData.nombreBanco}
                  onChange={(e) => setFormData({ ...formData, nombreBanco: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editActivo"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="editActivo" className="text-sm text-gray-700">
                  Banco activo
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                disabled={!formData.nombreBanco.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
              >
                Actualizar Banco
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Crear Cuenta */}
      {isCreateCuentaDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Crear Nueva Cuenta - {selectedBanco?.nombreBanco}
              </h3>
              <button
                onClick={() => setIsCreateCuentaDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Cuenta *
                </label>
                <input
                  type="text"
                  value={cuentaFormData.numeroCuenta}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, numeroCuenta: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1234567890123456"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CLABE *
                </label>
                <input
                  type="text"
                  value={cuentaFormData.clabe}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, clabe: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="012345678901234567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sucursal *
                </label>
                <input
                  type="text"
                  value={cuentaFormData.sucursal}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, sucursal: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Centro Histórico"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente *
                </label>
                <input
                  type="text"
                  value={cuentaFormData.cliente}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, cliente: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nombre del cliente"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={cuentaFormData.telefono}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+52 55 1234 5678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={cuentaFormData.correo}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, correo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="cliente@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firmante
                </label>
                <input
                  type="text"
                  value={cuentaFormData.firmante}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, firmante: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nombre del firmante"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={cuentaFormData.estatus}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, estatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Activa">Activa</option>
                  <option value="Suspendida">Suspendida</option>
                  <option value="Inactiva">Inactiva</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsCreateCuentaDialogOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCuenta}
                disabled={!cuentaFormData.numeroCuenta.trim() || !cuentaFormData.clabe.trim() || !cuentaFormData.cliente.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Cuenta */}
      {isEditCuentaDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Editar Cuenta - {selectedBanco?.nombreBanco}
              </h3>
              <button
                onClick={() => setIsEditCuentaDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Cuenta *
                </label>
                <input
                  type="text"
                  value={cuentaFormData.numeroCuenta}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, numeroCuenta: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CLABE *
                </label>
                <input
                  type="text"
                  value={cuentaFormData.clabe}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, clabe: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sucursal *
                </label>
                <input
                  type="text"
                  value={cuentaFormData.sucursal}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, sucursal: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente *
                </label>
                <input
                  type="text"
                  value={cuentaFormData.cliente}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, cliente: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={cuentaFormData.telefono}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={cuentaFormData.correo}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, correo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firmante
                </label>
                <input
                  type="text"
                  value={cuentaFormData.firmante}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, firmante: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={cuentaFormData.estatus}
                  onChange={(e) => setCuentaFormData({ ...cuentaFormData, estatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Activa">Activa</option>
                  <option value="Suspendida">Suspendida</option>
                  <option value="Inactiva">Inactiva</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditCuentaDialogOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateCuenta}
                disabled={!cuentaFormData.numeroCuenta.trim() || !cuentaFormData.clabe.trim() || !cuentaFormData.cliente.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
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

export default BancaPrimerPiso;