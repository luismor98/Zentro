<script setup>
import { ref, computed } from 'vue'

/**
 * BaseInput
 * Props:
 *  - modelValue:  v-model binding
 *  - type:        'text' | 'email' | 'password' | 'search'
 *  - placeholder: string
 *  - icon:        clase de Font Awesome (ej: 'fa-regular fa-envelope')
 *  - label:       string — etiqueta visible sobre el input
 *  - id:          string
 *  - required:    boolean
 *  - autocomplete: string
 */
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
})

const emit = defineEmits(['update:modelValue'])

// Manejo de mostrar/ocultar contraseña
const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type !== 'password') return props.type
  return showPassword.value ? 'text' : 'password'
})

const isPassword = computed(() => props.type === 'password')
</script>

<template>
  <div class="base-field">
    <label v-if="label" :for="id" class="field-label">{{ label }}</label>

    <div class="field-wrap">
      <!-- Ícono izquierdo -->
      <i v-if="icon" :class="[icon, 'field-icon']"></i>

      <!-- Input -->
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :autocomplete="autocomplete"
        :class="{ 'has-icon': icon, 'has-toggle': isPassword }"
        class="field-input"
        @input="emit('update:modelValue', $event.target.value)"
      />

      <!-- Toggle contraseña -->
      <button
        v-if="isPassword"
        type="button"
        class="toggle-btn"
        @click="showPassword = !showPassword"
        :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      >
        <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.base-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  font-size: 0.83rem;
  font-weight: 500;
  color: var(--color-dark);
}

.field-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 0.95rem;
  color: var(--color-muted);
  font-size: 0.85rem;
  pointer-events: none;
  z-index: 1;
}

.field-input {
  width: 100%;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 0.75rem 1rem;
  font-size: 0.92rem;
  font-family: var(--font);
  font-weight: 400;
  color: var(--color-dark);
  outline: none;
  background: #fafafa;
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* Padding extra si hay ícono izquierdo */
.field-input.has-icon {
  padding-left: 2.6rem;
}

/* Padding extra si hay toggle de contraseña */
.field-input.has-toggle {
  padding-right: 2.75rem;
}

.field-input:focus {
  border-color: var(--color-navy);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(23,4,83,0.08);
}

.field-input::placeholder {
  color: #aaa;
  font-weight: 400;
}

.toggle-btn {
  position: absolute;
  right: 0.95rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-muted);
  font-size: 0.85rem;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.toggle-btn:hover {
  color: var(--color-dark);
}
</style>
