<template>
    <div v-for="category in categories" :key="category.id" :value="category.id">
        <option :value="category.id">{{ category.Name }}</option>
    </div>
</template>

<script>
    export default {
        props: {
            categories: {
                type: Array,
                required: true
            }
        }
    }
</script>