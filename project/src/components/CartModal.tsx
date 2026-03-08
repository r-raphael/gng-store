import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const handleWhatsApp = () => {
    const cartDetails = items
      .map((item) => `${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const message = encodeURIComponent(
      `Hola, estoy interesado en los siguientes productos:\n\n${cartDetails}\n\nTotal: $${totalPrice.toFixed(2)}`
    );

    window.open(`https://wa.me/34900123456?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className={`fixed right-0 top-0 h-full w-full max-w-md ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-2xl z-50 flex flex-col`}
          >
            <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tu Carrito
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={48} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
                  <p className={`mt-4 text-lg font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Tu carrito está vacío
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`flex gap-4 p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.product.name}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        ${item.product.price.toFixed(2)} x {item.quantity}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className={`w-6 h-6 rounded text-xs font-bold ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className={`w-6 h-6 rounded text-xs font-bold ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 rounded hover:bg-red-500/20 text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className={`p-6 space-y-4 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-blue-500">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Contactar por WhatsApp
                </motion.button>

                <button
                  onClick={() => {
                    clearCart();
                    onClose();
                  }}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-slate-900'}`}
                >
                  Vaciar Carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
