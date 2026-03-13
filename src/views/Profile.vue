<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth.js'
import { emprendimientosService } from '../services/emprendimientosService.js'
import { favoritosService } from '../services/favoritosService.js'

const router = useRouter()
const { user, logout } = useAuth()

const activeTab        = ref('favoritos')
const sidebarCollapsed = ref(false)

// ── Emprendimientos del usuario ──
const misEmprendimientos = ref([])
const loadingEmpr        = ref(false)

// ── Favoritos ──
const misFavoritos  = ref([])
const loadingFavs   = ref(false)

async function cargarMisEmprendimientos() {
  if (!user.user?.id) return
  loadingEmpr.value = true
  try {
    const todos = await emprendimientosService.getAll()
    misEmprendimientos.value = todos.filter(e => e.owner_id === user.user.id)
  } catch (e) {
    console.error('Error cargando emprendimientos:', e)
  } finally {
    loadingEmpr.value = false
  }
}

async function cargarMisFavoritos() {
  if (!user.user?.id) return
  loadingFavs.value = true
  try {
    const data = await favoritosService.getByUser(user.user.id)
    misFavoritos.value = data.map(f => f.emprendimientos).filter(Boolean)
  } catch (e) {
    console.error('Error cargando favoritos:', e)
  } finally {
    loadingFavs.value = false
  }
}

async function quitarFavorito(empId) {
  try {
    await favoritosService.remove(user.user.id, empId)
    misFavoritos.value = misFavoritos.value.filter(e => e.id !== empId)
  } catch (e) {
    console.error('Error al quitar favorito:', e)
  }
}

onMounted(() => {
  cargarMisEmprendimientos()
  cargarMisFavoritos()
})

const bannerColors = [
  { label: 'Navy',    value: 'linear-gradient(135deg, #170453 0%, #2a0d8f 100%)' },
  { label: 'Naranja', value: 'linear-gradient(135deg, #FF6100 0%, #ffaa00 100%)' },
  { label: 'Verde',   value: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)' },
  { label: 'Rojo',    value: 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)' },
  { label: 'Gris',    value: 'linear-gradient(135deg, #1f2937 0%, #6b7280 100%)' },
]

const categorias = [
  'Alimentos', 'Moda', 'Tecnología', 'Salud', 'Ferretería',
  'Automotriz', 'Cafetería', 'Jardín', 'Fotografía', 'Servicio', 'Otro'
]

const selectedBanner  = ref(bannerColors[0].value)
const showColorPicker = ref(false)

// ── Datos geográficos de Trujillo ──
const municipiosParroquias = {
  'Valera':                 ['La Beatriz', 'Matriz', 'Mercedes Díaz', 'Mendoza Fría', 'Santa Apolonia', 'Mendoza'],
  'Boconó':                 ['Ayacucho', 'Burbusay', 'General Rivas', 'Guaramacal', 'Mosquey', 'Córdoba', 'San José', 'San Luis', 'San Miguelito', 'Tostós'],
  'Trujillo':               ['Carmona', 'Chiquinquirá', 'La Paz', 'Monaí', 'Pampán', 'Santa Isabel'],
  'Pampán':                 ['Carvajal', 'Pampán'],
  'Pampanito':              ['Pampanito', 'Sabana Libre'],
  'Escuque':                ['Escuque', 'La Concepción', 'Montaña Verde', 'Sabana de Mendoza', 'Santa Cruz del Mora'],
  'Motatán':                ['El Paraíso', 'Motatán'],
  'Miranda':                ['El Dividive', 'Tuñame'],
  'Urdaneta':               ['Betijoque', 'Chejendé'],
  'La Ceiba':               ['La Ceiba'],
  'Carache':                ['Carache', 'Cuicas', 'El Amparo', 'La Concepción'],
  'Sucre':                  ['Carvajal', 'La Quebrada'],
  'Andrés Bello':           ['La Quebrada', 'Santa Apolonia'],
  'San Rafael de Carvajal': ['Agua Santa', 'Carvajal'],
  'Campo Elías':            ['Cabimbú', 'Mendoza'],
  'Monte Carmelo':          ['Monte Carmelo', 'San José'],
  'Márquez Cañizales':      ['San Lázaro'],
  'Canaguá':                ['Canaguá', 'El Hato'],
  'Rangel':                 ['Betijoque', 'Flor de Patria'],
  'Juan Vicente Campo Elías': ['Sabana Grande', 'Jalisco'],
}

const municipios = Object.keys(municipiosParroquias)

// ── Prefijos telefónicos ──
const prefijos = [
  { label: '0412 - Digitel',  value: '0412' },
  { label: '0422 - Digitel',  value: '0422' },
  { label: '0414 - Movistar', value: '0414' },
  { label: '0424 - Movistar', value: '0424' },
  { label: '0416 - Movilnet', value: '0416' },
  { label: '0426 - Movilnet', value: '0426' },
  { label: '0271 - CANTV', value: '0271' },
]

// ── Días de la semana ──
const diasSemana = [
  { key: 'lun', label: 'Lun' },
  { key: 'mar', label: 'Mar' },
  { key: 'mie', label: 'Mié' },
  { key: 'jue', label: 'Jue' },
  { key: 'vie', label: 'Vie' },
  { key: 'sab', label: 'Sáb' },
  { key: 'dom', label: 'Dom' },
]

// ── Estado del modal ──
const showModal   = ref(false)
const editingId   = ref(null)
const saving      = ref(false)
const saveError   = ref('')
const saveSuccess = ref(false)

// ── Modal eliminar ──
const showDeleteConfirm = ref(false)
const deletingId        = ref(null)
const deletingName      = ref('')
const deleting          = ref(false)

// ── Formulario extendido ──
const form = ref({
  name: '', category: '', description: '', image_url: ''
})
const addrMunicipio  = ref('')
const addrParroquia  = ref('')
const addrReferencia = ref('')
const phonePrefix    = ref('0414')
const phoneNumber    = ref('')
const selectedDays   = ref([])
const openTime       = ref('08:00')
const closeTime      = ref('18:00')

