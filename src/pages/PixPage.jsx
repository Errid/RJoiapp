// src/pages/PixPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PixPage.css'; // Vamos criar este CSS

function PixPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Obtém os dados do PIX passados via state da navegação
  const { pixCode, qrCodeImage } = location.state || {}; // Desestrutura com fallback para evitar erros

  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    // Redireciona se não houver dados PIX (acesso direto à página)
    if (!pixCode || !qrCodeImage) {
      alert('Nenhum dado PIX encontrado. Por favor, finalize a compra novamente.');
      navigate('/carrinho'); // Ou para a página de checkout
    }
  }, [pixCode, qrCodeImage, navigate]);

  const handleCopyToClipboard = () => {
    // Usa document.execCommand para compatibilidade com iframes
    const tempInput = document.createElement('textarea');
    tempInput.value = pixCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      setCopySuccess('Copiado!');
    } catch (err) {
      setCopySuccess('Erro ao copiar.');
    }
    document.body.removeChild(tempInput);

    setTimeout(() => setCopySuccess(''), 2000); // Limpa a mensagem após 2 segundos
  };

  if (!pixCode || !qrCodeImage) {
    return (
      <div className="page-content pix-page-container">
        <p>Carregando informações do PIX...</p>
      </div>
    );
  }

  return (
    <div className="page-content pix-page-container">
      <h2>Pagamento via PIX</h2>
      <p className="pix-instruction">Escaneie o QR Code ou copie o código PIX para finalizar seu pagamento.</p>

      <div className="pix-qr-code-container">
        <img src={qrCodeImage} alt="QR Code PIX" className="pix-qr-code" />
      </div>

      <div className="pix-code-copy-container">
        <p className="pix-code-label">Código PIX Copia e Cola:</p>
        <div className="pix-code-input-group">
          <input type="text" value={pixCode} readOnly className="pix-code-input" />
          <button onClick={handleCopyToClipboard} className="copy-pix-btn">
            {copySuccess || 'Copiar Código'}
          </button>
        </div>
      </div>

      <p className="pix-warning">O pagamento deve ser realizado em até **10 minutos**.</p>
      <p className="pix-info">Após o pagamento, seu pedido será automaticamente confirmado.</p>

      <div className="pix-actions">
        <button onClick={() => navigate('/produtos')} className="back-to-products-btn">
          Voltar para Produtos
        </button>
        {/* Em um cenário real, você pode ter um botão para "Ver Meus Pedidos" */}
      </div>
    </div>
  );
}

export default PixPage;
