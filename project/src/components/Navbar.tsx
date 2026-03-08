import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Moda', path: '/fashion' },
    { label: 'Tecnología', path: '/technology' },
    { label: 'Hogar', path: '/home' }
  ];

  return (
    <>
      <nav className={`sticky top-0 z-40 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white transition-transform group-hover:scale-110 ${isDark ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-blue-600 to-cyan-600'}`}>
                ST
              </div>
              <span className={`font-bold text-xl hidden sm:inline ${isDark ? 'text-white' : 'text-slate-900'}`}>
                StoreHub
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors hover:text-blue-500 ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-slate-700'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-slate-700'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2"
              >
                {isOpen ? (
                  <X size={24} className={isDark ? 'text-white' : 'text-slate-900'} />
                ) : (
                  <Menu size={24} className={isDark ? 'text-white' : 'text-slate-900'} />
                )}
              </button>
            </div>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`md:hidden pb-4 ${isDark ? 'border-t border-slate-800' : 'border-t border-gray-100'}`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 font-medium transition-colors hover:text-blue-500 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
