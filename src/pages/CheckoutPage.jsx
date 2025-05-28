// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cartItems, clearCart, getTotalPrice } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      // Simulação da requisição de checkout (exemplo)
      const response = await axios.post("/api/checkout", {
        name,
        phone,
        address,
        items: cartItems,
        total: totalPrice,
      });

      const { paymentUrl } = response.data;

      clearCart();
      window.location.href = paymentUrl;
    } catch (error) {
      setErrorMsg("Erro ao processar o pagamento. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page-container">
      <h2>Finalizar Compra</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.</p>
      ) : (
        <>
          <div className="checkout-summary">
            <h3>Resumo do Pedido</h3>
            <ul className="checkout-items-list">
              {cartItems.map((item) => (
                <li key={item.id} className="checkout-item">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/80x80?text=Sem+Imagem"}
                    alt={item.name}
                    className="checkout-item-image"
                  />
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

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Informações do Cliente</h3>

            {errorMsg && <p className="error-message">{errorMsg}</p>}

            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              required
            />

            <label htmlFor="phone">Celular</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(99) 99999-9999"
              required
            />

            <label htmlFor="address">Endereço de Entrega</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rua, número, bairro, cidade, estado"
              required
            />

            <button type="submit" disabled={loading} className="checkout-submit-btn">
              {loading ? "Processando..." : "Finalizar Compra"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
