<template>
    <button
    :disavled="disabled"
    class="btn" style="background-color: #d2aa97; color: white;" 
    >{{ text }}</button>
</template>

<script setup>
    defineProps({
        text: {
            type: String,
            default: 'Click Me'
        },
        disabled: {
            type: Boolean,
            default: false
        },
    });
</script>

<style scoped> 
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #b38e7b !important;
  color: white !important;
}
</style>