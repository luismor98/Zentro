<script setup>
defineProps({
  id: {
    type: [Number, String],
    default: 1,
  },
  name: {
    type: String,
    default: 'Emprendimiento',
  },
  category: {
    type: String,
    default: 'General',
  },
  image: {
    type: String,
    default: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2160462672/assets/placeholder.png?1746171717218425',
  },
  rating: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <img :src="image" :alt="name" loading="lazy" />
      <span class="card-category">{{ category }}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ name }}</h3>
      <div class="card-rating" v-if="rating > 0">
        <i v-for="i in 5" :key="i"
          :class="i <= rating ? 'fa-solid fa-star' : 'fa-regular fa-star'"
          class="star"></i>
      </div>
    </div>
    <div class="card-footer">
      <router-link :to="`/detail/${id}`" class="btn-card">
        Ver detalles <i class="fa-solid fa-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  background: #fff;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  margin: 0.75rem;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}

.card-header {
  position: relative;
  overflow: hidden;
  height: 180px;
}

.card-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.card:hover .card-header img {
  transform: scale(1.04);
}

.card-category {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(31, 46, 62, 0.85);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-body {
  padding: 1rem 1.1rem 0.5rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.4rem;
}

.card-rating {
  display: flex;
  gap: 0.15rem;
}

.star {
  font-size: 0.75rem;
  color: #f59e0b;
}

.card-footer {
  padding: 0.75rem 1.1rem 1rem;
  border-top: 1px solid var(--color-border);
  margin-top: 0.5rem;
}

.btn-card {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: gap 0.2s;
}

.btn-card:hover {
  gap: 0.65rem;
}
</style>
