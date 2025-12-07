import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="h-screen grid grid-rows-[auto_1fr] min-w-250">
            <header className="border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 px-6 py-4">
                <div className="border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-slate-950/80">
                    <div className="max-w-7xl px-6 py-6">
                        <div className="flex flex-row w-full justify-center gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    Directa Challenge
                                </h1>
                                <p className="text-slate-400 text-sm mt-1">
                                    This is <b>NOT</b> a copy from letterboxd
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="overflow-auto bg-background p-4">
                <Outlet />
            </main>
        </div>
    );
}
