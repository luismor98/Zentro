<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth.js'
import ZentroLogo from '../components/ZentroLogo.vue'
import BaseInput  from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const { register } = useAuth()

const name     = ref('')
const email    = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)

async function handleRegister() {
  error.value = ''
  if (!name.value || !email.value || !password.value) {
    error.value = 'Por favor completa todos los campos.'
    return
  }
  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }
  loading.value = true
  try {
    await register(name.value, email.value, password.value)
    // Supabase envía un email de confirmación
    // Por ahora redirigimos al home con un mensaje
    router.push('/profile')
  } catch (e) {
    error.value = e.message || 'Error al crear la cuenta. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-card">

      <ZentroLogo size="lg" rest-color="#333333" />

      <h1 class="reg-title">Crea tu cuenta</h1>
      <p class="reg-subtitle">Es gratis y solo toma un momento</p>

      <form class="reg-form" @submit.prevent="handleRegister">

        <div v-if="error" class="reg-error">
          <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
        </div>

        <BaseInput
          v-model="name"
          id="name"
          label="Nombre completo"
          type="text"
          placeholder="Tu nombre completo"
          icon="fa-regular fa-user"
          autocomplete="name"
          :required="true"
        />

        <BaseInput
          v-model="email"
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          icon="fa-regular fa-envelope"
          autocomplete="email"
          :required="true"
        />

        <BaseInput
          v-model="password"
          id="password"
          label="Contraseña"
          type="password"
          placeholder="Mínimo 6 caracteres"
          icon="fa-solid fa-lock"
          :required="true"
        />

        <BaseButton type="submit" variant="primary" :full="true" :loading="loading">
          Crear cuenta
        </BaseButton>

      </form>

      <p class="reg-switch">
        ¿Ya tienes cuenta?
        <router-link to="/login">Iniciar sesión</router-link>
      </p>

    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: 2rem 1rem;
}

.register-card {
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2.75rem 2.25rem;
  width: 100%;
  max-width: 420px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reg-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-top: 1rem;
  margin-bottom: 0.35rem;
  letter-spacing: -0.02em;
}

.reg-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-muted);
  margin-bottom: 2rem;
}

.reg-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  text-align: left;
  width: 100%;
}

.reg-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 0.82rem;
  padding: 0.65rem 1rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reg-switch {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-muted);
}

.reg-switch a {
  color: var(--color-orange);
  font-weight: 500;
  text-decoration: none;
}
.reg-switch a:hover { text-decoration: underline; }
</style>
