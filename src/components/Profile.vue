<script setup>
import Container from "./Container.vue";
import UserBar from './UserBar.vue'
import ImageGallary from './ImageGallary.vue'
import { ref, onMounted, watch, reactive } from 'vue';
import {useRoute} from 'vue-router';
import { supabase } from '@/supabase';
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

//state
const user = ref(null);
const route = useRoute();
const { username } = route.params
const posts = ref([]);
const loading = ref(false);
const isFollowing = ref(false);
const userStore = useUserStore();
const { user: loggedInUser } = storeToRefs(userStore);
const userInfo = reactive({
    posts: null,
    followers: null,
    following: null
})


//functions
// 1.addNewPost
const addNewPost = (post) => {
    posts.value.unshift(post);
}

//2 dataFetch
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

    await fetchIsFollowing();
    userInfo.followers = await fetchFollowerCount();
    userInfo.following = await fetchFollowingCount();
    userInfo.posts = posts.value.length;
    
    loading.value = false;
}

//3 fetch Following data
const fetchIsFollowing = async () => {

    if(loggedInUser.value && (loggedInUser.value.id !== user.value.id)){
        const {data} =  await supabase
            .from('follower_following')
            .select()
            .eq('follower_id', loggedInUser.value.id)
            .eq('following_id', user.value.id)
            .single()
    
            if(data) return isFollowing.value = true
    }
    
    
}

//4. updateIsFollowing
const updateIsFollowing = (follow) => {

    isFollowing.value = follow
}

//5. count follower
const fetchFollowerCount = async() => {

    const {count} = await supabase
        .from('follower_following')
        .select('*', { count: 'exact'})
        .eq('following_id', user.value.id)
    return count;
}

//6. count following
const fetchFollowingCount = async() => {

    const { count } = await supabase
    .from('follower_following')
    .select('*', { count: 'exact'})
    .eq('follower_id', user.value.id) 
    return count;
}

watch(loggedInUser, () => {

    fetchIsFollowing()   
})

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
                :userInfo="userInfo"
                :addNewPost="addNewPost"
                :isFollowing="isFollowing"
                :updateIsFollowing="updateIsFollowing"
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