<script setup>
import { defineProps } from 'vue';

const props = defineProps(['posts'])
const {VITE_BASE_PHOTO_URL} = import.meta.env;
</script>

<template>
    <div class="image-gallary-container">
        <img 
            v-for="post in props.posts"
            :key="post.id"
            :src="`${VITE_BASE_PHOTO_URL}${post.url}`" 
        >
    </div>
</template>

<style scoped>
.image-gallary-container {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
}

img {
    margin: 5px;
    width: 200px;
}
</style>

