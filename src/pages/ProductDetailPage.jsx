// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react'; // Corrigido: '=>' foi trocado por 'from'
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const productDocRef = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productDocRef);

        if (productSnapshot.exists()) {
          const data = productSnapshot.data();
          setProduct({
            id: productSnapshot.id,
            ...data,
            price: parseFloat(data.price) // CONVERTE O PREÇO PARA NÚMERO AQUI
          });
        } else {
          navigate('/produtos');
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes do produto do Firebase:", err);
        setError("Erro ao carregar detalhes do produto. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  if (loading) {
    return (
      <div className="page-content product-detail-container">
        <p>Carregando detalhes do produto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content product-detail-container error-message">
        <p>{error}</p>
        <button onClick={() => navigate('/produtos')}>Voltar para Produtos</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-content product-detail-container">
        <p>Produto não encontrado.</p>
        <button onClick={() => navigate('/produtos')}>Voltar para Produtos</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  return (
    <div className="page-content product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-image-gallery">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/400x400?text=Sem+Imagem'}
            alt={product.name}
            className="product-detail-main-image"
          />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">R$ {product.price.toFixed(2).replace('.', ',')}</p>
          <div className="product-detail-description">
            <h3>Descrição:</h3>
            <p>{product.description}</p>
          </div>
          <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </button>
          {showAddedMessage && (
            <span className="added-to-cart-feedback">Adicionado!</span>
          )}
          <button className="back-to-products-btn" onClick={() => navigate('/produtos')}>
            Voltar para Produtos
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
