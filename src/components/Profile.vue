<script setup>
import Container from "./Container.vue";
import UserBar from './UserBar.vue'
import ImageGallary from './ImageGallary.vue'
</script>

<template>
    <Container>
        <div class="profile-container">
            <UserBar 
                username="RachelGreen"
                :userInfo="{
                    posts: 4,
                    followers: 200,
                    following: 300,
                }"
            />
           <ImageGallary
                :posts="[
                    {
                        id: 1,
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rxSaMZAL4u6Td3OAHXU3yCjqElgmQZylzc5yf8LCkrVoOBxzeIGg9PaQtr7TeDKDy3I&usqp=CAU',

                    },
                    {
                        id: 2,
                        image: 'https://imgix.bustle.com/uploads/image/2022/11/17/dc2648bf-a757-444c-b04a-16688dd7da5b-videoscreenshot-hbo-s5e21theonewiththeball-334.jpg?w=300&h=400&fit=crop&crop=faces&auto=format%2Ccompress'
                    }
                ]"
           />  
        </div>
    </Container>
</template>

<style scoped>
.profile-container {
    /* background-color: aquamarine; */
    align-items: center;
    padding: 20px 0;
}
</style>