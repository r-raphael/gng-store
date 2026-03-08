# Arquitectura del Proyecto

Documentación técnica detallada sobre la arquitectura de StoreHub.

## Visión General

StoreHub es una aplicación monolítica moderna que utiliza:
- **Frontend**: React con TypeScript y Vite
- **Base de Datos**: PostgreSQL en Supabase
- **Gestión de Estado**: Context API
- **Estilos**: Tailwind CSS + Custom CSS
- **Animaciones**: Framer Motion

## Arquitectura de Carpetas

```
src/
├── components/           # Componentes reutilizables
│   ├── Navbar.tsx       # Barra de navegación principal
│   ├── Footer.tsx       # Pie de página
│   ├── ProductCard.tsx  # Tarjeta de producto
│   ├── CartModal.tsx    # Modal del carrito
│   ├── WhatsAppButton.tsx # Botón flotante WhatsApp
│   └── LoadingSpinner.tsx # Spinner de carga
│
├── contexts/            # Contextos globales
│   ├── ThemeContext.tsx # Gestión de tema claro/oscuro
│   └── CartContext.tsx  # Gestión del carrito
│
├── pages/               # Páginas/Vistas
│   ├── Home.tsx        # Página principal
│   └── CategoryPage.tsx # Página de categoría (reutilizable)
│
├── services/           # Servicios y APIs
│   └── supabase.ts     # Cliente Supabase y métodos
│
├── types/              # Definiciones de TypeScript
│   └── index.ts       # Interfaces y tipos
│
├── App.tsx             # Componente raíz
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## Flujo de Datos

### 1. Descarga Inicial
```
App.tsx
  ├── ThemeProvider
  │   └── CartProvider
  │       └── Router
  │           ├── Navbar (muestra totalItems del CartContext)
  │           ├── Rutas
  │           │   ├── Home (carga productos con productService)
  │           │   └── CategoryPage (carga por categoría)
  │           └── Footer
```

### 2. Ciclo de Vida de Producto
```
CategoryPage
  ├── useEffect → productService.getProductsByCategory()
  ├── Supabase API
  │   └── Retorna array de productos
  ├── useState([products])
  └── Renderiza ProductCard x N
      └── Puede agregar a cart → CartContext.addItem()
```

### 3. Gestión del Carrito
```
ProductCard → useCart() → CartContext
  ├── addItem(product, quantity)
  │   └── Actualiza estado
  │       └── localStorage.setItem('cart', JSON.stringify(items))
  ├── removeItem(productId)
  ├── updateQuantity(productId, quantity)
  └── clearCart()
```

### 4. Tema Oscuro/Claro
```
useTheme() → ThemeContext
  ├── isDark (boolean)
  ├── toggleTheme() → setIsDark(!isDark)
  │   └── localStorage.setItem('theme', isDark ? 'dark' : 'light')
  │   └── document.documentElement.classList.add/remove('dark')
  └── Todos los componentes usan isDark para condicionales CSS
```

## Servicios

### supabase.ts
Capa de comunicación con la base de datos.

**Métodos disponibles:**

#### productService
```typescript
// Obtener todos los productos
getProducts(): Promise<Product[]>

// Obtener productos por categoría
getProductsByCategory(slug: string): Promise<Product[]>

// Obtener un producto por ID
getProductById(id: string): Promise<Product | null>

// Buscar productos
searchProducts(query: string): Promise<Product[]>
```

#### categoryService
```typescript
// Obtener todas las categorías
getCategories(): Promise<Category[]>

// Obtener categoría por slug
getCategoryBySlug(slug: string): Promise<Category | null>
```

## Contextos

### ThemeContext
Maneja el tema global de la aplicación.

**Valores:**
- `isDark`: boolean - Indica si está en modo oscuro
- `toggleTheme()`: void - Cambia el tema

**Uso:**
```typescript
const { isDark, toggleTheme } = useTheme();
```

### CartContext
Gestiona el carrito de compras global.

**Valores:**
- `items`: CartItem[] - Productos en el carrito
- `totalItems`: number - Cantidad total de items
- `totalPrice`: number - Precio total
- `addItem(product, quantity)`: void
- `removeItem(productId)`: void
- `updateQuantity(productId, quantity)`: void
- `clearCart()`: void

**Uso:**
```typescript
const { items, addItem, totalPrice } = useCart();
```

## Componentes

### Navbar
Componente principal de navegación.

**Props:** Ninguno (usa contextos)
**Features:**
- Navegación entre páginas
- Toggle de tema
- Icono de carrito con contador
- Menu hamburguesa en móviles

**Dependencias:**
- ThemeContext
- CartContext
- React Router
- CartModal

### ProductCard
Tarjeta individual de producto.

**Props:**
```typescript
interface ProductCardProps {
  product: Product;
  index?: number; // Para stagger animations
}
```

**Features:**
- Imagen con lazy loading
- Información del producto
- Selector de cantidad
- Botón de compra
- Estado de agotado
- Animaciones hover

### CartModal
Modal del carrito de compras.

**Props:**
```typescript
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**
- Lista de productos en carrito
- Ajuste de cantidades
- Cálculo de total
- Botón WhatsApp
- Botón vaciar carrito

