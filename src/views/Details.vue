<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '../components/PageLayout.vue'
import { useAuth } from '../stores/auth.js'
import { emprendimientosService } from '../services/emprendimientosService.js'

const { user } = useAuth()
const route  = useRoute()
const router = useRouter()

const emprendimiento = ref(null)
const loading        = ref(true)
const error          = ref(null)
const liked          = ref(false)

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) {
    router.push({ name: 'home' })
    return
  }
  try {
    emprendimiento.value = await emprendimientosService.getById(id)
  } catch (e) {
    error.value = 'No se pudo cargar este emprendimiento.'
  } finally {
    loading.value = false
  }
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

    <!-- Contenido real -->
    <main v-else class="detail-main">

      <!-- Imagen de portada -->
      <div class="cover-wrapper">
        <img
          :src="emprendimiento.image_url || 'https://placehold.co/1200x400?text=Sin+imagen'"
          :alt="emprendimiento.name"
          class="cover-img"
        />
        <div class="cover-overlay">
          <span class="cat-badge">{{ emprendimiento.category }}</span>
        </div>
      </div>

      <div class="detail-body responsive-wrapper">

        <!-- Encabezado -->
        <div class="detail-header">
          <div class="detail-title-group">
            <h1 class="detail-title">{{ emprendimiento.name }}</h1>
            <div class="detail-stars">
              <i v-for="i in 5" :key="i"
                :class="i <= (emprendimiento.rating || 0) ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              ></i>
            </div>
          </div>
          <div class="detail-actions">
            <button
              v-if="user.isLoggedIn"
              class="fav-btn"
              :class="{ active: liked }"
              @click="liked = !liked"
              :aria-label="liked ? 'Quitar de favoritos' : 'Agregar a favoritos'"
            >
              <i :class="liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
              {{ liked ? 'Guardado' : 'Guardar' }}
            </button>
            <router-link v-else to="/register" class="fav-btn-guest">
              <i class="fa-regular fa-heart"></i> Guardar
            </router-link>
          </div>
        </div>

        <div class="detail-divider"></div>

        <div class="detail-grid">

          <!-- Descripción -->
          <div class="detail-left">
            <h2 class="subsection-title">Descripción</h2>
            <p class="detail-desc">{{ emprendimiento.description || 'Sin descripción disponible.' }}</p>
          </div>

          <!-- Info de contacto -->
          <aside class="detail-right">
            <div class="info-card">
              <h3 class="info-card-title">Información de contacto</h3>
              <ul class="info-list">
                <li v-if="emprendimiento.address">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>{{ emprendimiento.address }}</span>
                </li>
                <li v-if="emprendimiento.phone">
                  <i class="fa-solid fa-phone"></i>
                  <a :href="`tel:${emprendimiento.phone}`">{{ emprendimiento.phone }}</a>
                </li>
                <li v-if="emprendimiento.schedule">
                  <i class="fa-regular fa-clock"></i>
                  <span>{{ emprendimiento.schedule }}</span>
                </li>
              </ul>

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
.detail-main {
  padding-top: 0;
}

/* Cover */
.cover-wrapper {
  position: relative;
  height: 320px;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cover-overlay {
  position: absolute;
  bottom: 1.25rem;
  left: 2rem;
}

.cat-badge {
  background: rgba(31,46,62,0.85);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Detail body */
.detail-body {
  padding: 2rem 0 3rem;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.detail-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.4rem;
}

.detail-stars {
  display: flex;
  gap: 0.15rem;
  color: #f59e0b;
  font-size: 0.9rem;
}

.detail-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.fav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--color-border);
  background: #fff;
  color: var(--color-muted);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: var(--font-main);
  cursor: pointer;
  transition: all 0.2s;
}

.fav-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.fav-btn.active {
  background: #fef2f2;
  border-color: #ef4444;
  color: #ef4444;
}

.fav-btn-guest {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--color-border);
  color: var(--color-muted);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.fav-btn-guest:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.detail-divider {
  height: 1px;
  background: var(--color-border);
  margin: 1.5rem 0;
}

/* Grid de detalle */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2.5rem;
  align-items: start;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.detail-desc {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #4b5563;
}

/* Info card */
.info-card {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.info-card-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.info-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.info-list li i {
  color: var(--color-primary);
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.info-list a {
  color: var(--color-accent);
  text-decoration: none;
}

.info-cta {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.info-cta p {
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.btn-primary-full {
  display: block;
  text-align: center;
  background: var(--color-primary);
  color: #fff;
  text-decoration: none;
  padding: 0.65rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-primary-full:hover {
  background: #2d3f54;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
  .cover-wrapper {
    height: 220px;
  }
}

/* ══ Estados ══ */
.state-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 6rem 2rem;
  color: var(--color-muted);
  text-align: center;
}

.state-center i { font-size: 2.5rem; }
.state-center p { font-size: 0.95rem; }

.state-error i { color: #ef4444; }

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-full);
  background: var(--color-navy);
  color: #fff;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  transition: background 0.2s;
}
.btn-back:hover { background: #220a6b; }
</style>
