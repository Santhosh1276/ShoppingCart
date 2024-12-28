/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const isInCart = cartItems?.some(item => item.id === product.id);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6">
          ₹{product.price}
        </Typography>
        <Button
          variant={isInCart ? "outlined" : "contained"}
          color={isInCart ? "secondary" : "primary"}
          onClick={() => isInCart ? removeFromCart(product.id) : addToCart(product)}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
