<script setup>
import {onMounted} from 'vue'
import Nav from '@/components/Nav.vue'
import {RouterView} from 'vue-router'
import { useUserStore } from '@/stores/users'

const userStore = useUserStore();

onMounted(() => {

  userStore.getUser();
})
</script>

<template>
  <main>
      <Nav />
      <router-view />
  </main>
</template>
