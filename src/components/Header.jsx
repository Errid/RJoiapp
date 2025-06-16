import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
  const { getTotalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">RJoias</Link>
        </div>

        {/* Ícone hamburguer */}
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/produtos" onClick={toggleMenu}>Produtos</Link></li>
            <li><Link to="/sobre" onClick={toggleMenu}>Sobre Nós</Link></li>
            <li><Link to="/contato" onClick={toggleMenu}>Contato</Link></li>
            <li><Link to="/carrinho" onClick={toggleMenu}>Carrinho ({getTotalItems()})</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
