import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full lg:w-full mx-auto">
      <header className="border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 px-6 py-4">
        <div className="max-w-7xl py-4 grid grid-cols-3">
          <div className="justify-self-start">
            {location.pathname === "/movie-detail" && (
              <Button
                onClick={() => navigate("/")}
                variant={"outline"}
                className="max-w-40 px-2 py-2 rounded-lg"
              >
                <ArrowLeftIcon /> <p>Movies</p>
              </Button>
            )}
          </div>

          <div className="col-span-2 justify-start justify-self-start">
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Directa Challenge
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              This is <b>NOT</b> a copy from letterboxd
            </p>
          </div>
        </div>
      </header>
      <main className="overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
