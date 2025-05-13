<template>
    <p>{{ post }}</p>
</template>

<script setup>
    export default {
        name: 'BlogContent',
        props: {
            post: {
                type: Object,
                required: true
            }
        }
    },
    created() {
        this.post = substring(this.post, 0, 100) + '...'; 
    }
</script>