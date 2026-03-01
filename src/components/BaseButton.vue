<script setup>
/**
 * BaseButton
 * Props:
 *  - variant:  'primary' | 'secondary' | 'ghost'
 *  - type:     'button' | 'submit'
 *  - disabled: boolean
 *  - loading:  boolean — muestra spinner automáticamente
 *  - full:     boolean — ancho 100%
 *  - as:       'button' | 'a' — para usar como enlace (usar junto con router-link wrapping)
 */
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'secondary', 'ghost'].includes(v),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :type="type"
    class="base-btn"
    :class="[`btn--${variant}`, { 'btn--full': full, 'btn--loading': loading }]"
    :disabled="disabled || loading"
  >
    <i v-if="loading" class="fa-solid fa-spinner fa-spin btn-spinner"></i>
    <slot v-else />
    <span v-if="loading" class="btn-loading-text"><slot /></span>
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.85rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  font-weight: 500;
  font-family: var(--font);
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s;
  text-decoration: none;
  white-space: nowrap;
}

.base-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none !important;
}

/* ── Primario ── */
.btn--primary {
  background: var(--color-navy);
  color: #fff;
  border-color: var(--color-navy);
  box-shadow: 0 4px 16px rgba(23,4,83,0.28);
}

.btn--primary:hover:not(:disabled) {
  background: #220a6b;
  border-color: #220a6b;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(23,4,83,0.35);
}

/* ── Secundario ── */
.btn--secondary {
  background: transparent;
  color: var(--color-navy);
  border-color: var(--color-navy);
}

.btn--secondary:hover:not(:disabled) {
  background: var(--color-navy);
  color: #fff;
}

/* ── Ghost ── */
.btn--ghost {
  background: transparent;
  color: var(--color-navy);
  border-color: var(--color-border);
}

.btn--ghost:hover:not(:disabled) {
  border-color: var(--color-navy);
  background: #f0eefa;
}

/* ── Ancho completo ── */
.btn--full {
  width: 100%;
}

/* Spinner: ocultar texto original, mostrar solo ícono + texto */
.btn--loading .btn-spinner { display: inline-block; }
.btn-loading-text { margin-left: 0.35rem; }
</style>
