/*
  # Seed Products and Categories Data

  Inserting example data for:
  - 3 main categories: Fashion, Technology, Home Products
  - 15 sample products (5 per category)
  
  Using Pexels images as product images
*/

INSERT INTO categories (name, slug, description, icon) VALUES
  ('Moda', 'fashion', 'Ropa y accesorios de última tendencia', 'ShoppingBag'),
  ('Tecnología', 'technology', 'Dispositivos y gadgets innovadores', 'Laptop'),
  ('Productos Domésticos', 'home', 'Artículos para el hogar', 'Home')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, price, category_id, image_url, description, stock) 
SELECT 
  'Sudadera Premium Negra',
  89.99,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Sudadera de algodón 100% con diseño minimalista. Perfecta para el día a día.',
  25
UNION ALL SELECT
  'Jeans Slim Fit Azul',
  59.99,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Jeans clásicos con corte slim fit. Comodidad y estilo combinados.',
  30
UNION ALL SELECT
  'Zapatillas Deportivas',
  129.99,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Zapatillas deportivas de alta calidad con tecnología de amortiguación avanzada.',
  15
UNION ALL SELECT
  'Gafas de Sol Polarizadas',
  149.99,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  'https://images.pexels.com/photos/614584/pexels-photo-614584.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Gafas de sol UV400 con lentes polarizadas. Protección total para tus ojos.',
  20
UNION ALL SELECT
  'Cinturón Cuero Premium',
  79.99,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Cinturón de cuero auténtico con hebilla de acero inoxidable.',
  18
UNION ALL SELECT
  'Laptop Ultradelgada',
  1299.99,
  (SELECT id FROM categories WHERE slug = 'technology'),
  'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
  'Laptop ultraportátil con procesador de última generación y pantalla 4K.',
  8
UNION ALL SELECT
  'Auriculares Inalámbricos',
  199.99,
  (SELECT id FROM categories WHERE slug = 'technology'),
  'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Auriculares con cancelación activa de ruido y batería de 30 horas.',
  25
UNION ALL SELECT
  'Smartwatch Premium',
  349.99,
  (SELECT id FROM categories WHERE slug = 'technology'),
  'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Reloj inteligente con monitoreo de salud y conectividad completa.',
  12
UNION ALL SELECT
  'Cámara Digital Profesional',
  899.99,
  (SELECT id FROM categories WHERE slug = 'technology'),
  'https://images.pexels.com/photos/606933/pexels-photo-606933.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Cámara mirrorless full-frame con lentes profesionales incluidas.',
  6
UNION ALL SELECT
  'Power Bank Ultra Rápido',
  89.99,
  (SELECT id FROM categories WHERE slug = 'technology'),
  'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Batería portátil 65W con carga ultrarápida para múltiples dispositivos.',
  40
UNION ALL SELECT
  'Almohada Ergonómica Premium',
  129.99,
  (SELECT id FROM categories WHERE slug = 'home'),
  'https://images.pexels.com/photos/6585350/pexels-photo-6585350.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Almohada con soporte cervical ajustable para descanso óptimo.',
  22
UNION ALL SELECT
  'Lámpara LED Inteligente',
  79.99,
  (SELECT id FROM categories WHERE slug = 'home'),
  'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Lámpara controlable por app con 16 millones de colores.',
  35
UNION ALL SELECT
  'Set de Vajilla Moderna',
  199.99,
  (SELECT id FROM categories WHERE slug = 'home'),
  'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Servicio de 12 piezas en porcelana fina con diseño contemporáneo.',
  10
UNION ALL SELECT
  'Espejo Decorativo Grande',
  159.99,
  (SELECT id FROM categories WHERE slug = 'home'),
  'https://images.pexels.com/photos/3807511/pexels-photo-3807511.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Espejo de marco dorado con diseño minimalista elegante.',
  14
UNION ALL SELECT
  'Organizador de Almacenamiento',
  49.99,
  (SELECT id FROM categories WHERE slug = 'home'),
  'https://images.pexels.com/photos/3721657/pexels-photo-3721657.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Sistema de almacenamiento modular para organizar cualquier espacio.',
  50
ON CONFLICT DO NOTHING;
