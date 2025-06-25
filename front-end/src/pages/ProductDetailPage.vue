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
      <button v-if="props.user" @click="addToCart" :disabled="isDisabled" class="add-to-cart">{{ isDisabled ? "Item already in cart" : "Add to cart"}}</button>
      <button v-if="!props.user" @click="signIn" class="sign-in">Sign in to add to cart</button>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { onBeforeMount, ref, defineProps, watch } from 'vue'
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import NotFoundPage from './NotFoundPage.vue';

const route = useRoute()
const product = ref(null)
const isDisabled = ref(false)

const props = defineProps({
  user: { default: null },
})

const addToCart = async () => {
  await axios.post(`/api/users/${props.user.uid}/cart`, {id: route.params.productId})
  alert('Item is added to cart!')
  isDisabled.value = true
}

const signIn = async () => {
  const email = prompt('Please enter your email to sign in:')
  const auth = getAuth()
  const actionCodeSettings = {
    url: `https://full-stack-vue-course-0001.onrender.com/products/${route.params.productId}`,
    handleCodeInApp: true,
  }
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  alert('A login link was set to the email you provided')
  window.localStorage.setItem('signInEmail', email)
}

onBeforeMount(async () => {
  const auth = getAuth()
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem('signInEmail')
    await signInWithEmailLink(auth, email, window.location.href)
    alert('Successfully signed in!')
    window.localStorage.removeItem('signInEmail')
  }

  const response = await axios.get(`/api/products/${route.params.productId}`)
  product.value = response?.data ?? null

  if (props.user) {
    const cartResponse = await axios.get(`/api/users/${props.user.uid}/cart`)
    isDisabled.value = !!cartResponse?.data?.find(el => el.id == product.value.id)
  }
})

watch(props.user, async (newVal) => {
  if (newVal) {
    const cartResponse = await axios.get(`/api/users/${newVal.uid}/cart`)
    isDisabled.value = !!cartResponse?.data?.find(el => el.id == product.value.id)
  }
})
</script>