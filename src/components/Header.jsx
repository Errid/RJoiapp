// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegação
import { useCart } from '../context/CartContext'; // NOVO: Importa o hook customizado para usar o carrinho
import './Header.css'; // Importa os estilos CSS para o Header

function Header() {
  const { getTotalItems } = useCart(); // Obtém a função 'getTotalItems' do contexto do carrinho

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">RJoias</Link> {/* Link para a página inicial */}
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/produtos">Produtos</Link></li> {/* Link para a página de produtos */}
            <li><Link to="/sobre">Sobre Nós</Link></li>   {/* Link para a página "Sobre Nós" */}
            <li><Link to="/contato">Contato</Link></li>   {/* Link para a página de contato (a ser criada) */}
            {/* Link para a página do carrinho, exibindo a contagem total de itens */}
            <li><Link to="/carrinho">Carrinho ({getTotalItems()})</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
