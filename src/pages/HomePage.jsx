// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // CERTIFIQUE-SE DE QUE ESTA LINHA ESTÁ PRESENTE E CORRETA

function HomePage() {
  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">RJoias: Onde a Elegância Encontra a Eternidade.</h1>
          <p className="hero-subtitle">Descubra peças exclusivas que celebram momentos únicos.</p>
          {/* CONFIRME QUE O BOTÃO TEM AS CLASSES modern-btn E primary */}
          <Link to="/produtos" className="modern-btn primary">Ver Coleção</Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
