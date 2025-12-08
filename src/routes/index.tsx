import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

const MainLayout = lazy(() => import("@/modules/layout/main-layout"));
const HomePage = lazy(() => import("@/modules/movies/pages/index"));
const MovieDetail = lazy(() => import("@/modules/movies/pages/movie-detail"));
// eslint-disable-next-line react-refresh/only-export-components
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie-detail", element: <MovieDetail /> },
      { path: "*", element: <div className="p-6"> Not found</div> },
    ],
  },
];

export default function AppRoutes() {
  const element = useRoutes(routes);
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-full min-h-screen w-full bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 opacity-95 px-6 py-8">
      <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
    </div>}>
      {element}
    </Suspense>
  );
}
