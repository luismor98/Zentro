<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth.js'

const router = useRouter()
const { user, logout } = useAuth()

function handleLogout() {
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="profile-layout">

    <!-- Sidebar -->
    <aside class="sidebar">
      <router-link to="/" class="sidebar-logo">Zentro</router-link>
      <nav class="sidebar-nav">
        <router-link to="/" class="sidebar-link">
          <i class="fa-regular fa-house"></i> Inicio
        </router-link>
        <router-link to="/profile" class="sidebar-link">
          <i class="fa-regular fa-user"></i> Perfil
        </router-link>
        <a href="#" class="sidebar-link">
          <i class="fa-regular fa-heart"></i> Favoritos
        </a>
        <a href="#" class="sidebar-link">
          <i class="fa-solid fa-magnifying-glass"></i> Explorar
        </a>
      </nav>
      <button class="logout-btn" @click="handleLogout">
        <i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión
      </button>
    </aside>

    <!-- Contenido principal -->
    <main class="profile-main">

      <!-- Encabezado del perfil -->
      <div class="profile-header">
        <div class="avatar-wrapper">
          <div class="avatar-circle">
          <span>{{ user.user?.user_metadata?.name?.charAt(0).toUpperCase() }}</span>
          </div>
          <button class="avatar-edit" aria-label="Cambiar foto">
            <i class="fa-solid fa-camera"></i>
          </button>
        </div>
        <div class="profile-info">
        <h1 class="profile-name">{{ user.user?.user_metadata?.name }}</h1>
          <p class="profile-email">{{ user.user?.email }}</p>
          <span class="badge-verified" v-if="user.user?.user_metadata?.verified">
            <i class="fa-solid fa-check"></i> Verificado
          </span>
          <span class="badge-pending" v-else>
            <i class="fa-regular fa-clock"></i> Pendiente de verificación
          </span>
        </div>
      </div>

      <div class="profile-divider"></div>

      <!-- Sección de emprendimiento -->
      <div class="profile-section">
        <h2 class="section-heading">Mi Emprendimiento</h2>
        <div class="empty-biz-card">
          <i class="fa-regular fa-store"></i>
          <p>¿Tienes un emprendimiento? Regístralo y hazlo visible para toda Valera.</p>
          <button class="btn-register-biz">
            <i class="fa-solid fa-plus"></i> Registrar emprendimiento
          </button>
        </div>
      </div>

      <!-- Favoritos recientes -->
      <div class="profile-section">
        <h2 class="section-heading">Favoritos guardados</h2>
        <p class="empty-text">Aún no tienes favoritos. <router-link to="/">Explorar emprendimientos</router-link></p>
      </div>

    </main>
  </div>
</template>

<style scoped>
.profile-layout {
  display: grid;
  grid-template-columns: 230px 1fr;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  background: #fff;
  border-right: 1px solid var(--color-border);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-logo {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  margin-bottom: 1rem;
  display: block;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
  transition: all 0.15s;
}

.sidebar-link:hover {
  background: var(--color-hover);
  color: var(--color-text);
}

.sidebar-link.router-link-active {
  background: #eff6ff;
  color: var(--color-primary);
  font-weight: 600;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: #dc2626;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-main);
  transition: background 0.15s;
  width: 100%;
}

.logout-btn:hover {
  background: #fef2f2;
}

/* Profile main */
.profile-main {
  padding: 2.5rem;
  background: #f9fafb;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  flex-wrap: wrap;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  border: 1.5px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  cursor: pointer;
  color: var(--color-muted);
  transition: all 0.2s;
}

.avatar-edit:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.profile-email {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-bottom: 0.6rem;
}

.badge-verified {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #15803d;
  background: #dcfce7;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
}

.badge-pending {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #92400e;
  background: #fef3c7;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
}

.profile-divider {
  height: 1px;
  background: var(--color-border);
  margin: 2rem 0;
}

.profile-section {
  margin-bottom: 2rem;
}

.section-heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.empty-biz-card {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 2.5rem;
  text-align: center;
  color: var(--color-muted);
  background: #fff;
}

.empty-biz-card i {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  display: block;
}

.empty-biz-card p {
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
}

.btn-register-biz {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.6rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: var(--font-main);
  cursor: pointer;
  transition: background 0.2s;
}

.btn-register-biz:hover {
  background: #2d3f54;
}

.empty-text {
  font-size: 0.875rem;
  color: var(--color-muted);
}

.empty-text a {
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: none;
}

/* Mobile */
@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .profile-main {
    padding: 1.5rem 1rem;
  }
}
</style>
