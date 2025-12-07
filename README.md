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

Elegí estas tecs por varias razones:

- Ya venía trabajando en un proyecto con estas tecnologías
- Permite construir UI rápidamente manteniendo consistencia visual.
- shadcn/ui trae componentes accesibles, tipados.
- Tailwind para aumentar la velocidad de desarrollo con su sistema de classes inline.

---

4. Filtros con componentes reutilizables

Los selectores de Año, Género, Director y Rated están construidos como componentes reutilizables:

- opciones generadas dinámicamente desde los datos reales
- UI similar a Letterboxd (hover dropdown)
- filtrado en tiempo real en memoria

Esto facilita extender la app sin cambiar la arquitectura.

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
