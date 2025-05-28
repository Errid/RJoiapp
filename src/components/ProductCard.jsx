// src/components/ProductCard.jsx
import React, { useState } from 'react'; // NOVO: Importa useState para a mensagem de feedback
import { Link } from 'react-router-dom'; // Importa o Link para navegação
import { useCart } from '../context/CartContext'; // NOVO: Importa o hook customizado para usar o carrinho
import './ProductCard.css'; // Importa os estilos CSS para o ProductCard

function ProductCard({ product }) {
  const { addItem } = useCart(); // Obtém a função 'addItem' do contexto do carrinho
  const [showAddedMessage, setShowAddedMessage] = useState(false); // Estado para controlar a visibilidade da mensagem

  const handleAddToCart = (e) => {
    // Impede que o clique no botão "borbulhe" para o elemento pai (Link)
    // e ative a navegação para a página de detalhes do produto.
    e.stopPropagation();
    addItem(product); // Adiciona o produto ao carrinho
    setShowAddedMessage(true); // Mostra a mensagem de "Adicionado!"
    // Esconde a mensagem após 2 segundos
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  return (
    // Envolve o cartão inteiro com o Link para navegar para a página de detalhes do produto
    <Link to={`/produto/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/250x250?text=Sem+Imagem'} // Exibe a imagem do produto ou um placeholder
            alt={product.name} // Texto alternativo para acessibilidade
            className="product-image"
          />
        </div>
        <h3 className="product-name">{product.name}</h3> {/* Nome do produto */}
        <p className="product-price">R$ {product.price.toFixed(2).replace('.', ',')}</p> {/* Preço formatado */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </button>
        {/* Mensagem de feedback condicional */}
        {showAddedMessage && (
          <span className="added-to-cart-feedback">Adicionado!</span>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