const parroquias = computed(() =>
  addrMunicipio.value ? municipiosParroquias[addrMunicipio.value] : []
)

const descCount = computed(() => form.value.description?.length || 0)

// ── Helpers para formatear horario ──
function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h12  = hour % 12 || 12
  return `${h12}:${m} ${ampm}`
}

function buildSchedule() {
  if (!selectedDays.value.length) return ''
  const dias = diasSemana
    .filter(d => selectedDays.value.includes(d.key))
    .map(d => d.label)
    .join(', ')
  return `${dias}: ${formatTime(openTime.value)} – ${formatTime(closeTime.value)}`
}

function buildAddress() {
  const parts = []
  if (addrMunicipio.value)  parts.push(`Municipio ${addrMunicipio.value}`)
  if (addrParroquia.value)  parts.push(`Parroquia ${addrParroquia.value}`)
  if (addrReferencia.value) parts.push(addrReferencia.value)
  return parts.join(', ')
}

function buildPhone() {
  if (!phoneNumber.value) return ''
  return `${phonePrefix.value}-${phoneNumber.value}`
}

// ── Parsear datos existentes al editar ──
function parseExisting(emp) {
  // Dirección
  addrMunicipio.value  = ''
  addrParroquia.value  = ''
  addrReferencia.value = emp.address || ''

  // Teléfono
  if (emp.phone) {
    const match = emp.phone.match(/^(0\d{3})-?(.+)$/)
    if (match) {
      phonePrefix.value = match[1]
      phoneNumber.value = match[2]
    } else {
      phoneNumber.value = emp.phone
    }
  } else {
    phonePrefix.value = '0414'
    phoneNumber.value = ''
  }

  // Horario — si el formato es "Lun, Mar: 8:00 AM – 6:00 PM" intentamos parsear
  selectedDays.value = []
  openTime.value  = '08:00'
  closeTime.value = '18:00'
}

function resetForm() {
  form.value = { name: '', category: '', description: '', image_url: '' }
  addrMunicipio.value  = ''
  addrParroquia.value  = ''
  addrReferencia.value = ''
  phonePrefix.value    = '0414'
  phoneNumber.value    = ''
  selectedDays.value   = []
  openTime.value       = '08:00'
  closeTime.value      = '18:00'
}

function openModal(emp = null) {
  saveError.value   = ''
  saveSuccess.value = false
  if (emp) {
    editingId.value = emp.id
    form.value = {
      name: emp.name || '', category: emp.category || '',
      description: emp.description || '', image_url: emp.image_url || ''
    }
    parseExisting(emp)
  } else {
    editingId.value = null
    resetForm()
  }
  showModal.value = true
}

function openDeleteConfirm(emp) {
  deletingId.value        = emp.id
  deletingName.value      = emp.name
  showDeleteConfirm.value = true
}

async function submitForm() {
  if (!form.value.name || !form.value.category) {
    saveError.value = 'El nombre y la categoría son obligatorios.'
    return
  }
  if (!form.value.description || form.value.description.length < 20) {
    saveError.value = 'La descripción debe tener al menos 20 caracteres.'
    return
  }
  saving.value    = true
  saveError.value = ''
  try {
    const payload = {
      ...form.value,
      address:  buildAddress(),
      phone:    buildPhone(),
      schedule: buildSchedule(),
    }
    if (editingId.value) {
      await emprendimientosService.update(editingId.value, payload)
    } else {
      await emprendimientosService.create({
        ...payload,
        owner_id: user.user.id,
        verified: false,
      })
    }
    saveSuccess.value = true
    await cargarMisEmprendimientos()
    setTimeout(() => { showModal.value = false }, 1200)
  } catch (e) {
    saveError.value = 'Error al guardar. Intenta de nuevo.'
  } finally {
    saving.value = false
  }
}

async function confirmDelete() {
  deleting.value = true
  try {
    await emprendimientosService.delete(deletingId.value)
    showDeleteConfirm.value = false
    await cargarMisEmprendimientos()
  } catch (e) {
    console.error('Error al eliminar:', e)
  } finally {
    deleting.value = false
  }
}

const displayName = computed(() =>
  user.user?.user_metadata?.name || user.user?.email?.split('@')[0] || 'Usuario'
)

const initials = computed(() =>
  displayName.value.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
)

const memberSince = computed(() => {
  if (!user.user?.created_at) return ''
  return new Date(user.user.created_at).toLocaleDateString('es-VE', {
    year: 'numeric', month: 'long'
  })
})

const isVerified = computed(() => user.user?.user_metadata?.verified)

