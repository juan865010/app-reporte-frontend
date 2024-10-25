// src/components/Footer.js
import React from 'react';
import '../styles/footer.css';
import { FaWhatsapp, FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          <strong className="copyright-text">Copyright &copy; 2024 Juan Beltran</strong> Todos los derechos reservados.
        </p>
        <div className="footer-links">
          <span className="contact-text">Contáctame por:</span> {/* Texto no es un enlace */}
          <div className="social-icons">
            <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social-icon" />
            </a>
            <a href="https://facebook.com/your-facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" />
            </a>
            <a href="https://instagram.com/your-instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
