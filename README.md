# Directa Challenge – Movie Browser

React App para ver y filtrar películas utilizando la API brindada por Directa.  
El objetivo principal del proyecto fue construir una UI bonita, rápida y fácil de usar, tomando decisiones técnicas que optimicen la experiencia del usuario y la mantenibilidad del código.

Stack principal

- React + Vite + TypeScript
- TailwindCSS
- shadcn/ui(componentes accesibles y tematizables)
- Node/Express

---

Decision Making

1. Pre-carga completa de películas

La API está paginada, pero el dataset es pequeño (26 películas).  
Por eso decidí, obtener todas las páginas al inicio, combinar los resultados en `allMovies`. Realizar todos los filtros en el cliente, en vez de tener que hacer un paginador, donde el sistema de filtros no funcionaria del todo correctamente sobre 10 items.

Ventajas:

- Filtrado instantáneo sin llamadas adicionales.
- Mejor experiencia de usuario.
- Código más simple en el frontend.

---

2. Proxy backend para evitar CORS

La API no permite peticiones directas desde el navegador (CORS).  
Para evitar workarounds men os prolijos, implementé un backend Express muy pequeño.

---

3. Tailwind + Shadcn por velocidad y consistencia

Elegi estas tecs por varias razones:

- Ya venía trabajando en un proyecto con estas tecnologías
- Permite construir UI rapido manteniendo consistencia visual.
- shadcn/ui trae componentes accesibles, tipados.
- Tailwind para desarrollar  rapido proyectos cortos me encanta con su sistema de classes inline.

---

4. Filtros con componentes reutilizables

Los selectores de Año, Género, Director y Rated están construidos como componentes reutilizables

---

### Lo que se quedo afuera:

#### 1. **Skeletons / Loading States Avanzados**
**Por que no se implementó:**
- El dataset es pequeño (27 películas) y se carga rápido incluso con todas las páginas.
- El tiempo de espera es mínimo en condiciones normales de red.
- Priorize la implementación de features core (filtros, navegación, contexto global) sobre optimizaciones visuales de loading.

**Impacto:** En redes lentas, el usuario verá un loading spinner genérico en lugar de skeleton loaders animados. Me quede con ganas de hacerlo y no lo hice por tiempo

---

#### 2. **Paginación en Frontend**
**Por qué no se implementó:**
- Con solo 27 películas, implementar paginación añadiría complejidad sin valor real.
- El contexto global almacena todas las películas, permitiendo filtrado instantáneo en cliente.
- Si el dataset creciera (1000+ películas) sería necesario:
  - Paginación backend con parámetros de filtro.
  - Virtualized lists (ej: `react-window`) para eficiencia en scroll.
  - Sistema de lazy loading onScroll.

---

#### 3. **Responsive Design Mobile Completo**
**Por qué no se implementó completamente:**
- Layout principal funciona en mobile (grid responsivo, navegación).
- Detalles como espaciados, tamaños de fuente y breakpoints en algunos componentes podrían mejorarse.
- Priorize desktop-first. para un desarrollo rapido, igualmente quedo decente en todos los dispotivos.

---

#### 4. **Imágenes de peliculas (Posters)**
**Por qué no se implementó:**
- La API no devuelve URLs de imágenes.
- Opciones descartadas:
  - Consumir API externa (OMDb, TMDB) → requiere autenticación adicional, complejidad, tiempo etc.
  - Generar placeholders dinámicos.
- Puse emojis como placeholder visual consistente.

---

#### 5. **Persistencia de data (LocalStorage)**
**Por qué no se implementó:**
- El contexto global ya cachea películas en memoria.
- Persistencia sería útil para algunas ideas que se me ocurrieron 
Guardar filtros aplicados al recargar. 
Historial de búsquedas recientes.
Películas favoritas/watchlist.

- No era requisito del challenge, priorize contexto global.

---

#### 6. **Tests Unitarios / E2E**
**Por qué no se implementó:**
- Foco en features funcionales y UI.
- Tiempo invertido en arquitectura, estilos y experiencia de usuario.
- El código está tipado con TypeScript, ayudo para mejorar el código en tiempo de desarrollo.

**Recomendación para producción:**
- Tests unitarios para hooks (useMoviesContext, useAllMovies).

---

#### 7. **Búsqueda por Texto Avanzada**
**Por qué no se implementó completamente:**
- La barra de búsqueda existe (SearchBar) pero solo busca en Title.
- Versión completa podría incluir:
  - Búsqueda en actores, director, descripción.
  - Fuzzy search para manejar typos.
  - Highlighting de resultados.
- Complejidad y utilidad: el filtrado por géneros/director/año cubre la mayoría de casos.

---

#### 8. **Favoritos / Watchlist**
**Por qué no se implementó:**
- Requeriría:
  - Extensión del contexto (nuevo estado `favorites`).
  - Persistencia (localStorage o backend).
  - UI adicional (botones, página dedicada).
- No era parte del scope inicial, pero lo pensé y me gustó la idea.

---

Para levantar

- Back:

```bash
  cd backend
  npm install
  npm run dev
```

- Front:

```bash
  npm install
  npm run dev
```
