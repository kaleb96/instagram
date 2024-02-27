<script setup>
import Card from "@/components/Card.vue";
import { supabase } from '@/supabase';
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const data = [
    {
        id: 1,
        username: 'joy',
        url: 'https://www.looper.com/img/gallery/joey-tribbianis-friends-timeline-explained/intro-1621866381.jpg',
        caption: 'it is!'
    },
    {
        id: 2,
        username: 'chandler',
        url: 'https://pyxis.nymag.com/v1/imgs/079/792/3ed0d94be0a9bd3d023f00532889bab152-30-chandler-bing.rsquare.w330.jpg',
        caption: 'hahahah'
    }
]

//function
const fetchData = async () => {

    const response = await supabase
        .from('follower_following')
        .select('following_id')
        .eq('follower_id', user.value.id)
    console.log({response});
}

onMounted(() => {
    fetchData();
})
</script>

<template>
    <div class="timeline-container">
        <Card v-for="post in data"
            :key="post.id"
            :post="post"
        />
    </div>
</template>