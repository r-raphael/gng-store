import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { productService, categoryService } from '../services/supabase';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Product, Category } from '../types';

const Home: React.FC = () => {
  const { isDark } = useTheme();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ]);
        setFeaturedProducts(products.slice(0, 6));
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryPaths: Record<string, string> = {
    'fashion': '/fashion',
    'technology': '/technology',
    'home': '/home'
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative h-96 sm:h-[32rem] overflow-hidden ${isDark ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900' : 'bg-gradient-to-br from-gray-100 via-white to-blue-50'}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10 max-w-2xl px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
            >
              Bienvenido a <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">StoreHub</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`text-lg sm:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Descubre los mejores productos en moda, tecnología y hogar
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                to="/fashion"
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
              >
                Explorar Catálogo
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Categorías Principales
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Explora nuestras colecciones curadas especialmente para ti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative h-64 rounded-xl overflow-hidden cursor-pointer group ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}
            >
              <Link
                to={categoryPaths[category.slug] || '/'}
                className="relative h-full flex items-end justify-start p-6 overflow-hidden"
              >
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-slate-900 to-transparent' : 'bg-gradient-to-t from-slate-900 to-transparent'}`} />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <div className="flex items-center gap-2 text-blue-300 group-hover:gap-3 transition-all">
                    <span>Ver Colección</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
                <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Productos Destacados
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Selección de nuestros artículos más populares
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
