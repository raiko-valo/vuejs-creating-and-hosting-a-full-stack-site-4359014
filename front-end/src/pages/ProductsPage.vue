<template>
  <h1>Products</h1>
  <ProductsList :products="products" />
</template>

<script setup>
import axios from 'axios'
import ProductsList from '@/components/ProductsList.vue';
import { onMounted, ref } from 'vue'

const products = ref([])

onMounted(async () => {
  const response = await axios.get('/api/products')
  products.value = response?.data ?? []
})
</script>