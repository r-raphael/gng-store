import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const WhatsAppButton: React.FC = () => {
  const { isDark } = useTheme();

  const handleWhatsApp = () => {
    window.open('https://wa.me/34900123456', '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsApp}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-30 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-colors"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <MessageCircle size={28} />
      </motion.div>
    </motion.button>
  );
};

export default WhatsAppButton;
