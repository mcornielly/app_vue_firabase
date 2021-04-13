import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requireAuth: true }
  },
  {
    path: '/editar/:id',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/Edit.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/registro',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/ingreso',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.meta.requireAuth)
  if(to.meta.requireAuth) {
    if(store.getters.userAuth){
      next()
    }else{
      next('/ingreso')
    }
  }else{
    next()
  }   
})

export default router
