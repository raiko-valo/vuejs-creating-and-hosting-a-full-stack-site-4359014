<template>
  <div v-for="product in props.products" :key="product.id" class="product-container">
    <img :src="product.imageName" class="product-image" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
    </div>
    <button class="remove-button">Remove from cart</button>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  products: { type: Array, default: () => [] },
})
</script>