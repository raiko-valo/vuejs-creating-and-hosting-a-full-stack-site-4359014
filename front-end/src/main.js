import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import ShoppingCardPage from './pages/ShoppingCardPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'

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
    }]
  }))
  .mount('#app')
