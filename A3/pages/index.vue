<template>
    <div class="container py-5">
        <h1 class="display-4 text-center mb-5">All Blogs</h1>
        
        <div class="category-filter mb-4">
            <select 
                class="form-select"
                v-model="selectedCategory"
                @change="filterPostsByCategory"
            >
                <option value="none">Filter by Category</option>
                <option 
                    v-for="category in categories" 
                    :key="category.id" 
                    :value="category.Name"
                >
                    {{ category.Name }}
                </option>
            </select>
        </div>

        <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span class="ms-3">Loading blogs...</span>
        </div>
        
        <div v-else-if="error" class="alert alert-danger text-center">
            <strong>Error:</strong> {{ error }}
        </div>
        <div v-else-if="filteredPosts.length === 0" class="alert alert-info text-center">
            No blogs available in this category.
        </div>
        <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div class="col" v-for="post in filteredPosts" :key="post.id">
                <PostCard :post="post" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PostCard from '../components/BlogCard.vue';

const posts = ref([]);
const categories = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedCategory = ref('none');
const allPosts = ref([]);
const config = useRuntimeConfig()

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'none') return posts.value;
  
  const selectedCat = categories.value.find(cat => cat.Name === selectedCategory.value);
  if (!selectedCat) return [];
  
  const selectedBlogs = selectedCat.blog_posts;
  const finalArr = [];
  
  selectedBlogs.forEach(blog => {
    finalArr.push(posts.value.find(post => post.id === blog.id));
  });
  
  return finalArr || [];
});

onMounted(async () => {
  try {
    let response = await fetch('/api/strapi-send', {
      method: 'POST',
      body: "http://strapi:1337/api/blog-posts?populate=author",
    });
    if (!response.ok) throw new Error('Failed to fetch blogs');
    let data = await response.json();
    posts.value = data.data;
    allPosts.value = [...posts.value];

    response = await fetch('/api/strapi-send', {
      method: 'POST',
      body: "http://strapi:1337/api/categories?populate=blog_posts",
    });
    if (!response.ok) throw new Error('Failed to fetch categories');
    data = await response.json();
    categories.value = data.data;

  } catch (err) {
    error.value = err.message;
    console.error('API Error:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
@import '../styles/index.css';
</style>