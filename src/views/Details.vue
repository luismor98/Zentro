<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '../components/PageLayout.vue'
import { useAuth } from '../stores/auth.js'
import { emprendimientosService } from '../services/emprendimientosService.js'
import { favoritosService } from '../services/favoritosService.js'

const { user } = useAuth()
const route  = useRoute()
const router = useRouter()

const emprendimiento = ref(null)
const loading        = ref(true)
const error          = ref(null)
const liked          = ref(false)
const togglingFav    = ref(false)

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) { router.push({ name: 'home' }); return }
  try {
    emprendimiento.value = await emprendimientosService.getById(id)
    if (user.isLoggedIn) {
      liked.value = await favoritosService.isFavorite(user.user.id, id)
    }
  } catch (e) {
    error.value = 'No se pudo cargar este emprendimiento.'
  } finally {
    loading.value = false
  }
})

async function toggleFavorito() {
  if (!user.isLoggedIn || togglingFav.value) return
  togglingFav.value = true
  const id = Number(route.params.id)
  try {
    if (liked.value) {
      await favoritosService.remove(user.user.id, id)
      liked.value = false
    } else {
      await favoritosService.add(user.user.id, id)
      liked.value = true
    }
  } catch (e) {
    console.error('Error al cambiar favorito:', e)
  } finally {
    togglingFav.value = false
  }
}

// WhatsApp y llamada
const whatsappUrl = computed(() => {
  if (!emprendimiento.value?.phone) return null
  const digits = emprendimiento.value.phone.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? '58' + digits.slice(1) : digits
  const msg = encodeURIComponent('Hola, te contacto desde Zentro por tu negocio "' + emprendimiento.value.name + '"')
  return 'https://wa.me/' + intl + '?text=' + msg
})

const callUrl = computed(() => {
  if (!emprendimiento.value?.phone) return null
  return 'tel:' + emprendimiento.value.phone.replace(/[^0-9+]/g, '')
})

// Abierto / cerrado
const estadoHorario = computed(() => {
  const schedule = emprendimiento.value?.schedule
  if (!schedule) return null
  const match = schedule.match(/:\s*(\d{1,2}:\d{2}\s*[AP]M)\s*[–\-]\s*(\d{1,2}:\d{2}\s*[AP]M)/i)
  if (!match) return null

  const parseTime = (str) => {
    const parts = str.trim().split(/\s+/)
    const [h, m] = parts[0].split(':').map(Number)
    const period = parts[1] ? parts[1].toUpperCase() : ''
    let hour = h
    if (period === 'PM' && h !== 12) hour += 12
    if (period === 'AM' && h === 12) hour = 0
    return hour * 60 + m
  }

  const now  = new Date()
  const mins = now.getHours() * 60 + now.getMinutes()
  const open  = parseTime(match[1])
  const close = parseTime(match[2])

  const diasMap = { lun: 1, mar: 2, mié: 3, mie: 3, jue: 4, vie: 5, sáb: 6, sab: 6, dom: 0 }
  const dayNow  = now.getDay()
  const diasStr = schedule.split(':')[0].toLowerCase()
  const diasMencionados = Object.keys(diasMap).filter(d => diasStr.includes(d))
  const diaActivo = diasMencionados.length === 0 || diasMencionados.some(d => diasMap[d] === dayNow)

  if (!diaActivo) return { abierto: false, texto: 'Cerrado hoy' }
  if (mins >= open && mins < close) return { abierto: true,  texto: 'Abierto · Cierra a las ' + match[2].trim() }
  return { abierto: false, texto: 'Cerrado · Abre a las ' + match[1].trim() }
})
</script>

