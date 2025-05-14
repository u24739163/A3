<template>
  <div class="container my-5">
    <!-- Bootstrap Search Bar -->
    <div class="row justify-content-center mb-4">
      <div class="col-md-8">
        <div class="input-group">
          <input
            v-model="searchQuery"
            type="search"
            class="form-control form-control-lg"
            placeholder="Search posts..."
            aria-label="Search posts"
            @input="handleSearch"
          />
          <button class="btn btn-primary" type="button" @click="handleSearch">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading posts...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>
    
    <!-- No Results -->
    <div v-else-if="filteredPosts.length === 0 && searchQuery" class="alert alert-info text-center">
      No posts found for "<strong>{{ searchQuery }}</strong>"
    </div>
    
    <!-- Results Grid -->
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="post in filteredPosts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PostCard from '../components/BlogCard.vue'

// Reactive state
const searchQuery = ref('')
const posts = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch all posts on component mount
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:1337/api/blog-posts?populate=author', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer 4a9eade45e37e248c118d45d4401837ddd4ec7a9d0ad20aa1aba493b7ea1debcfc5fef65bd7643b024f5d51753bd3d5b773b414ca08529d2e46be3ce7e38ec3c95586dc2acaf15d122a8be8604e0dcb3dbc67eb7dc511fa8c497d27af8eab22630984a61640ee7df279045f239b3d8b6da0ce13194bd10c530c0245f2787df61`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) throw new Error('Failed to fetch posts')
    const data = await response.json()
    posts.value = data.data
    
  } catch (err) {
    error.value = err.message
    console.error('API Error:', err)
  } finally {
    loading.value = false
  }
})

// Filter posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value
  
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => {
    return (
      post.Name?.toLowerCase().includes(query) ||
      post.Content?.toLowerCase().includes(query) ||
      post.author.Name.toLowerCase().includes(query)
    )
  })
})

// Optional: Debounce search input
const handleSearch = () => {
  // You can add debounce logic here if needed
}
</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-container {
  display: flex;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #646cff;
}

.search-button {
  padding: 0 1rem;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #535bf2;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.loading, .error, .no-results {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #ff4d4f;
}
</style>