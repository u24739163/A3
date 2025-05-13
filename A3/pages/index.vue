<template>
    <div class="container py-5">
        <h1 class="display-4 text-center mb-5">All Blogs</h1>
        
        <select>
            <option value="none">Filter by Category</option>
            <Category :categories=categories />
        </select>

        <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span class="ms-3">Loading blogs...</span>
        </div>
        
        <div v-else-if="error" class="alert alert-danger text-center">
            <strong>Error:</strong> {{ error }}
        </div>

        <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div class="col" v-for="post in posts" :key="post.id">
                <PostCard :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
import PostCard from '../components/BlogCard.vue';
import Category from '../components/Category.vue';
export default {
    components: {
        PostCard
    },
    data() {
        return {
            posts: [],
            categories: [],
            loading: true,
            error: null
        }
    },
    async created() {
        try {
            var response = await fetch('http://localhost:1337/api/blog-posts?populate=author'
            , {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer KEY`,
                    'Content-Type': 'application/json'
                }
            }
            );
            if (!response.ok) throw new Error('Failed to fetch users');
            var data = await response.json();
            this.posts = data.data;

            response = await fetch('http://localhost:1337/api/categories'
            , {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer KEY`,
                    'Content-Type': 'application/json'
                }
            }
            );
            if (!response.ok) throw new Error('Failed to fetch users');
            data = await response.json();
            this.categories = data.data;
        } catch (err) {
            this.error = err.message;
            console.error('API Error:', err);
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style scoped>
/* You can keep any custom styles here if needed */
</style>