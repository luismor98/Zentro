<script setup>
import { ref, computed, onMounted } from 'vue'
import PageLayout from '../components/PageLayout.vue'
import CardComp    from '../components/CardComp.vue'
import { useAuth } from '../stores/auth.js'
import { emprendimientosService } from '../services/emprendimientosService.js'

const { user } = useAuth()
const searchQuery    = ref('')
const activeCategory = ref('Todos')
const emprendimientos = ref([])
const categories      = ref(['Todos'])
const loading         = ref(true)
const error           = ref('')

onMounted(async () => {
  try {
    const [data, cats] = await Promise.all([
      emprendimientosService.getAll(),
      emprendimientosService.getCategories()
    ])
    emprendimientos.value = data
    categories.value = cats
  } catch (e) {
    error.value = 'No se pudieron cargar los emprendimientos.'
  } finally {
    loading.value = false
  }
})

const filtered = computed(() => {
  return emprendimientos.value.filter(e => {
    const matchQ = !searchQuery.value ||
      e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCat = activeCategory.value === 'Todos' || e.category === activeCategory.value
    return matchQ && matchCat
  })
})

function setCategory(cat) {
  activeCategory.value = cat
}
</script>

<template>
  <PageLayout>

    <main class="main-content">

      <!-- ══ HERO / SEARCH ══ -->
      <section class="hero-section">
        <div class="hero-inner responsive-wrapper">
          <h1 class="hero-title">Conecta con tu Ciudad</h1>
          <p class="hero-subtitle">Descubre emprendimientos verificados cerca de ti en Valera, Trujillo</p>

          <div class="search-container">
            <div class="search-box">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                v-model="searchQuery"
                type="search"
                class="search-input"
                placeholder="Buscar emprendimientos o categorías..."
                aria-label="Buscar emprendimientos"
              />
              <button class="search-btn">Buscar</button>
            </div>
          </div>

          <!-- Categorías rápidas -->
          <div class="category-pills">
            <button
              v-for="cat in categories"
              :key="cat"
              class="pill"
              :class="{ active: activeCategory === cat }"
              @click="setCategory(cat)"
            >{{ cat }}</button>
          </div>
        </div>
      </section>

      <!-- ══ BANNER VISITANTE ══ -->
      <div v-if="!user.isLoggedIn" class="guest-banner">
        <div class="responsive-wrapper guest-banner-inner">
          <div class="guest-text">
            <i class="fa-solid fa-star"></i>
            <p>Crea tu perfil gratis y guarda tus emprendimientos favoritos con recomendaciones personalizadas.</p>
          </div>
          <router-link to="/register" class="btn-banner">Crear cuenta gratis</router-link>
        </div>
      </div>

      <!-- ══ LISTADO ══ -->
      <section class="listings-section responsive-wrapper">
        <div class="section-header">
          <h2 class="section-title">
            {{ activeCategory === 'Todos' ? 'Emprendimientos destacados' : activeCategory }}
          </h2>
          <span class="section-count">{{ filtered.length }} encontrados</span>
        </div>

        <!-- Cargando -->
        <div v-if="loading" class="empty-state">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <p>Cargando emprendimientos...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="empty-state">
          <i class="fa-solid fa-circle-exclamation" style="color:#ef4444"></i>
          <p>{{ error }}</p>
        </div>

        <div v-else-if="filtered.length > 0" class="card-grid">
          <CardComp
            v-for="emp in filtered"
            :key="emp.id"
            :id="emp.id"
            :name="emp.name"
            :category="emp.category"
            :rating="emp.rating"
            :image="emp.image_url"
          />
        </div>

        <div v-else class="empty-state">
          <i class="fa-solid fa-store-slash"></i>
          <p>No encontramos resultados para tu búsqueda.</p>
          <button class="btn-clear" @click="searchQuery = ''; activeCategory = 'Todos'">Ver todos</button>
        </div>
      </section>

    </main>

  </PageLayout>
</template>

<style scoped>
/* layout manejado por PageLayout.vue */

/* ── Hero ── */
.hero-section {
  background: linear-gradient(145deg, var(--color-orange) 0%, #ff8533 50%, #ffaa00 100%);
  padding: 3.5rem 0 2.5rem;
  position: relative;
  overflow: hidden;
}

/* Decoración de fondo sutil */
.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.hero-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.hero-title {
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1.15;
  text-shadow: 0 2px 12px rgba(0,0,0,0.15);
}

.hero-subtitle {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255,255,255,0.88);
  max-width: 480px;
  line-height: 1.6;
}

/* Search box */
.search-container {
  width: 100%;
  max-width: 580px;
  margin-top: 0.5rem;
}

.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: var(--radius-full);
  overflow: hidden;
  box-shadow: 0 6px 28px rgba(0,0,0,0.18);
  height: 52px;
}

.search-icon {
  padding: 0 1rem 0 1.25rem;
  color: var(--color-muted);
  font-size: 0.9rem;
  flex-shrink: 0;
  padding-right: 1rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  font-family: var(--font);
  font-weight: 400;
  padding: 0;
  background: transparent;
  color: var(--color-dark);
  min-width: 0;
  padding-left: 1rem;
  padding-right: 1rem;
}

.search-input::placeholder { color: #aaa; }

.search-btn {
  background: var(--color-navy);
  color: #fff;
  border: none;
  padding: 0 1.6rem;
  height: 100%;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: var(--font);
  cursor: pointer;
  border-radius: 0 var(--radius-full) var(--radius-full) 0;
  transition: background 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

.search-btn:hover { background: #220a6b; }

/* Category pills */
.category-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.pill {
  padding: 0.35rem 1rem;
  border-radius: var(--radius-full);
  border: 1.5px solid rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 500;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.pill:hover {
  background: rgba(255,255,255,0.3);
  border-color: rgba(255,255,255,0.8);
}

.pill.active {
  background: #fff;
  color: var(--color-orange);
  border-color: #fff;
}

/* ── Guest Banner ── */
.guest-banner {
  background: #fffbf7;
  border-bottom: 1px solid #ffe8d6;
  padding: 0.85rem 0;
}

.guest-banner-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.guest-text {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #9a3a00;
  font-size: 0.875rem;
  font-weight: 400;
}

.guest-text i { color: var(--color-orange); flex-shrink: 0; }

.btn-banner {
  display: inline-flex;
  align-items: center;
  background: var(--color-navy);
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-banner:hover { background: #220a6b; }

/* ── Listings ── */
.listings-section {
  padding: 2.25rem 0 3rem;
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-dark);
}

.section-count {
  font-size: 0.82rem;
  color: var(--color-muted);
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-muted);
}

.empty-state i {
  font-size: 7rem;
  margin-bottom: 1rem;
  display: block;
  color: #ddd;
  margin: 1rem auto 1rem;
}

.empty-state p { margin-bottom: 1.25rem; font-size: 0.9rem; }

.btn-clear {
  background: none;
  border: 1.5px solid var(--color-navy);
  color: var(--color-navy);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font);
  transition: all 0.2s;
}

.btn-clear:hover { background: var(--color-navy); color: #fff; }

/* Mobile */
@media (max-width: 640px) {
  .hero-section { padding: 2.5rem 0 2rem; }
  .card-grid { justify-content: center; }
  .guest-banner-inner { flex-direction: column; text-align: center; }
  .guest-text { justify-content: center; flex-wrap: wrap; text-align: center; }
}
</style>
