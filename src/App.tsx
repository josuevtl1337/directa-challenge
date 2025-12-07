import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { MoviesProvider } from "./context/MoviesContext";
import ScrollToTop from "./modules/layout/scroll-to-top";

function App() {
  return (
    <BrowserRouter>
      <MoviesProvider>
        <ScrollToTop />
        <AppRoutes />
      </MoviesProvider>
    </BrowserRouter>
  );
}

export default App;