### WhatsAppButton
Botón flotante de WhatsApp.

**Features:**
- Posición fija
- Animación de entrada
- Animación de rotación continua
- Link a WhatsApp

## Base de Datos

### Políticas de RLS
Todos los datos son públicos para lectura (no requiere autenticación).

```sql
-- Categories
CREATE POLICY "Categories are public"
  ON categories FOR SELECT TO public USING (true);

-- Products
CREATE POLICY "Products are public"
  ON products FOR SELECT TO public USING (true);
```

### Índices
Optimizados para consultas frecuentes:
- `products(category_id)` - Para búsquedas por categoría
- `products(name)` - Para búsqueda de texto

## Enrutamiento

Usando React Router v6:

```
/ → Home
/fashion → CategoryPage (slug="fashion", title="Moda")
/technology → CategoryPage (slug="technology", title="Tecnología")
/home → CategoryPage (slug="home", title="Productos Domésticos")
```

## Estilos

### Sistema de Diseño
Basado en Tailwind CSS con extensiones personalizadas.

**Paleta de colores:**
- Primario: Blue (500-600)
- Secundario: Cyan (500-600)
- Éxito: Green (500-600)
- Error: Red (500-600)
- Neutral: Gray/Slate (100-900)

**Modo oscuro:**
- Automático con prefijo `dark:` de Tailwind
- Clase `dark` en `<html>`
- Fallback a tema claro

### Animaciones Personalizadas
Definidas en `index.css`:
- `animate-fade-in` - Fade in 0.5s
- `animate-slide-in-right` - Slide desde derecha
- `animate-slide-in-left` - Slide desde izquierda
- `animate-pulse-glow` - Glow pulsante

### Framer Motion
Animaciones avanzadas:
- Page transitions
- Stagger animations
- Hover effects
- Scroll-triggered animations

## Performance

### Optimizaciones Implementadas

1. **Code Splitting**
   - React Router lazy routes (futuro)
   - Dynamic imports

2. **Image Optimization**
   - Lazy loading con state
   - Placeholder animado
   - URL de Pexels (optimizadas externamente)

3. **State Management**
   - Context API (minimal overhead)
   - localStorage para persistencia

4. **Bundle Size**
   - Tree-shaking automático
   - Tailwind purge
   - Vite optimizations

## Scalability

### Cómo expandir el proyecto

#### Agregar nueva categoría
1. Agregar en Supabase categories
2. Automáticamente aparecerá en Home
3. Accesible en `/categoría-slug`

#### Agregar nuevo componente
1. Crear en `src/components/NuevoComponent.tsx`
2. Importar donde sea necesario
3. Exportar y documentar

#### Agregar nueva página
1. Crear en `src/pages/NuevaPage.tsx`
2. Importar en App.tsx
3. Agregar ruta en Routes

#### Agregar nuevo servicio
1. Crear en `src/services/nuevo.ts`
2. Exportar métodos
3. Importar en componentes

## Testing (Futuro)

Recomendaciones para testing:
- **Unit Tests**: Vitest o Jest
- **Component Tests**: React Testing Library
- **E2E Tests**: Cypress o Playwright
- **Visual Tests**: Percy o Chromatic

## Security

### Medidas Implementadas
- Row Level Security en Supabase
- No sensibled ata en localStorage
- TypeScript para type-safety
- Sanitización en búsquedas (ilike query)

### Mejoras Recomendadas
- Agregar autenticación
- CSRF protection
- Rate limiting
- Validación en servidor

## Deployment

### Opciones
1. **Vercel** (Recomendado para Next.js/Vite)
2. **Netlify**
3. **GitHub Pages**
4. **AWS S3 + CloudFront**

### Pasos
1. `npm run build`
2. Subir carpeta `dist/` a hosting
3. Configurar redirect 404 a index.html (SPA)

## Monitoring

### Herramientas Recomendadas
- Sentry para error tracking
- Google Analytics para usage
- Supabase Dashboard para BD
- Bundle analyzer para size

## Documentación

Archivos incluidos:
- `README.md` - Guía de usuario y setup
- `ARCHITECTURE.md` - Este archivo
- `CONTRIBUTING.md` - Guía para contribuir

## Mantenimiento

### Checklist Regular
- [ ] Actualizar dependencias
- [ ] Revisar security advisories
- [ ] Monitorear performance
- [ ] Revisar error logs
- [ ] Actualizar documentación

### Versioning
Semver: MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes
