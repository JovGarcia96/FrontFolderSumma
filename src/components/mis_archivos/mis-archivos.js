import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import {
  Search,
  Upload,
  FolderPlus,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Eye,
  Edit,
  FileText,
  ImageIcon,
  File,
  Folder,
  Clock,
  User,
  Grid3x3,
  List,
  Filter,
  ArrowUpDown,
  Calendar,
  Users,
  FileCheck,
  FolderOpen,
  TrendingUp,
  ChevronLeft,
  Scissors,
  Copy,
  Clipboard,
  Move,
  X,
  Check,
  Plus,
  UserPlus,
  ChevronDown,
  CheckCircle,
  Mail,
  Phone,
  Printer,
} from 'lucide-react';

const MisArchivos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  // REF PARA EL INPUT - SOLUCIÓN FORZADA
  const folderNameInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState(tabParam || 'mis-archivos');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Estados para funcionalidades de botones
  const [selectedItems, setSelectedItems] = useState([]);
  const [clipboard, setClipboard] = useState([]);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToRename, setItemToRename] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [moveDestination, setMoveDestination] = useState(null);
  
  // Estados para gestión de permisos
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermissionsSimple, setSharePermissionsSimple] = useState({
    ver: true,
    leer: true,
    escribir: false
  });
  const [sharedUsers, setSharedUsers] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@empresa.com',
      role: 'Administrador',
      lastAccess: '2025-09-10 14:30',
      permissions: { ver: true, modificar: true, eliminar: true, imprimir: false }
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria.gonzalez@empresa.com',
      role: 'Editor',
      lastAccess: '2025-09-10 12:15',
      permissions: { ver: true, modificar: false, eliminar: false, imprimir: true }
    }
  ]);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    permissions: { ver: false, modificar: false, eliminar: false, imprimir: false }
  });
  
  // Estado para modal de vista previa
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  
  // Estado para subir archivos
  const [filesToUpload, setFilesToUpload] = useState([]);
  const fileInputRef = useRef(null);
  
  // Estado para drag and drop
  const [isDragging, setIsDragging] = useState(false);
  
  // Estados para navegación de carpetas
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderPath, setFolderPath] = useState([]);
  
  // Estados para el modal de nueva carpeta - OPTIMIZADOS
  const [folderName, setFolderName] = useState('');
  const [folderPermissions, setFolderPermissions] = useState({
    ver: true,
    leer: true,
    crear: false,
    modificar: false,
    eliminar: false,
    exportar: false,
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUsersList, setShowUsersList] = useState(false);

  const [sharePermissions, setSharePermissions] = useState({
    ver: true,
    leer: true,
    escribir: false,
    modificar: false,
    eliminar: false,
    imprimir: false,
  });

  // Estado para los archivos (ahora dinámico)
  const [myFiles, setMyFiles] = useState([
    {
      id: 1,
      name: 'Contratos 2025',
      type: 'folder',
      modified: 'Hace 2 horas',
      owner: 'Juan Pérez',
      documents: [
        { id: 101, name: 'Acta Constitutiva', status: 'Faltante', required: true, icon: 'document', color: 'red' },
        { id: 102, name: 'Poder Representante Legal', status: 'Presente', required: false, icon: 'shield', color: 'green' },
        { id: 103, name: 'Registro Público Comercio', status: 'Faltante', required: true, icon: 'building', color: 'red' },
        { id: 104, name: 'Cédula Identificación Fiscal', status: 'Presente', required: false, icon: 'card', color: 'orange' },
        { id: 105, name: 'Comprobante Domicilio Fiscal', status: 'Presente', required: false, icon: 'location', color: 'green' },
        { id: 106, name: 'Identificación Oficial', status: 'Presente', required: false, icon: 'shield-check', color: 'blue' },
      ]
    },
    {
      id: 2,
      name: 'Reporte Financiero Q1.pdf',
      type: 'file',
      fileType: 'pdf',
      size: '2.4 MB',
      modified: 'Hace 1 día',
      owner: 'Juan Pérez',
    },
    {
      id: 3,
      name: 'Estados de Cuenta',
      type: 'folder',
      modified: 'Hace 3 días',
      owner: 'Juan Pérez',
      documents: [
        { id: 301, name: 'Estado de Cuenta Enero', status: 'Presente', required: true, icon: 'document', color: 'green' },
        { id: 302, name: 'Estado de Cuenta Febrero', status: 'Presente', required: true, icon: 'document', color: 'green' },
        { id: 303, name: 'Estado de Cuenta Marzo', status: 'Faltante', required: true, icon: 'document', color: 'red' },
      ]
    },
    {
      id: 4,
      name: 'Presentación Bancaria.pptx',
      type: 'file',
      fileType: 'document',
      size: '5.1 MB',
      modified: 'Hace 5 días',
      owner: 'Juan Pérez',
    },
    {
      id: 5,
      name: 'Logo Empresa.png',
      type: 'file',
      fileType: 'image',
      size: '856 KB',
      modified: 'Hace 1 semana',
      owner: 'Juan Pérez',
    },
  ]);

  // Mock data - Usuarios disponibles (lista más amplia)
  const availableUsers = [
    { id: 1, name: 'María González', email: 'maria.gonzalez@findrive.com', avatar: 'MG', role: 'Gerente' },
    { id: 2, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@findrive.com', avatar: 'CR', role: 'Analista' },
    { id: 3, name: 'Ana Martínez', email: 'ana.martinez@findrive.com', avatar: 'AM', role: 'Contador' },
    { id: 4, name: 'Luis Hernández', email: 'luis.hernandez@findrive.com', avatar: 'LH', role: 'Supervisor' },
    { id: 5, name: 'Laura Sánchez', email: 'laura.sanchez@findrive.com', avatar: 'LS', role: 'Asistente' },
    { id: 6, name: 'Pedro Ramírez', email: 'pedro.ramirez@findrive.com', avatar: 'PR', role: 'Auditor' },
    { id: 7, name: 'Sofia López', email: 'sofia.lopez@findrive.com', avatar: 'SL', role: 'Directora' },
    { id: 8, name: 'Miguel Torres', email: 'miguel.torres@findrive.com', avatar: 'MT', role: 'Consultor' },
    { id: 9, name: 'Carmen Ruiz', email: 'carmen.ruiz@findrive.com', avatar: 'CR', role: 'Especialista' },
    { id: 10, name: 'Roberto Silva', email: 'roberto.silva@findrive.com', avatar: 'RS', role: 'Coordinador' },
    { id: 11, name: 'Elena Vargas', email: 'elena.vargas@findrive.com', avatar: 'EV', role: 'Analista Senior' },
    { id: 12, name: 'Diego Morales', email: 'diego.morales@findrive.com', avatar: 'DM', role: 'Jefe de Área' },
    { id: 13, name: 'Patricia Jiménez', email: 'patricia.jimenez@findrive.com', avatar: 'PJ', role: 'Secretaria' },
    { id: 14, name: 'Fernando Castro', email: 'fernando.castro@findrive.com', avatar: 'FC', role: 'Tesorero' },
    { id: 15, name: 'Gabriela Mendoza', email: 'gabriela.mendoza@findrive.com', avatar: 'GM', role: 'Abogada' },
  ];

  // Mock data - Compartidos
  const sharedFiles = [
    {
      id: 1,
      name: 'Contratos Bancarios',
      type: 'folder',
      sharedWith: 'María González',
      sharedDate: '15/01/2025',
      sharedTime: '10:30 AM',
      permissions: {
        ver: true,
        leer: true,
        escribir: true,
        modificar: false,
        eliminar: false,
        imprimir: true,
      },
    },
    {
      id: 2,
      name: 'Reporte Anual 2024.pdf',
      type: 'file',
      sharedWith: 'Carlos Rodríguez',
      sharedDate: '14/01/2025',
      sharedTime: '03:45 PM',
      permissions: {
        ver: true,
        leer: true,
        escribir: false,
        modificar: false,
        eliminar: false,
        imprimir: true,
      },
    },
    {
      id: 3,
      name: 'Documentos Regulatorios',
      type: 'folder',
      sharedWith: 'Ana Martínez',
      sharedDate: '12/01/2025',
      sharedTime: '09:15 AM',
      permissions: {
        ver: true,
        leer: true,
        escribir: true,
        modificar: true,
        eliminar: false,
        imprimir: true,
      },
    },
  ];

  // Mock data - Recientes
  const recentActivities = [
    {
      id: 1,
      user: 'María González',
      action: 'creó',
      item: 'Contrato Bancario 2025.pdf',
      timestamp: 'Hace 5 minutos',
      type: 'create',
    },
    {
      id: 2,
      user: 'Carlos Rodríguez',
      action: 'modificó',
      item: 'Estados de Cuenta Enero',
      timestamp: 'Hace 15 minutos',
      type: 'edit',
    },
    {
      id: 3,
      user: 'Ana Martínez',
      action: 'compartió',
      item: 'Documentos Regulatorios',
      timestamp: 'Hace 30 minutos',
      type: 'share',
    },
    {
      id: 4,
      user: 'Juan Pérez',
      action: 'descargó',
      item: 'Reporte Financiero Q1.pdf',
      timestamp: 'Hace 1 hora',
      type: 'download',
    },
    {
      id: 5,
      user: 'Laura Sánchez',
      action: 'eliminó',
      item: 'Archivo Temporal.docx',
      timestamp: 'Hace 2 horas',
      type: 'delete',
    },
    {
      id: 6,
      user: 'Pedro Ramírez',
      action: 'creó',
      item: 'Carpeta Auditorías 2025',
      timestamp: 'Hace 3 horas',
      type: 'create',
    },
  ];

  // FUNCIÓN OPTIMIZADA PARA CAMBIAR EL NOMBRE - SIN RE-RENDERS
  const handleFolderNameChange = useCallback((e) => {
    const newValue = e.target.value;
    setFolderName(newValue);
    
    // FORZAR FOCO SI SE PIERDE
    setTimeout(() => {
      if (folderNameInputRef.current && document.activeElement !== folderNameInputRef.current) {
        folderNameInputRef.current.focus();
      }
    }, 0);
  }, []);

  // FUNCIÓN PARA MANTENER FOCO FORZADO
  const handleInputBlur = useCallback((e) => {
    // Prevenir pérdida de foco no deseada
    setTimeout(() => {
      if (folderNameInputRef.current && showNewFolderDialog) {
        folderNameInputRef.current.focus();
      }
    }, 10);
  }, [showNewFolderDialog]);

  // EFECTO PARA FORZAR FOCO AL ABRIR MODAL
  useEffect(() => {
    if (showNewFolderDialog && folderNameInputRef.current) {
      setTimeout(() => {
        folderNameInputRef.current.focus();
      }, 100);
    }
  }, [showNewFolderDialog]);

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'document':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'image':
        return <ImageIcon className="h-8 w-8 text-green-500" />;
      case 'pdf':
        return <File className="h-8 w-8 text-red-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'create':
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case 'edit':
        return <Edit className="h-5 w-5 text-blue-500" />;
      case 'delete':
        return <Trash2 className="h-5 w-5 text-red-500" />;
      case 'share':
        return <Share2 className="h-5 w-5 text-purple-500" />;
      case 'download':
        return <Download className="h-5 w-5 text-orange-500" />;
      default:
        return <FileCheck className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleShare = (file) => {
    setSelectedFile(file);
    setShowPermissionsModal(true); // Abre modal de gestión de permisos
    setOpenDropdown(null);
  };
  
  const handleQuickShare = (file) => {
    setSelectedFile(file);
    setShowShareDialog(true); // Abre modal simple de compartir
    setOpenDropdown(null);
  };

  // Función para copiar
  const handleCopy = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un elemento para copiar');
      return;
    }
    const itemsToCopy = myFiles.filter(file => selectedItems.includes(file.id));
    setClipboard(itemsToCopy);
    alert(`${itemsToCopy.length} elemento(s) copiado(s) al portapapeles`);
  };

  // Función para pegar
  const handlePaste = () => {
    if (clipboard.length === 0) {
      alert('No hay elementos en el portapapeles');
      return;
    }
    const newFiles = clipboard.map((item, index) => ({
      ...item,
      id: Math.max(...myFiles.map(f => f.id)) + index + 1,
      name: `${item.name} (copia)`,
      modified: 'Hace unos segundos'
    }));
    setMyFiles([...myFiles, ...newFiles]);
    alert(`${newFiles.length} elemento(s) pegado(s)`);
    setClipboard([]);
  };

  // Función para renombrar
  const handleRename = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona un elemento para renombrar');
      return;
    }
    if (selectedItems.length > 1) {
      alert('Solo puedes renombrar un elemento a la vez');
      return;
    }
    const item = myFiles.find(f => f.id === selectedItems[0]);
    setItemToRename(item);
    setNewItemName(item.name);
    setShowRenameModal(true);
  };

  // Función para confirmar renombrar
  const confirmRename = () => {
    if (!newItemName.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }
    setMyFiles(myFiles.map(file => 
      file.id === itemToRename.id ? { ...file, name: newItemName } : file
    ));
    setShowRenameModal(false);
    setItemToRename(null);
    setNewItemName('');
    setSelectedItems([]);
    alert('Elemento renombrado correctamente');
  };

  // Función para mover
  const handleMove = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un elemento para mover');
      return;
    }
    setShowMoveModal(true);
  };

  // Función para confirmar movimiento
  const confirmMove = () => {
    if (!moveDestination) {
      alert('Selecciona una carpeta de destino');
      return;
    }
    alert(`${selectedItems.length} elemento(s) movido(s) correctamente`);
    setShowMoveModal(false);
    setMoveDestination(null);
    setSelectedItems([]);
  };

  // Función para eliminar
  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un elemento para eliminar');
      return;
    }
    setShowDeleteModal(true);
  };

  // Función para confirmar eliminación
  const confirmDelete = () => {
    setMyFiles(myFiles.filter(file => !selectedItems.includes(file.id)));
    setShowDeleteModal(false);
    setSelectedItems([]);
    alert('Elemento(s) eliminado(s) correctamente');
  };

  // Función para toggle selección
  const toggleSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const toggleDropdown = (fileId) => {
    setOpenDropdown(openDropdown === fileId ? null : fileId);
  };
  
  // Función para manejar la selección de archivos
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };
  
  // Función para procesar archivos (compartida entre input y drag & drop)
  const processFiles = (files) => {
    const newFiles = files.map((file, index) => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const fileSize = file.size < 1024 * 1024 
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      
      return {
        id: Date.now() + index,
        name: file.name,
        size: fileSize,
        modified: 'Hace unos segundos',
        type: 'file',
        owner: 'Tú',
        fileObject: file,
        fileURL: URL.createObjectURL(file)
      };
    });
    
    setMyFiles([...newFiles, ...myFiles]);
    setShowUploadDialog(false);
  };
  
  // Funciones para drag and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFiles(files);
    }
  };
  
  // Función para manejar click en archivo/carpeta
  const handleFileClick = (file) => {
    if (file.type === 'folder') {
      // Si es carpeta, navegar a la vista de detalles
      setCurrentFolder(file);
      setFolderPath([...folderPath, { id: file.id, name: file.name }]);
    } else {
      // Si es archivo, abrir modal de vista previa
      setPreviewFile(file);
      setShowPreviewModal(true);
    }
  };
  
  // Función para volver atrás en la navegación
  const handleGoBackFolder = () => {
    setCurrentFolder(null);
    setFolderPath([]);
  };
  


  const handleMenuAction = (action, file) => {
    setOpenDropdown(null);
    
    switch (action) {
      case 'view':
        // Usar handleFileClick para manejar carpetas y archivos
        handleFileClick(file);
        break;
      case 'download':
        // Simular descarga del archivo
        const link = document.createElement('a');
        link.href = '#'; // En producción, aquí iría la URL del archivo
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`Descargando: ${file.name}`);
        break;
      case 'share':
        handleShare(file);
        break;
      case 'rename':
        // Preparar para renombrar
        setSelectedItems([file.id]);
        setItemToRename(file);
        setNewItemName(file.name);
        setShowRenameModal(true);
        break;
      case 'delete':
        // Preparar para eliminar
        setSelectedItems([file.id]);
        setShowDeleteModal(true);
        break;
      default:
        break;
    }
  };

  // Funciones para el modal de nueva carpeta
  const handleNewFolder = () => {
    setShowNewFolderDialog(true);
  };

  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      alert('Por favor, ingresa un nombre para la carpeta');
      return;
    }

    // Crear nueva carpeta
    const newFolder = {
      id: Date.now(), // ID único basado en timestamp
      name: folderName.trim(),
      type: 'folder',
      modified: 'Hace unos segundos',
      owner: 'Juan Pérez', // Usuario actual
      permissions: folderPermissions,
      sharedWith: selectedUsers,
    };

    // Agregar la carpeta al inicio de la lista
    setMyFiles(prevFiles => [newFolder, ...prevFiles]);

    // Mostrar mensaje de éxito
    setSuccessMessage(`Carpeta "${folderName.trim()}" creada con éxito`);

    // Resetear el formulario
    resetFolderForm();

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const resetFolderForm = () => {
    setFolderName('');
    setFolderPermissions({
      ver: true,
      leer: true,
      crear: false,
      modificar: false,
      eliminar: false,
      exportar: false,
    });
    setSelectedUsers([]);
    setShowUsersList(false);
    setShowNewFolderDialog(false);
  };

  const handlePermissionChange = useCallback((permission) => {
    setFolderPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  }, []);

  const handleUserSelect = useCallback((user) => {
    setSelectedUsers(prev => {
      const isSelected = prev.find(u => u.id === user.id);
      if (isSelected) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  }, []);

  const handleRemoveUser = useCallback((userId) => {
    setSelectedUsers(prev => prev.filter(u => u.id !== userId));
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  // Componentes UI simplificados
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  );

  const Button = ({ children, className = "", variant = "default", size = "default", onClick, disabled = false, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      outline: "border border-gray-300 bg-white hover:bg-gray-50",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    };

    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3 text-xs",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

  // INPUT COMPONENT COMPLETAMENTE CORREGIDO
  const Input = React.memo(({ className = "", value, onChange, onKeyDown, onBlur, inputRef, ...props }) => (
    <input
      ref={inputRef}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      autoComplete="off"
      spellCheck="false"
      {...props}
    />
  ));

  const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
      default: "bg-blue-100 text-blue-800",
      outline: "border border-gray-300 text-gray-700",
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  const Tabs = ({ children, value, onValueChange, className = "" }) => (
    <div className={className}>
      {children}
    </div>
  );

  const TabsList = ({ children, className = "" }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-md p-1 bg-gray-100 ${className}`}>
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

  // Componente de dropdown mejorado
  const DropdownMenu = ({ fileId, file }) => (
    <div className="relative dropdown-container">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown(fileId);
        }}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
      
      {openDropdown === fileId && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleMenuAction('view', file)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleMenuAction('download', file)}
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleMenuAction('share', file)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleMenuAction('rename', file)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Renombrar
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => handleMenuAction('delete', file)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // MODAL DIALOG OPTIMIZADO SIN ESPACIOS EN BLANCO
  const Dialog = ({ children, open, onOpenChange }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)} />
        <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[85vh] overflow-hidden">
          {children}
        </div>
      </div>
    );
  };

  const DialogContent = ({ children, className = "" }) => (
    <div className={`flex flex-col h-full ${className}`}>
      {children}
    </div>
  );

  const DialogHeader = ({ children }) => (
    <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
      {children}
    </div>
  );

  const DialogTitle = ({ children }) => (
    <h2 className="text-lg font-semibold flex items-center gap-2">
      {children}
    </h2>
  );

  const DialogFooter = ({ children }) => (
    <div className="px-4 py-3 border-t border-gray-200 flex justify-end gap-2 flex-shrink-0">
      {children}
    </div>
  );

  // Componente de mensaje de éxito
  const SuccessMessage = () => {
    if (!successMessage) return null;
    
    return (
      <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg animate-fade-in">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">{successMessage}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Mensaje de éxito */}
        <SuccessMessage />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handleGoBack} className="h-9 w-9">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Mis Archivos
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Gestiona tus documentos y archivos de forma segura
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowUploadDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Archivo
                </Button>
                <Button variant="outline" onClick={handleNewFolder}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Nueva Carpeta
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 border-l-4 border-l-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Archivos</p>
                    <p className="text-2xl font-bold text-blue-600">{myFiles.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-l-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Carpetas</p>
                    <p className="text-2xl font-bold text-green-600">
                      {myFiles.filter(file => file.type === 'folder').length}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <FolderOpen className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-l-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Compartidos</p>
                    <p className="text-2xl font-bold text-purple-600">18</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-l-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Almacenamiento</p>
                    <p className="text-2xl font-bold text-orange-600">45.2 GB</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
                <TabsTrigger value="mis-archivos" className="flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  Mis Archivos
                </TabsTrigger>
                <TabsTrigger value="compartidos" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Compartidos
                </TabsTrigger>
                <TabsTrigger value="recientes" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recientes
                </TabsTrigger>
              </TabsList>

              {/* Mis Archivos Tab */}
              <TabsContent value="mis-archivos" className="space-y-4">
                {/* Action Toolbar */}
                <Card className="p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowUploadDialog(true)}>
                      <Upload className="h-4 w-4 mr-2" />
                      Nuevo
                    </Button>
                    <div className="h-6 w-px bg-gray-300" />
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      <Scissors className="h-4 w-4 mr-2" />
                      Cortar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handlePaste}>
                      <Clipboard className="h-4 w-4 mr-2" />
                      Pegar
                    </Button>
                    <div className="h-6 w-px bg-gray-300" />
                    <Button variant="ghost" size="sm" onClick={handleRename}>
                      <Edit className="h-4 w-4 mr-2" />
                      Renombrar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => {
                      if (selectedItems.length === 0) {
                        alert('Selecciona al menos un elemento para compartir');
                        return;
                      }
                      const item = myFiles.find(f => f.id === selectedItems[0]);
                      if (item) handleShare(item);
                    }}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleMove}>
                      <Move className="h-4 w-4 mr-2" />
                      Mover
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleDelete}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </Button>
                    <div className="h-6 w-px bg-gray-300 ml-auto" />
                    <Button variant="ghost" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Ordenar
                    </Button>
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid3x3 className="h-4 w-4 mr-2" />
                        Iconos
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4 mr-2" />
                        Lista
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Search Toolbar */}
                <Card className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar archivos y carpetas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Vista de Detalles de Carpeta o Files Grid/List */}
                {currentFolder ? (
                  <div className="space-y-4">
                    {/* Header de la carpeta */}
                    <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-l-blue-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={handleGoBackFolder}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          >
                            <ChevronLeft className="h-6 w-6 text-blue-600" />
                          </button>
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <FolderOpen className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">Documentos de "{currentFolder.name}"</h2>
                            <p className="text-sm text-gray-600">Vista completa de documentos y estado de validación</p>
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Upload className="h-4 w-4 mr-2" />
                          Subida Masiva
                        </Button>
                      </div>
                    </Card>

                    {/* Grid de documentos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentFolder.documents && currentFolder.documents.map((doc) => (
                        <Card key={doc.id} className="p-6 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                              {doc.icon === 'document' && <FileText className={`h-6 w-6 text-${doc.color}-500`} />}
                              {doc.icon === 'shield' && <FileCheck className={`h-6 w-6 text-${doc.color}-500`} />}
                              {doc.icon === 'building' && <FileText className={`h-6 w-6 text-${doc.color}-500`} />}
                              {doc.icon === 'card' && <FileText className={`h-6 w-6 text-${doc.color}-500`} />}
                              {doc.icon === 'location' && <FileText className={`h-6 w-6 text-${doc.color}-500`} />}
                              {doc.icon === 'shield-check' && <FileCheck className={`h-6 w-6 text-${doc.color}-500`} />}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              doc.status === 'Presente' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {doc.status}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 mb-2">{doc.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {doc.status === 'Presente' 
                              ? 'Documento validado y almacenado' 
                              : 'Documento requerido pendiente'}
                          </p>
                          
                          <div className="space-y-2">
                            <Button 
                              className="w-full bg-blue-600 hover:bg-blue-700"
                              disabled={doc.status === 'Faltante'}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Subir
                            </Button>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                disabled={doc.status === 'Faltante'}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon"
                                disabled={doc.status === 'Faltante'}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {myFiles.map((file) => (
                      <Card
                        key={file.id}
                        onClick={() => handleFileClick(file)}
                        className={`p-4 hover:shadow-lg transition-all cursor-pointer group border-2 ${
                          selectedItems.includes(file.id) ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(file.id)}
                            onChange={() => toggleSelection(file.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                            {file.type === "folder" ? (
                              <Folder className="h-8 w-8 text-blue-500" />
                            ) : (
                              getFileIcon(file.fileType)
                            )}
                          </div>
                          <DropdownMenu fileId={file.id} file={file} />
                        </div>
                        <h3 className="font-semibold text-sm mb-1 truncate">{file.name}</h3>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{file.size || "—"}</span>
                          <span>{file.modified}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <div className="divide-y">
                      {myFiles.map((file) => (                        <Card
                          key={file.id}
                          onClick={() => handleFileClick(file)}
                          className={`p-4 hover:shadow-md transition-all cursor-pointer border-l-4 ${
                            selectedItems.includes(file.id) ? 'border-l-blue-500 bg-blue-50' : 'border-l-blue-500'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(file.id)}
                              onChange={() => toggleSelection(file.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                              {file.type === "folder" ? (
                                <Folder className="h-6 w-6 text-blue-500" />
                              ) : (
                                getFileIcon(file.fileType)
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{file.name}</h3>
                              <p className="text-xs text-gray-600">{file.modified}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 w-20">{file.size || "—"}</span>
                            <span className="text-sm text-gray-600 w-32">{file.owner}</span>
                            <DropdownMenu fileId={file.id} file={file} />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Compartidos Tab */}
              <TabsContent value="compartidos" className="space-y-4">
                <Card>
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-semibold">Archivos Compartidos</h3>
                    <p className="text-sm text-gray-600">
                      Archivos y carpetas que has compartido con otros usuarios
                    </p>
                  </div>
                  <div className="divide-y">
                    {sharedFiles.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                              {item.type === "folder" ? (
                                <Folder className="h-6 w-6 text-purple-500" />
                              ) : (
                                <FileText className="h-6 w-6 text-purple-500" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <User className="h-3 w-3 text-gray-600" />
                                <span className="text-xs text-gray-600">
                                  Compartido con: {item.sharedWith}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Calendar className="h-3 w-3" />
                              <span>{item.sharedDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{item.sharedTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium text-gray-600">Permisos:</span>
                          {item.permissions.ver && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              <Eye className="h-3 w-3 mr-1" />
                              Ver
                            </Badge>
                          )}
                          {item.permissions.leer && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <FileText className="h-3 w-3 mr-1" />
                              Leer
                            </Badge>
                          )}
                          {item.permissions.escribir && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Escribir
                            </Badge>
                          )}
                          {item.permissions.modificar && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-orange-50 text-orange-700 border-orange-200"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Modificar
                            </Badge>
                          )}
                          {item.permissions.eliminar && (
                            <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                              <Trash2 className="h-3 w-3 mr-1" />
                              Eliminar
                            </Badge>
                          )}
                          {item.permissions.imprimir && (
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                              <FileText className="h-3 w-3 mr-1" />
                              Imprimir
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Recientes Tab */}
              <TabsContent value="recientes" className="space-y-4">
                <Card>
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-semibold">Actividad Reciente</h3>
                    <p className="text-sm text-gray-600">Actividad de todos los usuarios en el sistema</p>
                  </div>
                  <div className="divide-y">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center flex-shrink-0">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm">
                                  <span className="font-semibold">{activity.user}</span>{" "}
                                  <span className="text-gray-600">{activity.action}</span>{" "}
                                  <span className="font-medium">{activity.item}</span>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Clock className="h-3 w-3 text-gray-600" />
                                  <span className="text-xs text-gray-600">{activity.timestamp}</span>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  activity.type === "create"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : activity.type === "edit"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : activity.type === "delete"
                                        ? "bg-red-50 text-red-700 border-red-200"
                                        : activity.type === "share"
                                          ? "bg-purple-50 text-purple-700 border-purple-200"
                                          : "bg-orange-50 text-orange-700 border-orange-200"
                                }
                              >
                                {activity.type === "create"
                                  ? "Creado"
                                  : activity.type === "edit"
                                    ? "Editado"
                                    : activity.type === "delete"
                                      ? "Eliminado"
                                      : activity.type === "share"
                                        ? "Compartido"
                                        : "Descargado"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Upload Dialog */}
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Subir Archivos</DialogTitle>
              </DialogHeader>
              <div className="px-4 py-4 flex-1 overflow-y-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.pptx,.txt"
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-100 scale-105' 
                      : 'border-gray-300 hover:border-blue-500 bg-gradient-to-br from-blue-50/50 to-cyan-50/50'
                  }`}
                >
                  <Upload className={`h-12 w-12 mx-auto mb-4 transition-colors ${
                    isDragging ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium mb-1">
                    {isDragging ? 'Suelta los archivos aquí' : 'Arrastra archivos aquí o haz clic para seleccionar'}
                  </p>
                  <p className="text-xs text-gray-600">
                    Soporta: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, PPTX, TXT (Max. 50MB)
                  </p>
                </div>
                
                {filesToUpload.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Archivos seleccionados ({filesToUpload.length})
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filesToUpload.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-900">{file.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {file.size < 1024 * 1024 
                              ? `${(file.size / 1024).toFixed(1)} KB`
                              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  setShowUploadDialog(false);
                }}>
                  Cerrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* MODAL DE NUEVA CARPETA - COMPLETAMENTE OPTIMIZADO SIN ESPACIOS */}
          <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <FolderPlus className="h-5 w-5 text-blue-600" />
                  Crear Nueva Carpeta
                </DialogTitle>
              </DialogHeader>
              
              <div className="px-4 py-3 flex-1 overflow-y-auto space-y-3">
                {/* Nombre de la carpeta - CAMPO CORREGIDO */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Nombre de la carpeta *
                  </label>
                  <Input
                    inputRef={folderNameInputRef}
                    type="text"
                    placeholder="Ingresa el nombre de la carpeta"
                    value={folderName}
                    onChange={handleFolderNameChange}
                    onBlur={handleInputBlur}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCreateFolder();
                      }
                    }}
                    className="w-full"
                    autoFocus
                  />
                </div>

                {/* Permisos - LAYOUT COMPACTO */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Permisos de la carpeta
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'ver', label: 'Ver', icon: Eye, color: 'blue' },
                      { key: 'leer', label: 'Leer', icon: FileText, color: 'green' },
                      { key: 'crear', label: 'Crear', icon: Plus, color: 'purple' },
                      { key: 'modificar', label: 'Modificar', icon: Edit, color: 'orange' },
                      { key: 'eliminar', label: 'Eliminar', icon: Trash2, color: 'red' },
                      { key: 'exportar', label: 'Exportar', icon: Download, color: 'gray' },
                    ].map(({ key, label, icon: Icon }) => (
                      <div
                        key={key}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer ${
                          folderPermissions[key]
                            ? 'border-blue-300 bg-blue-50'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                        onClick={() => handlePermissionChange(key)}
                      >
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                          folderPermissions[key] ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`h-3 w-3 ${
                            folderPermissions[key] ? 'text-blue-600' : 'text-gray-500'
                          }`} />
                        </div>
                        <span className={`text-sm font-medium flex-1 ${
                          folderPermissions[key] ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {label}
                        </span>
                        <div className={`h-3 w-3 rounded border flex items-center justify-center ${
                          folderPermissions[key]
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {folderPermissions[key] && (
                            <Check className="h-2 w-2 text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selección de usuarios - COMPACTO */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Compartir con usuarios
                  </label>
                  
                  {/* Botón desplegable */}
                  <button
                    type="button"
                    onClick={() => setShowUsersList(!showUsersList)}
                    className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md hover:border-gray-400 transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">
                        {selectedUsers.length > 0 
                          ? `${selectedUsers.length} usuario(s) seleccionado(s)`
                          : 'Seleccionar usuarios'
                        }
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${
                      showUsersList ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Lista de usuarios - COMPACTA */}
                  {showUsersList && (
                    <div className="mt-1 border border-gray-300 rounded-md max-h-40 overflow-y-auto">
                      {availableUsers.map((user) => {
                        const isSelected = selectedUsers.find(u => u.id === user.id);
                        return (
                          <div
                            key={user.id}
                            className={`flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer transition-colors text-sm ${
                              isSelected ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
                            }`}
                            onClick={() => handleUserSelect(user)}
                          >
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              isSelected ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                              <span className={`text-xs font-medium ${
                                isSelected ? 'text-blue-600' : 'text-gray-600'
                              }`}>
                                {user.avatar}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium truncate ${
                                isSelected ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{user.role}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-400">#{user.id}</span>
                              {isSelected && (
                                <div className="h-3 w-3 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Check className="h-2 w-2 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Usuarios seleccionados - COMPACTOS */}
                  {selectedUsers.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 mb-1">Seleccionados:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-2 py-1"
                          >
                            <div className="h-3 w-3 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-600">
                                {user.avatar}
                              </span>
                            </div>
                            <span className="text-xs text-blue-700 max-w-20 truncate">{user.name}</span>
                            <button
                              onClick={() => handleRemoveUser(user.id)}
                              className="h-3 w-3 text-blue-500 hover:text-blue-700"
                            >
                              <X className="h-2 w-2" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={resetFolderForm}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateFolder} disabled={!folderName.trim()}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Crear Carpeta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Share Dialog - Modal Simple */}
          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Compartir Archivo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Email del usuario</label>
                  <Input 
                    placeholder="usuario@ejemplo.com" 
                    className="mt-1"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Permisos</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ver</span>
                      <input 
                        type="checkbox" 
                        checked={sharePermissionsSimple.ver}
                        onChange={(e) => setSharePermissionsSimple({...sharePermissionsSimple, ver: e.target.checked})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Leer</span>
                      <input 
                        type="checkbox" 
                        checked={sharePermissionsSimple.leer}
                        onChange={(e) => setSharePermissionsSimple({...sharePermissionsSimple, leer: e.target.checked})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Escribir</span>
                      <input 
                        type="checkbox" 
                        checked={sharePermissionsSimple.escribir}
                        onChange={(e) => setSharePermissionsSimple({...sharePermissionsSimple, escribir: e.target.checked})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setShowShareDialog(false);
                  setShareEmail('');
                }}>
                  Cancelar
                </Button>
                <Button onClick={() => {
                  if (!shareEmail) {
                    alert('Por favor ingresa un email');
                    return;
                  }
                  alert(`Archivo compartido con ${shareEmail}`);
                  setShowShareDialog(false);
                  setShareEmail('');
                }}>
                  Compartir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
        
        {/* Modal de Renombrar */}
        {showRenameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Renombrar Elemento</h3>
                <button
                  onClick={() => {
                    setShowRenameModal(false);
                    setItemToRename(null);
                    setNewItemName('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nuevo nombre
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingresa el nuevo nombre"
                  autoFocus
                />
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRenameModal(false);
                    setItemToRename(null);
                    setNewItemName('');
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmRename}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Renombrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Mover */}
        {showMoveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Mover Elementos</h3>
                <button
                  onClick={() => {
                    setShowMoveModal(false);
                    setMoveDestination(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecciona la carpeta de destino
                </label>
                <div className="space-y-2">
                  {myFiles
                    .filter(f => f.type === 'folder' && !selectedItems.includes(f.id))
                    .map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => setMoveDestination(folder.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          moveDestination === folder.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <Folder className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900">{folder.name}</span>
                      </button>
                    ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowMoveModal(false);
                    setMoveDestination(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmMove}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Mover
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Eliminar */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirmar Eliminación</h3>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-600">
                  ¿Estás seguro de que deseas eliminar {selectedItems.length} elemento(s)?
                </p>
                <p className="text-sm text-red-600 mt-2">
                  Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Gestión de Permisos */}
        {showPermissionsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Gestión de Permisos</h3>
                    <p className="text-sm text-gray-600">{selectedFile?.name || 'Documentos Internos'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <Button 
                  onClick={() => setShowAddUserModal(true)}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Agregar Nuevo Usuario
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-6">
                <div className="space-y-4">
                  {sharedUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.role} • Último acceso: {user.lastAccess}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded" title="Enviar email">
                            <Mail className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded" title="Llamar">
                            <Phone className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Ver</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={user.permissions.ver}
                              onChange={(e) => {
                                const updated = sharedUsers.map(u => 
                                  u.id === user.id 
                                    ? {...u, permissions: {...u.permissions, ver: e.target.checked}}
                                    : u
                                );
                                setSharedUsers(updated);
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Edit className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Modificar</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={user.permissions.modificar}
                              onChange={(e) => {
                                const updated = sharedUsers.map(u => 
                                  u.id === user.id 
                                    ? {...u, permissions: {...u.permissions, modificar: e.target.checked}}
                                    : u
                                );
                                setSharedUsers(updated);
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium">Eliminar</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={user.permissions.eliminar}
                              onChange={(e) => {
                                const updated = sharedUsers.map(u => 
                                  u.id === user.id 
                                    ? {...u, permissions: {...u.permissions, eliminar: e.target.checked}}
                                    : u
                                );
                                setSharedUsers(updated);
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Printer className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium">Imprimir</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={user.permissions.imprimir}
                              onChange={(e) => {
                                const updated = sharedUsers.map(u => 
                                  u.id === user.id 
                                    ? {...u, permissions: {...u.permissions, imprimir: e.target.checked}}
                                    : u
                                );
                                setSharedUsers(updated);
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{sharedUsers.length} usuario(s) configurado(s)</p>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => setShowPermissionsModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={() => {
                        alert('Cambios guardados exitosamente');
                        setShowPermissionsModal(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Agregar Nuevo Usuario */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Agregar Nuevo Usuario</h3>
                </div>
                <button
                  onClick={() => {
                    setShowAddUserModal(false);
                    setNewUserData({
                      name: '',
                      email: '',
                      phone: '',
                      permissions: { ver: false, modificar: false, eliminar: false, imprimir: false }
                    });
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nombre Completo *</label>
                  <Input
                    placeholder="Ej: Juan Pérez"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Correo Electrónico *</label>
                  <Input
                    type="email"
                    placeholder="usuario@empresa.com"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Teléfono (Opcional)</label>
                  <Input
                    placeholder="+52 55 1234 5678"
                    value={newUserData.phone}
                    onChange={(e) => setNewUserData({...newUserData, phone: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Permisos</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border rounded-lg bg-blue-50 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Ver</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUserData.permissions.ver}
                            onChange={(e) => setNewUserData({
                              ...newUserData,
                              permissions: {...newUserData.permissions, ver: e.target.checked}
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg bg-green-50 border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Edit className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Modificar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUserData.permissions.modificar}
                            onChange={(e) => setNewUserData({
                              ...newUserData,
                              permissions: {...newUserData.permissions, modificar: e.target.checked}
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg bg-red-50 border-red-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trash2 className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium">Eliminar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUserData.permissions.eliminar}
                            onChange={(e) => setNewUserData({
                              ...newUserData,
                              permissions: {...newUserData.permissions, eliminar: e.target.checked}
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg bg-purple-50 border-purple-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Printer className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">Imprimir</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUserData.permissions.imprimir}
                            onChange={(e) => setNewUserData({
                              ...newUserData,
                              permissions: {...newUserData.permissions, imprimir: e.target.checked}
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowAddUserModal(false);
                    setNewUserData({
                      name: '',
                      email: '',
                      phone: '',
                      permissions: { ver: false, modificar: false, eliminar: false, imprimir: false }
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={() => {
                    if (!newUserData.name || !newUserData.email) {
                      alert('Por favor completa los campos requeridos');
                      return;
                    }
                    const newUser = {
                      id: sharedUsers.length + 1,
                      name: newUserData.name,
                      email: newUserData.email,
                      role: 'Usuario',
                      lastAccess: new Date().toISOString().slice(0, 16).replace('T', ' '),
                      permissions: newUserData.permissions
                    };
                    setSharedUsers([...sharedUsers, newUser]);
                    setShowAddUserModal(false);
                    setNewUserData({
                      name: '',
                      email: '',
                      phone: '',
                      permissions: { ver: false, modificar: false, eliminar: false, imprimir: false }
                    });
                    alert('Usuario agregado exitosamente');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Agregar Usuario
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Vista Previa de Archivo */}
        {showPreviewModal && previewFile && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {previewFile.type === 'folder' ? (
                      <Folder className="h-6 w-6 text-blue-600" />
                    ) : (
                      <FileText className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{previewFile.name}</h3>
                    <p className="text-sm text-gray-600">
                      {previewFile.size} • {previewFile.type === 'folder' ? 'Carpeta' : 'Archivo'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    setPreviewFile(null);
                  }}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {previewFile.type === 'folder' ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Información de la Carpeta</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nombre:</span>
                          <span className="font-medium text-gray-900">{previewFile.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tamaño:</span>
                          <span className="font-medium text-gray-900">{previewFile.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Creado:</span>
                          <span className="font-medium text-gray-900">{previewFile.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Propietario:</span>
                          <span className="font-medium text-gray-900">{previewFile.owner || 'Tú'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Esta es una carpeta. Para ver su contenido, haz doble clic en ella desde la vista principal.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Información del Archivo</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nombre:</span>
                          <span className="font-medium text-gray-900">{previewFile.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tamaño:</span>
                          <span className="font-medium text-gray-900">{previewFile.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tipo:</span>
                          <span className="font-medium text-gray-900">
                            {previewFile.name.split('.').pop().toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Modificado:</span>
                          <span className="font-medium text-gray-900">{previewFile.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Propietario:</span>
                          <span className="font-medium text-gray-900">{previewFile.owner || 'Tú'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                      {/* Vista previa de imágenes reales */}
                      {previewFile.fileURL && (previewFile.name.match(/\.(png|jpg|jpeg|gif|webp)$/i)) ? (
                        <div className="flex flex-col items-center gap-3">
                          <img 
                            src={previewFile.fileURL} 
                            alt={previewFile.name}
                            className="max-w-full max-h-96 object-contain rounded-lg shadow-md"
                          />
                          <p className="text-sm text-gray-600 mt-2">Vista previa de imagen</p>
                        </div>
                      ) : previewFile.fileURL && previewFile.name.match(/\.pdf$/i) ? (
                        <div className="w-full h-full">
                          <iframe
                            src={previewFile.fileURL}
                            className="w-full h-96 rounded-lg border border-gray-300"
                            title={`Vista previa de ${previewFile.name}`}
                          />
                          <p className="text-sm text-gray-600 mt-2 text-center">Vista previa del documento PDF</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3 p-8 text-center">
                          {previewFile.name.endsWith('.pdf') && (
                            <FileText className="h-16 w-16 text-red-500" />
                          )}
                          {previewFile.name.match(/\.(png|jpg|jpeg)$/i) && (
                            <ImageIcon className="h-16 w-16 text-green-500" />
                          )}
                          {previewFile.name.endsWith('.pptx') && (
                            <FileText className="h-16 w-16 text-orange-500" />
                          )}
                          {previewFile.name.match(/\.(doc|docx)$/i) && (
                            <FileText className="h-16 w-16 text-blue-500" />
                          )}
                          {previewFile.name.match(/\.(xls|xlsx)$/i) && (
                            <FileText className="h-16 w-16 text-green-600" />
                          )}
                          {!previewFile.name.match(/\.(pdf|png|jpg|jpeg|pptx|doc|docx|xls|xlsx)$/i) && (
                            <File className="h-16 w-16 text-gray-400" />
                          )}
                          <div>
                            <p className="text-gray-900 font-medium">Vista previa del archivo</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {previewFile.fileURL 
                                ? 'Este tipo de archivo no admite vista previa'
                                : 'Vista previa no disponible para archivos de ejemplo'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleMenuAction('download', previewFile)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowPreviewModal(false);
                      handleShare(previewFile);
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
                <Button 
                  onClick={() => {
                    setShowPreviewModal(false);
                    setPreviewFile(null);
                  }}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer simplificado */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="text-center text-sm text-gray-600">
            © 2025 FinDrive. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MisArchivos;