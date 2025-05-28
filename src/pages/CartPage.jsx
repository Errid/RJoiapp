// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const { cartItems, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();

  const handleQuantityChange = (id, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    if (window.confirm('Tem certeza que deseja remover este item do carrinho?')) {
      removeItem(id);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Tem certeza que deseja esvaziar o carrinho?')) {
      clearCart();
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="page-content cart-page-container">
      <h2>Seu Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Seu carrinho está vazio.</p>
          <Link to="/produtos" className="back-to-products-btn">
            Ver Produtos
          </Link>
        </div>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/produto/${item.id}`} className="cart-item-image-link">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/100x100?text=Sem+Imagem'}
                  alt={item.name}
                  className="cart-item-image"
                />
              </Link>
              <div className="cart-item-details">
                <Link to={`/produto/${item.id}`} className="cart-item-name-link">
                  <h3>{item.name}</h3>
                </Link>
                <p className="cart-item-price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                <div className="cart-item-quantity-control">
                  <label htmlFor={`quantity-${item.id}`}>Quantidade:</label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className="quantity-input"
                  />
                  <button onClick={() => handleRemoveItem(item.id)} className="remove-item-btn">
                    ❌ Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
  <h3>Total: R$ {totalPrice.toFixed(2).replace('.', ',')}</h3>

  <div className="cart-buttons-container">
    <button onClick={handleClearCart} className="clear-cart-btn">
      Esvaziar Carrinho
    </button>
    <Link to="/checkout" className="checkout-btn">
      Finalizar Compra
    </Link>
  </div>

  <Link to="/produtos" className="back-to-products-btn">
    Continuar Comprando
  </Link>
</div>

        </div>
      )}
    </div>
  );
}

export default CartPage;
