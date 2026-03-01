<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../stores/auth.js'

const router  = useRouter()
const route   = useRoute()
const { login } = useAuth()

const email        = ref('')
const password     = ref('')
const showPassword = ref(false)
const error        = ref('')
const loading      = ref(false)

async function handleLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Por favor completa todos los campos.'
    return
  }
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  login({ name: email.value.split('@')[0], email: email.value })
  router.push(route.query.redirect || '/profile')
  loading.value = false
}
</script>

<template>
  <div class="login-page">

    <!-- ══ 60% — Presentación ══ -->
    <div class="promo-panel">
      <div class="bubble bubble-1"></div>
      <div class="bubble bubble-2"></div>
      <div class="bubble bubble-3"></div>

      <div class="promo-content">
        <router-link to="/" class="promo-logo">
          <span class="logo-z">Z</span><span class="logo-rest">entro</span>
        </router-link>

        <h1 class="promo-title">
          El corazón digital de<br/>
          <span class="promo-highlight">Valera, Trujillo</span>
        </h1>
        <p class="promo-sub">
          Conectamos a los emprendedores locales con su comunidad.<br/>
          Descubre, apoya y crece junto a tu ciudad.
        </p>

        <div class="feature-cards">
          <div class="feat-card">
            <div class="feat-icon"><i class="fa-solid fa-store"></i></div>
            <div>
              <h3>Emprendimientos verificados</h3>
              <p>Solo negocios reales y confiables de Valera</p>
            </div>
          </div>
          <div class="feat-card">
            <div class="feat-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            <div>
              <h3>Búsqueda inteligente</h3>
              <p>Encuentra lo que necesitas en segundos</p>
            </div>
          </div>
          <div class="feat-card">
            <div class="feat-icon"><i class="fa-regular fa-heart"></i></div>
            <div>
              <h3>Guarda tus favoritos</h3>
              <p>Accede rápido a tus negocios preferidos</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ 40% — Formulario ══ -->
    <div class="form-panel">
      <div class="form-card">

        <h2 class="form-title">Iniciar Sesión</h2>

        <form @submit.prevent="handleLogin" class="the-form">

          <div v-if="error" class="form-error">
            <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
          </div>

          <div class="field">
            <label for="email">Correo electrónico</label>
            <div class="input-wrap">
              <i class="fa-regular fa-envelope i-icon"></i>
              <input id="email" v-model="email" type="email"
                placeholder="tucorreo@ejemplo.com"
                autocomplete="email" required />
            </div>
          </div>

          <div class="field">
            <label for="password">Contraseña</label>
            <div class="input-wrap">
              <i class="fa-solid fa-lock i-icon"></i>
              <input id="password" v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password" required />
              <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
              </button>
            </div>
          </div>

          <!-- Botón primario -->
          <button type="submit" class="btn-primary-form" :disabled="loading">
            <span v-if="!loading">Iniciar Sesión</span>
            <span v-else><i class="fa-solid fa-spinner fa-spin"></i> Ingresando...</span>
          </button>

          <!-- Olvidaste contraseña debajo del botón -->
          <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>

          <div class="or-divider"><span>o</span></div>

          <!-- Botón secundario -->
          <router-link to="/register" class="btn-secondary-form">
            Crear cuenta nueva
          </router-link>

        </form>
      </div>
    </div>

  </div>

  <!-- ══ Vista tablet/mobile: layout apilado ══ -->
  <div class="mobile-login">
    <div class="mobile-header">
      <router-link to="/" class="promo-logo">
        <span class="logo-z">Z</span><span class="logo-rest">entro</span>
      </router-link>
    </div>

    <div class="mobile-form-card">
      <h2 class="form-title">Iniciar Sesión</h2>

      <form @submit.prevent="handleLogin" class="the-form">

        <div v-if="error" class="form-error">
          <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
        </div>

        <div class="field">
          <label for="email-m">Correo electrónico</label>
          <div class="input-wrap">
            <i class="fa-regular fa-envelope i-icon"></i>
            <input id="email-m" v-model="email" type="email"
              placeholder="tucorreo@ejemplo.com"
              autocomplete="email" required />
          </div>
        </div>

        <div class="field">
          <label for="password-m">Contraseña</label>
          <div class="input-wrap">
            <i class="fa-solid fa-lock i-icon"></i>
            <input id="password-m" v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="current-password" required />
            <button type="button" class="eye-btn" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
            </button>
          </div>
        </div>

        <button type="submit" class="btn-primary-form" :disabled="loading">
          <span v-if="!loading">Iniciar Sesión</span>
          <span v-else><i class="fa-solid fa-spinner fa-spin"></i> Ingresando...</span>
        </button>

        <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>

        <div class="or-divider"><span>o</span></div>

        <router-link to="/register" class="btn-secondary-form">
          Crear cuenta nueva
        </router-link>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* ══════════════════════════════
   DESKTOP — dos columnas 60/40
