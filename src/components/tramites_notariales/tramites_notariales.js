import React, { useState, useRef, useEffect, useMemo } from 'react';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
 // Debe estar en src/components/tramites_notariales/Error404Cavemen.jsx
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
  User,
  ChevronRight,
  AlertTriangle,
  FileCheck,
  Briefcase,
  Signature
} from 'lucide-react';



// ==================== COMPONENTE PARA GRID DE SUBIDA DE DOCUMENTOS ====================
const DocumentUploadGrid = ({ 
  folder, 
  parentFolderName,
  onBack,
  uploadedFiles = {},
  onFileUpload,
  onFileDelete,
  onMassUpload
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const massUploadRef = useRef(null);

  // Documentos para Persona Moral
  const DOCUMENTOS_MORAL = [
    { id: 'acta', name: 'Acta Constitutiva', icon: FileText, color: 'red' },
    { id: 'poder', name: 'Poder Representante Legal', icon: Shield, color: 'blue' },
    { id: 'registro', name: 'Registro Público Comercio', icon: Building, color: 'green' },
    { id: 'cedula', name: 'Cédula Identificación Fiscal', icon: User, color: 'yellow' },
    { id: 'comprobante', name: 'Comprobante Domicilio Fiscal', icon: MapPin, color: 'purple' },
    { id: 'identificacion', name: 'Identificación Oficial', icon: FileCheck, color: 'pink' },
    { id: 'forma', name: 'Forma Migratoria', icon: Briefcase, color: 'indigo' },
    { id: 'efirma1', name: 'E-firma Razón Social', icon: Signature, color: 'cyan' },
    { id: 'efirma2', name: 'E-firma Representante', icon: Users, color: 'orange' }
  ];

  // Documentos para Persona Física
  const DOCUMENTOS_FISICA = [
    { id: 'ine', name: 'INE, Pasaporte o Licencia', icon: FileText, color: 'red' },
    { id: 'comprobante', name: 'Comprobante de Domicilio', icon: MapPin, color: 'blue' },
    { id: 'constancia', name: 'Constancia de Situación Fiscal', icon: FileCheck, color: 'green' },
    { id: 'correo', name: 'Correo Electrónico', icon: Mail, color: 'yellow', type: 'text' },
    { id: 'telefono', name: 'Teléfono de Contacto', icon: Phone, color: 'purple', type: 'text' }
  ];

  const documentos = folder?.tipoPersona === 'moral' ? DOCUMENTOS_MORAL : DOCUMENTOS_FISICA;

  const getIconColor = (color) => {
    const colors = {
      red: 'bg-red-100 text-red-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      pink: 'bg-pink-100 text-pink-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      cyan: 'bg-cyan-100 text-cyan-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (onMassUpload) {
      onMassUpload(files);
    }
  };

  const handleMassUploadClick = () => {
    massUploadRef.current?.click();
  };

  const handleMassUploadChange = (e) => {
    const files = Array.from(e.target.files);
    if (onMassUpload) {
      onMassUpload(files);
    }
  };

  const handleFileUploadClick = (docId) => {
    fileInputRef.current?.click();
    fileInputRef.current.dataset.docId = docId;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      const docId = fileInputRef.current.dataset.docId;
      onFileUpload(docId, file);
    }
  };

  const getDocumentStatus = (docId) => {
    const fileKey = `${folder?.id}-${docId}`;
    return uploadedFiles[fileKey] ? 'uploaded' : 'pending';
  };


  // ==================== FUNCIÓN DE LOGOUT ====================
  const handleLogout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    
    // Redirigir a login o home
    window.location.href = '/login'; // Cambiar a tu ruta de login
    
    console.log('✅ Usuario desconectado');
  };




  return (
    <div className={`bg-white rounded-lg border border-gray-200 relative ${isDragging ? 'border-blue-500 border-2' : ''}`}>
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

      {/* Breadcrumb */}
      <div className="px-6 pt-4 pb-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700">
            {parentFolderName}
          </span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">
            {folder?.name}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Documentos de "{folder?.name}"
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">
                  {folder?.tipoPersona === 'moral' ? 'Persona Moral' : 'Persona Física'}
                </span>
                {' • '}
                Vista completa de documentos y estado de validación
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={handleMassUploadClick}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Files className="h-4 w-4" />
          Subida Masiva
        </button>
      </div>

      {/* Grid de documentos */}
      <div 
        className="p-6"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentos.map((document) => {
            const fileKey = `${folder?.id}-${document.id}`;
            const uploadedFile = uploadedFiles[fileKey];
            const status = getDocumentStatus(document.id);
            const IconComponent = document.icon;

            return (
              <div 
                key={document.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
              >
                {/* Header de la card */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${getIconColor(document.color)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    {status === 'uploaded' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>

                {/* Nombre y descripción */}
                <h3 className="font-semibold text-gray-900 mb-1">
                  {document.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {document.type === 'text' ? 'Ingresa tu ' + document.name.toLowerCase() : 'Documento requerido pendiente'}
                </p>

                {/* Contenido según tipo */}
                {document.type === 'text' ? (
                  <input
                    type="text"
                    placeholder={`Ingresa tu ${document.name.toLowerCase()}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <>
                    {uploadedFile ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-green-800 font-medium">
                          ✓ Archivo cargado
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          {uploadedFile.name}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 mb-3 text-center">
                        <p className="text-sm text-gray-600">
                          Sin archivo
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Botones de acción */}
                <div className="flex gap-2">
                  {document.type !== 'text' && (
                    <>
                      <button
                        onClick={() => handleFileUploadClick(document.id)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <CloudUpload className="h-4 w-4" />
                        Subir
                      </button>
                      {uploadedFile && (
                        <>
                          <button
                            className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            title="Ver archivo"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            title="Descargar"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onFileDelete?.(document.id)}
                            className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />
      <input
        ref={massUploadRef}
        type="file"
        className="hidden"
        multiple
        onChange={handleMassUploadChange}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />
    </div>
  );
};

const TramitesNotariales = () => {
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para la vista actual
  const [currentView, setCurrentView] = useState('folders');
  // ==================== ESTADO DE ERRORES ====================
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
 // 'folders' | 'folder-detail'
  const [selectedFolder, setSelectedFolder] = useState(null);
  // Estado para el modal de documento
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  // Estado para drag & drop
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFiles, setDraggedFiles] = useState([]);
  // Estado para archivos subidos
  const [uploadedFiles, setUploadedFiles] = useState({});
  // Estado para campos de texto (correo y teléfono)
  const [textFieldValues, setTextFieldValues] = useState({});
  // Estado para subida masiva
  const [showMassUploadModal, setShowMassUploadModal] = useState(false);
  const [massUploadFiles, setMassUploadFiles] = useState([]);
  // Estado para modal de permisos
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedFolderForPermissions, setSelectedFolderForPermissions] = useState(null);
  
  // Estado para modal de crear carpeta PRINCIPAL (solo nombre)
  const [showCreateMainFolderModal, setShowCreateMainFolderModal] = useState(false);
  const [newMainFolderData, setNewMainFolderData] = useState({
    name: ''
  });
  
  // Estado para modal de crear SUBCARPETA (con tipo de persona)
  const [showCreateSubfolderModal, setShowCreateSubfolderModal] = useState(false);
  const [newSubfolderData, setNewSubfolderData] = useState({
    name: '',
    tipoPersona: 'moral'
  });
  
  // Estado para modal de tipo de persona en SUBCARPETA
  const [showPersonTypeModal, setShowPersonTypeModal] = useState(false);
  const [selectedSubfolderForPersonType, setSelectedSubfolderForPersonType] = useState(null);
  const [selectedPersonType, setSelectedPersonType] = useState('moral');
  
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
  
  // Estado para almacenar carpetas compartidas por banca
  const [sharedFoldersByBanca, setSharedFoldersByBanca] = useState({});
  
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
  // Función para guardar campos de texto (correo y teléfono)
  const handleSaveTextFields = () => {
    if (!selectedFolder) return;

    // Actualizar los documentos de la carpeta con los valores guardados
    const updatedFolders = folders.map(folder => {
      if (folder.id === selectedFolder.id) {
        const updatedDocuments = folder.documents.map(doc => {
          const fileKey = `${folder.id}-${doc.id}`;
          const textValue = textFieldValues[fileKey];
          
          if (doc.type === 'text' && textValue) {
            return {
              ...doc,
              value: textValue,
              status: 'present',
              color: 'green'
            };
          }
          return doc;
        });
        
        return {
          ...folder,
          documents: updatedDocuments
        };
      }
      return folder;
    });

    setFolders(updatedFolders);
    setSelectedFolder(updatedFolders.find(f => f.id === selectedFolder.id));
    
    logActivity(
      'Datos guardados',
      `Se guardaron los datos de correo y telefono en la carpeta "${selectedFolder.name}"`
    );
  };



  // Funciones para calcular estadísticas dinámicas
  const calculateTotalFiles = () => {
    let total = 0;
    folders.forEach(folder => {
      if (folder.documents) {
        total += folder.documents.length;
      }
    });
    return total;
  };

  const calculateFolders = () => {
    return folders.length;
  };

  const calculateSharedFolders = () => {
    // Contar carpetas que tienen usuarios con permisos
    let sharedCount = 0;
    folders.forEach(folder => {
      if (folderPermissions[folder.id]) {
        const userCount = Object.keys(folderPermissions[folder.id]).length;
        if (userCount > 0) {
          sharedCount++;
        }
      }
    });
    return sharedCount;
  };

  const calculateStorageUsed = () => {
    let totalSize = 0;
    folders.forEach(folder => {
      if (folder.size) {
        const sizeStr = folder.size.toLowerCase().trim();
        const value = parseFloat(sizeStr);
        if (sizeStr.includes('gb')) {
          totalSize += value;
        } else if (sizeStr.includes('mb')) {
          totalSize += value / 1024;
        } else if (sizeStr.includes('kb')) {
          totalSize += value / (1024 * 1024);
        }
      }
    });
    return totalSize.toFixed(1);
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
  
  // Estado para modal de progreso de documentos
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedFolderForProgress, setSelectedFolderForProgress] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Referencias para inputs de archivo
  const fileInputRefs = useRef({});
  const massUploadInputRef = useRef(null);
  const uploadFileInputRef = useRef(null);
  const standaloneFileInputRef = useRef(null);
  
  // Estado para archivos sueltos (fuera de carpetas)
  const [standaloneFiles, setStandaloneFiles] = useState([]);
  
  // Estado para modal de vista previa de archivos sueltos
  const [showStandalonePreviewModal, setShowStandalonePreviewModal] = useState(false);
  const [selectedStandaloneFile, setSelectedStandaloneFile] = useState(null);
  const [documentContent, setDocumentContent] = useState(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  // ==================== ESTADO PARA NAVEGACIÓN DE CARPETAS ANIDADAS ====================
  const [folderPath, setFolderPath] = useState([]); // Ruta de navegación: [folderId1, folderId2, ...]
  const [currentFolderId, setCurrentFolderId] = useState(null); // ID de la carpeta actual (null = raíz)


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
      lastAccess: "2025-09-10 09:20",
      banca: "primer-piso"
    },
    {
      id: 5,
      name: "Fabiola Nené",
      email: "fabiola.nene@empresa.com",
      role: "Gestor de Carpetas",
      avatar: "FN",
      phone: "+52 55 6666 7777",
      lastAccess: "2025-09-10 15:45",
      banca: "segundo-piso"
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
      totalCount: 9,
      subfolders: []
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
      totalCount: 3,
      subfolders: []
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
      totalCount: 2,
      subfolders: []
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

  // Función para abrir modal de progreso
  const openProgressModal = (folder) => {
    setSelectedFolderForProgress(folder);
    setShowProgressModal(true);
  };

  // Función para cerrar modal de progreso
  const closeProgressModal = () => {
    setShowProgressModal(false);
    setSelectedFolderForProgress(null);
  };

  // Función para calcular el porcentaje de progreso
  const calculateProgress = (folder) => {
    if (!folder.documents || folder.documents.length === 0) return 0;
    const completed = folder.documents.filter(doc => doc.status === 'present').length;
    return Math.round((completed / folder.documents.length) * 100);
  };

  

  // Estructura de documentos para Persona Moral (9 documentos)
  const getDocumentosPersonaMoral = () => {
    return [
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
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: Shield,
        color: "red",
        fileUrl: null,
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
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: CreditCard,
        color: "red",
        fileUrl: null,
        keywords: ["cedula", "identificacion", "fiscal", "rfc"]
      },
      { 
        id: 5,
        name: "Comprobante Domicilio Fiscal", 
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: MapPin,
        color: "red",
        fileUrl: null,
        keywords: ["comprobante", "domicilio", "fiscal", "direccion"]
      },
      { 
        id: 6,
        name: "Identificación Oficial", 
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: Shield,
        color: "red",
        fileUrl: null,
        keywords: ["identificacion", "oficial", "ine", "pasaporte"]
      },
      { 
        id: 7,
        name: "Forma Migratoria", 
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: Plane,
        color: "red",
        fileUrl: null,
        keywords: ["forma", "migratoria", "fm", "inmigracion"]
      },
      { 
        id: 8,
        name: "E-firma Razón Social", 
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: Shield,
        color: "red",
        fileUrl: null,
        keywords: ["efirma", "firma", "razon", "social", "electronica"]
      },
      { 
        id: 9,
        name: "E-firma Representante", 
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: Users,
        color: "red",
        fileUrl: null,
        keywords: ["efirma", "firma", "representante", "electronica"]
      }
    ];
  };

  // Estructura de documentos para Persona Física (5 documentos)
  const getDocumentosPersonaFisica = () => {
    return [
      { 
        id: 1,
        name: "INE, Pasaporte o Licencia", 
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: CreditCard,
        color: "red",
        fileUrl: null,
        type: "file",
        keywords: ["ine", "pasaporte", "licencia", "identificacion"]
      },
      { 
        id: 2,
        name: "Comprobante de Domicilio", 
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: MapPin,
        color: "red",
        fileUrl: null,
        type: "file",
        keywords: ["comprobante", "domicilio", "direccion", "recibo"]
      },
      { 
        id: 3,
        name: "Constancia de Situacion Fiscal", 
        status: "missing", 
        description: "Documento requerido pendiente",
        icon: FileText,
        color: "red",
        fileUrl: null,
        type: "file",
        keywords: ["constancia", "situacion", "fiscal", "sat", "rfc"]
      },
      { 
        id: 4,
        name: "Correo Electronico", 
        status: "missing", 
        description: "Ingresa tu correo electronico",
        icon: Mail,
        color: "red",
        value: "",
        type: "text",
        keywords: ["correo", "email", "electronico"]
      },
      { 
        id: 5,
        name: "Telefono de Contacto", 
        status: "missing", 
        description: "Ingresa tu numero de telefono",
        icon: Phone,
        color: "red",
        value: "",
        type: "text",
        keywords: ["telefono", "contacto", "numero"]
      }
    ];
  };

  // Función para obtener documentos según el tipo de persona
  const getDocumentosPorTipo = (tipoPersona) => {
    return tipoPersona === 'moral' 
      ? getDocumentosPersonaMoral() 
      : getDocumentosPersonaFisica();
  };
  // ==================== FUNCIÓN PARA OBTENER LA CARPETA ACTUAL ====================
  const getCurrentFolder = () => {
    if (currentFolderId === null) return null;
    
    let folder = folders.find(f => f.id === currentFolderId);
    if (folder) return folder;
    
    // Si no está en el nivel raíz, buscar en subcarpetas
    for (let mainFolder of folders) {
      folder = findFolderInSubfolders(mainFolder, currentFolderId);
      if (folder) return folder;
    }
    return null;
  };

  // ==================== FUNCIÓN RECURSIVA PARA BUSCAR CARPETA EN SUBCARPETAS ====================
  const findFolderInSubfolders = (folder, folderId) => {
    if (folder.id === folderId) return folder;
    
    if (folder.subfolders && folder.subfolders.length > 0) {
      for (let subfolder of folder.subfolders) {
        const found = findFolderInSubfolders(subfolder, folderId);
        if (found) return found;
      }
    }
    return null;
  };

  // ==================== FUNCIÓN RECURSIVA PARA AGREGAR SUBCARPETA ====================
  const addSubfolderRecursively = (folder, targetFolderId, newFolder) => {
    if (folder.id === targetFolderId) {
      return {
        ...folder,
        subfolders: [...(folder.subfolders || []), newFolder]
      };
    }
    
    if (folder.subfolders && folder.subfolders.length > 0) {
      return {
        ...folder,
        subfolders: folder.subfolders.map(subfolder => 
          addSubfolderRecursively(subfolder, targetFolderId, newFolder)
        )
      };
    }
    
    return folder;
  };

  // ==================== FUNCIÓN PARA NAVEGAR A UNA CARPETA ====================
  const navigateToFolder = (folderId) => {
    setCurrentFolderId(folderId);
    setFolderPath([...folderPath, folderId]);
    setSelectedItems([]);
  };

  // ==================== FUNCIÓN PARA VOLVER A LA CARPETA ANTERIOR ====================
  const goBackFolder = () => {
    if (folderPath.length > 0) {
      const newPath = folderPath.slice(0, -1);
      setFolderPath(newPath);
      setCurrentFolderId(newPath.length > 0 ? newPath[newPath.length - 1] : null);
    }
  };

  // ==================== FUNCIÓN PARA IR A LA RAÍZ ====================
  const goToRoot = () => {
    setFolderPath([]);
    setCurrentFolderId(null);
  };

  // ==================== FUNCIÓN PARA OBTENER NOMBRE DE CARPETA PRINCIPAL ====================
  const getParentFolderName = () => {
    if (folderPath.length === 0) return null;
    
    // El primer elemento en folderPath es la carpeta principal
    const parentFolderId = folderPath[0];
    const parentFolder = folders.find(f => f.id === parentFolderId);
    return parentFolder?.name || null;
  };

  // ==================== FUNCIÓN PARA OBTENER CARPETAS ACTUALES ====================
  const getCurrentFolders = () => {
    if (currentFolderId === null) {
      return folders; // Retornar carpetas principales
    }
    
    const currentFolder = getCurrentFolder();
    return currentFolder?.subfolders || [];
  };



    // Función para crear nueva carpeta
  // ==================== CREAR CARPETA PRINCIPAL (SOLO NOMBRE) ====================
  const handleCreateMainFolder = () => {
    if (!newMainFolderData.name.trim()) {
      alert("Por favor ingrese un nombre para la carpeta");
      return;
    }
    
    // Las carpetas principales NO tienen tipo de persona
    const newFolder = {
      id: folders.length + 1,
      name: newMainFolderData.name,
      size: "0 MB",
      color: "blue",
      icon: FolderOpen,
      documents: [],
      subfolders: [],
      tipoPersona: null, // SIN tipo de persona
      completedCount: 0,
      totalCount: 0
    };
    
    setFolders([...folders, newFolder]);
    setNewMainFolderData({ name: "" });
    setShowCreateMainFolderModal(false);
    
    logActivity(
      "Nueva carpeta creada",
      `Se creó la carpeta principal "${newMainFolderData.name}"`
    );
  };

  // ==================== CREAR SUBCARPETA (CON TIPO DE PERSONA) ====================
  const handleCreateSubfolder = () => {
    if (!newSubfolderData.name.trim()) {
      alert("Por favor ingrese un nombre para la subcarpeta");
      return;
    }
    
    const documentos = getDocumentosPorTipo(newSubfolderData.tipoPersona);
    const totalDocumentos = documentos.length;
    
    const newFolder = {
      id: Date.now(), // Usar timestamp para IDs únicos
      name: newSubfolderData.name,
      size: "0 MB",
      color: "blue",
      icon: FolderOpen,
      documents: documentos,
      subfolders: [],
      tipoPersona: newSubfolderData.tipoPersona, // CON tipo de persona
      completedCount: 0,
      totalCount: totalDocumentos
    };
    
    // Agregar la subcarpeta a la carpeta actual
    setFolders(prevFolders => 
      prevFolders.map(folder => 
        addSubfolderRecursively(folder, currentFolderId, newFolder)
      )
    );
    
    setNewSubfolderData({ name: "", tipoPersona: "moral" });
    setShowCreateSubfolderModal(false);
    
    // ✅ NUEVO: Automáticamente abrir la vista de documentos para la subcarpeta creada
    setSelectedFolder(newFolder);
    setCurrentView('documents-cards');
    
    const tipoTexto = newSubfolderData.tipoPersona === "moral" ? "Persona Moral" : "Persona Física";
    logActivity(
      "Nueva subcarpeta creada",
      `Se creó la subcarpeta "${newSubfolderData.name}" (${tipoTexto}) con ${totalDocumentos} documentos requeridos`
    );
  };

  // ==================== FUNCIÓN PARA DETERMINAR QÚAL MODAL MOSTRAR ====================
  const handleNewFolderClick = () => {
    // FORZAR: Solo permitir crear carpetas en raíz o dentro de carpetas principales
    // NO permitir crear subcarpetas dentro de subcarpetas con tipoPersona
    if (currentFolderId === null) {
      // Estamos en raíz, mostrar modal simple
      setShowCreateMainFolderModal(true);
    } else if (currentView === 'documents-cards') {
      // Si estamos en vista de documentos, NO permitir crear más carpetas
      // Mostrar mensaje o no hacer nada
      return;
    } else {
      // Estamos dentro de una carpeta principal, mostrar modal con tipo de persona
      setShowCreateSubfolderModal(true);
    }
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
  
  // Funciones para archivos sueltos
  const handleStandaloneFileSelect = (event) => {
    const files = Array.from(event.target.files);
    processStandaloneFiles(files);
  };
  
  // Función para formatear tamaño de archivo
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const processStandaloneFiles = (files) => {
    const newFiles = files.map((file, index) => {
      return {
        id: `standalone-${Date.now()}-${index}`,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        modified: new Date().toLocaleString('es-ES'),
        fileURL: URL.createObjectURL(file),
        file: file // Guardar el objeto File original para poder leerlo
      };
    });
    
    setStandaloneFiles([...standaloneFiles, ...newFiles]);
    logActivity(
      'Archivos subidos',
      `Se subieron ${newFiles.length} archivo(s) suelto(s)`
    );
  };
  
  const handleViewStandaloneFile = async (file) => {
    setSelectedStandaloneFile(file);
    setShowStandalonePreviewModal(true);
    setDocumentContent(null);
    setIsLoadingContent(true);
    
    const fileInfo = getFileType(file);
    
    try {
      // Cargar contenido de Word
      if (fileInfo.type === 'word' && file.file) {
        const arrayBuffer = await file.file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setDocumentContent({ type: 'word', html: result.value });
      }
      // Cargar contenido de Excel
      else if (fileInfo.type === 'excel' && file.file) {
        const arrayBuffer = await file.file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const htmlTable = XLSX.utils.sheet_to_html(worksheet);
        setDocumentContent({ type: 'excel', html: htmlTable, sheetNames: workbook.SheetNames });
      }
    } catch (error) {
      console.error('Error al cargar contenido del documento:', error);
      setDocumentContent({ type: 'error', message: 'No se pudo cargar el contenido del documento' });
    } finally {
      setIsLoadingContent(false);
    }
  };
  
  const handleDeleteStandaloneFile = (fileId) => {
    setStandaloneFiles(standaloneFiles.filter(f => f.id !== fileId));
    logActivity('Archivo eliminado', 'Se eliminó un archivo suelto');
  };
  
  // Función para detectar tipo de archivo
  const getFileType = (file) => {
    const fileName = file.name.toLowerCase();
    const mimeType = file.type.toLowerCase();
    
    // Excel
    if (fileName.match(/\.(xlsx|xls)$/) || mimeType.includes('spreadsheet')) {
      return {
        type: 'excel',
        icon: 'excel',
        color: 'green',
        displayName: 'Excel',
        fullName: 'Hoja de cálculo',
        canView: false,
        canEdit: false
      };
    }
    
    // Word
    if (fileName.match(/\.(docx|doc)$/) || mimeType.includes('document')) {
      return {
        type: 'word',
        icon: 'word',
        color: 'blue',
        displayName: 'Word',
        fullName: 'Documento de texto',
        canView: false,
        canEdit: false
      };
    }
    
    // PowerPoint
    if (fileName.match(/\.(pptx|ppt)$/) || mimeType.includes('presentation')) {
      return {
        type: 'powerpoint',
        icon: 'powerpoint',
        color: 'orange',
        displayName: 'PowerPoint',
        fullName: 'Presentación',
        canView: false,
        canEdit: false
      };
    }
    
    // PDF
    if (fileName.match(/\.pdf$/) || mimeType.includes('pdf')) {
      return {
        type: 'pdf',
        icon: 'pdf',
        color: 'red',
        displayName: 'PDF',
        fullName: 'Documento PDF',
        canView: true,
        canEdit: false
      };
    }
    
    // Imágenes
    if (fileName.match(/\.(png|jpg|jpeg|gif|webp|svg)$/) || mimeType.includes('image')) {
      return {
        type: 'image',
        icon: 'image',
        color: 'purple',
        displayName: 'Imagen',
        fullName: 'Archivo de imagen',
        canView: true,
        canEdit: false
      };
    }
    
    // Texto
    if (fileName.match(/\.(txt|md|csv)$/) || mimeType.includes('text')) {
      return {
        type: 'text',
        icon: 'text',
        color: 'gray',
        displayName: 'Texto',
        fullName: 'Archivo de texto',
        canView: true,
        canEdit: false
      };
    }
    
    // Otros
    return {
      type: 'other',
      icon: 'file',
      color: 'gray',
      displayName: 'Archivo',
      fullName: 'Archivo genérico',
      canView: false,
      canEdit: false
    };
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
    console.log('🔍 openFolder - Abriendo:', folder.name, 'tipoPersona:', folder.tipoPersona);
    console.log('📁 Folder object:', folder);
    
    if (folder.tipoPersona) {
      // Es una subcarpeta con tipo de persona - mostrar grid de documentos
      console.log('✅ Mostrando documents-cards para:', folder.name);
      console.log('📄 Documentos:', folder.documents);
      
      // Forzar que selectedFolder tenga los documentos
      const folderWithDocs = {
        ...folder,
        documents: folder.documents || getDocumentosPorTipo(folder.tipoPersona)
      };
      
      setSelectedFolder(folderWithDocs);
      setCurrentView('documents-cards');
    } else {
      // Es una carpeta principal - navegar dentro
      console.log('📁 Navegando dentro:', folder.name);
      setCurrentFolderId(folder.id);
      setFolderPath([...folderPath, folder.id]);
      setCurrentView('folders');  // Asegurar que currentView sea 'folders'
      setSelectedFolder(null);
    }
  };


  // Función para volver a la vista anterior
  const goBackToFolders = () => {
    // Si estamos en la vista de documentos (folder-detail o documents-cards), volver a la vista de subcarpetas
    if (currentView === 'folder-detail' || currentView === 'documents-cards') {
      setCurrentView('folders');
      setSelectedFolder(null);
    } else if (folderPath.length > 0) {
      const newPath = folderPath.slice(0, -1);
      setFolderPath(newPath);
      setCurrentFolderId(newPath.length > 0 ? newPath[newPath.length - 1] : null);
    } else {
      setCurrentView('folders');
      setSelectedFolder(null);
    }
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

  // Modal de progreso de documentos
  const ProgressModal = () => {
    if (!showProgressModal || !selectedFolderForProgress) return null;

    const folder = selectedFolderForProgress;
    const progress = calculateProgress(folder);
    const completedDocs = folder.documents?.filter(doc => doc.status === 'present').length || 0;
    const totalDocs = folder.documents?.length || 0;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Progreso de Documentos
                </h3>
                <p className="text-sm text-gray-500">{folder.name}</p>
              </div>
            </div>
            <button 
              onClick={closeProgressModal}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-6">
            {/* Resumen General */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Progreso General</p>
                  <p className="text-3xl font-bold text-blue-600">{progress}%</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{completedDocs}/{totalDocs}</p>
                  <p className="text-sm text-gray-600">Documentos Completos</p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    progress === 100
                      ? 'bg-green-500'
                      : progress >= 75
                      ? 'bg-yellow-500'
                      : progress >= 50
                      ? 'bg-orange-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Lista de Documentos */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Detalle de Documentos
              </h4>
              <div className="space-y-2">
                {folder.documents && folder.documents.length > 0 ? (
                  folder.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        doc.status === 'present'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {doc.status === 'present' ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
                          doc.status === 'present'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {doc.status === 'present' ? 'Completo' : 'Pendiente'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No hay documentos en esta carpeta</p>
                  </div>
                )}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{completedDocs}</p>
                <p className="text-xs text-gray-600 mt-1">Completos</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{totalDocs - completedDocs}</p>
                <p className="text-xs text-gray-600 mt-1">Pendientes</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{totalDocs}</p>
                <p className="text-xs text-gray-600 mt-1">Total</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              onClick={closeProgressModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==================== MODAL PARA CREAR CARPETA PRINCIPAL (SOLO NOMBRE) ====================
  const CreateMainFolderModal = () => {
    if (!showCreateMainFolderModal) return null;

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
              onClick={() => setShowCreateMainFolderModal(false)}
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
                value={newMainFolderData.name}
                onChange={(e) => setNewMainFolderData({ ...newMainFolderData, name: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateMainFolder();
                  }
                }}
                placeholder="Ej: Documentos Legales"
                autoFocus
                spellCheck="false"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={() => setShowCreateMainFolderModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateMainFolder}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Crear Carpeta
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==================== MODAL PARA CREAR SUBCARPETA (CON TIPO DE PERSONA) ====================
  const CreateSubfolderModal = () => {
    if (!showCreateSubfolderModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Crear Nueva Subcarpeta
              </h3>
            </div>
            <button 
              onClick={() => setShowCreateSubfolderModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Subcarpeta *
              </label>
              <input
                type="text"
                value={newSubfolderData.name}
                onChange={(e) => setNewSubfolderData({ ...newSubfolderData, name: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateSubfolder();
                  }
                }}
                placeholder="Ej: Documentos Legales"
                autoFocus
                spellCheck="false"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Persona *
              </label>
              <select
                value={newSubfolderData.tipoPersona}
                onChange={(e) => setNewSubfolderData({ ...newSubfolderData, tipoPersona: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="moral">Persona Moral</option>
                <option value="fisica">Persona Física</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={() => setShowCreateSubfolderModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateSubfolder}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Crear Subcarpeta
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
                <FolderOpen className="h-6 w-6 text-blue-500" />
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
          </div>
        </div>

        {/* Grid de documentos */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedFolder.documents.map((document) => {
              const fileKey = `${selectedFolder.id}-${document.id}`;
              const uploadedFile = uploadedFiles[fileKey];
              const textValue = textFieldValues[fileKey] || '';
              const isTextField = document.type === 'text';
              
              return (
                <div
                  key={document.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                >
                  {/* Status badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg ${getDocumentIconColor(document.color)}`}>
                      {document.icon && React.createElement(document.icon, { className: "h-6 w-6" })}
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

                  {/* Actions - Mostrar textbox para campos de texto, botones para archivos */}
                  <div className="space-y-2">
                    {isTextField ? (
                      <>
                        <input
                          type={document.name.includes('Correo') ? 'email' : 'tel'}
                          value={textValue}
                          onChange={(e) => setTextFieldValues({ ...textFieldValues, [fileKey]: e.target.value })}
                          placeholder={document.description}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {textValue && (
                          <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
                            ✓ {document.name}: {textValue}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleUpload(document)}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                          Subir
                        </button>
                        
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
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Botón Guardar para campos de texto */}
          {selectedFolder.documents.some(doc => doc.type === 'text') && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveTextFields}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <CheckCircle className="h-5 w-5" />
                Guardar Datos
              </button>
            </div>
          )}
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
  
  // Modal de vista previa para archivos sueltos
  const StandaloneFilePreviewModal = () => {
    if (!showStandalonePreviewModal || !selectedStandaloneFile) return null;
    
    const fileInfo = getFileType(selectedStandaloneFile);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gray-50">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                fileInfo.color === 'green' ? 'bg-green-100' :
                fileInfo.color === 'blue' ? 'bg-blue-100' :
                fileInfo.color === 'orange' ? 'bg-orange-100' :
                fileInfo.color === 'red' ? 'bg-red-100' :
                fileInfo.color === 'purple' ? 'bg-purple-100' :
                'bg-gray-100'
              }`}>
                <FileText className={`h-6 w-6 ${
                  fileInfo.color === 'green' ? 'text-green-600' :
                  fileInfo.color === 'blue' ? 'text-blue-600' :
                  fileInfo.color === 'orange' ? 'text-orange-600' :
                  fileInfo.color === 'red' ? 'text-red-600' :
                  fileInfo.color === 'purple' ? 'text-purple-600' :
                  'text-gray-600'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedStandaloneFile.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedStandaloneFile.size} • {fileInfo.fullName}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowStandalonePreviewModal(false);
                setSelectedStandaloneFile(null);
              }}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Información del Archivo */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Información del Archivo</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-medium text-gray-900">{selectedStandaloneFile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tamaño:</span>
                  <span className="font-medium text-gray-900">{selectedStandaloneFile.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium text-gray-900">
                    {fileInfo.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modificado:</span>
                  <span className="font-medium text-gray-900">{selectedStandaloneFile.modified}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Propietario:</span>
                  <span className="font-medium text-gray-900">{selectedStandaloneFile.owner || 'Tú'}</span>
                </div>
              </div>
            </div>

            {/* Vista previa del archivo */}
            <div className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
              {fileInfo.type === 'image' && selectedStandaloneFile.fileURL ? (
                // Vista previa de imágenes
                <div className="flex flex-col items-center gap-3">
                  <img 
                    src={selectedStandaloneFile.fileURL} 
                    alt={selectedStandaloneFile.name}
                    className="max-w-full max-h-96 object-contain rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 mt-2">Vista previa de imagen</p>
                </div>
              ) : fileInfo.type === 'pdf' && selectedStandaloneFile.fileURL ? (
                // Vista previa de PDF
                <div className="w-full">
                  <iframe
                    src={selectedStandaloneFile.fileURL}
                    className="w-full h-96 rounded-lg border border-gray-300"
                    title={`Vista previa de ${selectedStandaloneFile.name}`}
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">Vista previa del documento PDF</p>
                </div>
              ) : (fileInfo.type === 'excel' || fileInfo.type === 'word' || fileInfo.type === 'powerpoint') ? (
                // Vista de contenido real para archivos de Office
                <div className="w-full">
                  {isLoadingContent ? (
                    <div className="flex flex-col items-center justify-center p-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-gray-600">Cargando contenido del documento...</p>
                    </div>
                  ) : documentContent && documentContent.type === 'word' ? (
                    <div className="w-full">
                      <div className="bg-white rounded-lg border border-gray-300 p-6 max-h-96 overflow-y-auto">
                        <div 
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: documentContent.html }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">Vista previa del documento Word</p>
                    </div>
                  ) : documentContent && documentContent.type === 'excel' ? (
                    <div className="w-full">
                      <div className="bg-white rounded-lg border border-gray-300 p-4 max-h-96 overflow-auto">
                        <div 
                          className="excel-table"
                          dangerouslySetInnerHTML={{ __html: documentContent.html }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Vista previa de Excel - Hoja: {documentContent.sheetNames ? documentContent.sheetNames[0] : 'Principal'}
                      </p>
                    </div>
                  ) : documentContent && documentContent.type === 'error' ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                      <p className="text-red-700">{documentContent.message}</p>
                      <p className="text-sm text-red-600 mt-2">Haz clic en "Descargar" para abrir el archivo</p>
                    </div>
                  ) : (
                    <div className={`bg-gradient-to-br rounded-lg p-8 text-center ${
                      fileInfo.type === 'excel' ? 'from-green-50 to-emerald-50' :
                      fileInfo.type === 'word' ? 'from-blue-50 to-indigo-50' :
                      'from-orange-50 to-red-50'
                    }`}>
                      <div className="mb-4">
                        <div className={`inline-block p-4 rounded-full ${
                          fileInfo.type === 'excel' ? 'bg-green-100' :
                          fileInfo.type === 'word' ? 'bg-blue-100' :
                          'bg-orange-100'
                        }`}>
                          <FileText className={`h-16 w-16 ${
                            fileInfo.type === 'excel' ? 'text-green-600' :
                            fileInfo.type === 'word' ? 'text-blue-600' :
                            'text-orange-600'
                          }`} />
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Documento {fileInfo.displayName}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {selectedStandaloneFile.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        No se pudo cargar la vista previa del documento
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Sin vista previa disponible
                <div className="flex flex-col items-center gap-3 p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-400" />
                  <div>
                    <p className="text-gray-900 font-medium">Vista previa del archivo</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Este tipo de archivo no admite vista previa en el navegador
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Puedes descargarlo para verlo en tu equipo
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-between">
            <div className="flex gap-2">
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedStandaloneFile.fileURL;
                  link.download = selectedStandaloneFile.name;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="h-4 w-4" />
                Descargar
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </button>
            </div>
            <button
              onClick={() => {
                setShowStandalonePreviewModal(false);
                setSelectedStandaloneFile(null);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Cerrar
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
    const sortedFolders = getSortedFolders(getCurrentFolders());
    
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
            
            {/* Botones de progreso y compartir */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              {/* Botón de Progreso */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openProgressModal(folder);
                }}
                className="flex items-center gap-1 px-2 py-1 text-xs text-purple-600 hover:bg-purple-50 rounded transition-colors"
                title="Ver progreso de documentos"
              >
                <TrendingUp className="h-3 w-3" />
                Progreso
              </button>
              
              {/* Botón de Compartir */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openPermissionsModal(folder);
                }}
                className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <UserCheck className="h-3 w-3" />
                Compartir
              </button>
            </div>
            
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

        {/* Archivos sueltos (fuera de carpetas) */}
        {standaloneFiles.map((file) => (
          <div 
            key={file.id}
            className={`bg-white border rounded-lg p-4 hover:shadow-lg transition-all group relative ${
              selectedItems.includes(file.id) 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Checkbox de selección */}
            <div className="absolute top-3 left-3 z-10">
              <input
                type="checkbox"
                checked={selectedItems.includes(file.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelectItem(file.id);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
            </div>
            
            {/* Botón de menú */}
            <div className="absolute top-3 right-3 z-10">
              <div className="relative group/menu">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-gray-600" />
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewStandaloneFile(file);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Ver
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const link = document.createElement('a');
                      link.href = file.fileURL;
                      link.download = file.name;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteStandaloneFile(file.id);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => handleViewStandaloneFile(file)}
              className="flex flex-col items-center text-center cursor-pointer"
            >
              <div className="mb-3 mt-4">
                {file.type.includes('pdf') ? (
                  <FileText className="h-12 w-12 text-red-500 group-hover:text-red-600 transition-colors" />
                ) : file.type.includes('image') ? (
                  <FileText className="h-12 w-12 text-green-500 group-hover:text-green-600 transition-colors" />
                ) : (
                  <FileText className="h-12 w-12 text-gray-500 group-hover:text-gray-600 transition-colors" />
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1 truncate w-full">
                {file.name}
              </h3>
              <p className="text-xs text-gray-500 mb-1">{file.size}</p>
              <p className="text-xs text-gray-400">{file.modified}</p>
            </div>
          </div>
        ))}


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
                

              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // ==================== MONITOREO DE CONEXION ====================
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setError(null);
      console.log('Conexion restaurada');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setError('Sin conexion a internet. Por favor verifica tu red.');
      console.log('Conexion perdida');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  

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
                    onClick={() => standaloneFileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    <Upload className="h-4 w-4" />
                    Subir Archivo
                  </button>
                  {/* Input oculto para subir archivos sueltos */}
                  <input
                    ref={standaloneFileInputRef}
                    type="file"
                    multiple
                    onChange={handleStandaloneFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.pptx,.txt"
                  />
                  {/* Input oculto para subir archivos (original) */}
                  <input
                    ref={uploadFileInputRef}
                    type="file"
                    multiple
                    accept="*/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button 
                    onClick={handleNewFolderClick}
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
                      <p className="text-2xl font-bold text-blue-600">{calculateTotalFiles()}</p>
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
                      <p className="text-2xl font-bold text-purple-600">{calculateSharedFolders()}</p>
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
                      <p className="text-2xl font-bold text-orange-600">{calculateStorageUsed()} GB</p>
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
                    onClick={handleNewFolderClick}
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
          {currentFolderId !== null ? (
            // Vista de subcarpetas dentro de una carpeta
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                <button 
                  onClick={() => {
                    setFolderPath([]);
                    setCurrentFolderId(null);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Inicio
                </button>
                {folderPath.map((folderId, index) => {
                  const folder = getCurrentFolder();
                  return (
                    <div key={folderId} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        {folder?.name || `Carpeta ${index + 1}`}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Botones de acción */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={goBackToFolders}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {getCurrentFolder()?.name || 'Carpeta'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Gestiona las subcarpetas y documentos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => uploadFileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    <Upload className="h-4 w-4" />
                    Subir Archivo
                  </button>
                  <button 
                    onClick={handleNewFolderClick}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors bg-white"
                  >
                    <FolderPlus className="h-4 w-4" />
                    Nueva Carpeta
                  </button>
                </div>
              </div>
              
              {/* Renderizar subcarpetas */}
              {renderFoldersView()}
            </div>
          ) : currentView === 'documents-cards' ? (
            // Vista de cards de documentos para subcarpetas
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

              {/* Breadcrumb */}
              <div className="px-6 pt-4 pb-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700">
                    {getParentFolderName()}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 font-semibold">
                    {selectedFolder?.name}
                  </span>
                </div>
              </div>

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
                      {selectedFolder?.icon && React.createElement(selectedFolder.icon, { className: "h-6 w-6" })}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Documentos de "{selectedFolder?.name}"
                      </h2>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">
                          {selectedFolder?.tipoPersona === 'moral' ? 'Persona Moral' : 'Persona Física'}
                        </span>
                        {' • '}
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
                </div>
              </div>
              
              {/* Grid de documentos */}
              <div className="p-6">
                {console.log('📊 Renderizando grid:', { 
                  folderName: selectedFolder?.name,
                  documentCount: selectedFolder?.documents?.length,
                  documents: selectedFolder?.documents?.map(d => d.name)
                })}
                {!selectedFolder?.documents || selectedFolder.documents.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <p className="text-gray-600">No hay documentos asignados a esta carpeta</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedFolder?.documents?.map((document) => {
                  const fileKey = `${selectedFolder.id}-${document.id}`;
                  const uploadedFile = uploadedFiles[fileKey];
                  const textValue = textFieldValues[fileKey] || '';
                  const isTextField = document.type === 'text';
                  
                  return (
                    <div
                      key={document.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                    >
                      {/* Status badge */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${getDocumentIconColor(document.color)}`}>
                          {document.icon && React.createElement(document.icon, { className: "h-6 w-6" })}
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

                      {/* Actions */}
                      <div className="space-y-2">
                        {isTextField ? (
                          <>
                            <input
                              type={document.name.includes('Correo') ? 'email' : 'tel'}
                              value={textValue}
                              onChange={(e) => setTextFieldValues({ ...textFieldValues, [fileKey]: e.target.value })}
                              placeholder={document.description}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {textValue && (
                              <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
                                ✓ {document.name}: {textValue}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleUpload(document)}
                              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Upload className="h-4 w-4" />
                              Subir
                            </button>
                            
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
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
                  </div>
                )}
              </div>
              
              {/* Botón Guardar para campos de texto */}
              {selectedFolder?.documents?.some(doc => doc.type === 'text') && (
                <div className="mt-6 flex justify-end px-6 pb-6">
                  <button
                    onClick={handleSaveTextFields}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Guardar Datos
                  </button>
                </div>
              )}
            </div>
          ) : currentView === 'folders' ? (
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
      <CreateMainFolderModal />
      <CreateSubfolderModal />
      <ProgressModal />
      <AddUserModal />
      <StandaloneFilePreviewModal />
      {renderMoveModal()}
      {renderDeleteModal()}
      {renderRenameModal()}
    </div>
  );
};

export default TramitesNotariales;