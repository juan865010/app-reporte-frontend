import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Reportes from './pages/Reportes';
import Login from './components/login'; 
import Dashboard from './pages/Dashboard'; 
import Header from './components/header';  
import Footer from './components/footer';  

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isReportPage = location.pathname === "/Reportes";  

  return (
    <>
      {!isLoginPage && <Header />}  {/* Mostrar Header solo si no está en login */}
      <div className={isLoginPage ? 'login-background' : ''}>
        {children}
      </div>
      {!(isLoginPage || isReportPage) && <Footer />}  {/* Ocultar Footer en login y reportes */}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* Rutas protegidas, requieren autenticación */}
          <Route path="/reportes" element={isAuthenticated ? <Reportes /> : <Navigate to="/login" />} />
          <Route path="/estadisticas" element={isAuthenticated ? <div>Estadísticas</div> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
