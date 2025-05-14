<template>
  <div class="post-card card h-100">
    <div class="card-body">
      <h3 class="card-title">{{ post.Name }}</h3>
      <p class="card-subtitle mb-2 text-muted">
        By {{ post.author.Name }} {{ post.author.Surname }}
      </p>
      <p class="card-text">{{ shortContent }}</p>
    </div>
    <div class="card-footer bg-transparent border-top-0">
      <NuxtLink class="nav-link" :to="`/BlogPostPage/${post.id}`">
        <Button text="View Blog"/>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import { useRoute } from 'vue-router';
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    shortContent() {
      if (!this.post.Content) return '';
      return this.post.Content.substring(0, 100) + '...';
    }


  }
}
</script>

<style scoped>
.post-card {
  border: 1px solid #d2aa97;
  transition: transform 0.3s ease;
  background-color: #fffaf7;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(210, 170, 151, 0.2);
}

.card-title {
  color: #5a4a42;
}

.card-text {
  color: #6c757d;
}
</style>