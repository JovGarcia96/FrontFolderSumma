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
  ChevronLeft,
  Eye,
  X,
  Hash,
  Calendar,
  FileText,
  Server,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Settings,
  Database
} from 'lucide-react';

const Dominios = () => {
  const navigate = useNavigate();

  const [dominios, setDominios] = useState([
    {
      id: 1,
      nombreDominio: "orion.com.mx",
      descripcion: "Dominio institucional principal",
      activo: true,
      fechaCreacion: "24/07/2025, 12:01:53",
      fechaModificacion: "24/07/2025, 12:01:53",
      registrador: "GoDaddy México",
      fechaVencimiento: "24/07/2026, 23:59:59",
      servidorDNS: "ns1.orion.com.mx, ns2.orion.com.mx",
      ssl: true,
      ipAddress: "192.168.1.100",
      hosting: "AWS México",
      administrador: "Carlos Rodríguez",
      email: "admin@orion.com.mx",
      telefono: "+52 55 1234 5678",
      categoria: "Tecnologia",
      trafico: "Alto",
      certificadoSSL: "Let's Encrypt",
      fechaRenovacion: "15/06/2025"
    },
    {
      id: 2,
      nombreDominio: "easytransfer.com",
      descripcion: "Plataforma de transferencias",
      activo: true,
      fechaCreacion: "24/07/2025, 12:01:53",
      fechaModificacion: "24/07/2025, 12:01:53",
      registrador: "Namecheap",
      fechaVencimiento: "15/12/2025, 23:59:59",
      servidorDNS: "ns1.easytransfer.com, ns2.easytransfer.com",
      ssl: true,
      ipAddress: "203.45.67.89",
      hosting: "DigitalOcean",
      administrador: "María González",
      email: "admin@easytransfer.com",
      telefono: "+52 55 9876 5432",
      categoria: "Fintech",
      trafico: "Medio",
      certificadoSSL: "Comodo SSL",
      fechaRenovacion: "01/11/2025"
    },
    {
      id: 3,
      nombreDominio: "summa.mx",
      descripcion: "Portal de servicios financieros",
      activo: true,
      fechaCreacion: "24/07/2025, 12:01:53",
      fechaModificacion: "24/07/2025, 12:01:53",
      registrador: "NIC México",
      fechaVencimiento: "30/09/2025, 23:59:59",
      servidorDNS: "ns1.summa.mx, ns2.summa.mx",
      ssl: true,
      ipAddress: "10.0.0.50",
      hosting: "Google Cloud",
      administrador: "Ana Martínez",
      email: "admin@summa.mx",
      telefono: "+52 55 5555 0000",
      categoria: "Servicios",
      trafico: "Alto",
      certificadoSSL: "DigiCert",
      fechaRenovacion: "20/08/2025"
    },
    {
      id: 4,
      nombreDominio: "testdomain.net",
      descripcion: "Dominio de pruebas",
      activo: false,
      fechaCreacion: "24/07/2025, 12:01:53",
      fechaModificacion: "24/07/2025, 12:01:53",
      registrador: "Domain.com",
      fechaVencimiento: "10/03/2026, 23:59:59",
      servidorDNS: "ns1.testdomain.net, ns2.testdomain.net",
      ssl: false,
      ipAddress: "172.16.0.10",
      hosting: "Hostinger",
      administrador: "Pedro López",
      email: "admin@testdomain.net",
      telefono: "+52 55 1111 2222",
      categoria: "Desarrollo",
      trafico: "Bajo",
      certificadoSSL: "Sin certificado",
      fechaRenovacion: "N/A"
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedDominioInfo, setSelectedDominioInfo] = useState(null);
  const [editingDominio, setEditingDominio] = useState(null);
  const [deletingDominio, setDeletingDominio] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    nombreDominio: "",
    descripcion: "",
    registrador: "",
    hosting: "",
    servidorDNS: "",
    ipAddress: "",
    administrador: "",
    email: "",
    telefono: "",
    fechaVencimiento: "",
    fechaRenovacion: "",
    categoria: "Tecnologia",
    ssl: true,
    certificadoSSL: "Let's Encrypt",
    trafico: "Medio",
  });

  // Función para manejar vista de información
  const handleViewInfo = (dominio) => {
    setSelectedDominioInfo(dominio);
    setShowInfoModal(true);
  };

  const handleCreate = () => {
    const newDominio = {
      id: Math.max(...dominios.map((d) => d.id)) + 1,
      nombreDominio: formData.nombreDominio,
      descripcion: formData.descripcion,
      activo: true,
      fechaCreacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
      fechaModificacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
      registrador: formData.registrador,
      fechaVencimiento: formData.fechaVencimiento,
      servidorDNS: formData.servidorDNS,
      ssl: formData.ssl,
      ipAddress: formData.ipAddress,
      hosting: formData.hosting,
      administrador: formData.administrador,
      email: formData.email,
      telefono: formData.telefono,
      categoria: formData.categoria,
      trafico: formData.trafico,
      certificadoSSL: formData.certificadoSSL,
      fechaRenovacion: formData.fechaRenovacion
    };
    setDominios([...dominios, newDominio]);
    setFormData({
      nombreDominio: "",
      descripcion: "",
      registrador: "",
      hosting: "",
      servidorDNS: "",
      ipAddress: "",
      administrador: "",
      email: "",
      telefono: "",
      fechaVencimiento: "",
      fechaRenovacion: "",
      categoria: "Tecnologia",
      ssl: true,
      certificadoSSL: "Let's Encrypt",
      trafico: "Medio",
    });
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (dominio) => {
    setEditingDominio(dominio);
    setFormData({
      nombreDominio: dominio.nombreDominio,
      descripcion: dominio.descripcion,
      registrador: dominio.registrador,
      hosting: dominio.hosting,
      servidorDNS: dominio.servidorDNS,
      ipAddress: dominio.ipAddress,
      administrador: dominio.administrador,
      email: dominio.email,
      telefono: dominio.telefono,
      fechaVencimiento: dominio.fechaVencimiento,
      fechaRenovacion: dominio.fechaRenovacion,
      categoria: dominio.categoria,
      ssl: dominio.ssl,
      certificadoSSL: dominio.certificadoSSL,
      trafico: dominio.trafico,
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
      setFormData({
        nombreDominio: "",
        descripcion: "",
        registrador: "",
        hosting: "",
        servidorDNS: "",
        ipAddress: "",
        administrador: "",
        email: "",
        telefono: "",
        fechaVencimiento: "",
        fechaRenovacion: "",
        categoria: "Tecnologia",
        ssl: true,
        certificadoSSL: "Let's Encrypt",
        trafico: "Medio",
      });
    }
  };

  const handleDeleteClick = (dominio) => {
    setDeletingDominio(dominio);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingDominio) {
      setDominios(dominios.filter((dom) => dom.id !== deletingDominio.id));
      setIsDeleteDialogOpen(false);
      setDeletingDominio(null);
    }
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

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDominios = dominios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dominios.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                    {currentDominios.map((dominio, index) => (
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
                            {/* Botón Ver Información */}
                            <button
                              onClick={() => handleViewInfo(dominio)}
                              className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              title="Ver información"
                            >
                              <Eye className="h-3 w-3" />
                            </button>
                            {/* Botón Editar */}
                            <button
                              onClick={() => handleEdit(dominio)}
                              className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                            {/* Botón Eliminar */}
                            <button
                              onClick={() => handleDeleteClick(dominio)}
                              className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
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

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-600">
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, dominios.length)} de {dominios.length} dominios
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

      {/* Modal de Información de Dominio */}
      {showInfoModal && selectedDominioInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedDominioInfo.nombreDominio}</h2>
                    <p className="text-blue-100 text-sm">{selectedDominioInfo.descripcion}</p>
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                        <span className="ml-2 font-medium">#{selectedDominioInfo.id.toString().padStart(3, "0")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Estado:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedDominioInfo.activo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedDominioInfo.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Fecha de Creación:</span>
                        <span className="ml-2 font-medium">{selectedDominioInfo.fechaCreacion}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Última Modificación:</span>
                        <span className="ml-2 font-medium">{selectedDominioInfo.fechaModificacion}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Categoría:</span>
                        <span className="ml-2 font-medium">{selectedDominioInfo.categoria}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Tráfico:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedDominioInfo.trafico === 'Alto' ? 'bg-red-100 text-red-800' :
                          selectedDominioInfo.trafico === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {selectedDominioInfo.trafico}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información Técnica */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Información Técnica</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Database className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-500">Registrador:</span>
                        <p className="font-medium text-sm">{selectedDominioInfo.registrador}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Server className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-500">Hosting:</span>
                        <p className="font-medium text-sm">{selectedDominioInfo.hosting}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Settings className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-500">Servidor DNS:</span>
                        <p className="font-medium text-sm">{selectedDominioInfo.servidorDNS}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Dirección IP:</span>
                        <span className="ml-2 font-medium font-mono">{selectedDominioInfo.ipAddress}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">SSL:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedDominioInfo.ssl 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedDominioInfo.ssl ? 'Habilitado' : 'Deshabilitado'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Certificado SSL:</span>
                        <span className="ml-2 font-medium">{selectedDominioInfo.certificadoSSL}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Administrador:</span>
                        <span className="ml-2 font-medium">{selectedDominioInfo.administrador}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Email:</span>
                        <span className="ml-2 font-medium text-blue-600">{selectedDominioInfo.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Teléfono:</span>
                        <span className="ml-2 font-medium">{selectedDominioInfo.telefono}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Fecha de Vencimiento:</span>
                        <span className="ml-2 font-medium">{selectedDominioInfo.fechaVencimiento}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Próxima Renovación:</span>
                        <span className="ml-2 font-medium">{selectedDominioInfo.fechaRenovacion}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información Adicional */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Información del Dominio</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    El dominio <strong>{selectedDominioInfo.nombreDominio}</strong> es parte de la infraestructura digital de la organización. 
                    Este dominio está configurado para operar con los más altos estándares de seguridad y disponibilidad, 
                    incluyendo certificados SSL válidos y configuración DNS optimizada. La gestión del dominio incluye 
                    monitoreo continuo, renovaciones automáticas y respaldos de configuración para garantizar la continuidad del servicio.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-300 flex justify-end">
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

      {/* Create Dialog */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Registrar Nuevo Dominio</h3>
              </div>
              <button onClick={() => setIsCreateDialogOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Complete la información del nuevo dominio</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Información Básica */}
              <div className="col-span-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Información Básica
                </h4>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Dominio *</label>
                <input
                  type="text"
                  value={formData.nombreDominio}
                  onChange={(e) => setFormData({ ...formData, nombreDominio: e.target.value })}
                  placeholder="Ej: empresa.com.mx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tecnologia">Tecnología</option>
                  <option value="Construccion">Construcción</option>
                  <option value="Retail">Retail</option>
                  <option value="Salud">Salud</option>
                  <option value="Inmobiliarias">Inmobiliarias</option>
                </select>
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Ej: Dominio institucional principal"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Información Técnica */}
              <div className="col-span-2 mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Información Técnica
                </h4>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registrador *</label>
                <input
                  type="text"
                  value={formData.registrador}
                  onChange={(e) => setFormData({ ...formData, registrador: e.target.value })}
                  placeholder="Ej: GoDaddy México"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hosting *</label>
                <input
                  type="text"
                  value={formData.hosting}
                  onChange={(e) => setFormData({ ...formData, hosting: e.target.value })}
                  placeholder="Ej: AWS México"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servidor DNS *</label>
                <input
                  type="text"
                  value={formData.servidorDNS}
                  onChange={(e) => setFormData({ ...formData, servidorDNS: e.target.value })}
                  placeholder="Ej: ns1.dominio.com, ns2.dominio.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección IP *</label>
                <input
                  type="text"
                  value={formData.ipAddress}
                  onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                  placeholder="Ej: 192.168.1.100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificado SSL *</label>
                <select
                  value={formData.certificadoSSL}
                  onChange={(e) => setFormData({ ...formData, certificadoSSL: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Let's Encrypt">Let's Encrypt</option>
                  <option value="Comodo SSL">Comodo SSL</option>
                  <option value="DigiCert">DigiCert</option>
                  <option value="Sin certificado">Sin certificado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tráfico Estimado</label>
                <select
                  value={formData.trafico}
                  onChange={(e) => setFormData({ ...formData, trafico: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Bajo">Bajo</option>
                  <option value="Medio">Medio</option>
                  <option value="Alto">Alto</option>
                </select>
              </div>

              {/* Información de Contacto */}
              <div className="col-span-2 mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Información de Contacto
                </h4>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Administrador *</label>
                <input
                  type="text"
                  value={formData.administrador}
                  onChange={(e) => setFormData({ ...formData, administrador: e.target.value })}
                  placeholder="Ej: Carlos Rodríguez"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ej: admin@dominio.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="Ej: +52 55 1234 5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento *</label>
                <input
                  type="text"
                  value={formData.fechaVencimiento}
                  onChange={(e) => setFormData({ ...formData, fechaVencimiento: e.target.value })}
                  placeholder="Ej: 24/07/2026, 23:59:59"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Próxima Renovación</label>
                <input
                  type="text"
                  value={formData.fechaRenovacion}
                  onChange={(e) => setFormData({ ...formData, fechaRenovacion: e.target.value })}
                  placeholder="Ej: 15/06/2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ssl"
                  checked={formData.ssl}
                  onChange={(e) => setFormData({ ...formData, ssl: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="ssl" className="text-sm font-medium text-gray-700">SSL Habilitado</label>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Editar Dominio</h3>
              </div>
              <button onClick={() => setIsEditDialogOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Modifique la información del dominio</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Información Básica */}
              <div className="col-span-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Información Básica
                </h4>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Dominio *</label>
                <input
                  type="text"
                  value={formData.nombreDominio}
                  onChange={(e) => setFormData({ ...formData, nombreDominio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tecnologia">Tecnología</option>
                  <option value="Construccion">Construcción</option>
                  <option value="Retail">Retail</option>
                  <option value="Salud">Salud</option>
                  <option value="Inmobiliarias">Inmobiliarias</option>
                </select>
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Información Técnica */}
              <div className="col-span-2 mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Información Técnica
                </h4>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registrador *</label>
                <input
                  type="text"
                  value={formData.registrador}
                  onChange={(e) => setFormData({ ...formData, registrador: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hosting *</label>
                <input
                  type="text"
                  value={formData.hosting}
                  onChange={(e) => setFormData({ ...formData, hosting: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servidor DNS *</label>
                <input
                  type="text"
                  value={formData.servidorDNS}
                  onChange={(e) => setFormData({ ...formData, servidorDNS: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección IP *</label>
                <input
                  type="text"
                  value={formData.ipAddress}
                  onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificado SSL *</label>
                <select
                  value={formData.certificadoSSL}
                  onChange={(e) => setFormData({ ...formData, certificadoSSL: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Let's Encrypt">Let's Encrypt</option>
                  <option value="Comodo SSL">Comodo SSL</option>
                  <option value="DigiCert">DigiCert</option>
                  <option value="Sin certificado">Sin certificado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tráfico Estimado</label>
                <select
                  value={formData.trafico}
                  onChange={(e) => setFormData({ ...formData, trafico: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Bajo">Bajo</option>
                  <option value="Medio">Medio</option>
                  <option value="Alto">Alto</option>
                </select>
              </div>

              {/* Información de Contacto */}
              <div className="col-span-2 mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Información de Contacto
                </h4>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Administrador *</label>
                <input
                  type="text"
                  value={formData.administrador}
                  onChange={(e) => setFormData({ ...formData, administrador: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento *</label>
                <input
                  type="text"
                  value={formData.fechaVencimiento}
                  onChange={(e) => setFormData({ ...formData, fechaVencimiento: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Próxima Renovación</label>
                <input
                  type="text"
                  value={formData.fechaRenovacion}
                  onChange={(e) => setFormData({ ...formData, fechaRenovacion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ssl-edit"
                  checked={formData.ssl}
                  onChange={(e) => setFormData({ ...formData, ssl: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="ssl-edit" className="text-sm font-medium text-gray-700">SSL Habilitado</label>
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

      {/* Delete Dialog */}
      {isDeleteDialogOpen && deletingDominio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Eliminar Dominio</h3>
                <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                ¿Está seguro que desea eliminar el dominio <strong className="text-red-700">{deletingDominio.nombreDominio}</strong>?
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Se eliminará toda la información asociada incluyendo configuraciones técnicas y datos de contacto.
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
                Eliminar Dominio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dominios;