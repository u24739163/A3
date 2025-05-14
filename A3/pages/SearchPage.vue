<template>
  <div class="container my-5">
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
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading posts...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>
    
    <div v-else-if="filteredPosts.length === 0 && searchQuery" class="alert alert-info text-center">
      No posts found for "<strong>{{ searchQuery }}</strong>"
    </div>
    
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

const searchQuery = ref('')
const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/strapi-send', {
      method: 'POST',
      body: "http://strapi:1337/api/blog-posts?populate=author",
    });
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

</script>

<style scoped>
@import "../styles/searchPage.css";
</style>