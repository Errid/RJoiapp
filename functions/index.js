const functions = require("firebase-functions");
const mercadopago = require("mercadopago");

const {
  MP_ACCESS_TOKEN
} = import.meta.env;

// Configurar seu Access Token do Mercado Pago aqui
mercadopago.configurations.setAccessToken(MP_ACCESS_TOKEN);

// Função HTTP para criar a preferência
exports.createPreference = functions.https.onRequest(async (req, res) => {
  // Permitir CORS básico (libera para seu frontend)
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const items = req.body.items;

  const preference = {
    items: items.map((item) => ({
      title: item.name,
      unit_price: Number(item.price),
      quantity: Number(item.quantity),
    })),
    back_urls: {
      success: "https://seusite.com/success",
      failure: "https://seusite.com/failure",
      pending: "https://seusite.com/pending",
    },
    auto_return: "approved",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar preferência" });
  }
});
