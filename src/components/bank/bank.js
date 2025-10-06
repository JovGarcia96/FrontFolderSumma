import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Building2, 
  Home, 
  Shield, 
  TrendingUp, 
  Users, 
  Banknote,
  ArrowLeft,
  X,
  ExternalLink
} from 'lucide-react';

// Importar iconos de bancos con nombres exactos
import banorteIcon from '../../assets/logos/banorte.png';
import banregioIcon from '../../assets/logos/banregio.webp';
import bbvaIcon from '../../assets/logos/bbva.webp';
import fondeadoraIcon from '../../assets/logos/fondeadora.webp';
import hsbcIcon from '../../assets/logos/hsbc.jpg';
import logobanbajiIcon from '../../assets/logos/logo_banbajio.webp';
import logoIcon from '../../assets/logos/logo.png';
import santanderIcon from '../../assets/logos/santander.jpg';
import scotiabankIcon from '../../assets/logos/scotiabank.png';
import aztecabankIcon from '../../assets/logos/bancoazteca.png';

// Componente de diálogo extraído 
const CreateDialog = React.memo(({ 
  isOpen, 
  onClose, 
  formData, 
  onNombreBancoChange, 
  onCodigoBancoChange, 
  onActivoChange, 
  onCreate,
  isFormValid 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Registrar Nueva Entidad Bancaria
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          Complete la información requerida para registrar una nueva institución financiera en el sistema.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Banco
            </label>
            <input
              type="text"
              value={formData.nombreBanco}
              onChange={onNombreBancoChange}
              placeholder="Ej: BBVA"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de Identificación
            </label>
            <input
              type="text"
              value={formData.codigoBanco}
              onChange={onCodigoBancoChange}
              placeholder="Ej: BN001, BBVA002, SCO003"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              autoComplete="off"
              maxLength={10}
            />
            <p className="text-xs text-gray-500 mt-1">
              Ingrese un código único para identificar la entidad bancaria
            </p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-700">Estado Operativo</label>
              <p className="text-xs text-gray-500">Determina si la entidad está habilitada para operaciones</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.activo}
                onChange={onActivoChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onCreate}
            disabled={!isFormValid}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Registrar Entidad
          </button>
        </div>
      </div>
    </div>
  );
});

// Componente de diálogo de edición extraído y memoizado
const EditDialog = React.memo(({ 
  isOpen, 
  onClose, 
  formData, 
  onNombreBancoChange, 
  onCodigoBancoChange, 
  onActivoChange, 
  onUpdate,
  isFormValid 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Modificar Entidad Bancaria
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          Actualice la información de la institución financiera seleccionada.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Banco
            </label>
            <input
              type="text"
              value={formData.nombreBanco}
              onChange={onNombreBancoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de Identificación
            </label>
            <input
              type="text"
              value={formData.codigoBanco}
              onChange={onCodigoBancoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              autoComplete="off"
              maxLength={10}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-700">Estado Operativo</label>
              <p className="text-xs text-gray-500">Determina si la entidad está habilitada para operaciones</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.activo}
                onChange={onActivoChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onUpdate}
            disabled={!isFormValid}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Actualizar Entidad
          </button>
        </div>
      </div>
    </div>
  );
});

// Componente de diálogo de eliminación extraído y memoizado
const DeleteDialog = React.memo(({ isOpen, onClose, onDelete, deletingBanco }) => {
  if (!isOpen || !deletingBanco) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ¿Confirmar eliminación?
        </h2>
        
        <p className="text-gray-600 text-sm mb-6">
          Esta acción eliminará permanentemente la entidad bancaria "{deletingBanco.nombreBanco}" del sistema. Esta operación no se puede deshacer.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Eliminar Entidad
          </button>
        </div>
      </div>
    </div>
  );
});

