<template>
  <div class="blog-container">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading blog post...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <div class="error-icon">!</div>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="post.length > 0" class="blog-content">
  <div class="blog-header">
    <h1 class="blog-title">{{ post[0].Name }}</h1>
    <div class="meta-info-container">
      <div class="author-info">
        <span class="author-name">
          {{ post[0].author.Name }} 
          {{ post[0].author.Surname }}
        </span>
        <span class="publish-date">
          {{ formatDate(post[0].publishedAt) }}
        </span>
      </div>
      <div class="category-info">
        {{ post[0].CategoryBlogs.Name }}
      </div>
    </div>
  </div>

  <div class="blog-body">
    <div class="content" v-html="formatContent(post[0].Content)"></div>
  </div>
</div>

    <div v-else class="empty-state">
      <p>Blog Post not Found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref([]);
const error = ref(null);
const loading = ref(true);
const id = route.params.id;

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const formatContent = (content) => {
  return content;
};

onMounted(async () => {
  try {
      const response = await fetch('/api/strapi-send', {
      method: 'POST',
      body: `http://strapi:1337/api/blog-posts?populate=author&blog-posts?&populate=CategoryBlogs&filters[id][$eq]=${id}`,
      });

    if (!response.ok) throw new Error('Failed to fetch Blog Post');
    const data = await response.json();
    post.value = data.data;
  } catch (err) {
    error.value = err.message;
    console.error('API Error:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
@import '../../styles/blogPage.css';
</style>