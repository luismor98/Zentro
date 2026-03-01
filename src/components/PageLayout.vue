<script setup>
import HeaderComp from './HeaderComp.vue'
import FooterComp from './FooterComp.vue'
</script>

<template>
  <div class="page-layout">
    <HeaderComp />
    <main class="page-main">
      <slot />
    </main>
    <FooterComp />
  </div>
</template>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-main {
  flex: 1;
  padding-top: var(--header-height);
}

/* Espacio para la barra mobile inferior */
@media (max-width: 640px) {
  .page-main {
    padding-bottom: var(--mobile-bar-height);
  }
}
</style>
