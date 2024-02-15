import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/supabase';

export const useUserStore = defineStore('user', () => {

    const user = ref(null)
    const errorMessage = ref('');
    const handleLogin = () => {}
    
    const handleSignup = async (credentials) => {

        const {email, password, username} = credentials;
        
        /* email validate */
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
        };

        if(password.length < 6) {
            return errorMessage.value = "Password length is too short"
        }

        if(username.length < 4) {
            return errorMessage.value = 'Username is too short';
        }
        
        if(!(validateEmail(email))) { /* email validate fail */
            return errorMessage.value = 'Email is invalidate'
        }


        // validate if user Exist

        const { data: userWithUsername } = await supabase
            .from('users')
            .select()
            .eq('username', username)
            .single()
        if(userWithUsername) {
            return errorMessage.value = 'User already exists';
        }

        errorMessage.value = '';

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if(error) {
            return errorMessage.value = error.message
        }

        await supabase.from("users").insert({
            username,
            email
        })

        console.log({ data });
    }

    const handleLogout = () => {}
    const getUser= () => {}
    const clearErrorMessage = () => {
        errorMessage.value = '';
    }
    return { 
        user, 
        errorMessage, 
        handleLogin, 
        handleSignup, 
        handleLogout, 
        getUser,
        clearErrorMessage
    }
})