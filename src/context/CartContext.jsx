// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Cria o contexto do carrinho
const CartContext = createContext();

// 2. Cria o provedor do contexto do carrinho
export const CartProvider = ({ children }) => {
  // Inicializa o carrinho com dados do localStorage, se existirem
  // Isso garante que o carrinho persista mesmo após o usuário fechar e reabrir o navegador
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('rjoias_cart');
      // Tenta parsear os dados do localStorage. Se não houver, retorna um array vazio.
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      // Em caso de erro ao carregar (ex: dados corrompidos), loga o erro e retorna um carrinho vazio
      console.error("Erro ao carregar carrinho do localStorage:", error);
      return [];
    }
  });

  // Salva o carrinho no localStorage sempre que 'cartItems' mudar
  // O useEffect com 'cartItems' como dependência garante que esta função seja executada
  // toda vez que o estado 'cartItems' for atualizado.
  useEffect(() => {
    try {
      localStorage.setItem('rjoias_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Erro ao salvar carrinho no localStorage:", error);
    }
  }, [cartItems]); // A dependência [cartItems] faz com que o efeito seja re-executado quando cartItems muda

  // Função para adicionar um item ao carrinho
  const addItem = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Verifica se o produto já existe no carrinho
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Se o item já existe, atualiza a quantidade
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity } // Incrementa a quantidade
            : item // Mantém os outros itens inalterados
        );
      } else {
        // Se o item não existe, adiciona-o ao carrinho com a quantidade especificada
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Função para remover um item do carrinho
  const removeItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId) // Filtra para remover o item com o ID correspondente
    );
  };

  // Função para atualizar a quantidade de um item no carrinho
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      // Se a nova quantidade for 0 ou menos, remove o item do carrinho
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      // Caso contrário, atualiza a quantidade do item específico
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Função para limpar todo o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Função para obter o número total de itens (unidades) no carrinho
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Função para obter o preço total de todos os itens no carrinho
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // O provedor do contexto torna os valores e funções disponíveis para seus filhos
  return (
    <CartContext.Provider
      value={{
        cartItems,        // Array de itens no carrinho
        addItem,          // Função para adicionar item
        removeItem,       // Função para remover item
        updateQuantity,   // Função para atualizar quantidade
        clearCart,        // Função para limpar carrinho
        getTotalItems,    // Função para obter total de unidades
        getTotalPrice,    // Função para obter preço total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Hook customizado para usar o carrinho
// Este hook facilita o acesso aos valores do contexto em qualquer componente funcional
export const useCart = () => {
  const context = useContext(CartContext);
  // Garante que o hook seja usado dentro de um CartProvider
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
