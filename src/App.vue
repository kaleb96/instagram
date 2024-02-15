<script setup>
import Nav from '@/components/Nav.vue'
import {RouterView} from 'vue-router'
</script>

<template>
  <main>
      <Nav/>
      <router-view/>
  </main>
</template>

<style scoped>

</style>
