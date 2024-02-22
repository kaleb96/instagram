<script setup>
import Container from "./Container.vue";
import UserBar from './UserBar.vue'
import ImageGallary from './ImageGallary.vue'
import { ref, onMounted } from 'vue';
import {useRoute} from 'vue-router';
import { supabase } from '@/supabase';

const user = ref(null);
const route = useRoute();
const { username } = route.params
const posts = ref([]);
const loading = ref(false);

const addNewPost = (post) => {
    posts.value.unshift(post);
}

const fetchData = async () => {
    
    loading.value = true;
    
    const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();
    // console.log({response});         

    if(!userData) {
        loading.value = false;
        return user.value = null;
    }

    user.value = userData;
 
    const { data: postData} = await supabase
    .from('posts')
    .select()
    .eq('owner_id',user.value.id);

    posts.value = postData;

    loading.value = false;
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar 
                :key="$route.params.username"
                :user="user"
                :userInfo="{
                    posts: 4,
                    followers: 200,
                    following: 300,
                }"
                :addNewPost="addNewPost"
            />
           <ImageGallary :posts="posts"/>  
        </div>
        <div v-else class="spinner">
            <a-spin size="large"/>
        </div>
    </Container>
</template>

<style scoped>
.profile-container {
    /* background-color: aquamarine; */
    align-items: center;
    padding: 20px 0;
}
.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh
}
</style>