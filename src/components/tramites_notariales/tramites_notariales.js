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
  Printer
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

  // Referencias para inputs de archivo
  const fileInputRefs = useRef({});
  const massUploadInputRef = useRef(null);

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

  // Función para actualizar permisos
  const updatePermission = (userId, permission, value) => {
    if (!selectedFolderForPermissions) return;
    
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
        handleFileUpload(document, file);
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

  // Función para procesar la subida de archivo
  const handleFileUpload = (document, file) => {
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

  // Vista principal de carpetas
  const renderFoldersView = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Carpetas de Clientes 
          <span className="text-sm font-normal text-gray-500">
            ({filteredFolders.length} {filteredFolders.length === 1 ? 'carpeta' : 'carpetas'})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resultados de búsqueda */}
      {searchTerm && (
        <div className="px-6 py-3 bg-blue-50 border-b border-gray-200">
          <p className="text-sm text-blue-700">
            {filteredFolders.length === 0 
              ? `No se encontraron resultados para "${searchTerm}"`
              : `Se encontraron ${filteredFolders.length} resultado(s) para "${searchTerm}"`
            }
          </p>
        </div>
      )}

      {/* Folders Grid */}
      <div className="p-6">
        {filteredFolders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-500 mb-4">
              Intenta con otros términos de búsqueda
            </p>
            <button
              onClick={clearSearch}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFolders.map((folder) => (
              <div
                key={folder.id}
                className="group border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300 bg-white"
              >
                {/* Header de la carpeta */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPermissionsModal(folder);
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <UserCheck className="h-3 w-3" />
                      Permiso
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-2" onClick={() => openFolder(folder)}>
                    <folder.icon className={`h-12 w-12 ${getFolderColor(folder.color)}`} />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {highlightText(folder.name, searchTerm)}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Lista de documentos */}
                <div className="p-4" onClick={() => openFolder(folder)}>
                  <div className="space-y-2">
                    {folder.documents.slice(0, 6).map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {getStatusIcon(doc.status)}
                        <span className="text-gray-600 truncate">
                          {highlightText(doc.name, searchTerm)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer con estadísticas */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {folder.completedCount}/{folder.totalCount} completos
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openFolder(folder);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              {/* Título con flecha */}
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentView === 'folder-detail' && selectedFolder 
                    ? `${selectedFolder.name} - Detalles`
                    : 'Trámites Notariales'
                  }
                </h1>
              </div>
            </div>

            {/* Toolbar - Solo mostrar en vista de carpetas */}
            {currentView === 'folders' && (
              <div className="flex items-center justify-between mb-6 bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="h-4 w-4" />
                    Nuevo
                  </button>
                  
                  <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                    <button className="p-1 hover:bg-gray-100 rounded text-blue-600">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-blue-600">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-blue-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-blue-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <SortAsc className="h-4 w-4" />
                    Ordenar
                  </button>
                  <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                    Ver
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Establecer como fondo
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <RotateCcw className="h-4 w-4" />
                    Girar a la izquierda
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <RotateCw className="h-4 w-4" />
                    Girar a la derecha
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Breadcrumb - Solo mostrar en vista de carpetas */}
          {currentView === 'folders' && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <button className="hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="hover:text-gray-900 cursor-pointer">Volver al inicio</span>
              </div>
            </div>
          )}

          {/* Contenido principal */}
          {currentView === 'folders' ? renderFoldersView() : renderFolderDetail()}
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
    </div>
  );
};

export default TramitesNotariales;

