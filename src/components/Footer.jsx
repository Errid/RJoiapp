// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Vamos criar este arquivo de estilo

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} RJoias. Todos os direitos reservados.</p>
        <div className="social-links">
          <a href="#" target="_blank">Facebook</a> |
          <a href="https://www.instagram.com/rjoias_18k/" target="_blank" rel="noopener noreferrer" >Instagram</a> |
          <a href="https://api.whatsapp.com/message/Z536QZ7CH6XBJ1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" >WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;