══════════════════════════════ */
.login-page {
  display: grid;
  grid-template-columns: 3fr 2fr;
  min-height: 100vh;
}

.mobile-login { display: none; }

/* ── Panel izquierdo 60% ── */
.promo-panel {
  background: linear-gradient(145deg, #170453 0%, #1f0a6e 45%, #2a0d8f 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 4rem;
}

.bubble {
  position: absolute;
  border-radius: 50%;
}
.bubble-1 { width: 500px; height: 500px; bottom: -150px; right: -100px; background: rgba(255,97,0,0.12); }
.bubble-2 { width: 280px; height: 280px; top: -80px;    left: -80px;  background: rgba(255,97,0,0.08); }
.bubble-3 { width: 160px; height: 160px; top: 40%;      right: 8%;    background: rgba(255,255,255,0.04); }

.promo-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
}

.promo-logo {
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  margin-bottom: 2.5rem;
}

.logo-z    { font-size: 3.2rem; font-weight: 700; color: var(--color-orange); letter-spacing: -0.04em; }
.logo-rest { font-size: 2.9rem; font-weight: 700; color: rgba(255,255,255,0.9); letter-spacing: -0.03em; }

.promo-title {
  font-size: clamp(1.9rem, 2.8vw, 2.7rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.promo-highlight { color: var(--color-orange); }

.promo-sub {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.feature-cards {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.feat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  backdrop-filter: blur(6px);
  transition: background 0.2s;
}

.feat-card:hover { background: rgba(255,255,255,0.1); }

.feat-icon {
  width: 44px; height: 44px;
  border-radius: var(--radius-md);
  background: var(--color-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.feat-card h3 { font-size: 0.9rem; font-weight: 500; color: #fff; margin-bottom: 0.2rem; }
.feat-card p  { font-size: 0.78rem; font-weight: 400; color: rgba(255,255,255,0.55); }

/* ── Panel derecho 40% ── */
.form-panel {
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
}

.form-card {
  width: 100%;
  max-width: 380px;
}

.form-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-bottom: 1.75rem;
  letter-spacing: -0.02em;
}

/* ── Form ── */
.the-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 0.8rem;
  padding: 0.65rem 1rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.field { display: flex; flex-direction: column; gap: 0.4rem; }

.field label {
  font-size: 0.83rem;
  font-weight: 500;
  color: var(--color-dark);
}

.input-wrap { position: relative; display: flex; align-items: center; }

.i-icon {
  position: absolute;
  left: 0.95rem;
  color: var(--color-muted);
  font-size: 0.85rem;
  pointer-events: none;
}

.input-wrap input {
  width: 100%;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  font-size: 0.92rem;
  font-family: var(--font);
  font-weight: 400;
  color: var(--color-dark);
  outline: none;
  background: #fafafa;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrap input:focus {
  border-color: var(--color-navy);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(23,4,83,0.08);
}

.eye-btn {
  position: absolute;
  right: 0.95rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-muted);
  font-size: 0.85rem;
  padding: 0;
  line-height: 1;
}
.eye-btn:hover { color: var(--color-dark); }

.btn-primary-form {
  width: 100%;
  padding: 0.85rem;
  background: var(--color-navy);
  color: #fff;
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  font-weight: 500;
  font-family: var(--font);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(23,4,83,0.28);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  margin-top: 0.25rem;
}

.btn-primary-form:hover:not(:disabled) {
  background: #220a6b;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(23,4,83,0.35);
}

.btn-primary-form:disabled { opacity: 0.65; cursor: not-allowed; }

.forgot-link {
  text-align: center;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-orange);
  text-decoration: none;
}
.forgot-link:hover { text-decoration: underline; }

.or-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-muted);
  font-size: 0.78rem;
}
.or-divider::before,
.or-divider::after { content: ''; flex: 1; height: 1px; background: var(--color-border); }

.btn-secondary-form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  color: var(--color-navy);
  border: 1.5px solid var(--color-navy);
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  font-weight: 500;
  font-family: var(--font);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.btn-secondary-form:hover { background: var(--color-navy); color: #fff; }


/* ══════════════════════════════
   TABLET + MOBILE
══════════════════════════════ */
@media (max-width: 900px) {
  .login-page { display: none; }

  .mobile-login {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--color-bg);
    align-items: center;
    justify-content: flex-start;
    padding: 3rem 1.25rem 3rem;
  }

  .mobile-header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  /* Logo mobile: Z naranja + "entro" morado */
  .mobile-header .logo-rest {
    color: #170453;
  }

  .mobile-form-card {
    background: #fff;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: 2rem 1.75rem;
    width: 100%;
    max-width: 520px;
  }
}

@media (max-width: 480px) {
  .mobile-login {
    background: #fff;
    padding: 2rem 0.75rem;
  }

  .mobile-form-card {
    box-shadow: none;
    border-radius: var(--radius-md);
    padding: 1.5rem 1.25rem;
    max-width: 100%;
  }
}
</style>
