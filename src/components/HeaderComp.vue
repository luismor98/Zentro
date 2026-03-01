<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth.js'

const router = useRouter()
const { user, logout } = useAuth()
const dropdownOpen = ref(false)

function handleLogout() {
  dropdownOpen.value = false
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="header-outer">
    <div class="header-inner responsive-wrapper">

      <!-- Logo → lleva al Home -->
      <router-link to="/" class="header-logo">
        <span class="logo-z">Z</span><span class="logo-rest">entro</span>
      </router-link>

      <!-- Acciones lado derecho -->
      <div class="header-actions">
        <template v-if="!user.isLoggedIn">
          <router-link to="/login" class="btn-ghost">Iniciar Sesión</router-link>
          <router-link to="/register" class="btn-primary-header">Registrarse</router-link>
        </template>

        <template v-else>
          <div class="user-menu" @click="dropdownOpen = !dropdownOpen">
            <div class="user-avatar">{{ user.user?.name?.charAt(0).toUpperCase() }}</div>
            <span class="user-name">{{ user.user?.name }}</span>
            <i class="fa-solid fa-chevron-down chevron" :class="{ rotated: dropdownOpen }"></i>

            <div class="dropdown" v-if="dropdownOpen">
              <router-link to="/profile" class="dropdown-item" @click="dropdownOpen = false">
                <i class="fa-regular fa-user"></i> Mi Perfil
              </router-link>
              <router-link to="/" class="dropdown-item" @click="dropdownOpen = false">
                <i class="fa-regular fa-heart"></i> Favoritos
              </router-link>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item logout" @click="handleLogout">
                <i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
              </button>
            </div>
          </div>
        </template>
      </div>

    </div>
  </header>

  <!-- Barra inferior mobile -->
  <nav class="mobile-bottom-bar">
    <router-link to="/" class="mobile-tab" aria-label="Inicio">
      <i class="fa-solid fa-house"></i>
      <span>Inicio</span>
    </router-link>
    <router-link to="/" class="mobile-tab" aria-label="Explorar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>Explorar</span>
    </router-link>
    <router-link :to="user.isLoggedIn ? '/profile' : '/login'" class="mobile-tab" aria-label="Favoritos">
      <i class="fa-regular fa-heart"></i>
      <span>Favoritos</span>
    </router-link>
    <router-link :to="user.isLoggedIn ? '/profile' : '/login'" class="mobile-tab" aria-label="Perfil">
      <i class="fa-regular fa-user"></i>
      <span>Perfil</span>
    </router-link>
  </nav>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

*, *::after, *::before { box-sizing: border-box; }

:root {
  --header-height:     64px;
  --mobile-bar-height: 64px;

  --color-orange: #FF6100;
  --color-navy:   #170453;
  --color-dark:   #333333;
  --color-white:  #ffffff;
  --color-bg:     #f5f5f7;
  --color-border: #e4e4e7;
  --color-muted:  #6b7280;

  --font: 'Roboto', sans-serif;

  --radius-full: 9999px;
  --radius-lg:   16px;
  --radius-md:   12px;
  --radius-sm:   8px;

  --shadow-sm: 0 1px 4px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.10);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.14);
}

body {
  font-family: var(--font);
  background: var(--color-bg);
  color: var(--color-dark);
  -webkit-font-smoothing: antialiased;
}

.responsive-wrapper {
  width: 92%;
  max-width: 1200px;
  margin-inline: auto;
}

/* ── Header ── */
.header-outer {
  height: var(--header-height);
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 200;
  background: rgba(255,255,255,0.93);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.header-logo {
  text-decoration: none;
  display: flex;
  align-items: baseline;
  gap: 1px;
  line-height: 1;
}

.logo-z {
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--color-orange);
  letter-spacing: -0.04em;
}

.logo-rest {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-navy);
  letter-spacing: -0.03em;
}

/* Buttons */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-navy);
  text-decoration: none;
  padding: 0.45rem 1.1rem;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-ghost:hover {
  border-color: var(--color-navy);
  background: #f0eefa;
}

.btn-primary-header {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  padding: 0.45rem 1.1rem;
  border-radius: var(--radius-full);
  background: var(--color-navy);
  border: 1.5px solid var(--color-navy);
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-primary-header:hover {
  background: #220a6b;
  border-color: #220a6b;
}

/* User menu */
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  padding: 0.35rem 0.75rem 0.35rem 0.45rem;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  background: #fff;
  transition: all 0.2s;
  user-select: none;
}

.user-menu:hover { border-color: var(--color-navy); background: #f9f9ff; }

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-navy);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-navy);
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron { font-size: 0.65rem; color: var(--color-muted); transition: transform 0.2s; }
.chevron.rotated { transform: rotate(180deg); }

/* Dropdown */
.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  min-width: 190px;
  z-index: 300;
  overflow: hidden;
  animation: fadeDown 0.15s ease;
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-dark);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  transition: background 0.15s;
}

.dropdown-item:hover { background: #f5f5f7; }
.dropdown-item.logout { color: #dc2626; }
.dropdown-divider { height: 1px; background: var(--color-border); }

/* ── Mobile Bottom Bar ── */
.mobile-bottom-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--mobile-bar-height);
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -2px 16px rgba(0,0,0,0.07);
  z-index: 200;
  justify-content: space-around;
  align-items: center;
}

.mobile-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex: 1;
  padding: 0.5rem 0;
  color: var(--color-muted);
  text-decoration: none;
  font-size: 0.65rem;
  font-weight: 500;
  transition: color 0.2s;
}

.mobile-tab i { font-size: 1.3rem; }

.mobile-tab.router-link-active {
  color: var(--color-orange);
}

/* Responsive */
@media (max-width: 640px) {
  .mobile-bottom-bar { display: flex; }
  .header-actions .btn-ghost { display: none; }
  body { padding-bottom: var(--mobile-bar-height); }
}
</style>
