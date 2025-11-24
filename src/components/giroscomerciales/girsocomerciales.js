import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  Eye,
  X,
  Hash,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Check
} from 'lucide-react';

const GirosComerciales = () => {
  const navigate = useNavigate();

  const [giros, setGiros] = useState([
    {
      id: 1,
      nombreGiro: "Tecnología",
      codigo: "GC001",
      descripcion: "Empresas dedicadas al desarrollo de software, hardware y servicios tecnológicos",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:14",
      empresasAsociadas: 45,
      dominiosRelacionados: ["orion.com.mx", "techsolutions.com"],
    },
    {
      id: 2,
      nombreGiro: "Construcción",
      codigo: "GC002",
      descripcion: "Empresas del sector construcción, infraestructura y desarrollo inmobiliario",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:14",
      empresasAsociadas: 32,
      dominiosRelacionados: ["construmax.mx", "edificaciones.com"],
    },
    {
      id: 3,
      nombreGiro: "Retail",
      codigo: "GC003",
      descripcion: "Comercio al por menor, tiendas departamentales y centros comerciales",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:14",
      empresasAsociadas: 58,
      dominiosRelacionados: ["megastore.mx", "retailplus.com"],
    },
    {
      id: 4,
      nombreGiro: "Salud",
      codigo: "GC004",
      descripcion: "Instituciones de salud, hospitales, clínicas y servicios médicos",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:14",
      empresasAsociadas: 28,
      dominiosRelacionados: ["clinicamedica.mx", "saludtotal.com"],
    },
    {
      id: 5,
      nombreGiro: "Inmobiliarias",
      codigo: "GC005",
      descripcion: "Empresas dedicadas a la compra, venta y administración de bienes raíces",
      activo: false,
      fechaCreacion: "28/07/2025, 17:20:37",
      empresasAsociadas: 15,
      dominiosRelacionados: ["bienesraices.mx"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedGiroInfo, setSelectedGiroInfo] = useState(null);
  const [editingGiro, setEditingGiro] = useState(null);
  const [deletingGiro, setDeletingGiro] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditDropdownOpen, setIsEditDropdownOpen] = useState(false);
  const [showEmpresasTable, setShowEmpresasTable] = useState(false);
  const [selectedGiroEmpresas, setSelectedGiroEmpresas] = useState(null);
  const dropdownRef = useRef(null);
  const editDropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (editDropdownRef.current && !editDropdownRef.current.contains(event.target)) {
        setIsEditDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [newGiro, setNewGiro] = useState({
    nombreGiro: "",
    descripcion: "",
    activo: true,
    empresasAsociadas: 0,
    dominiosRelacionados: [],
  });

  // Lista de dominios disponibles
  const dominiosDisponibles = [
    "orion.com.mx",
    "easytransfer.com",
    "summa.mx",
    "testdomain.net",
    "techsolutions.com",
    "construmax.mx",
    "edificaciones.com",
    "megastore.mx",
    "retailplus.com",
    "clinicamedica.mx",
    "saludtotal.com",
    "bienesraices.mx",
  ];

  // Datos de empresas por giro
  const empresasPorGiro = {
    1: [ // Tecnología
      { id: 1, nombre: "Tech Solutions SA", categoria: "Tecnología", fechaCreacion: "15/01/2024", fechaVencimiento: "15/01/2025" },
      { id: 2, nombre: "Digital Innovations", categoria: "Tecnología", fechaCreacion: "20/02/2024", fechaVencimiento: "20/02/2025" },
      { id: 3, nombre: "Software Pro", categoria: "Tecnología", fechaCreacion: "10/03/2024", fechaVencimiento: "10/03/2025" },
    ],
    2: [ // Construcción
      { id: 4, nombre: "Construmax SA", categoria: "Construcción", fechaCreacion: "05/01/2024", fechaVencimiento: "05/01/2025" },
      { id: 5, nombre: "Edificaciones del Norte", categoria: "Construcción", fechaCreacion: "12/02/2024", fechaVencimiento: "12/02/2025" },
    ],
    3: [ // Retail
      { id: 6, nombre: "Mega Store", categoria: "Retail", fechaCreacion: "08/01/2024", fechaVencimiento: "08/01/2025" },
      { id: 7, nombre: "Retail Plus", categoria: "Retail", fechaCreacion: "18/03/2024", fechaVencimiento: "18/03/2025" },
      { id: 8, nombre: "Comercial Express", categoria: "Retail", fechaCreacion: "25/04/2024", fechaVencimiento: "25/04/2025" },
    ],
    4: [ // Salud
      { id: 9, nombre: "Clínica Médica", categoria: "Salud", fechaCreacion: "10/02/2024", fechaVencimiento: "10/02/2025" },
      { id: 10, nombre: "Salud Total", categoria: "Salud", fechaCreacion: "15/03/2024", fechaVencimiento: "15/03/2025" },
    ],
    5: [ // Inmobiliarias
      { id: 11, nombre: "Bienes Raíces MX", categoria: "Inmobiliarias", fechaCreacion: "20/01/2024", fechaVencimiento: "20/01/2025" },
    ],
  };

  const filteredGiros = giros.filter(
    (giro) =>
      giro.nombreGiro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      giro.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const activeGiros = giros.filter((giro) => giro.activo).length;
  const inactiveGiros = giros.filter((giro) => !giro.activo).length;
  const activityRate = giros.length > 0 ? Math.round((activeGiros / giros.length) * 100) : 0;

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGiros = filteredGiros.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGiros.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewInfo = (giro) => {
    setSelectedGiroInfo(giro);
    setShowInfoModal(true);
  };

  const handleShowEmpresas = (giro) => {
    setSelectedGiroEmpresas(giro);
    setShowEmpresasTable(true);
  };

  const handleCreateGiro = () => {
    const newId = Math.max(...giros.map((g) => g.id)) + 1;
    const giro = {
      id: newId,
      ...newGiro,
      codigo: `GC${newId.toString().padStart(3, '0')}`,
      fechaCreacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
    };
    setGiros([...giros, giro]);
    setNewGiro({ 
      nombreGiro: "", 
      descripcion: "", 
      activo: true,
      empresasAsociadas: 0,
      dominiosRelacionados: [],
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditGiro = () => {
    if (editingGiro) {
      setGiros(giros.map((giro) => (giro.id === editingGiro.id ? editingGiro : giro)));
      setEditingGiro(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteClick = (giro) => {
    setDeletingGiro(giro);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingGiro) {
      setGiros(giros.filter((giro) => giro.id !== deletingGiro.id));
      setIsDeleteDialogOpen(false);
      setDeletingGiro(null);
    }
  };

  const handleToggleStatus = (id) => {
    setGiros(giros.map((giro) => (giro.id === id ? { ...giro, activo: !giro.activo } : giro)));
  };

  const handleToggleDominio = (dominio) => {
    const isSelected = newGiro.dominiosRelacionados.includes(dominio);
    if (isSelected) {
      setNewGiro({
        ...newGiro,
        dominiosRelacionados: newGiro.dominiosRelacionados.filter(d => d !== dominio)
      });
    } else {
      setNewGiro({
        ...newGiro,
        dominiosRelacionados: [...newGiro.dominiosRelacionados, dominio]
      });
    }
  };

  const handleToggleDominioEdit = (dominio) => {
    const isSelected = (editingGiro.dominiosRelacionados || []).includes(dominio);
    if (isSelected) {
      setEditingGiro({
        ...editingGiro,
        dominiosRelacionados: (editingGiro.dominiosRelacionados || []).filter(d => d !== dominio)
      });
    } else {
      setEditingGiro({
        ...editingGiro,
        dominiosRelacionados: [...(editingGiro.dominiosRelacionados || []), dominio]
      });
    }
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
                    {currentGiros.map((giro) => (
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
                              <div 
                                className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                                onClick={() => handleShowEmpresas(giro)}
                              >
                                {giro.nombreGiro}
                              </div>
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
                              onClick={() => handleViewInfo(giro)}
                              className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                              title="Ver información"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingGiro(giro);
                                setIsEditDialogOpen(true);
                              }}
                              className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(giro)}
                              className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
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

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-600">
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredGiros.length)} de {filteredGiros.length} giros
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 text-xs border rounded transition-colors ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente
                </button>
              </div>
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

      {/* Modal de Información de Giro */}
      {showInfoModal && selectedGiroInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedGiroInfo.nombreGiro}</h2>
                    <p className="text-blue-100 text-sm">{selectedGiroInfo.descripcion}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors flex-shrink-0"
                  title="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="flex-1 p-6 overflow-y-auto">
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
                        <span className="text-sm text-gray-500">ID:</span>
                        <span className="ml-2 font-medium">#{selectedGiroInfo.id.toString().padStart(3, "0")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Estado:</span>
                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          selectedGiroInfo.activo 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {selectedGiroInfo.activo ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Fecha de Creación:</span>
                        <span className="ml-2 font-medium">{selectedGiroInfo.fechaCreacion}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Código:</span>
                        <span className="ml-2 font-medium font-mono">{selectedGiroInfo.codigo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estadísticas */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Estadísticas</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Building className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Empresas Asociadas:</span>
                        <span className="ml-2 font-medium text-blue-600">{selectedGiroInfo.empresasAsociadas}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Dominios Relacionados:</span>
                        <span className="ml-2 font-medium">{selectedGiroInfo.dominiosRelacionados.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dominios Relacionados */}
              {selectedGiroInfo.dominiosRelacionados && selectedGiroInfo.dominiosRelacionados.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Dominios Relacionados</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedGiroInfo.dominiosRelacionados.map((dominio, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {dominio}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Descripción Completa */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Descripción del Giro</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    El giro comercial <strong>{selectedGiroInfo.nombreGiro}</strong> agrupa empresas y organizaciones 
                    del sector económico correspondiente. {selectedGiroInfo.descripcion} Este giro cuenta con 
                    {selectedGiroInfo.empresasAsociadas} empresas asociadas activas en el sistema y está vinculado 
                    a {selectedGiroInfo.dominiosRelacionados.length} dominios web corporativos.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {isDeleteDialogOpen && deletingGiro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Eliminar Giro Comercial</h3>
                <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                ¿Está seguro que desea eliminar el giro comercial <strong className="text-red-700">{deletingGiro.nombreGiro}</strong>?
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Se eliminará toda la información asociada incluyendo estadísticas y relaciones con empresas.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Eliminar Giro
              </button>
            </div>
          </div>
        </div>
      )}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresas Asociadas</label>
                <input
                  type="number"
                  value={newGiro.empresasAsociadas}
                  onChange={(e) => setNewGiro({ ...newGiro, empresasAsociadas: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="relative" ref={dropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dominios Relacionados</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-left flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">
                      {newGiro.dominiosRelacionados.length > 0 
                        ? `${newGiro.dominiosRelacionados.length} dominio(s) seleccionado(s)`
                        : 'Seleccione dominios...'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                      isDropdownOpen ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {dominiosDisponibles.map((dominio) => (
                        <label
                          key={dominio}
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={newGiro.dominiosRelacionados.includes(dominio)}
                            onChange={() => handleToggleDominio(dominio)}
                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{dominio}</span>
                          {newGiro.dominiosRelacionados.includes(dominio) && (
                            <Check className="ml-auto h-4 w-4 text-blue-600" />
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {newGiro.dominiosRelacionados.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {newGiro.dominiosRelacionados.map((dominio) => (
                      <span
                        key={dominio}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {dominio}
                        <button
                          type="button"
                          onClick={() => handleToggleDominio(dominio)}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresas Asociadas</label>
                <input
                  type="number"
                  value={editingGiro.empresasAsociadas || 0}
                  onChange={(e) => setEditingGiro({ ...editingGiro, empresasAsociadas: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="relative" ref={editDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dominios Relacionados</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsEditDropdownOpen(!isEditDropdownOpen)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-left flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">
                      {(editingGiro.dominiosRelacionados || []).length > 0 
                        ? `${(editingGiro.dominiosRelacionados || []).length} dominio(s) seleccionado(s)`
                        : 'Seleccione dominios...'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                      isEditDropdownOpen ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  {isEditDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {dominiosDisponibles.map((dominio) => (
                        <label
                          key={dominio}
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={(editingGiro.dominiosRelacionados || []).includes(dominio)}
                            onChange={() => handleToggleDominioEdit(dominio)}
                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{dominio}</span>
                          {(editingGiro.dominiosRelacionados || []).includes(dominio) && (
                            <Check className="ml-auto h-4 w-4 text-blue-600" />
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {(editingGiro.dominiosRelacionados || []).length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(editingGiro.dominiosRelacionados || []).map((dominio) => (
                      <span
                        key={dominio}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {dominio}
                        <button
                          type="button"
                          onClick={() => handleToggleDominioEdit(dominio)}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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

      {/* Tabla de Empresas Relacionadas */}
      {showEmpresasTable && selectedGiroEmpresas && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{selectedGiroEmpresas.nombreGiro}</h2>
                  <p className="text-sm text-blue-100">Empresas asociadas al giro comercial</p>
                </div>
              </div>
              <button
                onClick={() => setShowEmpresasTable(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                title="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Total de Empresas: {empresasPorGiro[selectedGiroEmpresas.id]?.length || 0}
                </h3>
              </div>

              {/* Tabla */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Nombre</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Fecha Creación</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Fecha Vencimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empresasPorGiro[selectedGiroEmpresas.id]?.map((empresa) => (
                      <tr key={empresa.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-gray-900">{empresa.nombre}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {empresa.categoria}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">{empresa.fechaCreacion}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">{empresa.fechaVencimiento}</span>
                        </td>
                      </tr>
                    ))}
                    {(!empresasPorGiro[selectedGiroEmpresas.id] || empresasPorGiro[selectedGiroEmpresas.id].length === 0) && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            <Building className="h-12 w-12 mb-2" />
                            <p className="text-sm">No hay empresas asociadas a este giro</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowEmpresasTable(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GirosComerciales;