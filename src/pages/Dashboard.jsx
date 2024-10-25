import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaChartBar } from 'react-icons/fa'; // FaTools reemplaza al ícono de FaFileAlt
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <div className="row">
          {/* El enlace*/}
          <Link to="/Reportes" className="dashboard-card report-card">
            <FaTools className="dashboard-icon" /> {/* FaTools */}
            <h5>Reporte Mantenimiento</h5>
          </Link>
        </div>
        <div className="row">
          <Link to="/estadisticas" className="dashboard-card stats-card">
            <FaChartBar className="dashboard-icon" />
            <h5>Estadísticas</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
