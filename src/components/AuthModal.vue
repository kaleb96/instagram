<script setup>
import { ref, defineProps, reactive } from 'vue';
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { errorMessage } = storeToRefs(userStore);
const visible = ref(false);
const userCredentials = reactive({
    email: '',
    password: '',
    username: ''
})

const showModal = () => {
    visible.value = true;
};

const handleOk = (e) => {
    
    userStore.handleSignup(userCredentials)
};

const handleCancel = () => {
    userStore.clearErrorMessage();
    visible.value = false;
}

const props = defineProps(['isLogin'])

</script>

<template>
  <div>
    <a-button type="primary" @click="showModal" class="btn">{{ props.isLogin ? 'Login' : 'SignUp' }}</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
        <template #footer>
            <a-button key="back" @click="handleCancel">Cancel</a-button>
            <a-button key="submit" type="primary" @click="handleOk">Submit</a-button>
        </template>

        <a-input class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="UserName"></a-input>
        <a-input class="input" v-model:value="userCredentials.email" placeholder="Email"></a-input>
        <a-input class="input" v-model:value="userCredentials.password" placeholder="Password" type="password"></a-input>
        <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
    </a-modal>
  </div>
</template>

<style scoped>
.btn {
    margin-left : 10px;
}

.input {
    margin-top : 5px;
}
</style>