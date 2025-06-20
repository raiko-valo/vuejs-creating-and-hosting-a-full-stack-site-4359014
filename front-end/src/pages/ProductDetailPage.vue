<template>
  <div v-if="!product" >
    <NotFoundPage />
  </div>
  <div v-else>
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button class="add-to-cart">Add to cart</button>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import NotFoundPage from './NotFoundPage.vue';

const route = useRoute()
const product = ref(null)

onBeforeMount(async () => {
  const response = await axios.get(`/api/products/${route.params.productId}`)
  product.value = response?.data ?? null
})
</script>