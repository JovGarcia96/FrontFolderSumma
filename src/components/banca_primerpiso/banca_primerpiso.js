import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  CreditCard,
  FolderOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  ChevronLeft,
  ArrowLeft,
  Building2,
  Users,
  Phone,
  Mail,
  MapPin,
  Hash,
  User,
  FileText,
  Eye,
  X,
  CheckCircle,
  Shield,
  Globe,
  Calendar
} from 'lucide-react';

const BancaPrimerPiso = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("carpetas"); // "carpetas" o "bancario"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [showAccountDetail, setShowAccountDetail] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Mock data for banks
  const [bancos, setBancos] = useState([
    {
      id: 1,
      codigo: "BN001",
      nombre: "BANCO AZTECA",
      descripcion: "Institución Financiera",
      activo: true,
      fechaRegistro: "24/07/2025, 12:02:14",
      logo: "/assets/logos/banco_azteca.png",
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
      codigo: "BBVA002",
      nombre: "BBVA",
      descripcion: "Institución Financiera",
      activo: true,
      fechaRegistro: "24/07/2025, 12:02:14",
      logo: "/assets/logos/bbva.webp",
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
      codigo: "SAN003",
      nombre: "Santander",
      descripcion: "Institución Financiera",
      activo: true,
      fechaRegistro: "24/07/2025, 12:02:14",
      logo: "/assets/logos/santander.jpg",
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
      codigo: "HSBC004",
      nombre: "HSBC",
      descripcion: "Institución Financiera",
      activo: true,
      fechaRegistro: "24/07/2025, 12:02:14",
      logo: "/assets/logos/hsbc.jpg",
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
    }
  ]);

  // Mock data for folders - Diseño de la imagen
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBankClick = (banco) => {
    setSelectedBank(banco);
  };

  const handleAccountClick = (cuenta) => {
    setSelectedAccount(cuenta);
    setShowAccountDetail(true);
  };

  const handleBackToBanks = () => {
    setSelectedBank(null);
  };

  const handleCloseAccountDetail = () => {
    setShowAccountDetail(false);
    setSelectedAccount(null);
  };

  const filteredBancos = bancos.filter(banco =>
    banco.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    banco.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCarpetas = carpetas.filter(carpeta =>
    carpeta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carpeta.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalCuentas = () => {
    return bancos.reduce((total, banco) => total + banco.cuentas.length, 0);
  };

  const getCuentasActivas = () => {
    return bancos.reduce((total, banco) => 
      total + banco.cuentas.filter(cuenta => cuenta.estatus === "Activa").length, 0
    );
  };

  const getTotalDocumentos = () => {
    return carpetas.reduce((total, carpeta) => total + carpeta.documentos, 0);
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

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {activeView === "carpetas" ? (
            /* Vista de Carpetas - Diseño de la imagen */
            <div className="h-full bg-white">
              {/* Header con diseño de la imagen */}
             <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-xl p-6 text-white shadow-xl mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <CreditCard className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white">Banca Primer Piso</h1>
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
                      onClick={() => setActiveView("bancario")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        activeView === "bancario"
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <Building2 className="h-4 w-4" />
                      Módulo Bancario
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar en documentos financieros..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="px-6 py-6">
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

                {/* Folders Grid - Diseño de la imagen */}
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
                        <h3 className="font-semibold text-gray-900 mb-2">{carpeta.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-4">{carpeta.descripcion}</p>

                        {/* Fecha de actualización */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                          <Calendar className="h-3 w-3" />
                          <span>Última actualización: {carpeta.fechaActualizacion}</span>
                        </div>

                        {/* Botón de acción */}
                        <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                          <Eye className="h-4 w-4" />
                          Acceder a Documentos
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Vista Bancaria - Funcionalidad original */
            <div className="p-6">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-xl p-6 text-white shadow-xl mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold">Gestión de Entidades Bancarias</h1>
                      <p className="text-blue-200 mt-1">
                        Sistema integral para la administración y control de instituciones financieras
                      </p>
                    </div>
                  </div>
                  <button 
                    className="bg-white text-blue-900 hover:bg-blue-50 font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Registrar Nueva Entidad
                  </button>
                </div>
              </div>
                 <div className="border-b border-gray-200 px-6">
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
                      onClick={() => setActiveView("bancario")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        activeView === "bancario"
                          ? "bg-blue-900 text-white"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <Building2 className="h-4 w-4" />
                      Módulo Bancario
                    </button>
                  </div>
                </div>
              </div>
           

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar bancos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Total de Entidades */}
                <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total de Entidades</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{bancos.length}</p>
                        <p className="text-xs text-gray-500">Instituciones registradas</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Building2 className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Entidades Activas */}
                <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Entidades Activas</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{bancos.filter(b => b.activo).length}</p>
                        <p className="text-xs text-gray-500">Operando normalmente</p>
                      </div>
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Total de Cuentas */}
                <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total de Cuentas</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{getTotalCuentas()}</p>
                        <p className="text-xs text-gray-500">Cuentas registradas</p>
                      </div>
                      <div className="flex-shrink-0">
                        <CreditCard className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cuentas Activas */}
                <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Cuentas Activas</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{getCuentasActivas()}</p>
                        <p className="text-xs text-gray-500">En operación</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-orange-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Banks Table or Account Details */}
              {!selectedBank ? (
                /* Banks Table */
                <Card className="shadow-sm">
                  <CardHeader className="border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">Registro de Entidades Bancarias</CardTitle>
                        <CardDescription>Listado completo de instituciones financieras registradas en el sistema</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Entidad Bancaria</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Código</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Estado Operativo</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha de Registro</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBancos.map((banco, index) => (
                            <tr key={banco.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                              <td className="py-3 px-4 text-sm text-gray-900">#{banco.codigo.slice(-3)}</td>
                              <td className="py-2 px-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img 
                                      src={banco.logo}
                                      alt={`${banco.nombre} logo`}
                                      className="w-6 h-6 object-contain"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                      }}
                                    />
                                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center hidden">
                                      <Building2 className="h-3 w-3 text-blue-600" />
                                    </div>
                                  </div>
                                  <div>
                                    <button 
                                      onClick={() => handleBankClick(banco)}
                                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                    >
                                      {banco.nombre}
                                    </button>
                                    <div className="text-xs text-gray-500">{banco.descripcion}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-900">{banco.codigo}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    banco.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {banco.activo ? 'Operativo' : 'Inactivo'}
                                  </span>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={banco.activo}
                                      onChange={() => {
                                        const updatedBancos = bancos.map(b => 
                                          b.id === banco.id ? { ...b, activo: !b.activo } : b
                                        );
                                        setBancos(updatedBancos);
                                      }}
                                      className="sr-only"
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors ${banco.activo ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${banco.activo ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
                                    </div>
                                  </label>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-900">{banco.fechaRegistro}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors">
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors">
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
              ) : (
                /* Account Details */
                <div>
                  <div className="mb-4">
                    <button 
                      onClick={handleBackToBanks}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Volver a Entidades Bancarias
                    </button>
                  </div>

                  <Card className="shadow-sm">
                    <CardHeader className="border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">Cuentas de {selectedBank.nombre}</CardTitle>
                          <CardDescription>Listado de cuentas bancarias asociadas a esta institución</CardDescription>
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
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedBank.cuentas.map((cuenta, index) => (
                              <tr key={cuenta.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                <td className="py-3 px-4">
                                  <button 
                                    onClick={() => handleAccountClick(cuenta)}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                  >
                                    {cuenta.numeroCuenta}
                                  </button>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-900">{cuenta.cliente}</td>
                                <td className="py-3 px-4 text-sm text-gray-900">{cuenta.sucursal}</td>
                                <td className="py-3 px-4">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    cuenta.estatus === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {cuenta.estatus}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => handleAccountClick(cuenta)}
                                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </button>
                                    <button className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors">
                                      <Edit className="h-4 w-4" />
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
                   {/* Footer */}
       
                </div>

                
              )}
            </div>
          )}
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

      {/* Account Detail Modal */}
      {showAccountDetail && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Detalles de la Cuenta</h2>
              <button 
                onClick={handleCloseAccountDetail}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedAccount.numeroCuenta}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CLABE Interbancaria</label>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedAccount.clabe}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedAccount.sucursal}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedAccount.cliente}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedAccount.telefono}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedAccount.correo}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firmante Autorizado</label>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedAccount.firmante}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estatus</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedAccount.estatus === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedAccount.estatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button 
                onClick={handleCloseAccountDetail}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                Editar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BancaPrimerPiso;