import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/supabase';

export const useUserStore = defineStore('user', () => {

    //state
    const user = ref({})
    const errorMessage = ref('');
    const loading = ref(false);
    const loadingUser = ref(false);
    
    // functions
    // 1. validate Email
    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    // 2. signUp
    const handleSignup = async (credentials) => {

        const {email, password, username} = credentials;
        
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
        
        loading.value = true;

        //start supabase
        const { data: userWithUsername } = await supabase
            .from('users')
            .select()
            .eq('username', username)
            .single()

        if(userWithUsername) {
            loading.value = false;
            return errorMessage.value = 'User already exists';
        }

        errorMessage.value = '';
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if(error) {
            loading.value = false;
            return errorMessage.value = error.message
        }

        await supabase.from("users").insert({
            username,
            email
        })

        const { data:  newUser } = await supabase
            .from('users')
            .select()
            .eq('email', email)
            .single()
        
        user.value = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username
        }
        loading.value = false;
     
    }

    //3. Login
    const handleLogin = async (credentials) => {

        const { email, password } = credentials;

        // validate Email
        if(!(validateEmail(email))) { /* email validate fail */
            return errorMessage.value = 'Email is invalidate'
        }

        // validate password length
        if(!password.length) {
            return errorMessage.value = 'Password cannot be empty';
        }

        loading.value = true;

        const {error} = await supabase.auth.signInWithPassword( {
            email,
            password
        })

        if(error) {

            loading.value = false;
            return errorMessage.value = error.message;
        } else {

           const{ data: existingUser } = await supabase
           .from("users")
           .select()
           .eq('email', email)
           .single()
            
           user.value = {
                email: existingUser.email,
                username: existingUser.username,
                id: existingUser.id
           }

           loading.value = false;
           errorMessage.value = '';
        }

    };

    //4. getUser
    const getUser= async () => {
        
        loadingUser.value = true;
        const {data}= await supabase.auth.getUser();
        
        if(!data.user)  {
            loadingUser.value = false;
            return user.value =null
        }

        const {data: userWithEmail} = await supabase
            .from("users")
            .select()
            .eq("email", data.user.email)
            .single()
        
        user.value = {

            username: userWithEmail.username,
            email: userWithEmail.email,
            id: userWithEmail.id
        }
        loadingUser.value = false;
    }

    const handleLogout = () => {}
    const clearErrorMessage = () => {
        errorMessage.value = '';
    }
    return { 
        user, 
        errorMessage, 
        loading,
        loadingUser,
        handleLogin, 
        handleSignup, 
        handleLogout, 
        getUser,
        clearErrorMessage
    }
})