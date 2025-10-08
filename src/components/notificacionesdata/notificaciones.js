import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../head/head';
import Sidebar from '../layout/sidebar';
import { 
  ArrowLeft,
  Send,
  Mail,
  MessageCircle,
  Bell,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";

const Notificaciones = () => {
  const navigate = useNavigate();
  
  // Estados para las notificaciones
  const [inAppNotificationState, setInAppNotificationState] = useState(null);
  const [inAppNotificationPending, setInAppNotificationPending] = useState(false);
  
  const [emailNotificationState, setEmailNotificationState] = useState(null);
  const [emailNotificationPending, setEmailNotificationPending] = useState(false);
  
  const [whatsAppNotificationState, setWhatsAppNotificationState] = useState(null);
  const [whatsAppNotificationPending, setWhatsAppNotificationPending] = useState(false);
  
  const [webPushNotificationState, setWebPushNotificationState] = useState(null);
  const [webPushNotificationPending, setWebPushNotificationPending] = useState(false);

  // Estados para los formularios
  const [inAppMessage, setInAppMessage] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [whatsappTo, setWhatsappTo] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [pushTitle, setPushTitle] = useState('');
  const [pushBody, setPushBody] = useState('');

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para mostrar toast
  const showToast = (title, description, variant = 'default') => {
    // Implementación simplificada del toast
    const toastElement = document.createElement('div');
    toastElement.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    }`;
    toastElement.innerHTML = `
      <div class="font-semibold">${title}</div>
      <div class="text-sm">${description}</div>
    `;
    document.body.appendChild(toastElement);
    
    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 3000);
  };

  // Funciones para manejar las notificaciones
  const handleInAppNotification = async (e) => {
    e.preventDefault();
    setInAppNotificationPending(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = {
        success: true,
        message: `Notificación en la app enviada: "${inAppMessage}"`
      };
      
      setInAppNotificationState(result);
      setInAppMessage('');
      showToast("Notificación en la App", result.message);
    } catch (error) {
      const result = {
        success: false,
        error: "Error al enviar la notificación en la app"
      };
      setInAppNotificationState(result);
      showToast("Error en Notificación", result.error, "destructive");
    } finally {
      setInAppNotificationPending(false);
    }
  };

  const handleEmailNotification = async (e) => {
    e.preventDefault();
    setEmailNotificationPending(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = {
        success: true,
        message: `Email enviado a ${emailTo} con asunto: "${emailSubject}"`
      };
      
      setEmailNotificationState(result);
      setEmailTo('');
      setEmailSubject('');
      setEmailBody('');
      showToast("Email Enviado", result.message);
    } catch (error) {
      const result = {
        success: false,
        error: "Error al enviar el email"
      };
      setEmailNotificationState(result);
      showToast("Error al Enviar Email", result.error, "destructive");
    } finally {
      setEmailNotificationPending(false);
    }
  };

  const handleWhatsAppNotification = async (e) => {
    e.preventDefault();
    setWhatsAppNotificationPending(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const result = {
        success: true,
        message: `WhatsApp enviado a ${whatsappTo}: "${whatsappMessage}"`
      };
      
      setWhatsAppNotificationState(result);
      setWhatsappTo('');
      setWhatsappMessage('');
      showToast("WhatsApp Enviado", result.message);
    } catch (error) {
      const result = {
        success: false,
        error: "Error al enviar el mensaje de WhatsApp"
      };
      setWhatsAppNotificationState(result);
      showToast("Error al Enviar WhatsApp", result.error, "destructive");
    } finally {
      setWhatsAppNotificationPending(false);
    }
  };

  const handleWebPushNotification = async (e) => {
    e.preventDefault();
    setWebPushNotificationPending(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = {
        success: true,
        message: `Notificación web push enviada: "${pushTitle}"`
      };
      
      setWebPushNotificationState(result);
      setPushTitle('');
      setPushBody('');
      showToast("Notificación Web Push", result.message);
    } catch (error) {
      const result = {
        success: false,
        error: "Error al enviar la notificación web push"
      };
      setWebPushNotificationState(result);
      showToast("Error en Notificación Web Push", result.error, "destructive");
    } finally {
      setWebPushNotificationPending(false);
    }
  };

  // Función para manejar la suscripción PWA
  const handleSubscribePWA = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          const pushSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
          });
          
          // Simular suscripción
          const result = {
            success: true,
            message: "Suscripción a notificaciones PWA exitosa"
          };
          
          showToast("Suscripción PWA", result.message);
        } else {
          showToast(
            "Permiso Denegado",
            "No se concedió permiso para notificaciones.",
            "destructive"
          );
        }
      } catch (error) {
        console.error("Error al suscribirse a PWA:", error);
        showToast(
          "Error Suscripción PWA",
          "Fallo al suscribirse a notificaciones PWA.",
          "destructive"
        );
      }
    } else {
      showToast(
        "Navegador no compatible",
        "Las notificaciones PWA no son compatibles con este navegador.",
        "destructive"
      );
    }
  };

  // Componentes UI simplificados
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="p-6 pb-4">
      {children}
    </div>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );

  const Button = ({ children, className = "", variant = "default", size = "default", onClick, disabled = false, type = "button", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      outline: "border border-gray-300 bg-white hover:bg-gray-50",
    };

    const sizes = {
      default: "h-10 py-2 px-4",
      icon: "h-10 w-10",
    };

    return (
      <button
        type={type}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Input = ({ className = "", value, onChange, ...props }) => (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      value={value}
      onChange={onChange}
      {...props}
    />
  );

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
            <ArrowLeft className="h-4 w-4" />
            Volver al Inicio
          </button>
        </div>

        <main className="flex-1 overflow-auto p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-2xl font-bold">Enviar Notificaciones</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Notificación en la App */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificación en la App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInAppNotification}>
                  <Input 
                    type="text" 
                    placeholder="Mensaje de la app" 
                    className="mb-4" 
                    required 
                    value={inAppMessage}
                    onChange={(e) => setInAppMessage(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={inAppNotificationPending}
                  >
                    {inAppNotificationPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Notificación App
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Notificación por Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Notificación por Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailNotification}>
                  <Input 
                    type="email" 
                    placeholder="Para (email)" 
                    className="mb-2" 
                    required 
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Asunto" 
                    className="mb-2" 
                    required 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Cuerpo del mensaje" 
                    className="mb-4" 
                    required 
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={emailNotificationPending}
                  >
                    {emailNotificationPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar Email
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Notificación por WhatsApp */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Notificación por WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWhatsAppNotification}>
                  <Input
                    type="text"
                    placeholder="Para (número WhatsApp)"
                    className="mb-2"
                    required
                    value={whatsappTo}
                    onChange={(e) => setWhatsappTo(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Mensaje de WhatsApp"
                    className="mb-4"
                    required
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={whatsAppNotificationPending}
                  >
                    {whatsAppNotificationPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Enviar WhatsApp
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Notificación Web Push (PWA) */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificación Web Push (PWA)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Button onClick={handleSubscribePWA} className="w-full mb-2">
                    <Bell className="h-4 w-4 mr-2" />
                    Suscribirse a Notificaciones PWA
                  </Button>
                  <p className="text-sm text-gray-600">
                    Permite que tu navegador reciba notificaciones push.
                  </p>
                </div>
                <form onSubmit={handleWebPushNotification}>
                  <Input
                    type="text"
                    placeholder="Título de la notificación"
                    className="mb-2"
                    required
                    value={pushTitle}
                    onChange={(e) => setPushTitle(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Cuerpo de la notificación"
                    className="mb-4"
                    required
                    value={pushBody}
                    onChange={(e) => setPushBody(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={webPushNotificationPending}
                  >
                    {webPushNotificationPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Web Push
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        
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

export default Notificaciones;