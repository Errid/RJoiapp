require("dotenv").config();

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();

app.use(cors({ 
  origin: true,
  methods:['GET','POST','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization'],
 }));

app.use(express.json());

// ** MUDANÇA AQUI **
// Agora, o token é lido de process.env, que foi populado pelo dotenv.
// Para produção, ele lerá a variável configurada no ambiente do Firebase.
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || functions.config().mercadopago.accesstoken,
});

app.options("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "https://joia-app.vercel.app");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Max-Age", "3600");
  return res.status(204).send("");
});


app.post("/", async (req, res) => {
  try {
    const { items } = req.body;
    res.set("Access-Control-Allow-Origin", "https://joia-app.vercel.app");
    res.status(201).json({ id: result.id });

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "O carrinho está vazio." });
    }

    const body = {
      items: items.map(item => ({
        title: item.name,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: "BRL",
      })),
      back_urls: {
        success: "https://seu-site.com/sucesso",
        failure: "https://seu-site.com/falha",
        pending: "",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.status(201).json({ id: result.id });
  } catch (error) {
    res.set("Access-Control-Allow-Origin", "https://joia-app.vercel.app");
    res.status(500).json({ error: "Falha ao criar preferência." });
    console.error("Erro no servidor ao criar preferência:", error);
    res.status(500).json({ error: "Falha ao criar preferência." });
  }
});

exports.createPreference = functions.https.onRequest(app);