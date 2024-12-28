/* eslint-disable no-unused-vars */
// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";


const API = "https://fakestoreapi.com/products"
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true initially to show loader

  useEffect(() => {
    // Fetch products only after the component mounts
    const fetchProducts = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
         setLoading(false); // Set loading to false if any error occurs
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProducts(); // Trigger the fetch on component mount
  }, []); // Empty dependency array to run only once on mount

  return (
    <div style={{ margin: '10px' }}>
      {/* <Typography variant="h4" gutterBottom align="center">
        Product List
      </Typography> */}
      
      {/* Backdrop and CircularProgress */}
      <Backdrop
        sx={{ color: "blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
      <CircularProgress sx={{ color: 'primary ' }} size={60} />
      </Backdrop>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
