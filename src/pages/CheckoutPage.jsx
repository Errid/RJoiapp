// src/pages/CheckoutPage.jsx

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'; // 1. IMPORTAÇÕES DO MP
import "./CheckoutPage.css";

// 2. INICIALIZAÇÃO DO MERCADO PAGO COM SUA CHAVE PÚBLICA
// Coloque sua Public Key em um arquivo .env como VITE_MP_PUBLIC_KEY
initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

function CheckoutPage() {
  const { cartItems, getTotalPrice } = useCart(); // Removido clearCart por enquanto

  // Seus states de formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // States para controlar o fluxo
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [preferenceId, setPreferenceId] = useState(null); // 3. STATE PARA O ID DA PREFERÊNCIA

  const totalPrice = getTotalPrice();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      // 4. CHAMADA CORRETA PARA A SUA CLOUD FUNCTION
      const cloudFunctionUrl = "https://createpreference-t5mjlbf24a-uc.a.run.app"; // <-- SUBSTITUA PELA SUA URL REAL
      
      const response = await axios.post(cloudFunctionUrl, {
        // O backend só precisa dos itens do carrinho
        items: cartItems,
      });

      // 5. GUARDA O ID DA PREFERÊNCIA NO STATE
      const { id } = response.data;
      setPreferenceId(id);

    } catch (error) {
      console.error("Erro ao criar preferência de pagamento:", error);
      setErrorMsg("Erro ao iniciar o pagamento. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false); // Para o loading após receber a resposta
    }
  };

  return (
    <div className="checkout-page-container">
      <h2>Finalizar Compra</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="checkout-summary">
            {/* O resumo do seu pedido continua o mesmo... */}
            <h3>Resumo do Pedido</h3>
            <ul className="checkout-items-list">
              {cartItems.map((item) => (
                <li key={item.id} className="checkout-item">
                  <img src={item.imageUrl || "..."} alt={item.name} className="checkout-item-image" />
                  <div className="checkout-item-details">
                    <p className="checkout-item-name">{item.name}</p>
                    <p className="checkout-item-quantity">Quantidade: {item.quantity}</p>
                    <p className="checkout-item-price">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="checkout-total">
              Total: R$ {totalPrice.toFixed(2).replace(".", ",")}
            </h3>
          </div>

          {/* 6. RENDERIZAÇÃO CONDICIONAL */}
          {/* Se ainda não temos um ID de preferência, mostramos o formulário */}
          {!preferenceId ? (
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h3>Informações de Contato e Entrega</h3>
              {errorMsg && <p className="error-message">{errorMsg}</p>}

              <label htmlFor="name">Nome Completo</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

              <label htmlFor="phone">Celular</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              
              <label htmlFor="address">Endereço de Entrega</label>
              <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />

              <button type="submit" disabled={loading} className="checkout-submit-btn">
                {loading ? "Processando..." : "Ir para o Pagamento"}
              </button>
            </form>
          ) : (
            // Se já temos o ID, mostramos o botão de pagamento do Mercado Pago
            <div className="payment-container">
              <h3>Prossiga para o Pagamento</h3>
              <p>Você será redirecionado para um ambiente seguro do Mercado Pago.</p>
              <Wallet initialization={{ preferenceId: preferenceId }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CheckoutPage;