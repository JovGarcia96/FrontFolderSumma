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
  ExternalLink,
  Eye,
  CheckCircle,
  Globe,
  Calendar,
  Hash,
  User,
  FileText,
  Phone,
  Mail,
  MapPin
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
            Editar Entidad Bancaria
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          Modifique la información de la institución financiera seleccionada.
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
      nombreBanco: "BBVA",
      codigoBanco: "F001",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      icono: bbvaIcon,
      direccion: "Av. Universidad 1200, Col. Xoco, Ciudad de México",
      telefono: "+52 55 5621 3344",
      email: "contacto@bbva.mx",
      sitioWeb: "www.bbva.mx",
      rfc: "BBV970519DU8",
      representanteLegal: "Carlos Rodríguez Hernández",
      descripcion: "Banco Bilbao Vizcaya Argentaria México"
    },
    {
      id: 2,
      nombreBanco: "SANTANDER",
      codigoBanco: "F002",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      icono: santanderIcon,
      direccion: "Av. Santa Fe 495, Col. Cruz Manca, Ciudad de México",
      telefono: "+52 55 5269 6000",
      email: "contacto@santander.mx",
      sitioWeb: "www.santander.mx",
      rfc: "SAN970519DU9",
      representanteLegal: "María González López",
      descripcion: "Banco Santander México S.A."
    },
    {
      id: 3,
      nombreBanco: "BANAMEX",
      codigoBanco: "F003",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      icono: logoIcon,
      direccion: "Av. Paseo de la Reforma 250, Col. Juárez, Ciudad de México",
      telefono: "+52 55 1226 8000",
      email: "contacto@banamex.mx",
      sitioWeb: "www.banamex.mx",
      rfc: "BAN970519DU0",
      representanteLegal: "Patricia López Hernández",
      descripcion: "Banco Nacional de México S.A."
    },
    {
      id: 4,
      nombreBanco: "BANORTE",
      codigoBanco: "F004",
      activo: true,
      fechaCreacion: "24/07/2025, 12:02:46",
      icono: banorteIcon,
      direccion: "Av. Insurgentes Sur 1602, Col. Crédito Constructor, Ciudad de México",
      telefono: "+52 81 8319 5000",
      email: "contacto@banorte.mx",
      sitioWeb: "www.banorte.mx",
      rfc: "BNO970519DU1",
      representanteLegal: "Diego Herrera Campos",
      descripcion: "Banco Mercantil del Norte S.A."
    },
    {
      id: 5,
      nombreBanco: "HSBC",
      codigoBanco: "F005",
      activo: false,
      fechaCreacion: "24/07/2025, 12:02:46",
      icono: hsbcIcon,
      direccion: "Av. Ejército Nacional 843, Col. Granada, Ciudad de México",
      telefono: "+52 55 5721 2222",
      email: "contacto@hsbc.mx",
      sitioWeb: "www.hsbc.mx",
      rfc: "HSB970519DU2",
      representanteLegal: "Ana Martínez Ruiz",
      descripcion: "HSBC México S.A."
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedBancoInfo, setSelectedBancoInfo] = useState(null);
  const [editingBanco, setEditingBanco] = useState(null);
  const [deletingBanco, setDeletingBanco] = useState(null);
  const [formData, setFormData] = useState({
    nombreBanco: "",
    codigoBanco: "",
    activo: true,
  });

  // Función para manejar vista de información
  const handleViewInfo = (banco) => {
    setSelectedBancoInfo(banco);
    setShowInfoModal(true);
  };

  // Función para obtener el icono del banco - memoizada
  const getBankIcon = useCallback((nombreBanco) => {
    const bankIcons = {
      "Scotiabank": scotiabankIcon,
      "BBVA": bbvaIcon,
      "Santander": santanderIcon,
      "SANTANDER": santanderIcon,
      "HSBC": hsbcIcon,
      "Banorte": banorteIcon,
      "BANORTE": banorteIcon,
      "Banregio": banregioIcon,
      "Fondeadora": fondeadoraIcon,
      "Banbajio": logobanbajiIcon,
      "BCP": bbvaIcon,
      "BANAMEX": logoIcon,
      "Banco de la Nación": logoIcon,
      "BANCO AZTECA": aztecabankIcon
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
      codigoBanco: formData.codigoBanco.trim(),
      activo: formData.activo,
      fechaCreacion: new Date().toLocaleDateString('es-ES') + ', ' + new Date().toLocaleTimeString('es-ES', { hour12: false }),
      icono: getBankIcon(formData.nombreBanco.trim()),
      direccion: "Dirección por definir",
      telefono: "+52 55 0000 0000",
      email: "contacto@banco.mx",
      sitioWeb: "www.banco.mx",
      rfc: "BCO970519DU0",
      representanteLegal: "Por definir",
      descripcion: "Institución bancaria"
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

    setBancos(prev => prev.map(banco =>
      banco.id === editingBanco.id
        ? {
            ...banco,
            nombreBanco: formData.nombreBanco.trim(),
            codigoBanco: formData.codigoBanco.trim(),
            activo: formData.activo,
            icono: getBankIcon(formData.nombreBanco.trim())
          }
        : banco
    ));

    setEditingBanco(null);
    setFormData({ nombreBanco: "", codigoBanco: "", activo: true });
    setIsEditDialogOpen(false);
  }, [formData, editingBanco, isCodigoDuplicado, getBankIcon]);

  const handleDeleteClick = useCallback((banco) => {
    setDeletingBanco(banco);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (deletingBanco) {
      setBancos(prev => prev.filter(banco => banco.id !== deletingBanco.id));
      setDeletingBanco(null);
      setIsDeleteDialogOpen(false);
    }
  }, [deletingBanco]);

  const toggleActivo = useCallback((id) => {
    setBancos(prev => prev.map(banco =>
      banco.id === id ? { ...banco, activo: !banco.activo } : banco
    ));
  }, []);

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
            <ArrowLeft className="h-4 w-4" />
            Volver al Inicio
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Bancos</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalEntidades}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bancos Activos</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stats.entidadesActivas}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bancos Inactivos</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stats.entidadesInactivas}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <X className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tasa de Actividad</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stats.tasaActividad}%</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Bancos */}
          <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">Registro de Bancos Tradicionales</CardTitle>
                    <CardDescription>Listado completo de bancos tradicionales registrados en el sistema</CardDescription>
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
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Banco Fintech</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Código</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Estado Operativo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha de Registro</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bancos.map((banco, index) => (
                      <tr key={banco.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600 font-mono">
                            #{banco.id.toString().padStart(3, "0")}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                              <img 
                                src={getBankIcon(banco.nombreBanco)}
                                alt={`${banco.nombreBanco} logo`}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  e.target.src = logoIcon;
                                }}
                              />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{banco.nombreBanco}</div>
                              <div className="text-xs text-gray-500">{banco.descripcion}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">
                            {banco.codigoBanco}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              banco.activo 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {banco.activo ? "Operativo" : "Inactivo"}
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
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600 font-mono">{banco.fechaCreacion}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Botón Ver Información */}
                            <button
                              onClick={() => handleViewInfo(banco)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                              title="Ver información"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {/* Botón Editar */}
                            <button
                              onClick={() => handleEdit(banco)}
                              className="text-green-600 hover:text-green-800 transition-colors p-1"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            {/* Botón Eliminar */}
                            <button
                              onClick={() => handleDeleteClick(banco)}
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

      {/* Modal de Información de Banco */}
      {showInfoModal && selectedBancoInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedBancoInfo.nombreBanco}</h2>
                    <p className="text-blue-100 text-sm">{selectedBancoInfo.descripcion}</p>
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
                        <span className="ml-2 font-medium">{selectedBancoInfo.codigoBanco}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Estado:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedBancoInfo.activo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedBancoInfo.activo ? 'Operativo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Fecha de Registro:</span>
                        <span className="ml-2 font-medium">{selectedBancoInfo.fechaCreacion}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Representante Legal:</span>
                        <span className="ml-2 font-medium">{selectedBancoInfo.representanteLegal}</span>
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
                        <p className="font-medium text-sm">{selectedBancoInfo.direccion}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Teléfono:</span>
                        <span className="ml-2 font-medium">{selectedBancoInfo.telefono}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Email:</span>
                        <span className="ml-2 font-medium">{selectedBancoInfo.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Sitio Web:</span>
                        <span className="ml-2 font-medium text-blue-600">{selectedBancoInfo.sitioWeb}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">RFC:</span>
                        <span className="ml-2 font-medium">{selectedBancoInfo.rfc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información Adicional */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Información Institucional</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedBancoInfo.nombreBanco} es una institución financiera tradicional que forma parte del sistema bancario mexicano. 
                    Ofrece servicios bancarios completos incluyendo cuentas de ahorro, créditos, inversiones y servicios corporativos. 
                    La institución mantiene altos estándares de seguridad y cumplimiento regulatorio conforme a las disposiciones de la CNBV.
                  </p>
                </div>
              </div>
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

      {/* Diálogos */}
      <CreateDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        formData={formData}
        onNombreBancoChange={handleNombreBancoChange}
        onCodigoBancoChange={handleCodigoBancoChange}
        onActivoChange={handleActivoChange}
        onCreate={handleCreate}
        isFormValid={isFormValid}
      />

      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        formData={formData}
        onNombreBancoChange={handleNombreBancoChange}
        onCodigoBancoChange={handleCodigoBancoChange}
        onActivoChange={handleActivoChange}
        onUpdate={handleUpdate}
        isFormValid={isFormValid}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
        deletingBanco={deletingBanco}
      />
    </div>
  );
};

export default Bank;