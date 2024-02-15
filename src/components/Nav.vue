<script setup>
import {RouterLink, useRouter} from 'vue-router'
import Container from './Container.vue'
import AuthModal from './AuthModal.vue'
import {ref} from 'vue'

const router = useRouter()
const search = ref('')
const isAuthenticated = ref(false);

const onSearch = () => {
    if(search.value) {
        router.push(`/profile/${search.value}`);
        search.value = '';
    }
}

</script>
<template>
    <a-layout-header>
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
            <div class="left-content" v-if="!isAuthenticated">
                <AuthModal :isLogin="false"/>
                <AuthModal :isLogin="true" />
            </div>
            <div class="left-content" v-else>
                <a-button type="primary">Profile</a-button>
                <a-button type="primary">Logout</a-button>
            </div>
           </div>
        </Container>
    </a-layout-header>
</template>

<style scoped>
.nav-container {
    display: flex;
    justify-content: space-between;
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