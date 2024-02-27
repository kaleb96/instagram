<script setup>
import Card from "@/components/Card.vue";
import { supabase } from '@/supabase';
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const posts = ref([]);

//function
const fetchData = async () => {

    const { data: followings } = await supabase
        .from('follower_following')
        .select('following_id')
        .eq('follower_id', user.value.id)
    // console.log({response});
    const owner_ids = followings.map(f => f.following_id)

    const { data } = await supabase
        .from('posts')
        .select()
        .in('owner_id', owner_ids)
        .order('created_at', {ascending: false});
    posts.value = data;
}

onMounted(() => {
    fetchData();
})
</script>

<template>
    <div class="timeline-container">
        <Card v-for="post in posts"
            :key="post.id"
            :post="post"
        />
    </div>
</template>