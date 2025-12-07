import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

const MainLayout = lazy(() => import("@/modules/layout/main-layout"));
const HomePage = lazy(() => import("@/modules/movies/index"));
const MovieDetail = lazy(() => import("@/modules/movies/pages/movie-detail"));
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie-detail", element: <MovieDetail /> },
      { path: "*", element: <div className="p-6"> No encontrado</ div > },
    ],
  },
];

export default function AppRoutes() {
  const element = useRoutes(routes);
  return (
    <Suspense fallback={< div className="p-6" > Cargando…</div>
    }>
      {element}
    </Suspense>
  );
}