async function handleLogout() {
  await logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="profile-page" :class="{ 'sidebar-collapsed': sidebarCollapsed }">

    <!-- ══ Sidebar ══ -->
    <aside class="sidebar">
      <div class="sidebar-top">
        <router-link to="/" class="sidebar-logo">
          <span class="logo-z">Z</span>
          <span class="logo-rest">entro</span>
        </router-link>
        <!-- Hamburguesa -->
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed"
          :title="sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'">
          <i class="fa-solid" :class="sidebarCollapsed ? 'fa-chevron-right' : 'fa-bars'"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/" class="nav-item">
          <i class="fa-regular fa-house"></i>
          <span class="nav-label">Inicio</span>
        </router-link>
        <router-link to="/profile" class="nav-item">
          <i class="fa-regular fa-user"></i>
          <span class="nav-label">Mi Perfil</span>
        </router-link>
        <a href="#" class="nav-item">
          <i class="fa-regular fa-heart"></i>
          <span class="nav-label">Favoritos</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span class="nav-label">Explorar</span>
        </a>
        <!-- Ajustes movido al sidebar -->
        <a href="#" class="nav-item" :class="{ active: activeTab === 'ajustes' }"
          @click.prevent="activeTab = 'ajustes'">
          <i class="fa-solid fa-sliders"></i>
          <span class="nav-label">Ajustes</span>
        </a>
      </nav>

      <button class="logout-btn" @click="handleLogout">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span class="nav-label">Cerrar sesión</span>
      </button>
    </aside>

    <!-- ══ Contenido principal ══ -->
    <main class="profile-main">
      <div class="profile-container">

        <!-- Banner con selector de color -->
        <div class="profile-banner" :style="{ background: selectedBanner }">
          <button class="color-picker-btn" @click="showColorPicker = !showColorPicker"
            title="Cambiar color de fondo">
            <i class="fa-solid fa-palette"></i>
          </button>

          <div class="color-picker" v-if="showColorPicker">
            <p class="color-picker-label">Color del banner</p>
            <div class="color-options">
              <button
                v-for="color in bannerColors" :key="color.value"
                class="color-swatch"
                :style="{ background: color.value }"
                :class="{ active: selectedBanner === color.value }"
                @click="selectedBanner = color.value; showColorPicker = false"
                :title="color.label"
              >
                <i v-if="selectedBanner === color.value" class="fa-solid fa-check"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Info del usuario centrada -->
        <div class="profile-info-center">
          <div class="avatar-wrapper">
            <div class="avatar-ring" :style="{ background: selectedBanner }">
              <div class="avatar-circle">
                <span class="avatar-initial">{{ initials }}</span>
              </div>
            </div>
            <button class="avatar-edit-btn" aria-label="Cambiar foto">
              <i class="fa-solid fa-camera"></i>
            </button>
          </div>

          <div class="name-wrapper">
            <h1 class="user-name">{{ displayName }}</h1>
          </div>

          <div class="badges-row">
            <span class="badge-verified" v-if="isVerified">
              <i class="fa-solid fa-circle-check"></i> Usuario Verificado
            </span>
            <span class="badge-pending" v-else>
              <i class="fa-regular fa-clock"></i> Pendiente de verificación
            </span>
          </div>

          <p class="user-since" v-if="memberSince">Miembro desde {{ memberSince }}</p>

          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-number">{{ misEmprendimientos.length }}</span>
              <span class="stat-label">Emprendimientos</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">{{ misFavoritos.length }}</span>
              <span class="stat-label">Favoritos</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">0</span>
              <span class="stat-label">Reseñas</span>
            </div>
          </div>
        </div>

        <!-- Card ¿Tienes un emprendimiento? -->
        <div class="seller-card">
          <div class="seller-card-left">
            <div class="seller-icon">
              <i class="fa-solid fa-store"></i>
            </div>
            <div>
              <h3>¿Tienes un emprendimiento?</h3>
              <p>Hazlo visible para toda la comunidad de Valera</p>
            </div>
          </div>
          <button class="btn-seller" @click="openModal">Activar Modo Vendedor</button>
        </div>

        <!-- Tabs -->
        <div class="tabs-wrapper">
          <div class="tabs-header">
            <button class="tab-btn" :class="{ active: activeTab === 'emprendimientos' }" @click="activeTab = 'emprendimientos'">
              <i class="fa-solid fa-store"></i> Mis Negocios
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'favoritos' }" @click="activeTab = 'favoritos'">
              <i class="fa-regular fa-heart"></i> Favoritos
            </button>
          </div>

          <!-- Tab: Mis Emprendimientos -->
          <div v-if="activeTab === 'emprendimientos'" class="tab-content">
            <div v-if="loadingEmpr" class="empty-state">
              <i class="fa-solid fa-spinner fa-spin"></i>
              <p>Cargando...</p>
            </div>
            <div v-else-if="misEmprendimientos.length === 0" class="empty-state">
              <div class="empty-icon"><i class="fa-solid fa-store"></i></div>
              <h3>Aún no tienes negocios registrados</h3>
              <p>Haz clic en "Activar Modo Vendedor" para registrar tu emprendimiento.</p>
            </div>
            <div v-else class="empr-list">
              <div v-for="emp in misEmprendimientos" :key="emp.id" class="empr-item">
                <div class="empr-img-side">
                  <img v-if="emp.image_url" :src="emp.image_url" :alt="emp.name" class="empr-img" />
                  <div v-else class="empr-img-placeholder">
                    <i class="fa-regular fa-store"></i>
                  </div>
                </div>
                <div class="empr-info">
                  <div class="empr-top">
                    <h4 class="empr-name">{{ emp.name }}</h4>
                    <span class="empr-badge" :class="emp.verified ? 'verified' : 'pending'">
                      <i :class="emp.verified ? 'fa-solid fa-circle-check' : 'fa-regular fa-clock'"></i>
                      {{ emp.verified ? 'Verificado' : 'En revisión' }}
                    </span>
                  </div>
                  <span class="empr-category">{{ emp.category }}</span>
                  <p class="empr-desc">{{ emp.description }}</p>
                  <div class="empr-actions">
                    <router-link :to="`/detail/${emp.id}`" class="empr-btn-ver">
                      Ver negocio <i class="fa-solid fa-arrow-right"></i>
                    </router-link>
                    <button class="empr-btn-edit" @click="openModal(emp)">
                      <i class="fa-regular fa-pen-to-square"></i> Editar
                    </button>
                    <button class="empr-btn-delete" @click="openDeleteConfirm(emp)">
                      <i class="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab: Favoritos -->
          <div v-if="activeTab === 'favoritos'" class="tab-content">
            <div v-if="loadingFavs" class="empty-state">
              <i class="fa-solid fa-spinner fa-spin"></i>
              <p>Cargando favoritos...</p>
            </div>
            <div v-else-if="misFavoritos.length === 0" class="empty-state">
              <div class="empty-icon"><i class="fa-regular fa-heart"></i></div>
              <h3>Aún no tienes favoritos</h3>
              <p>Guarda los negocios que más te gusten para encontrarlos rápido.</p>
              <router-link to="/" class="btn-explore">
                <i class="fa-solid fa-magnifying-glass"></i>
                Explorar emprendimientos
              </router-link>
            </div>
            <div v-else class="empr-list">
              <div v-for="emp in misFavoritos" :key="emp.id" class="empr-item">
                <div class="empr-img-side">
                  <img v-if="emp.image_url" :src="emp.image_url" :alt="emp.name" class="empr-img" />
                  <div v-else class="empr-img-placeholder"><i class="fa-regular fa-store"></i></div>
                </div>
                <div class="empr-info">
                  <div class="empr-top">
                    <h4 class="empr-name">{{ emp.name }}</h4>
                    <span class="empr-badge" :class="emp.verified ? 'verified' : 'pending'">
                      <i :class="emp.verified ? 'fa-solid fa-circle-check' : 'fa-regular fa-clock'"></i>
                      {{ emp.verified ? 'Verificado' : 'En revisión' }}
                    </span>
                  </div>
                  <span class="empr-category">{{ emp.category }}</span>
                  <p class="empr-desc">{{ emp.description }}</p>
                  <div class="empr-actions">
                    <router-link :to="`/detail/${emp.id}`" class="empr-btn-ver">
                      Ver negocio <i class="fa-solid fa-arrow-right"></i>
                    </router-link>
                    <button class="empr-btn-unfav" @click="quitarFavorito(emp.id)">
                      <i class="fa-solid fa-heart-crack"></i> Quitar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ajustes como sección independiente -->
        <div class="tabs-wrapper" v-if="activeTab === 'ajustes'">
          <div class="tabs-header">
            <button class="tab-btn active">
              <i class="fa-solid fa-sliders"></i> Ajustes de cuenta
            </button>
          </div>
          <div class="tab-content">
            <div class="settings-list">
              <div class="setting-item">
                <div class="setting-left">
                  <div class="setting-icon"><i class="fa-regular fa-user"></i></div>
                  <div>
                    <h4>Nombre completo</h4>
                    <p>{{ displayName }}</p>
                  </div>
                </div>
                <button class="btn-edit">Editar</button>
              </div>
              <div class="setting-item">
                <div class="setting-left">
                  <div class="setting-icon"><i class="fa-regular fa-envelope"></i></div>
                  <div>
                    <h4>Correo electrónico</h4>
                    <p>{{ user.user?.email }}</p>
                  </div>
                </div>
                <button class="btn-edit">Editar</button>
              </div>
              <div class="setting-item">
                <div class="setting-left">
                  <div class="setting-icon"><i class="fa-solid fa-lock"></i></div>
                  <div>
                    <h4>Contraseña</h4>
                    <p>••••••••</p>
                  </div>
                </div>
                <button class="btn-edit">Cambiar</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón cerrar sesión (solo mobile) -->
        <button class="logout-mobile" @click="handleLogout">
          <i class="fa-solid fa-right-from-bracket"></i>
          Cerrar sesión
        </button>

      </div>
    </main>
  </div>

  <!-- Mobile bar -->
  <nav class="mobile-bar">
    <router-link to="/" class="mobile-bar-item">
      <i class="fa-regular fa-house"></i>
      <span>Inicio</span>
    </router-link>
    <a href="#" class="mobile-bar-item">
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>Explorar</span>
    </a>
    <a href="#" class="mobile-bar-item">
      <i class="fa-regular fa-heart"></i>
      <span>Favoritos</span>
    </a>
    <router-link to="/profile" class="mobile-bar-item active">
      <i class="fa-regular fa-user"></i>
      <span>Perfil</span>
    </router-link>
  </nav>
  <!-- ══ Modal crear / editar emprendimiento ══ -->
  <Teleport to="body">
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal">

        <div class="modal-header">
          <div>
            <h2 class="modal-title">{{ editingId ? 'Editar emprendimiento' : 'Registrar emprendimiento' }}</h2>
            <p class="modal-subtitle">{{ editingId ? 'Actualiza los datos de tu negocio' : 'Tu negocio aparecerá en Zentro una vez verificado' }}</p>
          </div>
          <button class="modal-close" @click="showModal = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="modal-body">

          <!-- Éxito -->
          <div v-if="saveSuccess" class="modal-success">
            <i class="fa-solid fa-circle-check"></i>
            <h3>{{ editingId ? '¡Cambios guardados!' : '¡Emprendimiento registrado!' }}</h3>
            <p>{{ editingId ? 'Tu negocio ha sido actualizado.' : 'Pronto será revisado y aparecerá en el inicio.' }}</p>
          </div>

          <div v-else>
            <!-- Nombre -->
            <div class="form-group">
              <label class="form-label">¿Cómo se llama tu negocio? <span class="required">*</span></label>
              <input v-model="form.name" type="text" class="form-input"
                placeholder="Escribe aquí el nombre de tu negocio" maxlength="80" />
            </div>

            <!-- Categoría -->
            <div class="form-group">
              <label class="form-label">Categoría <span class="required">*</span></label>
              <select v-model="form.category" class="form-input">
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <!-- Descripción -->
            <div class="form-group">
              <div class="form-label-row">
                <label class="form-label">¿Qué ofreces? <span class="required">*</span></label>
                <span class="char-count" :class="{ warning: descCount > 180, over: descCount > 200 }">
                  {{ descCount }}/200
                </span>
              </div>
              <textarea v-model="form.description" class="form-input form-textarea"
                placeholder="Cuéntale a la comunidad qué vendes o qué servicio ofreces. Sé claro y atractivo."
                maxlength="200" />
              <p class="form-hint">Mínimo 20 caracteres. Máximo 200.</p>
            </div>

            <!-- Dirección -->
            <div class="form-section-title"><i class="fa-solid fa-location-dot"></i> Ubicación</div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Municipio</label>
                <select v-model="addrMunicipio" class="form-input" @change="addrParroquia = ''">
                  <option value="" disabled>Selecciona municipio</option>
                  <option v-for="m in municipios" :key="m" :value="m">{{ m }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Parroquia</label>
                <select v-model="addrParroquia" class="form-input" :disabled="!addrMunicipio">
                  <option value="" disabled>{{ addrMunicipio ? 'Selecciona parroquia' : 'Primero elige municipio' }}</option>
                  <option v-for="p in parroquias" :key="p" :value="p">{{ p }}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Puntos de referencia</label>
              <input v-model="addrReferencia" type="text" class="form-input"
                placeholder="Ej. Frente al estadio, al lado de la escuela..." />
            </div>

            <!-- Teléfono -->
            <div class="form-section-title"><i class="fa-solid fa-phone"></i> Teléfono</div>
            <div class="form-group">
              <label class="form-label">Número de contacto</label>
              <div class="phone-row">
                <select v-model="phonePrefix" class="form-input phone-prefix">
                  <option v-for="p in prefijos" :key="p.value" :value="p.value">{{ p.label }}</option>
                </select>
                <input v-model="phoneNumber" type="tel" class="form-input phone-number"
                  placeholder="123-4567" maxlength="7"
                  @input="phoneNumber = phoneNumber.replace(/\D/g, '')" />
              </div>
              <p class="form-hint">Selecciona el operador y escribe los 7 dígitos restantes.</p>
            </div>

            <!-- Horario -->
            <div class="form-section-title"><i class="fa-regular fa-clock"></i> Horario de atención</div>
            <div class="form-group">
              <label class="form-label">Días de atención</label>
              <div class="days-picker">
                <label v-for="dia in diasSemana" :key="dia.key" class="day-chip"
                  :class="{ active: selectedDays.includes(dia.key) }">
                  <input type="checkbox" :value="dia.key" v-model="selectedDays" hidden />
                  {{ dia.label }}
                </label>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Hora de apertura</label>
                <input v-model="openTime" type="time" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">Hora de cierre</label>
                <input v-model="closeTime" type="time" class="form-input" />
              </div>
            </div>

            <!-- Foto URL -->
            <div class="form-section-title"><i class="fa-regular fa-image"></i> Foto del negocio</div>
            <div class="form-group">
              <label class="form-label">URL de la foto</label>
              <input v-model="form.image_url" type="url" class="form-input"
                placeholder="https://ejemplo.com/foto-de-mi-negocio.jpg" />
              <p class="form-hint">Pega el enlace directo a una imagen de tu negocio.</p>
            </div>

            <!-- Error -->
            <p v-if="saveError" class="form-error">
              <i class="fa-solid fa-circle-exclamation"></i> {{ saveError }}
            </p>

            <!-- Botones -->
            <div class="modal-footer">
              <button class="btn-cancel" @click="showModal = false">Cancelar</button>
              <button class="btn-submit" @click="submitForm" :disabled="saving">
                <i v-if="saving" class="fa-solid fa-spinner fa-spin"></i>
                <span>{{ saving ? 'Guardando...' : (editingId ? 'Guardar cambios' : 'Publicar emprendimiento') }}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Teleport>

  <!-- ══ Modal confirmar eliminación ══ -->
  <Teleport to="body">
    <div class="modal-overlay" v-if="showDeleteConfirm" @click.self="showDeleteConfirm = false">
      <div class="modal modal-sm">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Eliminar emprendimiento</h2>
            <p class="modal-subtitle">Esta acción no se puede deshacer</p>
          </div>
          <button class="modal-close" @click="showDeleteConfirm = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="delete-warning">
            <div class="delete-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <p>¿Estás seguro que quieres eliminar <strong>{{ deletingName }}</strong>? Se borrará permanentemente de Zentro.</p>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showDeleteConfirm = false">Cancelar</button>
            <button class="btn-delete" @click="confirmDelete" :disabled="deleting">
              <i v-if="deleting" class="fa-solid fa-spinner fa-spin"></i>
              <span>{{ deleting ? 'Eliminando...' : 'Sí, eliminar' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

</template>

<style scoped>
/* ══ Layout — Mobile first ══ */
.profile-page {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  background: var(--color-bg);
  transition: grid-template-columns 0.3s ease;
}

/* ══ Sidebar — oculto en mobile, visible en desktop ══ */
.sidebar {
  display: none;
  background: #fff;
  border-right: 1px solid var(--color-border);
  flex-direction: column;
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  transition: padding 0.3s ease;
}

.sidebar-collapsed .sidebar {
  padding: 1.5rem 0.5rem;
  align-items: center;
}

/* Sidebar top */
.sidebar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 0.5rem;
  overflow: hidden;
}

.sidebar-collapsed .sidebar-top {
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-logo {
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 1px;
  padding: 0.25rem 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.sidebar-collapsed .sidebar-logo .logo-rest {
  display: none;
}

.sidebar-collapsed .sidebar-logo {
  padding: 0.25rem;
}

.logo-z    { font-size: 1.5rem; font-weight: 700; color: var(--color-orange); letter-spacing: -0.04em; }
.logo-rest { font-size: 1.35rem; font-weight: 700; color: var(--color-navy); letter-spacing: -0.03em; transition: opacity 0.2s; }

/* Hamburguesa */
.collapse-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-muted);
  font-size: 0.85rem;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.collapse-btn:hover {
  background: var(--color-border);
  color: var(--color-dark);
}

/* Nav */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  width: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
  transition: all 0.15s;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-collapsed .nav-item {
  padding: 0.7rem;
  justify-content: center;
  gap: 0;
}

.nav-item:hover { background: var(--color-bg); color: var(--color-dark); }
.nav-item.router-link-active,
.nav-item.active { background: #ede9f8; color: var(--color-navy); font-weight: 600; }
.nav-item i { width: 18px; text-align: center; flex-shrink: 0; }

.nav-label { transition: opacity 0.2s, width 0.3s; }

.sidebar-collapsed .nav-label { display: none; }

/* Logout */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  color: #dc2626;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  transition: background 0.15s;
  width: 100%;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-collapsed .logout-btn {
  padding: 0.7rem;
  justify-content: center;
  gap: 0;
}

.sidebar-collapsed .logout-btn .nav-label { display: none; }

.logout-btn:hover { background: #fef2f2; }
.logout-btn i { width: 18px; text-align: center; flex-shrink: 0; }

/* ══ Main — Mobile first ══ */
.profile-main {
  padding: 1rem 0.75rem 5rem;
  display: flex;
  justify-content: center;
}

.profile-container {
  width: 100%;
  max-width: 75%; /*720px*/
}

/* ══ Banner — Mobile first ══ */
.profile-banner {
  height: 110px;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  position: relative;
  transition: background 0.3s;
}

.color-picker-btn {
  position: absolute; top: 1rem; right: 1rem;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff; width: 36px; height: 36px;
  border-radius: var(--radius-full);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.9rem;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
}
.color-picker-btn:hover { background: rgba(255,255,255,0.35); }

.color-picker {
  position: absolute; top: 3.4rem; right: 1rem;
  background: #fff; border-radius: var(--radius-lg);
  padding: 1rem; box-shadow: var(--shadow-lg); z-index: 10; min-width: 190px;
}
.color-picker-label { font-size: 0.72rem; font-weight: 600; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.75rem; }
.color-options { display: flex; gap: 0.5rem; }
.color-swatch {
  width: 30px; height: 30px; border-radius: 50%;
  border: 2px solid transparent; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; color: #fff;
  transition: transform 0.15s, border-color 0.15s;
}
.color-swatch:hover { transform: scale(1.15); }
.color-swatch.active { border-color: var(--color-dark); transform: scale(1.1); }

/* ══ Info centrada ══ */
.profile-info-center {
  background: #fff;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  padding: 0 2rem 2rem;
  text-align: center;
  margin-bottom: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-top: -52px;
  margin-bottom: 1rem;
}

.avatar-ring {
  width: 100px; height: 100px;
  border-radius: 50%; padding: 3px;
  transition: background 0.3s;
}

.avatar-circle {
  width: 100%; height: 100%; border-radius: 50%;
  background: var(--color-navy);
  border: 4px solid #fff;
  display: flex; align-items: center; justify-content: center;
}

.avatar-initial {
  font-size: 2.2rem; font-weight: 700; color: #fff; line-height: 1;
  letter-spacing: -0.03em;
}

.avatar-edit-btn {
  position: absolute; bottom: 4px; right: 4px;
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--color-orange); border: 2px solid #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; cursor: pointer; color: #fff;
  transition: transform 0.2s;
}
.avatar-edit-btn:hover { transform: scale(1.1); }

.name-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  overflow: visible;
}

.user-name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.35rem, 2.5vw, 1.9rem);
  font-weight: 700;
  color: var(--color-dark);
  letter-spacing: -0.02em;
  margin-bottom: 0.6rem;
  text-align: center;
  word-break: normal;
  white-space: nowrap;
  overflow-wrap: break-word;
  line-height: 1.2;
  width: 100%;
  overflow: visible;
}

.badges-row { display: flex; justify-content: center; margin-bottom: 0.5rem; }

.badge-verified {
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.8rem; font-weight: 600; color: #15803d;
  background: #dcfce7; padding: 0.3rem 0.85rem; border-radius: var(--radius-full);
}

.badge-pending {
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.8rem; font-weight: 600; color: #92400e;
  background: #fef3c7; padding: 0.3rem 0.85rem; border-radius: var(--radius-full);
}

.user-since { font-size: 0.82rem; color: var(--color-muted); margin-bottom: 1.5rem; }

.stats-row {
  display: flex; align-items: center; justify-content: center; gap: 2rem;
  padding-top: 1rem; border-top: 1px solid var(--color-border);
}

.stat-item { display: flex; flex-direction: column; align-items: center; gap: 0.15rem; }
.stat-number { font-size: 1.4rem; font-weight: 700; color: var(--color-dark); letter-spacing: -0.02em; }
.stat-label { font-size: 0.72rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.stat-divider { width: 1px; height: 36px; background: var(--color-border); }

/* ══ Seller card ══ */
.seller-card {
  background: #fff; border-radius: var(--radius-lg);
  padding: 1.25rem 1.75rem; margin-bottom: 1.25rem;
  box-shadow: var(--shadow-sm); border: 1.5px solid var(--color-border);
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; flex-wrap: wrap;
}

.seller-card-left { display: flex; align-items: center; gap: 1rem; }

.seller-icon {
  width: 44px; height: 44px; border-radius: var(--radius-md);
  background: #fff3eb; color: var(--color-orange);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; flex-shrink: 0;
}

.seller-card h3 { font-size: 0.9rem; font-weight: 600; color: var(--color-dark); margin-bottom: 0.15rem; }
.seller-card p  { font-size: 0.78rem; color: var(--color-muted); }

.btn-seller {
  background: var(--color-navy); color: #fff; border: none;
  border-radius: var(--radius-full); padding: 0.7rem 1.4rem;
  font-size: 0.88rem; font-weight: 500; font-family: var(--font);
  cursor: pointer; white-space: nowrap;
  box-shadow: 0 4px 14px rgba(23,4,83,0.25);
  transition: background 0.2s, transform 0.15s; flex-shrink: 0;
}
.btn-seller:hover { background: #220a6b; transform: translateY(-1px); }

/* ══ Tabs ══ */
/* ══ Lista emprendimientos — Modelo B ══ */
.empr-list { display: flex; flex-direction: column; gap: 0.85rem; }

.empr-item {
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  border-left: 4px solid var(--color-orange);
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}
.empr-item:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.11); transform: translateX(3px); }

.empr-img-side { width: 110px; flex-shrink: 0; overflow: hidden; }
.empr-img { width: 100%; height: 100%; object-fit: cover; display: block; min-height: 100px; }
.empr-img-placeholder {
  width: 110px; min-height: 100px; height: 100%;
  background: linear-gradient(135deg, #fff3eb, #ffe0cc);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-orange); font-size: 1.8rem;
}

.empr-info {
  padding: 0.9rem 1.1rem;
  flex: 1; min-width: 0;
  display: flex; flex-direction: column; justify-content: space-between;
}

.empr-top {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.empr-name { font-size: 0.92rem; font-weight: 700; color: var(--color-navy); }

.empr-badge {
  display: inline-flex; align-items: center; gap: 0.25rem;
  font-size: 0.65rem; font-weight: 700;
  padding: 0.2rem 0.6rem; border-radius: var(--radius-full);
  white-space: nowrap; flex-shrink: 0;
}
.empr-badge.verified { color: #15803d; background: #dcfce7; }
.empr-badge.pending  { color: #92400e; background: #fef3c7; }

.empr-category { font-size: 0.72rem; color: var(--color-orange); font-weight: 600; margin-bottom: 0.35rem; display: block; }

.empr-desc {
  font-size: 0.78rem; color: var(--color-muted); line-height: 1.45;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; margin-bottom: 0.7rem;
}

.empr-btn-ver {
  align-self: flex-start;
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.75rem; font-weight: 600;
  color: var(--color-navy); border: 1.5px solid var(--color-navy);
  padding: 0.35rem 0.85rem; border-radius: var(--radius-full);
  text-decoration: none; transition: background 0.2s, color 0.2s;
}
.empr-btn-ver:hover { background: var(--color-navy); color: #fff; }

.empr-actions { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.7rem; flex-wrap: wrap; }

.empr-btn-edit {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.75rem; font-weight: 600;
  color: var(--color-orange); border: 1.5px solid var(--color-orange);
  background: transparent; padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full); cursor: pointer;
  font-family: var(--font); transition: background 0.2s, color 0.2s;
}
.empr-btn-edit:hover { background: var(--color-orange); color: #fff; }

.empr-btn-delete {
  display: inline-flex;
  align-items: center; 
  justify-content: center;
  width: 32px; height: 32px;
  color: #dc2626; border: 1.5px solid #dc2626;
  background: transparent; border-radius: var(--radius-full);
  cursor: pointer; font-size: 0.8rem;
  transition: background 0.2s, color 0.2s;
}
.empr-btn-delete:hover { background: #dc2626; color: #fff; }

/* Modal eliminar */
.modal-sm { max-width: 420px; }

.delete-warning {
  display: flex; gap: 1rem; align-items: flex-start;
  padding: 1rem; background: #fef2f2;
  border-radius: var(--radius-md); margin-bottom: 0.5rem;
}
.delete-icon { color: #dc2626; font-size: 1.3rem; flex-shrink: 0; margin-top: 0.1rem; }
.delete-warning p { font-size: 0.88rem; color: var(--color-dark); line-height: 1.5; }
.delete-warning strong { font-weight: 700; }

.btn-delete {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.7rem 1.5rem; border-radius: var(--radius-full);
  border: none; background: #dc2626; color: #fff;
  font-size: 0.88rem; font-weight: 600; font-family: var(--font);
  cursor: pointer; transition: background 0.2s;
}
.btn-delete:hover:not(:disabled) { background: #b91c1c; }
.btn-delete:disabled { opacity: 0.6; cursor: not-allowed; }

/* ══ Tabs ══ */
.tabs-wrapper { background: #fff; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden; }

.tabs-header { display: flex; border-bottom: 1px solid var(--color-border); padding: 0 1.75rem; }

.tab-btn {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 1rem 0.25rem; margin-right: 2rem;
  font-size: 0.9rem; font-weight: 500; color: var(--color-muted);
  background: none; border: none; border-bottom: 2px solid transparent;
  cursor: pointer; font-family: var(--font);
  transition: color 0.2s, border-color 0.2s; margin-bottom: -1px;
}
.tab-btn:hover { color: var(--color-dark); }
.tab-btn.active { color: var(--color-navy); border-bottom-color: var(--color-navy); font-weight: 600; }

.tab-content { padding: 2rem 1.75rem; }

.empty-state { text-align: center; padding: 1.5rem 0; }
.empty-icon { width: 56px; height: 56px; border-radius: var(--radius-md); background: var(--color-bg); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: var(--color-muted); margin: 0 auto 1rem; }
.empty-state h3 { font-size: 0.95rem; font-weight: 600; color: var(--color-dark); margin-bottom: 0.4rem; }
.empty-state p  { font-size: 0.85rem; color: var(--color-muted); line-height: 1.6; margin-bottom: 1.5rem; }

.btn-explore {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: transparent; color: var(--color-navy);
  border: 1.5px solid var(--color-navy); border-radius: var(--radius-full);
  padding: 0.7rem 1.5rem; font-size: 0.88rem; font-weight: 500;
  font-family: var(--font); text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.btn-explore:hover { background: var(--color-navy); color: #fff; }

/* Settings */
.settings-list { display: flex; flex-direction: column; }

.setting-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 0; border-bottom: 1px solid var(--color-border); gap: 1rem;
}
.setting-item:last-child { border-bottom: none; }

.setting-left { display: flex; align-items: center; gap: 1rem; }

.setting-icon {
  width: 36px; height: 36px; border-radius: var(--radius-md);
  background: var(--color-bg);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-navy); font-size: 0.85rem; flex-shrink: 0;
}

.setting-left h4 { font-size: 0.85rem; font-weight: 600; color: var(--color-dark); margin-bottom: 0.15rem; }
.setting-left p  { font-size: 0.8rem; color: var(--color-muted); }

.btn-edit {
  background: transparent; color: var(--color-navy);
  border: 1.5px solid var(--color-border); border-radius: var(--radius-full);
  padding: 0.35rem 0.9rem; font-size: 0.8rem; font-weight: 500;
  font-family: var(--font); cursor: pointer; white-space: nowrap;
  transition: border-color 0.2s, background 0.2s;
}
.btn-edit:hover { border-color: var(--color-navy); background: #ede9f8; }

/* ══ Botón logout mobile ══ */
.logout-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  margin-top: 1.25rem;
  padding: 0.95rem;
  border-radius: var(--radius-full);
  border: none;
  background: #dc2626;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: var(--font);
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(220,38,38,0.35);
  transition: background 0.2s, transform 0.15s;
}
.logout-mobile:hover { background: #b91c1c; transform: translateY(-1px); }

/* ══ Mobile bar ══ */
.mobile-bar {
  display: flex;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: #fff;
  border-top: 1px solid var(--color-border);
  height: var(--mobile-bar-height);
  z-index: 100;
}

.mobile-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.mobile-bar-item i { font-size: 1.1rem; }
.mobile-bar-item.active,
.mobile-bar-item.router-link-active { color: var(--color-orange); }

/* ══ Seller card mobile ══ */
.seller-card { flex-direction: column; align-items: flex-start; }
.btn-seller  { width: 100%; justify-content: center; }

/* ══ Desktop (≥ 769px) ══ */
@media (min-width: 769px) {
  .profile-page {
    grid-template-columns: 240px 1fr;
  }

  .profile-page.sidebar-collapsed {
    grid-template-columns: 68px 1fr;
  }

  .sidebar {
    display: flex;
    /*-------------*/
    height: 880px;
    position: sticky;
    top: 2rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
  }

  .profile-main {
    padding: 2rem 2.5rem 3rem;
  }

  .profile-banner {
    height: 140px;
  }

  .profile-info-center {
    padding: 0 2rem 2rem;
  }

  .stats-row { gap: 2rem; }

  .seller-card { flex-direction: row; align-items: center; }
  .btn-seller  { width: auto; }

  .logout-mobile { display: none; }
  .mobile-bar    { display: none; }

  /* Botón logout en sidebar — rojo sólido en desktop */
  .logout-btn {
    background: #dc2626;
    color: #fff;
    border-radius: var(--radius-full);
    padding: 0.75rem 0.85rem;
    box-shadow: 0 4px 14px rgba(220,38,38,0.3);
  }
  .logout-btn:hover { background: #b91c1c; }
  .logout-btn i { color: #fff; }
}

/* ══ Ultrawide ≥ 1920px ══ */
@media (min-width: 1920px) {
  .profile-page {
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
    box-shadow: 0 0 0 100vw var(--color-bg);
  }
}
.form-label-row {
  display: flex; align-items: center;
  justify-content: space-between; margin-bottom: 0.4rem;
}
.form-label-row .form-label { margin-bottom: 0; }

.char-count {
  font-size: 0.75rem; color: var(--color-muted); font-weight: 500;
  transition: color 0.2s;
}
.char-count.warning { color: #d97706; }
.char-count.over    { color: #dc2626; font-weight: 700; }

.form-section-title {
  font-size: 0.78rem; font-weight: 700; color: var(--color-navy);
  text-transform: uppercase; letter-spacing: 0.07em;
  display: flex; align-items: center; gap: 0.5rem;
  margin: 1.4rem 0 0.9rem;
  padding-bottom: 0.5rem;
  border-bottom: 1.5px solid var(--color-border);
}

/* Teléfono */
.phone-row { 
  display: flex;
  gap: 0.6rem; 
}

.phone-prefix { 
  flex: 0 0 50%;
  width: 10px;
}
.phone-number  {
  flex: 1;
}

/* Días */
.days-picker { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.25rem; }

.day-chip {
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 38px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  font-size: 0.8rem; font-weight: 600; color: var(--color-muted);
  cursor: pointer; transition: all 0.15s; user-select: none;
  background: #fff;
}
.day-chip.active {
  background: var(--color-navy); color: #fff;
  border-color: var(--color-navy);
}
.day-chip:hover:not(.active) { border-color: var(--color-navy); color: var(--color-navy); }

.empr-btn-unfav {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.75rem; font-weight: 600;
  color: #dc2626; border: 1.5px solid #dc2626;
  background: transparent; padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full); cursor: pointer;
  font-family: var(--font); transition: background 0.2s, color 0.2s;
}
.empr-btn-unfav:hover { background: #dc2626; color: #fff; }

/* ══ Modal ══ */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 300;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(3px);
}

.modal {
  background: #fff;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  animation: modal-in 0.2s ease;
}

@keyframes modal-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.modal-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
  padding: 1.5rem 1.75rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-size: 1.1rem; font-weight: 700;
  color: var(--color-dark); margin-bottom: 0.2rem;
}

.modal-subtitle { font-size: 0.8rem; color: var(--color-muted); }

.modal-close {
  width: 32px; height: 32px; border-radius: var(--radius-full);
  background: var(--color-bg); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-muted); font-size: 0.9rem; flex-shrink: 0;
  transition: background 0.15s;
}
.modal-close:hover { background: var(--color-border); }

.modal-body { padding: 1.5rem 1.75rem; }

/* Formulario */
.form-group { margin-bottom: 1.1rem; }

.form-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
}

.form-label {
  display: block; font-size: 0.82rem; font-weight: 600;
  color: var(--color-dark); margin-bottom: 0.4rem;
}

.required { color: var(--color-orange); }

.form-input {
  width: 100%; padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.88rem; font-family: var(--font);
  color: var(--color-dark); background: #fff;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none; border-color: var(--color-navy);
}

.form-textarea {
  resize: vertical; min-height: 90px; line-height: 1.5;
}

.form-hint { font-size: 0.75rem; color: var(--color-muted); margin-top: 0.3rem; }

.form-error {
  font-size: 0.82rem; color: #dc2626;
  display: flex; align-items: center; gap: 0.4rem;
  margin-bottom: 1rem;
}

/* Footer */
.modal-footer {
  display: flex; justify-content: flex-end;
  gap: 0.75rem; margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
}

.btn-cancel {
  padding: 0.7rem 1.4rem; border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border); background: #fff;
  font-size: 0.88rem; font-weight: 500; font-family: var(--font);
  color: var(--color-muted); cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.btn-cancel:hover { border-color: var(--color-navy); color: var(--color-navy); }

.btn-submit {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.7rem 1.5rem; border-radius: var(--radius-full);
  border: none; background: var(--color-navy); color: #fff;
  font-size: 0.88rem; font-weight: 600; font-family: var(--font);
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(23,4,83,0.25);
  transition: background 0.2s, transform 0.15s;
}
.btn-submit:hover:not(:disabled) { background: #220a6b; transform: translateY(-1px); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

/* Éxito */
.modal-success {
  text-align: center; padding: 2rem 1rem;
}
.modal-success i {
  font-size: 3rem; color: #15803d; margin-bottom: 1rem; display: block;
}
.modal-success h3 { font-size: 1.1rem; font-weight: 700; color: var(--color-dark); margin-bottom: 0.4rem; }
.modal-success p  { font-size: 0.88rem; color: var(--color-muted); }

@media (max-width: 480px) {
  .form-row { grid-template-columns: 1fr; }
  .modal-footer { flex-direction: column; }
  .btn-cancel, .btn-submit { width: 100%; justify-content: center; }
}
</style>
