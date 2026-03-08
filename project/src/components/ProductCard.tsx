import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { isDark } = useTheme();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`rounded-xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full`}
    >
      <div className="relative h-56 overflow-hidden bg-gray-200">
        {!imageLoaded && (
          <div className={`absolute inset-0 ${isDark ? 'bg-slate-700' : 'bg-gray-300'} animate-pulse`} />
        )}
        <motion.img
          src={product.image_url}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
              Agotado
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className={`font-bold text-lg mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {product.name}
        </h3>

        <p className={`text-sm mb-3 line-clamp-2 flex-grow ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-500">
            ${product.price.toFixed(2)}
          </span>
          {product.stock > 0 && product.stock <= 5 && (
            <div className="flex items-center gap-1 text-orange-500 text-xs font-semibold">
              <AlertCircle size={14} />
              Solo {product.stock}
            </div>
          )}
        </div>

        {!isOutOfStock && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={`w-8 h-8 rounded font-bold transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                className={`w-12 h-8 text-center rounded border-0 ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-200'} font-bold text-sm`}
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className={`w-8 h-8 rounded font-bold transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                +
              </button>
            </div>

            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <ShoppingCart size={18} />
              {addedToCart ? 'Agregado' : 'Comprar'}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
