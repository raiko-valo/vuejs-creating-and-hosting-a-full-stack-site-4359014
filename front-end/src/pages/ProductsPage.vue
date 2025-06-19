<template>
  <h1>Products</h1>
  <ProductsList :products="products" />
</template>

<script setup>
import ProductsList from '@/components/ProductsList.vue';
import { products } from '../temp-data'
</script>