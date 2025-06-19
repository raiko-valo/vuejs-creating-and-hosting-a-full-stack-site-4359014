<template>
  <div v-if="!product" >
    <NotFoundPage />
  </div>
  <div v-else>
    <div class="img-wrap">
      <img :src="product.imageName" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button class="add-to-cart">Add to cart</button>
    </div>
  </div>

</template>

<script setup>
import { useRoute } from 'vue-router';
import { products } from '../temp-data'
import NotFoundPage from './NotFoundPage.vue';

const route = useRoute()
const product = products.find(item => item.id === route.params.productId) ?? null
</script>