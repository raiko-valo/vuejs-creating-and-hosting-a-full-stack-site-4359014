import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import ShoppingCardPage from './pages/ShoppingCardPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PORJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

initializeApp(firebaseConfig);

createApp(App)
  .use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
      path: '/cart',
      component: ShoppingCardPage,
    },
    {
      path: '/products',
      component: ProductsPage,
    },
    {
      path: '/products/:productId',
      component: ProductDetailPage,
    },
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    } 
  ]}))
  .mount('#app')
