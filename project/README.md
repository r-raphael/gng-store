# StoreHub - Tienda Online Moderna

Una tienda online moderna y elegante desarrollada con tecnologías de vanguardia. Diseñada para ser modular, escalable y fácil de mantener por un equipo de desarrollo.

## Características

- ✨ Diseño minimalista e inspirado en Apple/Stripe
- 🌙 Modo oscuro/claro automático
- 📱 Totalmente responsivo (móvil, tablet, desktop)
- 🛒 Carrito de compras persistente
- ⚡ Animaciones suaves con Framer Motion
- 🔍 Búsqueda y filtrado de productos
- 💬 Integración con WhatsApp
- 🚀 Rendimiento optimizado
- 🔐 Seguro con autenticación de Supabase

## Tecnologías

### Frontend
- **React 18** - Librería UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Utilidades CSS
- **Framer Motion** - Animaciones
- **React Router** - Enrutamiento
- **Lucide React** - Iconos
- **Supabase JS Client** - Base de datos

### Backend
- **Supabase PostgreSQL** - Base de datos
- **Row Level Security** - Seguridad

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── CartModal.tsx
│   ├── WhatsAppButton.tsx
│   └── LoadingSpinner.tsx
├── contexts/           # Contextos de React
│   ├── ThemeContext.tsx  # Tema claro/oscuro
│   └── CartContext.tsx   # Estado del carrito
├── pages/              # Páginas principales
│   ├── Home.tsx
│   └── CategoryPage.tsx
├── services/           # Servicios de API
│   └── supabase.ts     # Cliente Supabase
├── types/              # Tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente raíz
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## Instalación y Configuración

### Requisitos
- Node.js 18+
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd project
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Variables de entorno**
Las variables de Supabase ya están configuradas en `.env`:
```
VITE_SUPABASE_URL=https://uxrrzkrvcjzalwshhvqc.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

### Preview de producción

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### Type checking

```bash
npm run typecheck
```

## Funcionalidades

### 1. Navegación
- Navbar con logo, categorías y carrito
- Hamburger menu en móviles
- Transiciones suaves entre páginas

### 2. Modo Oscuro/Claro
- Toggle en la navbar
- Persistencia en localStorage
- Detección automática de preferencia del sistema

### 3. Catálogo de Productos
- 3 categorías principales: Moda, Tecnología, Hogar
- 15 productos de ejemplo
- Imágenes de alta calidad
- Precios, descripción y stock

### 4. Carrito de Compras
- Agregar/eliminar productos
- Ajustar cantidades
- Cálculo automático de total
- Persistencia en localStorage

### 5. Integración WhatsApp
- Botón flotante animado
- Envío de lista de productos y precio
- Teléfono configurable

### 6. Búsqueda y Filtros
- Búsqueda por nombre
- Ordenamiento por precio
- Filtrado por disponibilidad

## Base de Datos

### Tablas

#### Categories
```sql
- id: uuid (primary key)
- name: text
- slug: text (unique)
- description: text
- icon: text
- created_at: timestamp
```

#### Products
```sql
- id: uuid (primary key)
- name: text
- price: numeric
- category_id: uuid (foreign key)
- image_url: text
- description: text
- stock: integer
- created_at: timestamp
- updated_at: timestamp
```

## Modelos TypeScript

### Product
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  image_url: string;
  description: string;
  stock: number;
  created_at: string;
  updated_at: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  created_at: string;
}
```

### CartItem
```typescript
interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
```

## Hooks Personalizados

### useTheme
```typescript
const { isDark, toggleTheme } = useTheme();
```

### useCart
```typescript
const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
```

## Servicios

### productService
```typescript
getProducts()
getProductsByCategory(slug)
getProductById(id)
searchProducts(query)
```

### categoryService
```typescript
getCategories()
getCategoryBySlug(slug)
```

## Guía de Componentes

### ProductCard
Tarjeta de producto con imagen, precio y botón de compra.

```tsx
<ProductCard product={product} index={0} />
```

### CartModal
Modal del carrito con lista de productos.

```tsx
<CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
```

### WhatsAppButton
Botón flotante de WhatsApp.

```tsx
<WhatsAppButton />
```

## Estilos y Tema

### Colores
- **Primario**: Blue (500-600)
- **Secundario**: Cyan (500-600)
- **Fondo Claro**: White
- **Fondo Oscuro**: Slate (800-900)
- **Éxito**: Green (500-600)
- **Error**: Red (500-600)

### Animaciones
- Fade in/out
- Slide animations
- Hover effects
- Loading spinners
- Pulse effects

## Rendimiento

- Lazy loading de imágenes
- Code splitting automático
- Caching de datos
- Optimización de bundle
- CSS minificado

## Seguridad

- Row Level Security en Supabase
- Sin datos sensibles en el cliente
- Validación de tipos con TypeScript
- Sanitización de inputs

## Desarrollo en Equipo

### Convenciones de Código
- **Nombres**: camelCase para variables/funciones, PascalCase para componentes
- **Componentes**: Archivos individuales por componente
- **Tipado**: Siempre usar TypeScript
- **Estilos**: Tailwind CSS + clases personalizadas en index.css

### Proceso de Desarrollo
1. Crear rama feature: `git checkout -b feature/nombre`
2. Hacer cambios y commits
3. Push a la rama
4. Crear Pull Request

### Checklist antes de Push
- [ ] Código pasa linting (`npm run lint`)
- [ ] Tipos verificados (`npm run typecheck`)
- [ ] Build exitoso (`npm run build`)
- [ ] Sin console.log en producción
- [ ] Componentes documentados

## Troubleshooting

### El carrito no persiste
- Verificar que localStorage esté habilitado
- Limpiar caché del navegador

### Imágenes no cargan
- Verificar URLs de Pexels
- Comprobar conexión a internet

### Tema no cambia
- Limpiar localStorage: `localStorage.clear()`
- Recargar página

### Errores de Supabase
- Verificar URL y clave en `.env`
- Comprobar RLS policies
- Ver logs en Dashboard de Supabase

## Futuras Mejoras

- [ ] Autenticación de usuarios
- [ ] Historial de compras
- [ ] Sistema de reviews
- [ ] Wishlist
- [ ] Checkout con pagos
- [ ] Email notifications
- [ ] Analytics
- [ ] Admin panel

## Licencia

MIT

## Contacto

Para preguntas o sugerencias:
- Email: info@storehub.com
- WhatsApp: +34 900 123 456
- Ubicación: Madrid, España

---

**Desarrollado con ❤️ por el equipo StoreHub**
