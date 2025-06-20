<template>
  <h1>Shopping card</h1>
  <div v-if="products.length > 0">
    <ShoppingCartList :products="products" :on-remove="onRemove" />
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-else>
    You currently have no items in your cart!
  </div>
</template>

<script setup>
import axios from 'axios'
import ShoppingCartList from '@/components/ShoppingCartList.vue'
import { onBeforeMount, ref } from 'vue'

const products = ref([])

const onRemove = async (id) => {
  const response = await axios.delete(`/api/users/0001/cart/${id}`)
  products.value = response?.data ?? []
}

onBeforeMount(async () => {
  const response = await axios.get('/api/users/0001/cart')
  products.value = response?.data ?? []
})
</script>