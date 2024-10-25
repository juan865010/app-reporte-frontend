import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa'; 
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'juan' && password === 'juan123') {
      onLogin(); 
      navigate('/navbar'); 
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser className="input-icon" /> {/* Icono de usuario */}
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <FaLock className="input-icon" /> {/* Icono de candado */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">INICIAR SESIÓN</button>
      </form>
    </div>
    
  );
}
export default Login;
