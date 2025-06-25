<template>
  <NavBar :user="authUser" />
  <div class="page-wrap">
    <router-view :user="authUser"></router-view>
  </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref } from 'vue';

const authUser = ref(null)

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, user => {
    authUser.value = user
  })
})
</script>
