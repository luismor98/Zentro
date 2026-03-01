import { reactive, readonly } from 'vue'

// Estado global de autenticación
const state = reactive({
  user: null,
  isLoggedIn: false,
})

// Cargar sesión guardada al iniciar
const saved = localStorage.getItem('zentro_user')
if (saved) {
  state.user = JSON.parse(saved)
  state.isLoggedIn = true
}

export function useAuth() {
  function login(userData) {
    state.user = userData
    state.isLoggedIn = true
    localStorage.setItem('zentro_user', JSON.stringify(userData))
  }

  function logout() {
    state.user = null
    state.isLoggedIn = false
    localStorage.removeItem('zentro_user')
  }

  function register(userData) {
    // Aquí conectarás con tu backend en el futuro
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      avatar: null,
      verified: false,
      createdAt: new Date().toISOString(),
    }
    login(newUser)
    return newUser
  }

  return {
    user: readonly(state),
    login,
    logout,
    register,
  }
}
