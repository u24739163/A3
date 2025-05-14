<template>
  <div class="blog-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading blog post...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">!</div>
      <p>{{ error }}</p>
    </div>

    <!-- Blog Content -->
    <div v-else-if="post.length > 0" class="blog-content">
      <div class="blog-header">
        <h1 class="blog-title">{{ post[0].Name }}</h1>
        <div class="author-info">
          <span class="author-name">
            {{ post[0].author.Name }} 
            {{ post[0].author.Surname }}
          </span>
          <span class="publish-date">
            {{ formatDate(post[0].publishedAt) }}
          </span>
        </div>
      </div>

      <div class="blog-body">
        <div class="content" v-html="formatContent(post[0].Content)"></div>
      </div>
    </div>

    <!-- Empty State -->
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
      body: `http://localhost:1337/api/blog-posts?populate=author&filters[id][$eq]=${id}`,
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
.blog-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #d2aa97;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #fff0f0;
  border-radius: 8px;
  color: #d32f2f;
}

.error-icon {
  width: 30px;
  height: 30px;
  background-color: #d32f2f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
}

/* Blog Content */
.blog-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #d2aa97;
}

.blog-title {
  color: #5a4a42;
  font-size: 2.2rem;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.author-info {
  display: flex;
  align-items: center;
  color: #6c757d;
  font-size: 0.95rem;
}

.author-name {
  font-weight: 500;
  margin-right: 1rem;
  color: #5a4a42;
}

.publish-date {
  opacity: 0.8;
}

.blog-body {
  line-height: 1.8;
  color: #333;
}

.content {
  font-size: 1.1rem;
}

.content p {
  margin-bottom: 1.5rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-title {
    font-size: 1.8rem;
  }
  
  .content {
    font-size: 1rem;
  }
}
</style>