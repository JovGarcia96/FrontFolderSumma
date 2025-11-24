import React, { useState, useMemo,useRef} from 'react';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  FolderOpen,
  FileText,
  Download,
  Share2,
  Trash2,
  Edit,
  SortAsc,
  Eye,
  Settings,
  RotateCcw,
  RotateCw,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  CreditCard,
  Shield,
  Plane,
  Users,
  Building,
  ZoomIn,
  ZoomOut,
  RotateCw as Rotate,
  CloudUpload,
  Files,
  UserCheck,
  UserX,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Printer,
  TrendingUp,
  Copy,
  Clipboard,
  Move,
  Scissors,
  FolderPlus,
  Grid,
  User
} from 'lucide-react';


const TramitesNotariales = () => {
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para la vista actual
  const [currentView, setCurrentView] = useState('folders'); // 'folders' | 'folder-detail'
  const [selectedFolder, setSelectedFolder] = useState(null);
  // Estado para el modal de documento
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  // Estado para drag & drop
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFiles, setDraggedFiles] = useState([]);
  // Estado para archivos subidos
  const [uploadedFiles, setUploadedFiles] = useState({});
  // Estado para subida masiva
  const [showMassUploadModal, setShowMassUploadModal] = useState(false);
  const [massUploadFiles, setMassUploadFiles] = useState([]);
  // Estado para modal de permisos
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedFolderForPermissions, setSelectedFolderForPermissions] = useState(null);
  
  // Estado para modal de crear carpeta
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderData, setNewFolderData] = useState({
    name: '',
    description: ''
  });
  
  // Estado para agregar nuevo usuario en permisos
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    permissions: {
      canView: false,
      canEdit: false,
      canDelete: false,
      canPrint: false
    }
  });
  
  // Estado para pestañas de navegación
  const [activeTab, setActiveTab] = useState('mis-archivos'); // 'mis-archivos', 'compartidos', 'recientes'
  
  // Estado para log de actividad
  const [activityLog, setActivityLog] = useState([]);
  
  // Función para registrar actividad
  const logActivity = (action, details) => {
    const newActivity = {
      id: activityLog.length + 1,
      action,
      details,
      timestamp: new Date().toISOString(),
      user: 'Usuario Actual' // Puedes reemplazar con el usuario logueado
    };
    setActivityLog(prev => [newActivity, ...prev]);
  };

  // Estado para vista (iconos o lista)
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  // Estado para ordenamiento
  const [sortBy, setSortBy] = useState('name-asc'); // 'name-asc', 'name-desc', 'date-asc', 'date-desc'
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  // Estado para selección de carpetas/archivos
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Estado para modal de renombrar
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [itemToRename, setItemToRename] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  
  // Estado para portapapeles (copiar/cortar)
  const [clipboard, setClipboard] = useState({ items: [], action: null }); // action: 'copy' | 'cut'
  
  // Estado para modal de Mover
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [moveDestination, setMoveDestination] = useState(null);
  
  // Estado para modal de Eliminar
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Referencias para inputs de archivo
  const fileInputRefs = useRef({});
  const massUploadInputRef = useRef(null);
  const uploadFileInputRef = useRef(null);

  // Datos de usuarios para gestión de permisos
  const [users] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@empresa.com",
      role: "Administrador",
      avatar: "JP",
      phone: "+52 55 1234 5678",
      lastAccess: "2025-09-10 14:30"
    },
    {
      id: 2,
      name: "María González",
      email: "maria.gonzalez@empresa.com",
      role: "Editor",
      avatar: "MG",
      phone: "+52 55 8765 4321",
      lastAccess: "2025-09-10 12:15"
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@empresa.com",
      role: "Visualizador",
      avatar: "CR",
      phone: "+52 55 9876 5432",
      lastAccess: "2025-09-09 16:45"
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana.martinez@empresa.com",
      role: "Editor",
      avatar: "AM",
      phone: "+52 55 5555 1234",
      lastAccess: "2025-09-10 09:20"
    }
  ]);

  // Estado para permisos de usuarios por carpeta
  const [folderPermissions, setFolderPermissions] = useState({
    1: { // Carpetas de Clientes
      1: { canView: true, canEdit: true, canDelete: true, canPrint: true },
      2: { canView: true, canEdit: true, canDelete: false, canPrint: true },
      3: { canView: true, canEdit: false, canDelete: false, canPrint: true },
      4: { canView: true, canEdit: true, canDelete: false, canPrint: true }
    },
    2: { // Documentos Internos
      1: { canView: true, canEdit: true, canDelete: true, canPrint: true },
      2: { canView: true, canEdit: false, canDelete: false, canPrint: true },
      3: { canView: true, canEdit: false, canDelete: false, canPrint: false },
      4: { canView: true, canEdit: true, canDelete: false, canPrint: true }
    },
    3: { // Proyectos Especiales
      1: { canView: true, canEdit: true, canDelete: true, canPrint: true },
      2: { canView: true, canEdit: true, canDelete: true, canPrint: true },
      3: { canView: false, canEdit: false, canDelete: false, canPrint: false },
      4: { canView: true, canEdit: false, canDelete: false, canPrint: true }
    }
  });

  // Datos de las carpetas con documentos más detallados
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Carpetas de Clientes",
      size: "25.5 MB",
      color: "blue",
      icon: FolderOpen,
      documents: [
        { 
          id: 1,
          name: "Acta Constitutiva", 
          status: "missing", 
          description: "Documento requerido pendiente",
          icon: FileText,
          color: "red",
          fileUrl: null,
          keywords: ["acta", "constitutiva", "constitucion"]
        },
        { 
          id: 2,
          name: "Poder Representante Legal", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: Shield,
          color: "green",
          fileUrl: "/documents/poder-representante.pdf",
          keywords: ["poder", "representante", "legal"]
        },
        { 
          id: 3,
          name: "Registro Público Comercio", 
          status: "missing", 
          description: "Documento requerido pendiente",
          icon: Building,
          color: "red",
          fileUrl: null,
          keywords: ["registro", "publico", "comercio", "rpc"]
        },
        { 
          id: 4,
          name: "Cédula Identificación Fiscal", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: CreditCard,
          color: "orange",
          fileUrl: "/documents/cedula-fiscal.pdf",
          keywords: ["cedula", "identificacion", "fiscal", "rfc"]
        },
        { 
          id: 5,
          name: "Comprobante Domicilio Fiscal", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: MapPin,
          color: "green",
          fileUrl: "/documents/comprobante-domicilio.pdf",
          keywords: ["comprobante", "domicilio", "fiscal", "direccion"]
        },
        { 
          id: 6,
          name: "Identificación Oficial", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: Shield,
          color: "blue",
          fileUrl: "/documents/identificacion-oficial.pdf",
          keywords: ["identificacion", "oficial", "ine", "pasaporte"]
        },
        { 
          id: 7,
          name: "Forma Migratoria", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: Plane,
          color: "pink",
          fileUrl: "/documents/forma-migratoria.pdf",
          keywords: ["forma", "migratoria", "fm", "inmigracion"]
        },
        { 
          id: 8,
          name: "E-firma Razón Social", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: Shield,
          color: "green",
          fileUrl: "/documents/efirma-razon-social.pdf",
          keywords: ["efirma", "firma", "razon", "social", "electronica"]
        },
        { 
          id: 9,
          name: "E-firma Representante", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: Users,
          color: "orange",
          fileUrl: "/documents/efirma-representante.pdf",
          keywords: ["efirma", "firma", "representante", "electronica"]
        }
      ],
      completedCount: 4,
      totalCount: 9
    },
    {
      id: 2,
      name: "Documentos Internos",
      size: "15.0 MB",
      color: "blue",
      icon: FolderOpen,
      documents: [
        { 
          id: 1,
          name: "Acta Constitutiva", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: FileText,
          color: "green",
          fileUrl: "/documents/acta-constitutiva.pdf",
          keywords: ["acta", "constitutiva", "constitucion"]
        },
        { 
          id: 2,
          name: "Poder Representante Legal", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: Shield,
          color: "green",
          fileUrl: "/documents/poder-representante.pdf",
          keywords: ["poder", "representante", "legal"]
        },
        { 
          id: 3,
          name: "Registro Público Comercio", 
          status: "missing", 
          description: "Documento requerido pendiente",
          icon: Building,
          color: "red",
          fileUrl: null,
          keywords: ["registro", "publico", "comercio", "rpc"]
        }
      ],
      completedCount: 2,
      totalCount: 3
    },
    {
      id: 3,
      name: "Proyectos Especiales",
      size: "50.1 MB",
      color: "blue",
      icon: FolderOpen,
      documents: [
        { 
          id: 1,
          name: "Acta Constitutiva", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: FileText,
          color: "green",
          fileUrl: "/documents/acta-constitutiva.pdf",
          keywords: ["acta", "constitutiva", "constitucion"]
        },
        { 
          id: 2,
          name: "Poder Representante Legal", 
          status: "present", 
          description: "Documento validado y almacenado",
          icon: Shield,
          color: "green",
          fileUrl: "/documents/poder-representante.pdf",
          keywords: ["poder", "representante", "legal"]
        }
      ],
      completedCount: 1,
      totalCount: 2
    }
  ]);

  // Función para abrir modal de permisos
  const openPermissionsModal = (folder) => {
    setSelectedFolderForPermissions(folder);
    setShowPermissionsModal(true);
  };

  // Función para cerrar modal de permisos
  const closePermissionsModal = () => {
    setShowPermissionsModal(false);
    setSelectedFolderForPermissions(null);
  };
  
  // Función para crear nueva carpeta
  const handleCreateFolder = () => {
    if (!newFolderData.name.trim()) {
      alert('Por favor ingrese un nombre para la carpeta');
      return;
    }
    
    const newFolder = {
      id: folders.length + 1,
      name: newFolderData.name,
      size: '0 MB',
      color: 'blue',
      icon: FolderOpen,
      documents: [],
      completedCount: 0,
      totalCount: 0
    };
    
    setFolders([...folders, newFolder]);
    setNewFolderData({ name: '', description: '' });
    setShowCreateFolderModal(false);
    
    // Registrar actividad
    logActivity(
      'Nueva carpeta creada',
      `Se creó la carpeta "${newFolderData.name}"`
    );
  };
  
  // Función para agregar nuevo usuario
  const handleAddUser = () => {
    if (!newUserData.name.trim() || !newUserData.email.trim()) {
      alert('Por favor complete los campos requeridos');
      return;
    }
    
    const newUser = {
      id: users.length + 1,
      name: newUserData.name,
      email: newUserData.email,
      role: 'Usuario', // Rol genérico ya que los permisos se manejan individualmente
      avatar: newUserData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      phone: newUserData.phone,
      lastAccess: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5)
    };
    
    users.push(newUser);
    
    // Agregar permisos seleccionados para el nuevo usuario
    if (selectedFolderForPermissions) {
      setFolderPermissions(prev => ({
        ...prev,
        [selectedFolderForPermissions.id]: {
          ...prev[selectedFolderForPermissions.id],
          [newUser.id]: {
            canView: newUserData.permissions.canView,
            canEdit: newUserData.permissions.canEdit,
            canDelete: newUserData.permissions.canDelete,
            canPrint: newUserData.permissions.canPrint
          }
        }
      }));
    }
    
    setNewUserData({ 
      name: '', 
      email: '', 
      phone: '',
      permissions: {
        canView: false,
        canEdit: false,
        canDelete: false,
        canPrint: false
      }
    });
    setShowAddUserModal(false);
    
    // Registrar actividad
    const permsList = [];
    if (newUserData.permissions.canView) permsList.push('Ver');
    if (newUserData.permissions.canEdit) permsList.push('Modificar');
    if (newUserData.permissions.canDelete) permsList.push('Eliminar');
    if (newUserData.permissions.canPrint) permsList.push('Imprimir');
    
    logActivity(
      'Usuario agregado',
      `Se agregó a ${newUser.name} con permisos: ${permsList.join(', ')} en la carpeta "${selectedFolderForPermissions.name}"`
    );
  };

  // Función para actualizar permisos
  const updatePermission = (userId, permission, value) => {
    if (!selectedFolderForPermissions) return;
    
    const user = users.find(u => u.id === userId);
    const permissionNames = {
      canView: 'Ver',
      canEdit: 'Modificar',
      canDelete: 'Eliminar',
      canPrint: 'Imprimir'
    };
    
    setFolderPermissions(prev => ({
      ...prev,
      [selectedFolderForPermissions.id]: {
        ...prev[selectedFolderForPermissions.id],
        [userId]: {
          ...prev[selectedFolderForPermissions.id]?.[userId],
          [permission]: value
        }
      }
    }));
    
    // Registrar actividad
    if (user) {
      logActivity(
        'Permiso modificado',
        `Se ${value ? 'otorgó' : 'revocó'} el permiso "${permissionNames[permission]}" a ${user.name} en la carpeta "${selectedFolderForPermissions.name}"`
      );
    }
  };

  // Función para enviar notificación de permisos
  const sendPermissionNotification = (user, folder) => {
    alert(`Notificación enviada a ${user.name} sobre cambios de permisos en "${folder.name}"`);
  };

  // Función para encontrar el documento más apropiado para un archivo
  const findBestMatchDocument = (fileName, documents) => {
    const fileNameLower = fileName.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    documents.forEach(doc => {
      let score = 0;
      doc.keywords.forEach(keyword => {
        if (fileNameLower.includes(keyword.toLowerCase())) {
          score += keyword.length; // Palabras más largas tienen más peso
        }
      });
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = doc;
      }
    });

    return bestMatch;
  };

  // Función para filtrar carpetas basado en el término de búsqueda
  const filteredFolders = useMemo(() => {
    if (!searchTerm.trim()) {
      return folders;
    }

    const searchLower = searchTerm.toLowerCase();
    
    return folders.filter(folder => {
      // Buscar en el nombre de la carpeta
      const folderNameMatch = folder.name.toLowerCase().includes(searchLower);
      
      // Buscar en los documentos de la carpeta
      const documentMatch = folder.documents.some(doc => 
        doc.name.toLowerCase().includes(searchLower)
      );
      
      return folderNameMatch || documentMatch;
    }).map(folder => {
      // Si hay coincidencia en documentos, filtrar solo los documentos que coinciden
      if (!folder.name.toLowerCase().includes(searchLower)) {
        return {
          ...folder,
          documents: folder.documents.filter(doc => 
            doc.name.toLowerCase().includes(searchLower)
          )
        };
      }
      return folder;
    });
  }, [searchTerm, folders]);

  const getFolderColor = (color) => {
    const colors = {
      blue: "text-blue-500",
      green: "text-green-500",
      purple: "text-purple-500"
    };
    return colors[color] || "text-gray-500";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'pending':
        return <div className="w-2 h-2 bg-orange-500 rounded-full"></div>;
      case 'missing':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-300 rounded-full"></div>;
    }
  };
  // Función para subir archivo
  const handleUploadFile = () => {
    uploadFileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      files.forEach(file => {
        logActivity(
          'Archivo subido',
          `Se subió el archivo "${file.name}" (${(file.size / 1024).toFixed(2)} KB)`
        );
      });
      alert(`${files.length} archivo(s) subido(s) correctamente`);
      event.target.value = ''; // Reset input
    }
  };

  // Función para ordenar carpetas
  const getSortedFolders = (foldersToSort) => {
    const sorted = [...foldersToSort];
    
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-asc':
        return sorted.sort((a, b) => (a.date || 0) - (b.date || 0));
      case 'date-desc':
        return sorted.sort((a, b) => (b.date || 0) - (a.date || 0));
      default:
        return sorted;
    }
  };

  // Función para seleccionar/deseleccionar item
  const toggleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Función para cortar
  const handleCut = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un elemento para cortar');
      return;
    }
    setClipboard({ items: selectedItems, action: 'cut' });
    logActivity('Cortar', `${selectedItems.length} elemento(s) cortado(s)`);
  };

  // Función para copiar (copia carpetas completas con contenido)
  const handleCopy = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un elemento para copiar');
      return;
    }
    
    // Copiar carpetas completas con su contenido
    const itemsToCopy = selectedItems.map(itemId => {
      const folder = folders.find(f => f.id === itemId);
      if (folder) {
        // Copiar carpeta con todos sus documentos
        return {
          ...folder,
          documents: folder.documents || []
        };
      }
      // Si es un archivo individual
      return { id: itemId, name: itemId };
    });
    
    setClipboard({ items: itemsToCopy, action: 'copy' });
    logActivity('Copiar', `${selectedItems.length} elemento(s) copiado(s) con su contenido`);
    alert(`${selectedItems.length} elemento(s) copiado(s)`);
  };

  // Función auxiliar para generar nombre incremental
  const getIncrementalName = (baseName) => {
    // Verificar si ya existe el nombre base
    const existingNames = folders.map(f => f.name);
    
    if (!existingNames.includes(baseName)) {
      return baseName;
    }
    
    // Buscar el siguiente número disponible
    let counter = 1;
    let newName = `${baseName} (${counter})`;
    
    while (existingNames.includes(newName)) {
      counter++;
      newName = `${baseName} (${counter})`;
    }
    
    return newName;
  };

  // Función para pegar (crea copias con nombres incrementales)
  const handlePaste = () => {
    if (clipboard.items.length === 0) {
      alert('No hay elementos en el portapapeles');
      return;
    }
    
    // Crear copias de las carpetas con nombres incrementales
    const newFolders = clipboard.items.map(item => {
      if (item.documents !== undefined) {
        // Es una carpeta
        const newName = getIncrementalName(item.name);
        return {
          ...item,
          id: Date.now() + Math.random(), // Nuevo ID único
          name: newName,
          documents: [...item.documents] // Copiar documentos
        };
      }
      return null;
    }).filter(Boolean);
    
    // Agregar las nuevas carpetas al estado
    setFolders(prev => [...prev, ...newFolders]);
    
    const pastedNames = newFolders.map(f => f.name).join(', ');
    logActivity('Pegar', `Carpetas pegadas: ${pastedNames}`);
    alert(`${newFolders.length} elemento(s) pegado(s)`);
    
    setSelectedItems([]);
  };

  // Función para renombrar (abre modal)
  const handleRename = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona un elemento para renombrar');
      return;
    }
    if (selectedItems.length > 1) {
      alert('Solo puedes renombrar un elemento a la vez');
      return;
    }
    
    // Buscar el elemento seleccionado
    const folder = folders.find(f => f.id === selectedItems[0]);
    if (folder) {
      // Abrir modal de renombrar
      openRenameModal(folder);
    } else {
      // Si es un archivo
      const fileNames = {
        'file-1': 'Reporte Financiero Q1.pdf',
        'file-2': 'Presentación Bancaria.pptx',
        'file-3': 'Logo Empresa.png'
      };
      const fileName = fileNames[selectedItems[0]];
      if (fileName) {
        openRenameModal({ id: selectedItems[0], name: fileName });
      }
    }
  };
  
  // Función para abrir modal de renombrar
  const openRenameModal = (item) => {
    setItemToRename(item);
    setNewItemName(item.name || item);
    setShowRenameModal(true);
  };
  
  // Función para confirmar renombrado
  const confirmRename = () => {
    if (!newItemName || !newItemName.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }
    
    // Si es una carpeta del estado folders
    if (itemToRename.id) {
      setFolders(prev => prev.map(f => 
        f.id === itemToRename.id ? { ...f, name: newItemName.trim() } : f
      ));
      logActivity('Renombrar', `"${itemToRename.name}" renombrado a "${newItemName.trim()}"`);
    }
    
    // Cerrar modal
    setShowRenameModal(false);
    setItemToRename(null);
    setNewItemName('');
  };

  // Función para compartir
  const handleShare = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un elemento para compartir');
      return;
    }
    const folder = folders.find(f => f.id === selectedItems[0]);
    if (folder) {
      openPermissionsModal(folder);
    }
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
    
    const destinationFolder = folders.find(f => f.id === moveDestination);
    logActivity(
      'Mover', 
      `${selectedItems.length} elemento(s) movido(s) a "${destinationFolder?.name}"`
    );
    
    setShowMoveModal(false);
    setMoveDestination(null);
    setSelectedItems([]);
    alert(`Elementos movidos a "${destinationFolder?.name}" correctamente`);
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
    const deletedNames = folders
      .filter(f => selectedItems.includes(f.id))
      .map(f => f.name)
      .join(', ');
    
    setFolders(prev => prev.filter(f => !selectedItems.includes(f.id)));
    logActivity('Eliminar', `Eliminado(s): ${deletedNames}`);
    setShowDeleteModal(false);
    setSelectedItems([]);
    alert('Elemento(s) eliminado(s) correctamente');
  };

  const getDocumentStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            <CheckCircle className="h-3 w-3" />
            Presente
          </div>
        );
      case 'missing':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
            <AlertCircle className="h-3 w-3" />
            Faltante
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
            <Clock className="h-3 w-3" />
            Pendiente
          </div>
        );
      default:
        return null;
    }
  };

  const getDocumentIconColor = (color) => {
    const colors = {
      red: "text-red-500 bg-red-50",
      green: "text-green-500 bg-green-50",
      blue: "text-blue-500 bg-blue-50",
      orange: "text-orange-500 bg-orange-50",
      pink: "text-pink-500 bg-pink-50",
      purple: "text-purple-500 bg-purple-50"
    };
    return colors[color] || "text-gray-500 bg-gray-50";
  };

  // Función para resaltar texto coincidente
  const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Función para limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Función para abrir carpeta
  const openFolder = (folder) => {
    setSelectedFolder(folder);
    setCurrentView('folder-detail');
  };

  // Función para volver a la vista de carpetas
  const goBackToFolders = () => {
    setCurrentView('folders');
    setSelectedFolder(null);
  };

  // Funciones de drag & drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
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
    if (files.length > 0 && selectedFolder) {
      processDroppedFiles(files);
    }
  };

  const processDroppedFiles = (files) => {
    const fileAssignments = [];
    
    files.forEach(file => {
      const bestMatch = findBestMatchDocument(file.name, selectedFolder.documents);
      if (bestMatch) {
        fileAssignments.push({
          file: file,
          document: bestMatch,
          assigned: true
        });
      } else {
        fileAssignments.push({
          file: file,
          document: null,
          assigned: false
        });
      }
    });

    setDraggedFiles(fileAssignments);
    
    // Auto-asignar archivos que tienen coincidencia
    fileAssignments.forEach(assignment => {
      if (assignment.assigned) {
        handleFileUpload(assignment.document, assignment.file);
      }
    });

    // Mostrar resumen de archivos procesados
    const assignedCount = fileAssignments.filter(a => a.assigned).length;
    const totalCount = fileAssignments.length;
    
    if (assignedCount > 0) {
      alert(`Se asignaron automáticamente ${assignedCount} de ${totalCount} archivos`);
    }
    
    if (assignedCount < totalCount) {
      alert(`${totalCount - assignedCount} archivos no pudieron ser asignados automáticamente`);
    }
  };

  // Función para subir archivo individual (click)
  const handleUpload = (document) => {
    // Crear input file dinámicamente
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx,.txt,.xlsx,.xls';
    input.multiple = false; // Para subida individual
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleDocumentFileUpload(document, file);
      }
    };
    
    // Abrir explorador de archivos
    input.click();
  };

  // Función para subida masiva
  const handleMassUpload = () => {
    if (!selectedFolder) return;
    
    // Crear input file para subida masiva
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx,.txt,.xlsx,.xls';
    input.multiple = true; // Permitir múltiples archivos
    
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        setMassUploadFiles(files);
        setShowMassUploadModal(true);
      }
    };
    
    // Abrir explorador de archivos
    input.click();
  };

  // Función para procesar la subida de archivo de documento
  const handleDocumentFileUpload = (document, file) => {
    // Simular subida de archivo
    const fileKey = `${selectedFolder.id}-${document.id}`;
    setUploadedFiles(prev => ({
      ...prev,
      [fileKey]: {
        file: file,
        name: file.name,
        size: file.size,
        uploadedAt: new Date()
      }
    }));

    // Actualizar el estado del documento
    setFolders(prevFolders => 
      prevFolders.map(folder => 
        folder.id === selectedFolder.id 
          ? {
              ...folder,
              documents: folder.documents.map(doc => 
                doc.id === document.id 
                  ? { 
                      ...doc, 
                      status: 'present', 
                      fileUrl: URL.createObjectURL(file),
                      description: 'Documento validado y almacenado'
                    }
                  : doc
              ),
              completedCount: folder.documents.filter(doc => 
                doc.id === document.id || doc.status === 'present'
              ).length
            }
          : folder
      )
    );

    // Actualizar selectedFolder también
    if (selectedFolder) {
      setSelectedFolder(prev => ({
        ...prev,
        documents: prev.documents.map(doc => 
          doc.id === document.id 
            ? { 
                ...doc, 
                status: 'present', 
                fileUrl: URL.createObjectURL(file),
                description: 'Documento validado y almacenado'
              }
            : doc
        ),
        completedCount: prev.documents.filter(doc => 
          doc.id === document.id || doc.status === 'present'
        ).length
      }));
    }
  };

  // Función para procesar subida masiva
  const processMassUpload = () => {
    let assignedCount = 0;
    
    massUploadFiles.forEach(file => {
      const bestMatch = findBestMatchDocument(file.name, selectedFolder.documents);
      if (bestMatch && bestMatch.status !== 'present') {
        handleFileUpload(bestMatch, file);
        assignedCount++;
      }
    });

    setShowMassUploadModal(false);
    setMassUploadFiles([]);
    
    alert(`Se procesaron ${assignedCount} archivos de ${massUploadFiles.length} seleccionados`);
  };

  // Función para ver documento
  const handleView = (document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  // Función para descargar documento
  const handleDownload = (document) => {
    console.log('Descargar documento:', document.name);
    // Aquí iría la lógica para descargar documento
    if (document.fileUrl) {
      const link = document.createElement('a');
      link.href = document.fileUrl;
      link.download = document.name;
      link.click();
    } else {
      alert(`No hay archivo disponible para: ${document.name}`);
    }
  };

  // Función para cerrar modal
  const closeModal = () => {
    setShowDocumentModal(false);
    setSelectedDocument(null);
  };

  // Modal de gestión de permisos
  const PermissionsModal = () => {
    if (!showPermissionsModal || !selectedFolderForPermissions) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <UserCheck className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Gestión de Permisos
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedFolderForPermissions.name}
                </p>
              </div>
            </div>
            <button 
              onClick={closePermissionsModal}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Botón para agregar nuevo usuario */}
            <div className="mb-4">
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                Agregar Nuevo Usuario
              </button>
            </div>
            
            <div className="space-y-4">
              {users.map((user) => {
                const permissions = folderPermissions[selectedFolderForPermissions.id]?.[user.id] || {
                  canView: false,
                  canEdit: false,
                  canDelete: false,
                  canPrint: false
                };

                return (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Información del usuario */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                          {user.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.role} • Último acceso: {user.lastAccess}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => sendPermissionNotification(user, selectedFolderForPermissions)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Enviar notificación"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Llamar"
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Permisos */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Ver */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Ver</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={permissions.canView}
                            onChange={(e) => updatePermission(user.id, 'canView', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Modificar */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Edit className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">Modificar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={permissions.canEdit}
                            onChange={(e) => updatePermission(user.id, 'canEdit', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      {/* Eliminar */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium">Eliminar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={permissions.canDelete}
                            onChange={(e) => updatePermission(user.id, 'canDelete', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>

                      {/* Imprimir */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Printer className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium">Imprimir</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={permissions.canPrint}
                            onChange={(e) => updatePermission(user.id, 'canPrint', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {users.length} usuarios configurados
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={closePermissionsModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Permisos guardados correctamente');
                  closePermissionsModal();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal de crear carpeta
  const CreateFolderModal = () => {
    if (!showCreateFolderModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Crear Nueva Carpeta
              </h3>
            </div>
            <button 
              onClick={() => setShowCreateFolderModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Carpeta *
              </label>
              <input
                type="text"
                value={newFolderData.name}
                onChange={(e) => setNewFolderData({ ...newFolderData, name: e.target.value })}
                placeholder="Ej: Documentos Legales"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción (Opcional)
              </label>
              <textarea
                value={newFolderData.description}
                onChange={(e) => setNewFolderData({ ...newFolderData, description: e.target.value })}
                placeholder="Descripción de la carpeta..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={() => setShowCreateFolderModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateFolder}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Crear Carpeta
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal de agregar usuario
  const AddUserModal = () => {
    if (!showAddUserModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <UserPlus className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Agregar Nuevo Usuario
              </h3>
            </div>
            <button 
              onClick={() => setShowAddUserModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={newUserData.name}
                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                placeholder="Ej: Juan Pérez"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                placeholder="usuario@empresa.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono (Opcional)
              </label>
              <input
                type="tel"
                value={newUserData.phone}
                onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                placeholder="+52 55 1234 5678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Permisos
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Ver */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Ver</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newUserData.permissions?.canView || false}
                      onChange={(e) => setNewUserData({ 
                        ...newUserData, 
                        permissions: { ...newUserData.permissions, canView: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Modificar */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <Edit className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Modificar</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newUserData.permissions?.canEdit || false}
                      onChange={(e) => setNewUserData({ 
                        ...newUserData, 
                        permissions: { ...newUserData.permissions, canEdit: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Eliminar */}
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-gray-900">Eliminar</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newUserData.permissions?.canDelete || false}
                      onChange={(e) => setNewUserData({ 
                        ...newUserData, 
                        permissions: { ...newUserData.permissions, canDelete: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                {/* Imprimir */}
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Printer className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">Imprimir</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newUserData.permissions?.canPrint || false}
                      onChange={(e) => setNewUserData({ 
                        ...newUserData, 
                        permissions: { ...newUserData.permissions, canPrint: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={() => setShowAddUserModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar Usuario
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal de subida masiva
  const MassUploadModal = () => {
    if (!showMassUploadModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Files className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Subida Masiva de Archivos
                </h3>
                <p className="text-sm text-gray-600">
                  {massUploadFiles.length} archivos seleccionados
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowMassUploadModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Lista de archivos */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-3">
              {massUploadFiles.map((file, index) => {
                const bestMatch = findBestMatchDocument(file.name, selectedFolder.documents);
                return (
                  <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{file.name}</h4>
                      <p className="text-sm text-gray-600">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <div className="text-right">
                      {bestMatch ? (
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">✓ Asignar a:</span>
                          <br />
                          <span className="text-gray-700">{bestMatch.name}</span>
                        </div>
                      ) : (
                        <span className="text-orange-600 text-sm">⚠ Sin coincidencia</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {massUploadFiles.filter(file => 
                findBestMatchDocument(file.name, selectedFolder.documents)
              ).length} archivos serán asignados automáticamente
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMassUploadModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={processMassUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Procesar Archivos
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal de documento
  const DocumentModal = () => {
    if (!showDocumentModal || !selectedDocument) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
          {/* Header del modal */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getDocumentIconColor(selectedDocument.color)}`}>
                <selectedDocument.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedDocument.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedDocument.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ZoomOut className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ZoomIn className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Rotate className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Contenido del documento */}
          <div className="flex-1 p-6 overflow-auto">
            {selectedDocument.fileUrl ? (
              <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                <div>
                  <selectedDocument.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Vista previa del documento
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {selectedDocument.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Aquí se mostraría el contenido del documento PDF o imagen
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                <div>
                  <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-red-900 mb-2">
                    Documento no disponible
                  </h4>
                  <p className="text-red-600 mb-4">
                    Este documento aún no ha sido subido
                  </p>
                  <button
                    onClick={() => {
                      closeModal();
                      handleUpload(selectedDocument);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Subir documento
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer del modal */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              {getDocumentStatusBadge(selectedDocument.status)}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload(selectedDocument)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                Descargar
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Vista de detalles de carpeta
  const renderFolderDetail = () => {
    if (!selectedFolder) return null;

    return (
      <div 
        className={`bg-white rounded-lg border border-gray-200 relative ${isDragging ? 'border-blue-500 border-2' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Overlay de drag & drop */}
        {isDragging && (
          <div className="absolute inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <CloudUpload className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Suelta los archivos aquí
              </h3>
              <p className="text-blue-700">
                Los documentos se asignarán automáticamente a sus casillas correspondientes
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button 
              onClick={goBackToFolders}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${getDocumentIconColor('blue')}`}>
                <selectedFolder.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Documentos de "{selectedFolder.name}"
                </h2>
                <p className="text-sm text-gray-600">
                  Vista completa de documentos y estado de validación
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleMassUpload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Files className="h-4 w-4" />
              Subida Masiva
            </button>
            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cerrar Vista
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Generar Reporte
            </button>
          </div>
        </div>

        {/* Grid de documentos */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedFolder.documents.map((document) => {
              const fileKey = `${selectedFolder.id}-${document.id}`;
              const uploadedFile = uploadedFiles[fileKey];
              
              return (
                <div
                  key={document.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                >
                  {/* Status badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg ${getDocumentIconColor(document.color)}`}>
                      <document.icon className="h-6 w-6" />
                    </div>
                    {getDocumentStatusBadge(document.status)}
                  </div>

                  {/* Document info */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {document.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {document.description}
                    </p>
                    {uploadedFile && (
                      <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
                        📄 {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                      </div>
                    )}
                  </div>

                  {/* Actions - Siempre mostrar los 3 botones */}
                  <div className="space-y-2">
                    {/* Botón Subir - siempre visible */}
                    <button
                      onClick={() => handleUpload(document)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Subir
                    </button>
                    
                    {/* Botones Ver y Descargar */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(document)}
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        Ver
                      </button>
                      <button
                        onClick={() => handleDownload(document)}
                        className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Vista de Compartidos
  const renderSharedView = () => {
    // Obtener carpetas que tienen permisos asignados
    const sharedFolders = folders.filter(folder => {
      const permissions = folderPermissions[folder.id];
      return permissions && Object.keys(permissions).length > 0;
    });

    return (
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Carpetas Compartidas</h2>
          <p className="text-sm text-gray-600">
            Carpetas que has compartido con otros usuarios
          </p>
        </div>

        {sharedFolders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Share2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay carpetas compartidas
            </h3>
            <p className="text-gray-600">
              Comparte carpetas con otros usuarios para colaborar
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sharedFolders.map((folder) => {
              const permissions = folderPermissions[folder.id] || {};
              const sharedUsers = Object.keys(permissions)
                .map(userId => users.find(u => u.id === parseInt(userId)))
                .filter(Boolean);

              return (
                <div
                  key={folder.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <FolderOpen className="h-8 w-8 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {folder.name}
                        </h3>
                        <p className="text-sm text-gray-600">{folder.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => openFolder(folder)}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      Abrir carpeta
                    </button>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Compartido con {sharedUsers.length} {sharedUsers.length === 1 ? 'usuario' : 'usuarios'}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sharedUsers.map((user) => {
                        const userPerms = permissions[user.id];
                        const permsList = [];
                        if (userPerms.canView) permsList.push('Ver');
                        if (userPerms.canEdit) permsList.push('Modificar');
                        if (userPerms.canDelete) permsList.push('Eliminar');
                        if (userPerms.canPrint) permsList.push('Imprimir');

                        return (
                          <div
                            key={user.id}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-600">{permsList.join(', ')}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Vista de Recientes (Log de actividad)
  const renderRecentView = () => {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Actividad Reciente</h2>
          <p className="text-sm text-gray-600">
            Historial de todas las acciones realizadas en Trámites Notariales
          </p>
        </div>

        {activityLog.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay actividad reciente
            </h3>
            <p className="text-gray-600">
              Las acciones que realices aparecerán aquí
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="divide-y divide-gray-200">
              {activityLog.map((activity) => {
                const date = new Date(activity.timestamp);
                const timeAgo = getTimeAgo(date);
                
                return (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.action)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {activity.details}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {activity.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Función auxiliar para obtener icono según tipo de acción
  const getActivityIcon = (action) => {
    if (action.includes('carpeta')) {
      return <div className="p-2 bg-blue-50 rounded-lg"><FolderPlus className="h-5 w-5 text-blue-600" /></div>;
    } else if (action.includes('Compartir') || action.includes('permiso')) {
      return <div className="p-2 bg-green-50 rounded-lg"><Share2 className="h-5 w-5 text-green-600" /></div>;
    } else if (action.includes('documento') || action.includes('archivo')) {
      return <div className="p-2 bg-purple-50 rounded-lg"><Upload className="h-5 w-5 text-purple-600" /></div>;
    } else if (action.includes('usuario')) {
      return <div className="p-2 bg-orange-50 rounded-lg"><UserPlus className="h-5 w-5 text-orange-600" /></div>;
    }
    return <div className="p-2 bg-gray-50 rounded-lg"><FileText className="h-5 w-5 text-gray-600" /></div>;
  };

  // Función auxiliar para calcular tiempo transcurrido
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Hace un momento';
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} minutos`;
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} horas`;
    if (seconds < 604800) return `Hace ${Math.floor(seconds / 86400)} días`;
    
    return date.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Modal de Mover
  const renderMoveModal = () => {
    if (!showMoveModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Mover elementos</h3>
            <button
              onClick={() => {
                setShowMoveModal(false);
                setMoveDestination(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Selecciona la carpeta de destino para mover {selectedItems.length} elemento(s)
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {folders
                .filter(f => !selectedItems.includes(f.id))
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
                    <FolderOpen className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">{folder.name}</span>
                  </button>
                ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
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
    );
  };

  // Modal de Eliminar
  const renderDeleteModal = () => {
    if (!showDeleteModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Confirmar eliminación</h3>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  ¿Estás seguro de eliminar {selectedItems.length} elemento(s)?
                </p>
                <p className="text-sm text-gray-600">
                  Esta acción no se puede deshacer. Los elementos seleccionados serán eliminados permanentemente.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
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
    );
  };
  
  // Modal de Renombrar
  const renderRenameModal = () => {
    if (!showRenameModal || !itemToRename) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Renombrar elemento</h3>
            <button
              onClick={() => {
                setShowRenameModal(false);
                setItemToRename(null);
                setNewItemName('');
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nuevo nombre
            </label>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  confirmRename();
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el nuevo nombre"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
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
    );
  };
  
  // Vista principal de carpetas
  const renderFoldersView = () => {
    const sortedFolders = getSortedFolders(filteredFolders);
    
    return (
      <div>
        {/* Vista Grid (Iconos) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Carpetas */}
            {sortedFolders.map((folder) => (
          <div
            key={folder.id}
            className={`bg-white border rounded-lg p-4 hover:shadow-lg transition-all group relative ${
              selectedItems.includes(folder.id) 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Checkbox de selección */}
            <div className="absolute top-3 left-3 z-10">
              <input
                type="checkbox"
                checked={selectedItems.includes(folder.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelectItem(folder.id);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
            </div>
            
            {/* Botón de compartir */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openPermissionsModal(folder);
              }}
              className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors z-10"
            >
              <UserCheck className="h-3 w-3" />
              Compartir
            </button>
            
            {/* Contenido de la carpeta - clickeable */}
            <div 
              onClick={() => openFolder(folder)}
              className="flex flex-col items-center text-center cursor-pointer"
            >
              <div className="mb-3 mt-4">
                <FolderOpen className="h-12 w-12 text-blue-500 group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1 truncate w-full">
                {folder.name}
              </h3>
              <p className="text-xs text-gray-500">{folder.size}</p>
            </div>
          </div>
        ))}

        {/* Archivos de ejemplo (puedes agregar más según necesites) */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group relative">
          {/* Checkbox de selección */}
          <div className="absolute top-3 left-3 z-10">
            <input
              type="checkbox"
              checked={selectedItems.includes('file-1')}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectItem('file-1');
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>
          
          <div 
            onClick={() => toggleSelectItem('file-1')}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <div className="mb-3">
              <FileText className="h-12 w-12 text-red-500 group-hover:text-red-600 transition-colors" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1 truncate w-full">
              Reporte Financiero Q1.pdf
            </h3>
            <p className="text-xs text-gray-500 mb-1">2.4 MB</p>
            <p className="text-xs text-gray-400">Hace 1 día</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group relative">
          {/* Checkbox de selección */}
          <div className="absolute top-3 left-3 z-10">
            <input
              type="checkbox"
              checked={selectedItems.includes('folder-estados')}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectItem('folder-estados');
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>
          
          {/* Botón de compartir */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert('Compartir carpeta Estados de Cuenta');
            }}
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors z-10"
          >
            <UserCheck className="h-3 w-3" />
            Compartir
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 mt-4">
              <FolderOpen className="h-12 w-12 text-blue-500 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1 truncate w-full">
              Estados de Cuenta
            </h3>
            <p className="text-xs text-gray-500 mb-1">---</p>
            <p className="text-xs text-gray-400">Hace 3 días</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group relative">
          {/* Checkbox de selección */}
          <div className="absolute top-3 left-3 z-10">
            <input
              type="checkbox"
              checked={selectedItems.includes('file-2')}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectItem('file-2');
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>
          
          <div 
            onClick={() => toggleSelectItem('file-2')}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <div className="mb-3">
              <FileText className="h-12 w-12 text-blue-600 group-hover:text-blue-700 transition-colors" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1 truncate w-full">
              Presentación Bancaria.pptx
            </h3>
            <p className="text-xs text-gray-500 mb-1">5.1 MB</p>
            <p className="text-xs text-gray-400">Hace 5 días</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group relative">
          {/* Checkbox de selección */}
          <div className="absolute top-3 left-3 z-10">
            <input
              type="checkbox"
              checked={selectedItems.includes('file-3')}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectItem('file-3');
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>
          
          <div 
            onClick={() => toggleSelectItem('file-3')}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <div className="mb-3">
              <FileText className="h-12 w-12 text-green-500 group-hover:text-green-600 transition-colors" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1 truncate w-full">
              Logo Empresa.png
            </h3>
            <p className="text-xs text-gray-500 mb-1">856 KB</p>
            <p className="text-xs text-gray-400">Hace 1 semana</p>
          </div>
        </div>
          </div>
        )}
        
        {/* Vista Lista */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Modificado</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedFolders.map((folder) => (
                  <tr key={folder.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FolderOpen className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900">{folder.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Carpeta</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{folder.size}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Hace 2 horas</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openFolder(folder)}
                          className="p-1 hover:bg-blue-50 rounded text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openPermissionsModal(folder);
                          }}
                          className="p-1 hover:bg-green-50 rounded text-green-600"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {/* Archivos individuales */}
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <FileText className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium text-gray-900">Reporte Financiero Q1.pdf</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">PDF</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2.4 MB</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Hace 1 día</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-blue-50 rounded text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-green-50 rounded text-green-600">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900">Presentación Bancaria.pptx</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">PPTX</td>
                  <td className="px-6 py-4 text-sm text-gray-600">5.1 MB</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Hace 5 días</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-blue-50 rounded text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-green-50 rounded text-green-600">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <FileText className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">Logo Empresa.png</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">PNG</td>
                  <td className="px-6 py-4 text-sm text-gray-600">856 KB</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Hace 1 semana</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-blue-50 rounded text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-green-50 rounded text-green-600">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {/* Header Section - Diseño Mis Archivos */}
          {currentView === 'folders' && (
            <div>
              {/* Título y botones principales */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Trámites Notariales
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Gestiona tus documentos y archivos de forma segura
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleUploadFile}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    <Upload className="h-4 w-4" />
                    Subir Archivo
                  </button>
                  {/* Input oculto para subir archivos */}
                  <input
                    ref={uploadFileInputRef}
                    type="file"
                    multiple
                    accept="*/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button 
                    onClick={() => setShowCreateFolderModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors bg-white"
                  >
                    <FolderPlus className="h-4 w-4" />
                    Nueva Carpeta
                  </button>
                </div>
              </div>

              {/* Tarjetas de estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Total Archivos */}
                <div className="bg-white rounded-lg border-l-4 border-blue-500 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Archivos</p>
                      <p className="text-2xl font-bold text-blue-600">5</p>
                    </div>
                    <div className="p-2.5 bg-blue-50 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Carpetas */}
                <div className="bg-white rounded-lg border-l-4 border-green-500 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Carpetas</p>
                      <p className="text-2xl font-bold text-green-600">{folders.length}</p>
                    </div>
                    <div className="p-2.5 bg-green-50 rounded-lg">
                      <FolderOpen className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Compartidos */}
                <div className="bg-white rounded-lg border-l-4 border-purple-500 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Compartidos</p>
                      <p className="text-2xl font-bold text-purple-600">18</p>
                    </div>
                    <div className="p-2.5 bg-purple-50 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Almacenamiento */}
                <div className="bg-white rounded-lg border-l-4 border-orange-500 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Almacenamiento</p>
                      <p className="text-2xl font-bold text-orange-600">45.2 GB</p>
                    </div>
                    <div className="p-2.5 bg-orange-50 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pestañas de navegación */}
              <div className="flex items-center gap-8 mb-6 border-b border-gray-200 bg-white px-4">
                <button 
                  onClick={() => setActiveTab('mis-archivos')}
                  className={`flex items-center gap-2 px-2 py-3 border-b-2 font-medium text-sm -mb-px transition-colors ${
                    activeTab === 'mis-archivos' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FolderOpen className="h-4 w-4" />
                  Mis Archivos
                </button>
                <button 
                  onClick={() => setActiveTab('compartidos')}
                  className={`flex items-center gap-2 px-2 py-3 border-b-2 font-medium text-sm -mb-px transition-colors ${
                    activeTab === 'compartidos' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Share2 className="h-4 w-4" />
                  Compartidos
                </button>
                <button 
                  onClick={() => setActiveTab('recientes')}
                  className={`flex items-center gap-2 px-2 py-3 border-b-2 font-medium text-sm -mb-px transition-colors ${
                    activeTab === 'recientes' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  Recientes
                </button>
              </div>

              {/* Toolbar completa */}
              <div className="flex items-center justify-between mb-4 bg-white rounded-lg border border-gray-200 p-2">
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setShowCreateFolderModal(true)}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors text-sm"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Nuevo</span>
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors text-sm"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copiar</span>
                  </button>
                  <button 
                    onClick={handlePaste}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors text-sm"
                  >
                    <Clipboard className="h-4 w-4" />
                    <span>Pegar</span>
                  </button>
                  <button 
                    onClick={handleRename}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors text-sm"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Renombrar</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors text-sm"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Compartir</span>
                  </button>
                  <button 
                    onClick={handleMove}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors text-sm"
                  >
                    <Move className="h-4 w-4" />
                    <span>Mover</span>
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-md text-red-600 transition-colors text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Eliminar</span>
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  {/* Botón Ordenar con menú desplegable */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowSortMenu(!showSortMenu)}
                      className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors text-sm"
                    >
                      <SortAsc className="h-4 w-4" />
                      <span>Ordenar</span>
                    </button>
                    {showSortMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <button
                          onClick={() => { setSortBy('name-asc'); setShowSortMenu(false); }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${
                            sortBy === 'name-asc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          Nombre (A-Z)
                        </button>
                        <button
                          onClick={() => { setSortBy('name-desc'); setShowSortMenu(false); }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${
                            sortBy === 'name-desc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          Nombre (Z-A)
                        </button>
                        <button
                          onClick={() => { setSortBy('date-desc'); setShowSortMenu(false); }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${
                            sortBy === 'date-desc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          Fecha (Más reciente)
                        </button>
                        <button
                          onClick={() => { setSortBy('date-asc'); setShowSortMenu(false); }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${
                            sortBy === 'date-asc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          Fecha (Más antigua)
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Botón Vista Iconos */}
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  {/* Botón Vista Lista */}
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Barra de búsqueda */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar archivos y carpetas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Header para vista de detalle de carpeta */}
          {currentView === 'folder-detail' && selectedFolder && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={goBackToFolders}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedFolder.name} - Detalles
                </h1>
              </div>
            </div>
          )}

          {/* Contenido principal */}
          {currentView === 'folders' ? (
            activeTab === 'mis-archivos' ? renderFoldersView() :
            activeTab === 'compartidos' ? renderSharedView() :
            activeTab === 'recientes' ? renderRecentView() :
            renderFoldersView()
          ) : renderFolderDetail()}
        </main>

        {/* Footer */}
        <footer className="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-6">
          <div className="text-xs text-gray-500">
            © 2025 FinDrive. Todos los derechos reservados.
          </div>
          <div className="text-xs text-gray-500">
            Sistema de gestión documental financiera
          </div>
        </footer>
      </div>

      {/* Modales */}
      <DocumentModal />
      <MassUploadModal />
      <PermissionsModal />
      <CreateFolderModal />
      <AddUserModal />
      {renderMoveModal()}
      {renderDeleteModal()}
      {renderRenameModal()}
    </div>
  );
};

export default TramitesNotariales;
