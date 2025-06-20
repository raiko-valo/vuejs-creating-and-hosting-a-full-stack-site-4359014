<template>
  <h1>Products</h1>
  <ProductsList :products="products" />
</template>

<script setup>
import axios from 'axios'
import ProductsList from '@/components/ProductsList.vue';
import { onBeforeMount, ref } from 'vue'

const products = ref([])

onBeforeMount(async () => {
  const response = await axios.get('/api/products')
  products.value = response?.data ?? []
})
</script>