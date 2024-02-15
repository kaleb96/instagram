<script setup>
import { defineProps } from 'vue'

const props = defineProps(['username','userInfo']);


</script>
<template>
    <div class="userbar-container">
        <div class="top-content">
            <a-typography-title :level="3">{{ props.username }}</a-typography-title>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{props.userInfo.posts}} posts</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.followers}} followers</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.following}} following</a-typography-title>
        </div>
    </div>
</template>

<style scoped>

.userbar-container {
    padding-bottom: 75px;
}

.bottom-content {
    display: flex;
    align-items: center;

}

.bottom-content h5 {
    margin: 0 !important;
    padding: 0;
    margin-right: 30px !important;
    
}
</style>