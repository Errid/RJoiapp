// src/components/CheckoutButton.jsx
import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializa o Mercado Pago usando a chave do seu arquivo .env
initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

const CheckoutButton = ({ preferenceId }) => {
  if (!preferenceId) {
    return null; // Não mostra nada se a preferência ainda não foi criada
  }

  return (
    <div className="checkout-button-container">
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        customization={{ texts: { valueProp: 'smart_option' } }}
      />
    </div>
  );
};

export default CheckoutButton;