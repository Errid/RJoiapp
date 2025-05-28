// src/pages/ContactPage.jsx
import React from 'react';
import './ContactPage.css'; // Importa os estilos CSS para a página de contato

function ContactPage() {
  return (
    <div className="page-content contact-page-container">
      <h2>Entre em Contato</h2>
      <p>Estamos aqui para ajudar com qualquer dúvida ou solicitação que você possa ter.</p>

      <div className="contact-info">
        <h3>Nossos Contatos</h3>
        <p><strong>Telefone:</strong> (XX) XXXX-XXXX</p>
        <p><strong>Email:</strong> contato@rjoias.com.br</p>
        <p><strong>Endereço:</strong> Rua das Joias, 123, Centro - Cidade, Estado</p>
        <p><strong>Horário de Atendimento:</strong> Segunda a Sexta, das 9h às 18h</p>
      </div>

    </div>
  );
}

export default ContactPage;
