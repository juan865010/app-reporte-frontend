import React from 'react';
import '../styles/header.css';
import logo from '../images/logo.png';  // Importar el logo desde la carpeta 'images'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Texto del título */}
        <div className="header-title">
          <h1>Tecnologías de Operaciones Mina</h1>
        </div>
        <div className="logo">
          <img src={logo} alt="Logo" /> {/* Usar el logo importado */}
        </div>
      </div>
    </header>
  );
}

export default Header;
