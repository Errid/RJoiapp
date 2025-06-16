import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";

const Checkout = ({ cartItems }) => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const createPreference = async () => {
      try {
        const res = await axios.post("https://generatepixpayment-t5mjlbf24a-uc.a.run.app", {
          items: cartItems,
        });
        setPreferenceId(res.data.id);
      } catch (err) {
        console.error("Erro ao criar preferência:", err);
      }
    };

    createPreference();
  }, [cartItems]);

  return <CheckoutButton preferenceId={preferenceId} />;
};

export default Checkout;
