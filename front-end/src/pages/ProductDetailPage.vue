<template>
  <div v-if="!product" >
    <NotFoundPage />
  </div>
  <div v-else>
    <div class="img-wrap">
      <img :src="`/${product.imageUrl}`"/>
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button @click="addToCart" :disabled="isDisabled" class="add-to-cart">{{ isDisabled ? "Item already in cart" : "Add to cart"}}</button>
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
const isDisabled = ref(false)

const addToCart = async () => {
  await axios.post('/api/users/0001/cart', {id: route.params.productId})
  alert('Item is added to cart!')
  isDisabled.value = true
}

onBeforeMount(async () => {
  const response = await axios.get(`/api/products/${route.params.productId}`)
  product.value = response?.data ?? null

  const cartResponse = await axios.get('/api/users/0001/cart')
  isDisabled.value = !!cartResponse?.data?.find(el => el.id == product.value.id)
})
</script>