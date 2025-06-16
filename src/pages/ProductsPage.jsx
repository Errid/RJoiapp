// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';
import '../ProductCard.css';

import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsCollectionRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollectionRef);

        const productsList = productsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            price: parseFloat(data.price) // CONVERTE O PREÇO PARA NÚMERO AQUI
          };
        });

        setProducts(productsList);
      } catch (err) {
        console.error("Erro ao buscar produtos do Firebase:", err);
        setError("Erro ao carregar produtos. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="page-content products-page-container">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content products-page-container error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-content products-page-container">
      <h2>Nossos Produtos</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