<template>
  <PageLayout>

    <!-- Cargando -->
    <div v-if="loading" class="state-center">
      <i class="fa-solid fa-spinner fa-spin"></i>
      <p>Cargando emprendimiento...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state-center state-error">
      <i class="fa-solid fa-circle-exclamation"></i>
      <p>{{ error }}</p>
      <router-link to="/" class="btn-back">Volver al inicio</router-link>
    </div>

    <!-- Contenido -->
    <main v-else class="detail-main">

      <!-- Imagen de portada -->
      <div class="cover-wrapper">
        <img
          :src="emprendimiento.image_url || 'https://placehold.co/1200x500?text=Sin+imagen'"
          :alt="emprendimiento.name"
          class="cover-img"
        />
        <div class="cover-gradient"></div>
        <div class="cover-content">
          <!-- Botón volver -->
          <button class="btn-volver" @click="router.back()">
            <i class="fa-solid fa-arrow-left"></i> Volver
          </button>
          <div class="cover-badges">
            <span class="cat-badge">{{ emprendimiento.category }}</span>
            <span v-if="emprendimiento.verified" class="verified-badge">
              <i class="fa-solid fa-circle-check"></i> Verificado
            </span>
          </div>
        </div>
      </div>

      <div class="detail-body responsive-wrapper">

        <!-- Encabezado -->
        <div class="detail-header">
          <div class="detail-title-group">
            <h1 class="detail-title">{{ emprendimiento.name }}</h1>
            <!-- Estado horario -->
            <div v-if="estadoHorario" class="horario-estado" :class="estadoHorario.abierto ? 'open' : 'closed'">
              <span class="estado-dot"></span>
              {{ estadoHorario.texto }}
            </div>
          </div>
          <div class="detail-actions">
            <button v-if="user.isLoggedIn" class="fav-btn" :class="{ active: liked }"
              @click="toggleFavorito" :disabled="togglingFav"
              :aria-label="liked ? 'Quitar de favoritos' : 'Agregar a favoritos'">
              <i :class="togglingFav ? 'fa-solid fa-spinner fa-spin' : (liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart')"></i>
              {{ liked ? 'Guardado' : 'Guardar' }}
            </button>
            <router-link v-else to="/register" class="fav-btn">
              <i class="fa-regular fa-heart"></i> Guardar
            </router-link>
          </div>
        </div>

        <div class="detail-divider"></div>

        <div class="detail-grid">

          <!-- Descripción -->
          <div class="detail-left">
            <h2 class="subsection-title">Sobre este negocio</h2>
            <p class="detail-desc">{{ emprendimiento.description || 'Sin descripción disponible.' }}</p>
          </div>

          <!-- Info de contacto -->
          <aside class="detail-right">
            <div class="info-card">
              <h3 class="info-card-title">Información de contacto</h3>

              <div v-if="!emprendimiento.address && !emprendimiento.phone && !emprendimiento.schedule"
                class="info-empty">
                <i class="fa-regular fa-circle-question"></i>
                <p>Este negocio aún no ha completado su información de contacto.</p>
              </div>

              <ul v-else class="info-list">
                <li v-if="emprendimiento.address">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>{{ emprendimiento.address }}</span>
                </li>
                <li v-if="emprendimiento.schedule">
                  <i class="fa-regular fa-clock"></i>
                  <span>{{ emprendimiento.schedule }}</span>
                </li>
                <li v-if="emprendimiento.phone" class="phone-item">
                  <i class="fa-solid fa-phone"></i>
                  <span>{{ emprendimiento.phone }}</span>
                </li>
              </ul>

              <!-- Botones de contacto -->
              <div v-if="emprendimiento.phone" class="contact-btns">
                <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-whatsapp">
                  <i class="fa-brands fa-whatsapp"></i> Contactar por WhatsApp
                </a>
              </div>

              <!-- CTA para no registrados -->
              <div v-if="!user.isLoggedIn" class="info-cta">
                <p>Crea tu cuenta para guardar este emprendimiento y recibir actualizaciones.</p>
                <router-link to="/register" class="btn-primary-full">Crear cuenta gratis</router-link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>

  </PageLayout>
</template>

<style scoped>
.detail-main { padding-top: 0; }

/* ── Cover ── */
.cover-wrapper {
  position: relative;
  height: 420px;
  overflow: hidden;
}
.cover-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
.cover-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(23,4,83,0.65) 0%, transparent 55%);
}
.cover-content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 2rem;
}

.btn-volver {
  align-self: flex-start;
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35);
  color: #fff; padding: 0.45rem 1rem; border-radius: var(--radius-full);
  font-size: 0.82rem; font-weight: 600; cursor: pointer;
  backdrop-filter: blur(6px); font-family: var(--font);
  transition: background 0.2s;
}
.btn-volver:hover { background: rgba(255,255,255,0.28); }

.cover-badges { display: flex; gap: 0.6rem; align-items: center; }

.cat-badge {
  background: var(--color-orange); color: #fff;
  font-size: 0.75rem; font-weight: 700;
  padding: 0.3rem 0.85rem; border-radius: var(--radius-full);
  text-transform: uppercase; letter-spacing: 0.05em;
}

.verified-badge {
  display: inline-flex; align-items: center; gap: 0.3rem;
  background: rgba(21,128,61,0.9); color: #fff;
  font-size: 0.75rem; font-weight: 700;
  padding: 0.3rem 0.85rem; border-radius: var(--radius-full);
}

