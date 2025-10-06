import React, { useState, useEffect } from 'react';

const Error404 = ({ onRedirect }) => {
  const [countdown, setCountdown] = useState(30);

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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{
      backgroundColor: '#FF7F2E',
      fontFamily: "'Concert One', cursive"
    }}>
      {/* Texto 404 de fondo */}
      <div 
        className="absolute text-center pointer-events-none select-none"
        style={{
          color: 'rgba(19, 36, 44, 0.1)',
          fontSize: '30em',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          lineHeight: '1'
        }}
      >
        404
      </div>

      {/* Container principal */}
      <div className="relative" style={{ height: '300px', width: '500px' }}>
        {/* Sombra */}
        <div 
          className="absolute bg-black bg-opacity-10 rounded-xl animate-shadow-bounce"
          style={{
            bottom: '40px',
            height: '12px',
            left: '80px',
            width: '350px',
            zIndex: -1
          }}
        />

        {/* Cavernícola derecho */}
        <div className="absolute h-full" style={{ height: '300px', width: '250px', right: '20px' }}>
          {/* Cabeza */}
          <div 
            className="absolute rounded-full animate-head-bounce"
            style={{
              backgroundColor: '#13242C',
              height: '140px',
              left: '60px',
              top: '25px',
              width: '65px'
            }}
          >
            {/* Cabello */}
            <div 
              className="absolute bg-black rounded-lg"
              style={{
                left: '35px',
                top: '-8px',
                height: '20px',
                width: '7px',
                transform: 'rotate(20deg)'
              }}
            />
            <div 
              className="absolute bg-black rounded-lg"
              style={{
                left: '30px',
                top: '-8px',
                height: '20px',
                width: '7px',
                transform: 'rotate(-20deg)'
              }}
            />
            
            {/* Ojo */}
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#EAB08C',
                height: '16px',
                left: '45%',
                top: '40px',
                width: '48px',
                transform: 'translateX(-50%)'
              }}
            >
              {/* Pupilas */}
              <div 
                className="absolute bg-black rounded-full animate-eye-blink"
                style={{
                  height: '5px',
                  width: '5px',
                  left: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <div 
                className="absolute bg-black rounded-full animate-eye-blink"
                style={{
                  height: '5px',
                  width: '5px',
                  right: '9px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              
              {/* Nariz */}
              <div 
                className="absolute rounded-lg"
                style={{
                  backgroundColor: '#D9766C',
                  borderLeft: '8px solid rgba(19, 36, 44, 0.1)',
                  height: '35px',
                  left: '45%',
                  top: '12px',
                  width: '15px',
                  transform: 'translateX(-50%)',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Cuerpo */}
          <div 
            className="absolute rounded-full overflow-hidden"
            style={{
              backgroundColor: '#D13433',
              height: '140px',
              left: '50%',
              top: '70px',
              width: '140px',
              transform: 'translateX(-50%)'
            }}
          >
            {/* Círculos decorativos */}
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#932422',
                height: '60px',
                width: '60px',
                left: '-12px',
                top: '80px'
              }}
            >
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#932422',
                  height: '20px',
                  width: '20px',
                  left: '50px',
                  top: '10px'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#932422',
                  height: '20px',
                  width: '20px',
                  left: '60px',
                  top: '45px'
                }}
              />
            </div>
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#932422',
                height: '60px',
                width: '60px',
                right: '10px',
                top: '0px',
                transform: 'rotate(90deg)'
              }}
            >
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#932422',
                  height: '20px',
                  width: '20px',
                  left: '65px',
                  top: '10px'
                }}
              />
            </div>
          </div>

          {/* Brazo derecho con garrote */}
          <div 
            className="absolute rounded-full z-10 animate-arm-swing"
            style={{
              backgroundColor: '#EAB08C',
              borderLeft: '8px solid rgba(19, 36, 44, 0.1)',
              height: '180px',
              left: '135px',
              top: '80px',
              width: '60px',
              transformOrigin: '30px 30px',
              boxSizing: 'border-box'
            }}
          >
            {/* Garrote */}
            <div 
              className="absolute"
              style={{
                borderBottom: '110px solid #601513',
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                height: '0',
                left: '-60px',
                top: '120px',
                transform: 'rotate(70deg)',
                width: '20px'
              }}
            >
              {/* Mango del garrote */}
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#601513',
                  height: '20px',
                  width: '20px',
                  left: '0',
                  top: '-10px'
                }}
              />
              {/* Cabeza del garrote */}
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#601513',
                  height: '40px',
                  width: '40px',
                  left: '-10px',
                  top: '90px'
                }}
              />
            </div>
          </div>

          {/* Piernas */}
          <div 
            className="absolute rounded-lg"
            style={{
              backgroundColor: '#B2524D',
              height: '55px',
              left: '95px',
              top: '200px',
              width: '10px'
            }}
          >
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#B2524D',
                height: '10px',
                left: '-5px',
                top: '15px',
                width: '10px'
              }}
            />
            {/* Pie */}
            <div 
              className="absolute"
              style={{
                backgroundColor: '#B2524D',
                borderRadius: '25px 25px 0 0',
                height: '25px',
                left: '-38px',
                top: '30px',
                width: '50px'
              }}
            >
              {/* Dedos del pie */}
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#B2524D',
                  bottom: '0px',
                  height: '15px',
                  left: '-6px',
                  width: '15px'
                }}
              />
            </div>
          </div>

          <div 
            className="absolute rounded-lg"
            style={{
              backgroundColor: '#D9766C',
              height: '55px',
              left: '115px',
              top: '200px',
              width: '10px'
            }}
          >
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#D9766C',
                height: '10px',
                left: '-5px',
                top: '15px',
                width: '10px'
              }}
            />
            {/* Pie */}
            <div 
              className="absolute"
              style={{
                backgroundColor: '#D9766C',
                borderRadius: '25px 25px 0 0',
                height: '25px',
                left: '-38px',
                top: '30px',
                width: '50px'
              }}
            >
              {/* Dedos del pie */}
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#EAB08C',
                  bottom: '0px',
                  height: '15px',
                  left: '-6px',
                  width: '15px'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#EAB08C',
                  bottom: '0px',
                  height: '15px',
                  left: '8px',
                  width: '15px',
                  transform: 'scale(0.6)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#EAB08C',
                  bottom: '0px',
                  height: '15px',
                  left: '15px',
                  width: '15px',
                  transform: 'scale(0.6)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#EAB08C',
                  bottom: '0px',
                  height: '15px',
                  left: '26px',
                  width: '15px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Cavernícola izquierdo (espejo del derecho) */}
        <div className="absolute h-full" style={{ 
          height: '300px', 
          width: '250px', 
          left: '20px',
          transform: 'rotateY(180deg)'
        }}>
          {/* Cabeza */}
          <div 
            className="absolute rounded-full animate-head-bounce-delayed"
            style={{
              backgroundColor: '#13242C',
              height: '140px',
              left: '60px',
              top: '25px',
              width: '65px',
              zIndex : 10
            }}
          >
            {/* Cabello */}
            <div 
              className="absolute bg-black rounded-lg"
              style={{
                left: '35px',
                top: '-8px',
                height: '20px',
                width: '7px',
                transform: 'rotate(20deg)'
              }}
            />
            <div 
              className="absolute bg-black rounded-lg"
              style={{
                left: '30px',
                top: '-8px',
                height: '20px',
                width: '7px',
                transform: 'rotate(-20deg)'
              }}
            />
            
            {/* Ojo */}
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#EAB08C',
                height: '16px',
                left: '45%',
                top: '40px',
                width: '48px',
                transform: 'translateX(-50%)'
              }}
            >
              {/* Pupilas */}
              <div 
                className="absolute bg-black rounded-full animate-eye-blink-delayed"
                style={{
                  height: '5px',
                  width: '5px',
                  left: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <div 
                className="absolute bg-black rounded-full animate-eye-blink-delayed"
                style={{
                  height: '5px',
                  width: '5px',
                  right: '9px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              
              {/* Nariz */}
              <div 
                className="absolute rounded-lg"
                style={{
                  backgroundColor: '#D9766C',
                  borderLeft: '8px solid rgba(19, 36, 44, 0.1)',
                  height: '35px',
                  left: '45%',
                  top: '12px',
                  width: '15px',
                  transform: 'translateX(-50%)',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Cuerpo */}
          <div 
            className="absolute rounded-full overflow-hidden"
            style={{
              backgroundColor: '#932422',
              height: '140px',
              left: '50%',
              top: '70px',
              width: '140px',
              transform: 'translateX(-50%)'
            }}
          >
            {/* Círculos decorativos */}
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#D13433',
                height: '60px',
                width: '60px',
                left: '-12px',
                top: '80px'
              }}
            >
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#D13433',
                  height: '20px',
                  width: '20px',
                  left: '50px',
                  top: '10px'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#D13433',
                  height: '20px',
                  width: '20px',
                  left: '60px',
                  top: '45px'
                }}
              />
            </div>
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#D13433',
                height: '60px',
                width: '60px',
                right: '10px',
                top: '0px',
                transform: 'rotate(90deg)'
              }}
            >
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#D13433',
                  height: '20px',
                  width: '20px',
                  left: '65px',
                  top: '10px'
                }}
              />
            </div>
          </div>

          {/* Brazo derecho con garrote */}
          <div 
            className="absolute rounded-full z-10 animate-arm-swing-delayed"
            style={{
              backgroundColor: '#EAB08C',
              borderLeft: '8px solid rgba(19, 36, 44, 0.1)',
              height: '180px',
              left: '135px',
              top: '80px',
              width: '60px',
              transformOrigin: '30px 30px',
              boxSizing: 'border-box'
            }}
          >
            {/* Garrote */}
            <div 
              className="absolute"
              style={{
                borderBottom: '110px solid #601513',
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                height: '0',
                left: '-60px',
                top: '120px',
                transform: 'rotate(70deg)',
                width: '20px'
              }}
            >
              {/* Mango del garrote */}
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#601513',
                  height: '20px',
                  width: '20px',
                  left: '0',
                  top: '-10px'
                }}
              />
              {/* Cabeza del garrote */}
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#601513',
                  height: '40px',
                  width: '40px',
                  left: '-10px',
                  top: '90px'
                }}
              />
            </div>
          </div>

          {/* Piernas */}
          <div 
            className="absolute rounded-lg"
            style={{
              backgroundColor: '#B2524D',
              height: '55px',
              left: '95px',
              top: '200px',
              width: '10px'
            }}
          >
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#B2524D',
                height: '10px',
                left: '-5px',
                top: '15px',
                width: '10px'
              }}
            />
            {/* Pie */}
            <div 
              className="absolute"
              style={{
                backgroundColor: '#B2524D',
                borderRadius: '25px 25px 0 0',
                height: '25px',
                left: '-38px',
                top: '30px',
                width: '50px'
              }}
            >
              {/* Dedos del pie */}
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#B2524D',
                  bottom: '0px',
                  height: '15px',
                  left: '-6px',
                  width: '15px'
                }}
              />
            </div>
          </div>

          <div 
            className="absolute rounded-lg"
            style={{
              backgroundColor: '#D9766C',
              height: '55px',
              left: '115px',
              top: '200px',
              width: '10px'
            }}
          >
            <div 
              className="absolute rounded-full"
              style={{
                backgroundColor: '#D9766C',
                height: '10px',
                left: '-5px',
                top: '15px',
                width: '10px'
              }}
            />
            {/* Pie */}
            <div 
              className="absolute"
              style={{
                backgroundColor: '#D9766C',
                borderRadius: '25px 25px 0 0',
                height: '25px',
                left: '-38px',
                top: '30px',
                width: '50px'
              }}
            >
              {/* Dedos del pie */}
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#EAB08C',
                  bottom: '0px',
                  height: '15px',
                  left: '-6px',
                  width: '15px'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#EAB08C',
                  bottom: '0px',
                  height: '15px',
                  left: '8px',
                  width: '15px',
                  transform: 'scale(0.6)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#EAB08C',
                  bottom: '0px',
                  height: '15px',
                  left: '15px',
                  width: '15px',
                  transform: 'scale(0.6)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  backgroundColor: '#EAB08C',
                  bottom: '0px',
                  height: '15px',
                  left: '26px',
                  width: '15px'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contador de redirección */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-black bg-opacity-20 rounded-lg px-6 py-3 text-white">
          <p className="text-lg font-semibold mb-1">¡Página no encontrada!</p>
          <p className="text-sm">
            Redirigiendo en <span className="font-bold text-xl">{countdown}</span> segundos...
          </p>
        </div>
      </div>

      {/* Créditos */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center text-black opacity-20 hover:opacity-100 transition-opacity">
        <div className="text-sm">
          <span>Inspirado en </span>
          <a 
            href="https://codepen.io/SofiaSergio/pen/RMjyRL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            CodePen de SofiaSergio
          </a>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');
        
        @keyframes arm-swing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes arm-swing-delayed {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes head-bounce {
          0% { top: 25px; }
          42% { top: 25px; }
          45% { top: 50px; }
          100% { top: 25px; }
        }
        
        @keyframes head-bounce-delayed {
          0% { top: 25px; }
          42% { top: 25px; }
          45% { top: 50px; }
          100% { top: 25px; }
        }
        
        @keyframes eye-blink {
          0% { height: 5px; }
          42% { height: 5px; }
          45% { height: 1px; }
          100% { height: 5px; }
        }
        
        @keyframes eye-blink-delayed {
          0% { height: 5px; }
          42% { height: 5px; }
          45% { height: 1px; }
          100% { height: 5px; }
        }
        
        @keyframes shadow-bounce {
          0% { width: 350px; left: 80px; }
          25% { width: 450px; left: 80px; }
          50% { width: 350px; left: 80px; }
          75% { width: 450px; left: 0px; }
          100% { width: 350px; left: 80px; }
        }
        
        .animate-arm-swing {
          animation: arm-swing 1.2s infinite cubic-bezier(0.55, 0.01, 0.16, 1.34);
        }
        
        .animate-arm-swing-delayed {
          animation: arm-swing-delayed 1.2s infinite cubic-bezier(0.55, 0.01, 0.16, 1.34);
          animation-delay: 0.6s;
        }
        
        .animate-head-bounce {
          animation: head-bounce 1.2s infinite cubic-bezier(0.55, 0.01, 0.16, 1.34);
          animation-delay: 0.6s;
        }
        
        .animate-head-bounce-delayed {
          animation: head-bounce-delayed 1.2s infinite cubic-bezier(0.55, 0.01, 0.16, 1.34);
        }
        
        .animate-eye-blink {
          animation: eye-blink 1.2s infinite cubic-bezier(0.55, 0.01, 0.16, 1.34);
          animation-delay: 0.6s;
        }
        
        .animate-eye-blink-delayed {
          animation: eye-blink-delayed 1.2s infinite cubic-bezier(0.55, 0.01, 0.16, 1.34);
        }
        
        .animate-shadow-bounce {
          animation: shadow-bounce 1.2s infinite cubic-bezier(0.55, 0.01, 0.16, 1.34);
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
};

export default Error404;