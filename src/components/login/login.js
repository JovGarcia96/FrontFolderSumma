import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { toast, Toaster } from "react-hot-toast";

// Importar la imagen del logo
import logoImage from '../../assets/logos/logo.png';

// Componente de fondo dinámico
const DynamicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Componente para texto con efecto de destello
const GlowingText = ({ text, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.8),
              0 0 10px rgba(255, 255, 255, 0.6),
              0 0 15px rgba(255, 255, 255, 0.4),
              0 0 20px rgba(59, 130, 246, 0.6),
              0 0 35px rgba(59, 130, 246, 0.4),
              0 0 40px rgba(59, 130, 246, 0.2);
          }
          50% {
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 1),
              0 0 20px rgba(255, 255, 255, 0.8),
              0 0 30px rgba(255, 255, 255, 0.6),
              0 0 40px rgba(59, 130, 246, 0.8),
              0 0 70px rgba(59, 130, 246, 0.6),
              0 0 80px rgba(59, 130, 246, 0.4);
          }
        }
        
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.8) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .glow-text {
          animation: glow 2s ease-in-out infinite alternate;
        }
      `}</style>
      
      <div className="shimmer-text glow-text font-light tracking-wider">
        {text}
      </div>
    </div>
  );
};

// Componente para letras individuales con animación
const AnimatedLetters = ({ text, className = "" }) => {
  const letters = text.split('');
  
  return (
    <div className={`flex ${className}`}>
      <style jsx>{`
        @keyframes letterGlow {
          0%, 100% {
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.8),
              0 0 10px rgba(255, 255, 255, 0.6),
              0 0 15px rgba(59, 130, 246, 0.4);
            transform: scale(1);
          }
          50% {
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 1),
              0 0 20px rgba(255, 255, 255, 0.8),
              0 0 30px rgba(59, 130, 246, 0.6),
              0 0 40px rgba(59, 130, 246, 0.4);
            transform: scale(1.05);
          }
        }
        
        .letter-glow {
          animation: letterGlow 2s ease-in-out infinite;
        }
      `}</style>
      
      {letters.map((letter, index) => (
        <span
          key={index}
          className="letter-glow text-white font-light tracking-wider transition-all duration-300 hover:scale-110"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    const userNameTrim = formData.username.trim();
    const passUserTrim = formData.password.trim();

    if (!userNameTrim) {
      newErrors.username = 'El nombre de usuario es requerido';
      isValid = false;
    }
    if (!passUserTrim) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!validateForm()) {
      setIsLoading(false);
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      // Simulación de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la lógica real de autenticación
      toast.success("Inicio de sesión exitoso.");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Usuario y/o contraseña inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <Toaster position="top-right" />
      
      {/* Panel izquierdo - Bienvenida */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden"
      >
        <DynamicBackground />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="z-10 text-center"
        >
          <h1 className="text-7xl font-bold mb-12">Bienvenido</h1>
          
          {/* Logo de Summa Business Solutions */}
          <div className="mb-12">
            <img 
              src={logoImage}
              alt="Summa Business Solutions Logo" 
              className="w-80 h-auto mx-auto object-contain filter brightness-0 invert"
              onError={(e) => {
                console.log('Error cargando imagen:', e);
                // Fallback si no se encuentra la imagen
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback text si no carga la imagen */}
            <div className="hidden">
              {/* <div className="text-6xl font-bold mb-4">SUMMA</div> */}
              {/* <div className="text-lg tracking-wider">BUSINESS SOLUTIONS</div>*/}
            </div>
          </div>
          
          {/* Texto con efecto de destello */}
          <div className="mb-4">
            <AnimatedLetters 
              text="PORTAL DE ONBOARDING" 
              className="text-2xl justify-center"
            />
          </div>
          
          <GlowingText 
            text="Innovación en cada solución" 
            className="text-xl"
          />
        </motion.div>
      </motion.div>

      {/* Panel derecho - Formulario */}
      <div className="flex items-center justify-center p-6 sm:p-8 bg-gray-50 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Ingresa a tu cuenta
            </h2>
            <p className="text-gray-600">
              Accede a tu dashboard financiero
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo de usuario */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Nombre de usuario
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  className={cn(
                    "pl-10 pr-4 h-12 border-2 transition-colors",
                    errors.username 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:border-blue-500"
                  )}
                  placeholder="Ingrese su nombre de usuario"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  className={cn(
                    "pl-10 pr-12 h-12 border-2 transition-colors",
                    errors.password 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:border-blue-500"
                  )}
                  placeholder="Ingrese su contraseña"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Botón de login */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Iniciando sesión...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Iniciar sesión
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Información adicional */}
          <div className="text-center text-sm text-gray-500">
            <p>¿Olvidaste tu contraseña?</p>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
              Recuperar contraseña
            </Button>
          </div>
        </motion.div>

        {/* Versión */}
        <div className="fixed bottom-4 right-4 px-3 py-1 rounded-full bg-blue-600 text-white text-sm shadow-lg">
          v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Login;
