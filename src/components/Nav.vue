<script setup>
import {RouterLink, useRouter} from 'vue-router'
import Container from './Container.vue'
import AuthModal from './AuthModal.vue'
import {ref} from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUserStore();

// state
const { user, loadingUser } = storeToRefs(userStore);
const router = useRouter()
const search = ref('')
const isAuthenticated = ref(false);

//functions
//1. searchProfile
const onSearch = () => {
    if(search.value) {
        router.push(`/profile/${search.value}`);
        search.value = '';
    }
}

//2. Logout
const handleLogout = async () => {
    await userStore.handleLogout();
}

//3. goProfile 
const goUserProfile = () => {
    router.push(`/profile/${user.value.username}`);
}
</script>

<template>
    <a-layout-header class="layout">
        <Container>
           <div class="nav-container">
                <div class="right-content">
                    <RouterLink to="/">Instagram</RouterLink>
                    <a-input-search
                        v-model:value="search"
                        placeholder="Search..."
                        style="width: 200px"
                        @search="onSearch"
                    />
                </div>
                <div class="content" v-if="!loadingUser">
                    <div class="left-content" v-if="!user">
                        <AuthModal :isLogin="false"/>
                        <AuthModal :isLogin="true" />
                    </div>
                    <div class="left-content" v-else>
                        <a-button type="primary" @click="goUserProfile">Profile</a-button>
                        <a-button type="primary" @click="handleLogout">Logout</a-button>
                    </div>
                </div>
           </div>
        </Container>
    </a-layout-header>
</template>


<style scoped>
.layout {
    width: 100%;
    min-width:1072px;
}
.nav-container {
    display: flex;
    justify-content: space-between;
}

.content {
    display: flex;
    align-items: center;
}
.right-content {
    display: flex;
    align-items: center;
}

.right-content a {
    margin-right: 10px;
}

.left-content {
    display: flex;
    align-items: center;
}

.left-content button {
    margin-left: 10px;
}

</style>