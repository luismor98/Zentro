<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
*, *::after, *::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-main, 'DM Sans', sans-serif);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #f9fafb;
  color: var(--color-text, #1a1a2e);
}

/* Estilo de la barra de desplazamiento */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
