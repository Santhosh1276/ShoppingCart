/* eslint-disable no-unused-vars */
// src/pages/CartPage.js
import React from 'react';
import { Box, Grid, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  // Calculate the total price
  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total - total * 0.1; // Apply 10% discount
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f6f8' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Render each cart item */}
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: '10px' }}>
                    ₹{item.price} x {item.quantity}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', padding: '10px' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Display the total */}
      {cartItems.length > 0 && (
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Total: ₹{calculateTotal().toFixed(2)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
