/**
 * authService.js
 * Capa de servicio — solo habla con Supabase.
 * No sabe nada de Vue ni del estado de la app.
 */
import { supabase } from './supabase.js'

export const authService = {

  /**
   * Iniciar sesión con email y contraseña
   * Lanza un error si las credenciales son incorrectas
   */
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data.user
  },

  /**
   * Registrar nuevo usuario
   * Guarda el nombre en los metadatos del usuario
   */
  async register(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })
    if (error) throw error
    return data.user
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  /**
   * Obtener la sesión activa al cargar la app
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  /**
   * Escuchar cambios de autenticación en tiempo real
   * (login, logout, expiración de token)
   */
  onAuthChange(callback) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null)
    })
  },
}
