/**
 * favoritosService.js
 * Operaciones de favoritos del usuario autenticado.
 */
import { supabase } from './supabase.js'

export const favoritosService = {

  /**
   * Obtener todos los favoritos del usuario actual
   */
  async getByUser(userId) {
    const { data, error } = await supabase
      .from('favoritos')
      .select('*, emprendimientos(*)')
      .eq('user_id', userId)

    if (error) throw error
    return data
  },

  /**
   * Agregar un emprendimiento a favoritos
   */
  async add(userId, emprendimientoId) {
    const { data, error } = await supabase
      .from('favoritos')
      .insert({ user_id: userId, emprendimiento_id: emprendimientoId })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Quitar un emprendimiento de favoritos
   */
  async remove(userId, emprendimientoId) {
    const { error } = await supabase
      .from('favoritos')
      .delete()
      .eq('user_id', userId)
      .eq('emprendimiento_id', emprendimientoId)

    if (error) throw error
  },

  /**
   * Verificar si un emprendimiento ya está en favoritos
   */
  async isFavorite(userId, emprendimientoId) {
    const { data, error } = await supabase
      .from('favoritos')
      .select('id')
      .eq('user_id', userId)
      .eq('emprendimiento_id', emprendimientoId)
      .single()

    if (error) return false
    return !!data
  },
}
