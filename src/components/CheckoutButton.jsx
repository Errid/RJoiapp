import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';

const {
  PUBLIC_KEY
} = import.meta.env;

const CheckoutButton = ({ preferenceId }) => {
  useEffect(() => {
    initMercadoPago('PUBLIC_KEY');
  }, []);

  return (
    <div>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
};

export default CheckoutButton;
