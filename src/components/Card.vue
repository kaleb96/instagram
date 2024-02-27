<script setup>
    import { defineProps } from 'vue'
    const props = defineProps(['post'])

</script>
<template>
    <a-card hoverable style="width: 240px" class="card">
      <template #cover>
        <img alt="post" :src="`https://hemtznujjsqltxercoeq.supabase.co/storage/v1/object/public/images/${post.url}`" />
      </template>
      <a-card-meta :title="post.username">
        <template #description>{{ post.caption }}</template>
      </a-card-meta>
    </a-card>
</template>

<style scoped>

.card {
    margin-bottom: 20px;
}
</style>