// src/pages/OrderConfirmationPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Para garantir que o carrinho foi limpo
import './OrderConfirmationPage.css'; // Importa os estilos CSS para a página de confirmação

function OrderConfirmationPage() {
  const { clearCart } = useCart(); // Obtém a função para limpar o carrinho

  // Use useEffect para limpar o carrinho quando a página de confirmação é montada
  // Em uma aplicação real, você só limparia o carrinho após uma resposta de sucesso do backend
  useEffect(() => {
    clearCart();
  }, [clearCart]); // A dependência garante que o efeito só rode se clearCart mudar (raro)

  // Gerar um número de pedido simples para demonstração
  const orderNumber = Math.floor(Math.random() * 100000000) + 100000;

  return (
    <div className="page-content order-confirmation-container">
      <h2>Pedido Confirmado!</h2>
      <p className="thank-you-message">Obrigado pela sua compra na RJoias!</p>
      <p className="order-number">Seu número de pedido é: <strong>#{orderNumber}</strong></p>
      <p>Você receberá um email de confirmação com os detalhes do seu pedido em breve.</p>

      <div className="confirmation-actions">
        <Link to="/produtos" className="back-to-products-btn">
          Continuar Comprando
        </Link>
        <Link to="/" className="home-btn">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
