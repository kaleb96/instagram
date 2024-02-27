<script setup>
import LogInMessage from '@/components/LogInMessage.vue'
import Cards from '@/components/Cards.vue'
import Container from "@/components/Container.vue";
import { useUserStore } from '@/stores/users'
import { storeToRefs } from "pinia";


const userStore = useUserStore();
const { user, loadingUser } = storeToRefs(userStore);


</script>

<template>
    <Container>
        <div v-if="!loadingUser">
            <Cards v-if="user" />
            <LogInMessage v-else/>
        </div>
        <div v-else class="timeline-spinner">
            <a-spin size="large"></a-spin>
        </div>
    </Container>
</template>

<style>
.timeline-container {
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}

.timeline-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;
}
</style>