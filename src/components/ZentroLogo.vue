<script setup>
/**
 * ZentroLogo
 * Props:
 *  - zColor:    color de la "Z"          (default: naranja)
 *  - restColor: color de "entro"         (default: navy oscuro)
 *  - size:      'sm' | 'md' | 'lg' | 'xl'
 */
defineProps({
  zColor: {
    type: String,
    default: '#FF6100',
  },
  restColor: {
    type: String,
    default: '#170453',
  },
  size: {
    type: String,
    default: 'md',      // sm | md | lg | xl
    validator: v => ['sm', 'md', 'lg', 'xl'].includes(v),
  },
})
</script>

<template>
  <router-link to="/" class="zentro-logo" :class="`logo--${size}`">
    <span class="z" :style="{ color: zColor }">Z</span><span
      class="rest" :style="{ color: restColor }">entro</span>
  </router-link>
</template>

<style scoped>
.zentro-logo {
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 1px;
  line-height: 1;
  user-select: none;
}

.z, .rest {
  font-weight: 700;
  letter-spacing: -0.04em;
}

/* Tamaños */
.logo--sm  .z   { font-size: 1.3rem; }
.logo--sm  .rest { font-size: 1.15rem; letter-spacing: -0.03em; }

.logo--md  .z   { font-size: 1.7rem; }
.logo--md  .rest { font-size: 1.5rem; letter-spacing: -0.03em; }

.logo--lg  .z   { font-size: 2.2rem; }
.logo--lg  .rest { font-size: 2rem; letter-spacing: -0.03em; }

.logo--xl  .z   { font-size: 3.2rem; }
.logo--xl  .rest { font-size: 2.9rem; letter-spacing: -0.03em; }
</style>
