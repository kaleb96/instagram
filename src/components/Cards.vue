<script setup>
import Card from "@/components/Card.vue";
import Observer from '@/components/Observer.vue';
import { supabase } from '@/supabase';
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const posts = ref([]);
const lastCardIdx = ref(2);
const ownerIds = ref([]);

//function
const fetchData = async () => {

    const { data: followings } = await supabase
        .from('follower_following')
        .select('following_id')
        .eq('follower_id', user.value.id)
    // console.log({response});
    ownerIds.value = followings.map(f => f.following_id)

    const { data } = await supabase
        .from('posts')
        .select()
        .in('owner_id', ownerIds.value)
        .range(0, lastCardIdx.value)
        .order('created_at', {ascending: false});
    posts.value = data;
}

const fetchNextData = async () => {
 
    // console.log('fetching next data');
    const { data } = await supabase
        .from('posts')
        .select()
        .in('owner_id', ownerIds.value)
        .range(lastCardIdx.value + 1, lastCardIdx.value + 3)
        .order('created_at', {ascending: false});
        console.log({data});

        posts.value = [
            ...posts.value,
            ...data
        ]
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
        <Observer v-if="posts.length" @intersect="fetchNextData" />
    </div>
</template>