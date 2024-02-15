<script setup>
import Card from "./Card.vue";
import Container from "./Container.vue";

const data = [
    {
        id: 1,
        username: 'Rachel Green',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4h9YBEP8vjbTXjFoweRBAzqcRURb3ImFiw&usqp=CAU',
        caption: 'we were not on a break'
    },
    {
        id: 2,
        username: 'Ross Geller',
        url : 'https://i0.wp.com/www.ourmovielife.com/wp-content/uploads/2020/03/unagi.jpg?resize=800%2C500&ssl=1',
        caption: 'Unagi'
    }
]
</script>

<template>
    <Container>
        <div class="timeline-container">
            <Card v-for="post in data"
                :key="post.id"
                :post="post"
            />
        </div>
    </Container>
</template>

<style scoped>
.timeline-container {
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
</style>