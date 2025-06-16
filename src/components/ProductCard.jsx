// src/components/ProductCard.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Impede a propagação para o Link
    addItem(product);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/250x250?text=Sem+Imagem'}
            alt={product.name}
            className="product-image"
          />
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">R$ {product.price.toFixed(2).replace('.', ',')}</p>
      </Link>

      {/* Botão "Adicionar ao Carrinho" fora do Link */}
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Adicionar ao Carrinho
      </button>

      {showAddedMessage && (
        <span className="added-to-cart-feedback">Adicionado!</span>
      )}
    </div>
  );
}

export default ProductCard;
