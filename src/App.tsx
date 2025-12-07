import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { MoviesProvider } from "./context/MoviesContext";

function App() {
  return (
    <BrowserRouter>
      <MoviesProvider>
        <AppRoutes />
      </MoviesProvider>
    </BrowserRouter>
  );
}

export default App;
