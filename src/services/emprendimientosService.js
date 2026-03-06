/**
 * emprendimientosService.js
 * Todas las operaciones de emprendimientos contra Supabase.
 * Los componentes Vue solo llaman estas funciones, nunca Supabase directamente.
 */
import { supabase } from './supabase.js'

export const emprendimientosService = {

  /**
   * Obtener todos los emprendimientos
   * Opcionalmente filtrar por categoría o búsqueda
   */
  async getAll({ search = '', category = '' } = {}) {
    let query = supabase
      .from('emprendimientos')
      .select('*')
      .order('created_at', { ascending: false })

    if (category && category !== 'Todos') {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  /**
   * Obtener un emprendimiento por ID
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('emprendimientos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Crear un nuevo emprendimiento (requiere estar autenticado)
   */
  async create(emprendimiento) {
    const { data, error } = await supabase
      .from('emprendimientos')
      .insert(emprendimiento)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Obtener las categorías únicas disponibles
   */
  async getCategories() {
    const { data, error } = await supabase
      .from('emprendimientos')
      .select('category')

    if (error) throw error

    const unique = [...new Set(data.map(e => e.category).filter(Boolean))]
    return ['Todos', ...unique]
  },
}