/* ── Body ── */
.detail-body { padding: 2rem 0 3rem; }

.detail-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem; flex-wrap: wrap;
}

.detail-title {
  font-size: 1.75rem; font-weight: 700;
  color: var(--color-dark); margin-bottom: 0.5rem;
}

/* Estado horario */
.horario-estado {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.82rem; font-weight: 600;
  padding: 0.3rem 0.75rem; border-radius: var(--radius-full);
}
.horario-estado.open   { color: #15803d; background: #dcfce7; }
.horario-estado.closed { color: #92400e; background: #fef3c7; }
.estado-dot {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
}
.open  .estado-dot { background: #15803d; }
.closed .estado-dot { background: #d97706; }

/* Favorito */
.detail-actions { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }

.fav-btn {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.55rem 1.1rem; border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border); background: #fff;
  color: var(--color-muted); font-size: 0.875rem; font-weight: 600;
  font-family: var(--font); cursor: pointer; text-decoration: none;
  transition: all 0.2s;
}
.fav-btn:hover        { border-color: #ef4444; color: #ef4444; }
.fav-btn.active       { background: #fef2f2; border-color: #ef4444; color: #ef4444; }
.fav-btn:disabled     { opacity: 0.7; cursor: not-allowed; }

.detail-divider { height: 1px; background: var(--color-border); margin: 1.5rem 0; }

/* ── Grid ── */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2.5rem; align-items: start;
}

.subsection-title {
  font-size: 1rem; font-weight: 700;
  color: var(--color-dark); margin-bottom: 0.75rem;
}

.detail-desc { font-size: 0.95rem; line-height: 1.75; color: #4b5563; }

/* ── Info card ── */
.info-card {
  background: #fff; border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.info-card-title {
  font-size: 0.9rem; font-weight: 700;
  color: var(--color-dark); margin-bottom: 1.1rem;
}

.info-empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 0.5rem; text-align: center; padding: 1rem 0;
  color: var(--color-muted);
}
.info-empty i { font-size: 1.5rem; }
.info-empty p { font-size: 0.82rem; line-height: 1.5; }

.info-list {
  list-style: none; display: flex;
  flex-direction: column; gap: 0.9rem; margin-bottom: 1.25rem;
}

.info-list li {
  display: flex; align-items: flex-start;
  gap: 0.7rem; font-size: 0.875rem; color: #4b5563;
}

.info-list li i {
  color: var(--color-orange); margin-top: 0.15rem; flex-shrink: 0;
}

/* Botones de contacto */
.contact-btns {
  margin-bottom: 1rem;
  justify-content: center;
  display: flex;
  gap: 0.5rem;
}

.btn-whatsapp {
  display: flex; align-items: center; justify-content: center;
  gap: 0.5rem; width: 100%; padding: 0.7rem;
  border-radius: var(--radius-md);
  background: #25d366; color: #fff;
  font-size: 0.88rem; font-weight: 700; text-decoration: none;
  transition: background 0.2s;
}
.btn-whatsapp:hover { background: #1da851; }

/* CTA */
.info-cta {
  margin-top: 1.25rem; padding-top: 1.25rem;
  border-top: 1px solid var(--color-border); text-align: center;
}
.info-cta p { font-size: 0.8rem; color: var(--color-muted); margin-bottom: 0.75rem; line-height: 1.5; }

.btn-primary-full {
  display: block; text-align: center;
  background: var(--color-navy); color: #fff;
  text-decoration: none; padding: 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem; font-weight: 600;
  transition: background 0.2s;
}
.btn-primary-full:hover { background: #220a6b; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
  .cover-wrapper { height: 280px; }
  .cover-content { padding: 1rem 1.25rem; }
  .detail-title { font-size: 1.4rem; }
}

/* ── Estados ── */
.state-center {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 1rem; padding: 6rem 2rem;
  color: var(--color-muted); text-align: center;
}
.state-center i { font-size: 2.5rem; }
.state-center p { font-size: 0.95rem; }
.state-error i  { color: #ef4444; }

.btn-back {
  display: inline-flex; align-items: center; gap: 0.5rem;
  margin-top: 0.5rem; padding: 0.65rem 1.4rem;
  border-radius: var(--radius-full); background: var(--color-navy);
  color: #fff; text-decoration: none;
  font-size: 0.88rem; font-weight: 500; transition: background 0.2s;
}
.btn-back:hover { background: #220a6b; }
</style>
