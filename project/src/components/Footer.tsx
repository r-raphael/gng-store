import React from 'react';
import { Heart, MapPin, Mail, Phone } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-100'} border-t mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              StoreHub
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Tu tienda online de confianza con los mejores productos en moda, tecnología y hogar.
            </p>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Categorías
            </h4>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              <li><a href="/fashion" className="hover:text-blue-500 transition-colors">Moda</a></li>
              <li><a href="/technology" className="hover:text-blue-500 transition-colors">Tecnología</a></li>
              <li><a href="/home" className="hover:text-blue-500 transition-colors">Hogar</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ayuda
            </h4>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Envíos</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Devoluciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Contacto
            </h4>
            <div className={`space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@storehub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${isDark ? 'border-slate-800' : 'border-gray-200'} pt-8 flex flex-col sm:flex-row justify-between items-center gap-4`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            © {currentYear} StoreHub. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Hecho con
            </span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              para ti
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
