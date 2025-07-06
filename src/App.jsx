import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import Archived from "./pages/Archived";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">NOTAS APP</h1>
            <nav className="space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                Notas activas
              </NavLink>
              <NavLink
                to="/archived"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                Archivadas
              </NavLink>
            </nav>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archived" element={<Archived />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
