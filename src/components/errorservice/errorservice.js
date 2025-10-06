import React, { useState, useEffect } from 'react';

const ErrorService = ({ onRedirect }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Redirigir después del countdown
          if (onRedirect) {
            onRedirect();
          } else {
            // Redirigir a la página principal por defecto
            window.location.href = '/';
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onRedirect]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-radial from-indigo-900 via-slate-900 to-slate-900 flex items-center justify-center">
      {/* Fondo con gradiente radial */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-800/30 via-slate-900 to-slate-900"></div>
      
      {/* Estrellas de fondo */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${2 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        {/* Planeta */}
        <div className="relative mb-8">
          <div className="w-40 h-40 mx-auto relative">
            {/* Planeta principal */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-red-600 shadow-2xl relative overflow-hidden">
              {/* Cráteres y detalles del planeta */}
              <div className="absolute top-4 left-6 w-3 h-3 bg-red-700 rounded-full opacity-60"></div>
              <div className="absolute top-12 right-8 w-2 h-2 bg-red-800 rounded-full opacity-40"></div>
              <div className="absolute bottom-8 left-12 w-4 h-4 bg-red-700 rounded-full opacity-50"></div>
              <div className="absolute bottom-6 right-6 w-2 h-2 bg-red-800 rounded-full opacity-60"></div>
              
              {/* Sombra del planeta */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
            </div>
            
            {/* Anillos del planeta */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-12">
              <div className="w-full h-full border-4 border-orange-300/40 rounded-full transform rotate-12"></div>
              <div className="absolute inset-2 border-2 border-orange-200/30 rounded-full transform rotate-12"></div>
            </div>
          </div>
        </div>

        {/* Astronauta */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative animate-float">
            {/* Cuerpo del astronauta */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gray-200 rounded-lg">
              {/* Detalles del traje */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-2 h-6 bg-gray-400 rounded"></div>
              <div className="absolute bottom-2 right-2 w-2 h-6 bg-gray-400 rounded"></div>
            </div>
            
            {/* Brazos */}
            <div className="absolute bottom-12 left-2 w-3 h-8 bg-gray-200 rounded transform -rotate-12"></div>
            <div className="absolute bottom-12 right-2 w-3 h-8 bg-gray-200 rounded transform rotate-12"></div>
            
            {/* Piernas */}
            <div className="absolute bottom-0 left-4 w-3 h-6 bg-gray-200 rounded"></div>
            <div className="absolute bottom-0 right-4 w-3 h-6 bg-gray-200 rounded"></div>
            
            {/* Casco */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-4 border-gray-300">
              {/* Reflejo en el casco */}
              <div className="absolute top-2 left-2 w-6 h-6 bg-white/40 rounded-full"></div>
              <div className="absolute top-4 right-3 w-3 h-3 bg-white/20 rounded-full"></div>
            </div>
            
            {/* Mochila propulsora */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 translate-x-8 w-4 h-12 bg-gray-400 rounded">
              {/* Llamas del propulsor */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-2 h-4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="text-center space-y-4 animate-fadeInUp">
          <h1 className="text-6xl md:text-7xl font-bold text-orange-500 tracking-tight drop-shadow-lg">
            ¡Ooops error 404!
          </h1>
          
          <h2 className="text-xl md:text-2xl font-light text-white">
            Parece que esta vez has llegado lejos.
          </h2>
          
          <h3 className="text-base md:text-lg font-light text-white">
            No se preocupe. Trataremos volver en uno minutos{' '}
            <span className="text-orange-500 text-2xl font-semibold">
              {countdown}
            </span>
            s.
          </h3>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 text-center px-4">
        Icons made by{' '}
        <a 
          href="http://www.freepik.com" 
          title="Freepik"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Freepik
        </a>{' '}
        from{' '}
        <a 
          href="http://www.flaticon.com" 
          title="Flaticon"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          www.flaticon.com
        </a>{' '}
        is licensed by{' '}
        <a 
          href="http://creativecommons.org/licenses/by/3.0/" 
          title="Creative Commons BY 3.0" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          CC 3.0 BY
        </a>
      </footer>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center bottom, #3f415e 0%, #101024 85%, #101024 100%);
        }
      `}</style>
    </div>
  );
};

export default ErrorService;
