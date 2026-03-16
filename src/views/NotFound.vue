<template>
  <div class="notfound-page">

    <!-- Fondo animado -->
    <div class="bg-circles">
      <div class="circle c1"></div>
      <div class="circle c2"></div>
      <div class="circle c3"></div>
    </div>

    <div class="notfound-content">

      <!-- Logo -->
      <router-link to="/" class="logo-link">
        <span class="logo-z">Z</span>
        <span class="logo-text">entro</span>
      </router-link>

      <!-- Número 404 -->
      <div class="error-number">
        <span class="num">4</span>
        <span class="icon-wrap"><i class="fa-solid fa-store"></i></span>
        <span class="num">4</span>
      </div>

      <h1 class="notfound-title">Esta página no existe</h1>
      <p class="notfound-desc">
        La ruta que buscas no se encontró. Puede que haya sido movida,<br class="br-desktop" />
        eliminada o que hayas escrito mal la dirección.
      </p>

      <div class="notfound-actions">
        <router-link to="/" class="btn-home">
          <i class="fa-solid fa-house"></i> Ir al inicio
        </router-link>
        <button class="btn-back" @click="$router.back()">
          <i class="fa-solid fa-arrow-left"></i> Volver
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.notfound-page {
  min-height: 100vh;
  background: var(--color-navy);
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  padding: 2rem;
}

/* Círculos decorativos de fondo */
.bg-circles { position: absolute; inset: 0; pointer-events: none; }

.circle {
  position: absolute; border-radius: 50%;
  opacity: 0.07;
}
.c1 {
  width: 500px; height: 500px;
  background: var(--color-orange);
  top: -150px; right: -100px;
  animation: float 8s ease-in-out infinite;
}
.c2 {
  width: 320px; height: 320px;
  background: #fff;
  bottom: -80px; left: -60px;
  animation: float 10s ease-in-out infinite reverse;
}
.c3 {
  width: 180px; height: 180px;
  background: var(--color-orange);
  bottom: 30%; right: 10%;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}

/* Contenido */
.notfound-content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  gap: 1.5rem;
  animation: fadein 0.5s ease;
}

@keyframes fadein {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Logo */
.logo-link {
  display: inline-flex; align-items: center; gap: 0.3rem;
  text-decoration: none; margin-bottom: 0.rem;
}
.logo-z {
  font-family: var(--font);
  font-size: 1.6rem; font-weight: 700;
  color: var(--color-orange);
  background: rgba(255,97,0,0.15);
  width: 5px; height: 2px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.logo-text {
  font-family: var(--font);
  font-size: 1.4rem; font-weight: 700; color: #fff;
}

/* Número 404 */
.error-number {
  display: flex; align-items: center; gap: 0.5rem;
}
.num {
  font-family: var(--font);
  font-size: clamp(5rem, 15vw, 9rem);
  font-weight: 700; color: #fff;
  line-height: 1; letter-spacing: -0.04em;
  opacity: 0.15;
}
.icon-wrap {
  font-size: clamp(3rem, 10vw, 6rem);
  color: var(--color-orange);
  opacity: 0.9;
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.08); }
}

/* Textos */
.notfound-title {
  font-family: var(--font);
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 700; color: #fff;
  margin: 0;
}

.notfound-desc {
  font-size: 0.95rem; color: rgba(255,255,255,0.55);
  line-height: 1.7; max-width: 420px; margin: 0;
}

.br-desktop { display: none; }
@media (min-width: 600px) { .br-desktop { display: block; } }

/* Botones */
.notfound-actions {
  display: flex; gap: 0.85rem; flex-wrap: wrap;
  justify-content: center; margin-top: 0.5rem;
}

.btn-home {
  display: inline-flex; align-items: center; gap: 0.45rem;
  background: var(--color-orange); color: #fff;
  padding: 0.75rem 1.75rem; border-radius: var(--radius-full);
  font-size: 0.9rem; font-weight: 700; text-decoration: none;
  font-family: var(--font);
  box-shadow: 0 4px 18px rgba(255,97,0,0.35);
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,97,0,0.45);
}

.btn-back {
  display: inline-flex; align-items: center; gap: 0.45rem;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.8);
  padding: 0.75rem 1.5rem; border-radius: var(--radius-full);
  font-size: 0.9rem; font-weight: 600; cursor: pointer;
  font-family: var(--font); backdrop-filter: blur(6px);
  transition: background 0.2s, color 0.2s;
}
.btn-back:hover {
  background: rgba(255,255,255,0.15);
  color: #fff;
}
</style>