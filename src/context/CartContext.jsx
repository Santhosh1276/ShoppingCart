/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
// src/context/CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

// Initial state
const initialState = {
  cartItems: [],
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if item is already in the cart
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        // Update quantity if the item is already in the cart
        const updatedCart = [...state.cartItems];
        updatedCart[itemIndex].quantity += 1;
        return { ...state, cartItems: updatedCart };
      }
      // Add the item to the cart if not already present
      return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    default:
      return state;
  }
};

// CartContext
const CartContext = createContext();

// Custom hook to access the context
export const useCart = () => useContext(CartContext);

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
  };

  // Increase item quantity
  const increaseQuantity = (id) => {
    dispatch({ type: INCREASE_QUANTITY, payload: { id } });
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    dispatch({ type: DECREASE_QUANTITY, payload: { id } });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
