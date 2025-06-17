<template>
  <h1>Products</h1>
  <div class="grid-wrap">
    <div v-for="product in products" :key="product.key" class="product-item">
      <img :src="product.imageName"/>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <button>View Details</button>
    </div>
  </div>
</template>

<script setup>
import { products } from '../temp-data'


</script>