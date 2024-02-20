<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';


// state
const visible = ref(false);
const caption = ref('');
const file = ref(null);

// functions

//1. open uploadModal
const showModal = () => {
    visible.value = true;
};

//2. submit and closeModal
const handleOk = async(e) => {

    // To make filename to randomNum
    const fileName = Math.floor(Math.random() * 100000000000);
    if(file.value) {
        const response = await supabase.storage.from("images").upload('public/' + fileName, file.value);
        console.log({response});
    }
};

//3. handleUploadChange
const handleUploadChange = (e) => {

    if(e.target.files[0]) {
        file.value= e.target.files[0];
    }

}

</script>

<template>
<div>
    <a-button @click="showModal">Open Modal</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
        <input type="file" accept=".jpeg, .png, .jpg" @change="handleUploadChange">
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