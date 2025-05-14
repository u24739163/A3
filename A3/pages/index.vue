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

// Reactive state
const posts = ref([]);
const categories = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedCategory = ref('none');
const allPosts = ref([]);
const config = useRuntimeConfig()

// Computed property for filtered posts
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

// Fetch data
onMounted(async () => {
  try {
    // Fetch blog posts
    let response = await fetch('/api/strapi-send', {
      method: 'POST',
      body: "http://localhost:1337/api/blog-posts?populate=author",
    });
    if (!response.ok) throw new Error('Failed to fetch blogs');
    let data = await response.json();
    posts.value = data.data;
    allPosts.value = [...posts.value];

    // Fetch categories
    response = await fetch('/api/strapi-send', {
      method: 'POST',
      body: "http://localhost:1337/api/categories?populate=blog_posts",
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

// No need to explicitly define components in script setup - they're automatically available in template
</script>

<style scoped>
.category-filter {
    max-width: 300px;
    margin: 0 auto 2rem;
}

.form-select {
    background-color: #fffaf7;
    border: 2px solid #d2aa97;
    color: #5a4a42;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(210, 170, 151, 0.1);
}

.form-select:focus {
    border-color: #b38e7b;
    box-shadow: 0 0 0 0.25rem rgba(210, 170, 151, 0.25);
}

.alert-info {
    background-color: #fffaf7;
    border-color: #d2aa97;
    color: #5a4a42;
}
</style>