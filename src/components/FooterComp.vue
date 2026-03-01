<script setup></script>

<template>
  <footer class="footer-outer">
    <div class="footer-inner responsive-wrapper">
      <div class="footer-brand">
        <span class="footer-logo">Zentro</span>
        <p class="footer-tagline">Conectando emprendedores en Valera, Trujillo</p>
      </div>
      <div class="footer-social">
        <a href="#" class="social-link" aria-label="Facebook">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a href="#" class="social-link" aria-label="Instagram">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="#" class="social-link" aria-label="WhatsApp">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>
      <p class="footer-copy">© {{ new Date().getFullYear() }} Zentro. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-outer {
  background-color: var(--color-orange);
  padding: 2.5rem 0 1.5rem;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
}

.footer-logo {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
}

.footer-tagline {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
  margin-top: 0.25rem;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  color: #fff;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.social-link:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

.footer-copy {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
}
</style>
