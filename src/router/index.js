import { createRouter, createWebHistory } from 'vue-router'
import Home     from '../views/Home.vue'
import Login    from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile  from '../views/Profile.vue'
import Details  from '../views/Details.vue'
import { supabase } from '../services/supabase.js'

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
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guestOnly: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/detail/:id?',
      name: 'detail',
      component: Details,
    },
  ],
})

// Guard usando sesión real de Supabase
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const isLoggedIn = !!data.session

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'profile' })
  } else {
    next()
  }
})

export default router
