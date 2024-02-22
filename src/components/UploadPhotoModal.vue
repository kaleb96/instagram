<script setup>
import { ref, defineProps} from 'vue';
import { supabase } from '@/supabase';
import { useUserStore} from '@/stores/users'
import { storeToRefs } from 'pinia';

// state
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const visible = ref(false);
const caption = ref('');
const file = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const props = defineProps(['addNewPost']);
// functions

//1. open uploadModal
const showModal = () => {
    visible.value = true;
};

//2. submit and closeModal
const handleOk = async(e) => {

    loading.value = true;
    // To make filename to randomNum
    const fileName = Math.floor(Math.random() * 100000000000);
    let filePath = '';
    if(file.value) {
        const {data, error} = await supabase.storage.from("images").upload('public/' + fileName, file.value);
        
        if(error) {
            loading.value = false;
            return errorMessage.value = 'Unable to upload the image';
        }
        filePath = data.path
        await supabase.from('posts').insert({

            url: filePath,
            caption: caption.value,
            owner_id : user.value.id

        })
    }
    loading.value = false;
    visible.value = false;
    caption.value = '';
    
    props.addNewPost({
        url: filePath,
        caption: caption.value,
        owner_id : user.value.id
    })
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
    <a-button @click="showModal">Upload Photo</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
        <div v-if="!loading">
            <input type="file" accept=".jpeg, .png, .jpg" @change="handleUploadChange">
            <a-input 
            v-model:value="caption" 
            placeholder="Caption..."
            :maxLength="50"
            />
            <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
        </div>
        <div v-else class="spinner">
            <a-spin />
        </div>
    </a-modal>
</div>
</template>


<style scoped>
input {
    margin-top: 10px;
}

.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>