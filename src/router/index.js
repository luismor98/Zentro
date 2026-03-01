import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Details from '../views/Details.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // Accesible para todos (visitantes y usuarios)
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guestOnly: true }, // Solo para no autenticados
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guestOnly: true }, // Solo para no autenticados
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }, // Solo para autenticados
    },
    {
      path: '/detail/:id?',
      name: 'detail',
      component: Details,
      // Accesible para todos
    },
  ],
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const saved = localStorage.getItem('zentro_user')
  const isLoggedIn = !!saved

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirigir al login si intenta acceder a ruta protegida
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && isLoggedIn) {
    // Si ya está logueado, redirigir al perfil
    next({ name: 'profile' })
  } else {
    next()
  }
})

export default router