const Bank = () => {
  const navigate = useNavigate();
  
  const [bancos, setBancos] = useState([
    {
      id: 1,
      nombreBanco: "BANCO AZTECA",
      codigoBanco: "BN001",
      activo: true,
      fechaCreacion: "2025-07-24 12:02:14.370",
      icono: aztecabankIcon
    },
    {
      id: 2,
      nombreBanco: "BBVA",
      codigoBanco: "BBVA002",
      activo: true,
      fechaCreacion: "2025-07-24 12:02:14.400",
      icono: bbvaIcon
    },
    {
      id: 3,
      nombreBanco: "Santander",
      codigoBanco: "SAN003",
      activo: true,
      fechaCreacion: "2025-07-24 12:02:14.400",
      icono: santanderIcon
    },
    {
      id: 4,
      nombreBanco: "HSBC",
      codigoBanco: "HSBC004",
      activo: true,
      fechaCreacion: "2025-07-24 12:02:14.400",
      icono: hsbcIcon
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingBanco, setEditingBanco] = useState(null);
  const [deletingBanco, setDeletingBanco] = useState(null);
  const [formData, setFormData] = useState({
    nombreBanco: "",
    codigoBanco: "",
    activo: true,
  });

  // Función para obtener el icono del banco - memoizada
  const getBankIcon = useCallback((nombreBanco) => {
    const bankIcons = {
      "Scotiabank": scotiabankIcon,
      "BBVA": bbvaIcon,
      "Santander": santanderIcon,
      "HSBC": hsbcIcon,
      "Banorte": banorteIcon,
      "Banregio": banregioIcon,
      "Fondeadora": fondeadoraIcon,
      "Banbajio": logobanbajiIcon,
      "BCP": bbvaIcon,
      "Banco de la Nación": logoIcon
    };
    
    return bankIcons[nombreBanco] || logoIcon;
  }, []);

  // Validar que el código no esté duplicado - memoizada
  const isCodigoDuplicado = useCallback((codigo, excludeId = null) => {
    return bancos.some(banco => 
      banco.codigoBanco.toLowerCase() === codigo.toLowerCase() && 
      banco.id !== excludeId
    );
  }, [bancos]);

  // Handlers optimizados con useCallback
  const handleNombreBancoChange = useCallback((e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, nombreBanco: value }));
  }, []);

  const handleCodigoBancoChange = useCallback((e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, codigoBanco: value }));
  }, []);

  const handleActivoChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, activo: e.target.checked }));
  }, []);

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // Validación del formulario memoizada
  const isFormValid = useMemo(() => {
    return formData.nombreBanco.trim() && formData.codigoBanco.trim();
  }, [formData.nombreBanco, formData.codigoBanco]);

  // Estadísticas calculadas memoizadas
  const stats = useMemo(() => {
    const totalEntidades = bancos.length;
    const entidadesActivas = bancos.filter(banco => banco.activo).length;
    const entidadesInactivas = totalEntidades - entidadesActivas;
    const tasaActividad = totalEntidades > 0 ? Math.round((entidadesActivas / totalEntidades) * 100) : 0;
    
    return {
      totalEntidades,
      entidadesActivas,
      entidadesInactivas,
      tasaActividad
    };
  }, [bancos]);

  // Handlers de acciones memoizados
  const handleCreate = useCallback(() => {
    if (!formData.nombreBanco.trim()) {
      alert("Por favor ingrese el nombre del banco");
      return;
    }

    if (!formData.codigoBanco.trim()) {
      alert("Por favor ingrese el código de identificación");
      return;
    }

    if (isCodigoDuplicado(formData.codigoBanco.trim())) {
      alert("El código de identificación ya existe. Por favor ingrese uno diferente.");
      return;
    }

    const newBanco = {
      id: Math.max(...bancos.map((b) => b.id)) + 1,
      nombreBanco: formData.nombreBanco.trim(),
      codigoBanco: formData.codigoBanco.trim().toUpperCase(),
      activo: formData.activo,
      fechaCreacion: new Date().toISOString().replace("T", " ").slice(0, 23),
      icono: getBankIcon(formData.nombreBanco.trim())
    };
    setBancos(prev => [...prev, newBanco]);
    setFormData({ nombreBanco: "", codigoBanco: "", activo: true });
    setIsCreateDialogOpen(false);
  }, [formData, bancos, isCodigoDuplicado, getBankIcon]);

  const handleEdit = useCallback((banco) => {
    setEditingBanco(banco);
    setFormData({
      nombreBanco: banco.nombreBanco,
      codigoBanco: banco.codigoBanco,
      activo: banco.activo,
    });
    setIsEditDialogOpen(true);
  }, []);

  const handleUpdate = useCallback(() => {
    if (!formData.nombreBanco.trim()) {
      alert("Por favor ingrese el nombre del banco");
      return;
    }

    if (!formData.codigoBanco.trim()) {
      alert("Por favor ingrese el código de identificación");
      return;
    }

    if (isCodigoDuplicado(formData.codigoBanco.trim(), editingBanco?.id)) {
      alert("El código de identificación ya existe. Por favor ingrese uno diferente.");
      return;
    }

    if (editingBanco) {
      setBancos(prev => prev.map((banco) => (banco.id === editingBanco.id ? { 
        ...banco, 
        nombreBanco: formData.nombreBanco.trim(),
        codigoBanco: formData.codigoBanco.trim().toUpperCase(),
        activo: formData.activo,
        icono: getBankIcon(formData.nombreBanco.trim())
      } : banco)));
      setEditingBanco(null);
      setFormData({ nombreBanco: "", codigoBanco: "", activo: true });
      setIsEditDialogOpen(false);
    }
  }, [formData, editingBanco, isCodigoDuplicado, getBankIcon]);

  const handleDeleteClick = useCallback((banco) => {
    setDeletingBanco(banco);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (deletingBanco) {
      setBancos(prev => prev.filter((banco) => banco.id !== deletingBanco.id));
      setDeletingBanco(null);
      setIsDeleteDialogOpen(false);
    }
  }, [deletingBanco]);

  const toggleActivo = useCallback((id) => {
    setBancos(prev => prev.map((banco) => (banco.id === id ? { ...banco, activo: !banco.activo } : banco)));
  }, []);

  // Handlers para cerrar diálogos memoizados
  const handleCloseCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(false);
    setFormData({ nombreBanco: "", codigoBanco: "", activo: true });
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
    setEditingBanco(null);
    setFormData({ nombreBanco: "", codigoBanco: "", activo: true });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setDeletingBanco(null);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Breadcrumb */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <button 
            onClick={() => handleNavigation('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Inicio
          </button>
        </div>

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Gestión de Entidades Bancarias</h1>
                    <p className="text-blue-100 mt-2">
                      Sistema integral para la administración y control de instituciones financieras
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  Registrar Nueva Entidad
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total de Entidades</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalEntidades}</p>
                      <p className="text-xs text-gray-500">Instituciones registradas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Entidades Activas</p>
                      <p className="text-2xl font-bold text-green-600">{stats.entidadesActivas}</p>
                      <p className="text-xs text-gray-500">Operando normalmente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Entidades Inactivas</p>
                      <p className="text-2xl font-bold text-red-600">{stats.entidadesInactivas}</p>
                      <p className="text-xs text-gray-500">Suspendidas temporalmente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tasa de Actividad</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.tasaActividad}%</p>
                      <p className="text-xs text-gray-500">Entidades operativas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table Section */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Registro de Entidades Bancarias</CardTitle>
                    <CardDescription>
                      Listado completo de instituciones financieras registradas en el sistema
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Entidad Bancaria</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Código</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Estado Operativo</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha de Registro</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bancos.map((banco) => (
                        <tr key={banco.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <span className="text-sm font-mono text-gray-600">#{banco.id.toString().padStart(3, '0')}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <img 
                                  src={banco.icono} 
                                  alt={banco.nombreBanco}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.target.src = logoIcon;
                                  }}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{banco.nombreBanco}</p>
                                <p className="text-sm text-gray-500">Institución Financiera</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm font-mono text-gray-600">{banco.codigoBanco}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
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
                            <span className="text-sm text-gray-600">
                              {new Date(banco.fechaCreacion).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                              })}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(banco)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(banco)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        </main>

        {/* Footer - ALINEADO CON SIDEBAR */}
        <footer className="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-3">
          <div className="text-xs text-gray-500">
            © 2025 FinDrive. Todos los derechos reservados.
          </div>
          <div className="text-xs text-gray-500">
            Sistema de gestión documental financiera
          </div>
        </footer>
      </div>

      {/* Diálogos optimizados */}
      <CreateDialog
        isOpen={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
        formData={formData}
        onNombreBancoChange={handleNombreBancoChange}
        onCodigoBancoChange={handleCodigoBancoChange}
        onActivoChange={handleActivoChange}
        onCreate={handleCreate}
        isFormValid={isFormValid}
      />

      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        formData={formData}
        onNombreBancoChange={handleNombreBancoChange}
        onCodigoBancoChange={handleCodigoBancoChange}
        onActivoChange={handleActivoChange}
        onUpdate={handleUpdate}
        isFormValid={isFormValid}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDelete}
        deletingBanco={deletingBanco}
      />
    </div>
  );
};

export default Bank;
