/**
 * auth.js — Store de autenticación
 * Maneja el estado global del usuario.
 * Usa authService para hablar con Supabase.
 */
import { reactive, readonly } from 'vue'
import { authService } from '../services/authService.js'

const state = reactive({
  user:       null,
  isLoggedIn: false,
  loading:    true,   // true mientras se verifica la sesión inicial
})

// Al cargar la app, escuchar cambios de sesión en tiempo real
// Esto maneja: login, logout, expiración de token automáticamente
authService.onAuthChange((user) => {
  state.user      = user
  state.isLoggedIn = !!user
  state.loading   = false
})

export function useAuth() {

  async function login(email, password) {
    const user = await authService.login(email, password)
    state.user      = user
    state.isLoggedIn = true
    return user
  }

  async function register(name, email, password) {
    const user = await authService.register(name, email, password)
    return user
  }

  async function logout() {
    await authService.logout()
    state.user      = null
    state.isLoggedIn = false
  }

  return {
    user:     readonly(state),
    login,
    register,
    logout,
  }
}
