<script setup>
import { ref } from 'vue';

// state
const visible = ref(false);
const caption = ref('');

// functions

//1. open uploadModal
const showModal = () => {
    visible.value = true;
};

//2. submit and closeModal
const handleOk = (e) => {
    // console.log(e);
    visible.value = false;
};

//3. handleUploadChange
const handleUploadChange = () => {

    if(e.target.files[0]) {
        file.value= e.target.files[0];
    }
    console.log(e);

}

</script>

<template>
<div>
    <a-button @click="showModal">Open Modal</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
        <input type="file" accept=".jpeg, .png" @change="handleUploadChange">
        <a-input 
            v-model:value="caption" 
            placeholder="Caption..."
            :maxLength="50"
        />
    </a-modal>
</div>
</template>


<style scoped>
input {
    margin-top: 10px;
}
</style>