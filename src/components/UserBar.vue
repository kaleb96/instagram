<script setup>
import { defineProps } from 'vue'
import UploadPhotoModal from '@/components/UploadPhotoModal.vue'
import {useRoute} from 'vue-router';
import { useUserStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { supabase } from '@/supabase';

//state
const route = useRoute();
const userStore = useUserStore();
const { user } = storeToRefs(userStore)
const { username: profileUsername } = route.params
const props = defineProps(['user','userInfo', 'addNewPost', 'isFollowing', 'updateIsFollowing']);

// functions
//1. follow
const followUser = async() => {

    props.updateIsFollowing(true);
    const response = await supabase
        .from('follower_following')
        .insert({
            follower_id: user.value.id,
            following_id: props.user.id
        })
    // console.log({response});
}   

//2. unfollow
const unfollowUser = async() => {

    props.updateIsFollowing(false);
    const response = await supabase
        .from('follower_following')
        .delete()
        .eq('follower_id', user.value.id)
        .eq('following_id', props.user.id)
        // console.log({response});
}


</script>
<template>
    
    <div class="userbar-container" v-if="props.user">
        <div class="top-content">
            <a-typography-title :level="3">{{ props.user.username }}</a-typography-title>
            <div v-if="user">
                <UploadPhotoModal 
                    v-if="(profileUsername === user.username)"
                    :addNewPost="addNewPost"
                />
                <div v-else>
                    <a-button v-if="!props.isFollowing" @click="followUser">Follow</a-button>
                    <a-button v-else @click="unfollowUser">Following</a-button>
                </div>
            </div>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{props.userInfo.posts}} posts</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.followers}} followers</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.following}} following</a-typography-title>
        </div>
    </div>
    <div class="userbar-container" v-else>
        <div class="top-content">
            <a-typography-title :level="3">User not Found</a-typography-title>
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

.top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>