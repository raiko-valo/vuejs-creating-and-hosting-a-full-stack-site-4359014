<template>
  <div class="nav-bar">
    <router-link to="/products" class="products-link">
      <div class="logo-wrap">
        <img :src="logo">
      </div>
    </router-link>
    <div class="nav-buttons-wrap">
      <button v-if="props.user" @click="signOutUser ">Sign Out</button>
      <router-link to="/cart">
        <button>Shopping Cart</button>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { getAuth, signOut } from 'firebase/auth';
import logo from '@/assets/logo-hexagon.svg'

const props = defineProps({
  user: { default: null },
})

const signOutUser = () => {
  const auth = getAuth()
  signOut(auth)
}
</script>