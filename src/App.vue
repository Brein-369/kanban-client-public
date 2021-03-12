<template>

  <div>
    

    <Login v-if="page === 'login' && !isLogin" 
    @doSignIn="login" 
    @changePageRegister="pageToRegister"
    ></Login>

    <Register v-if="page === 'register' && !isLogin" 
    @doRegister="register" 
    @changePageLogin="pageToLogin"
    ></Register>

    <Home v-if="isLogin" 
    @logout="logout"
    ></Home>
    

  </div>

</template>

<script>
import axios from 'axios'
import Home from './component/home.vue'
import Register from './component/register.vue'
import Login from './component/login.vue'

export default {
  name: "App",
  components : {Home, Register, Login},
  data() {
    return {
      base_url : 'http://localhost:3000',
      page : '',
      isLogin : false
    };
  },
  
  created(){
    this.checkLocalStorage()

  },
  methods : {
    checkLocalStorage(){
      if(localStorage.access_token){
        console.log('masuk local true');
        this.isLogin = true 
      }
      else{
        this.isLogin = false
        this.page = "login"
      }
    },

    login(dataUserObj){
      axios({
        url : this.base_url + "/login",
        method : "post",
        data : {
          email : dataUserObj.email,
          password : dataUserObj.password
        }
      })
      .then(response=>{
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token)
        this.checkLocalStorage()
        
      })
      .catch(err=>{
        console.log(err.response.data);
      })
    },

    logout(){
      localStorage.removeItem('access_token')
      this.page = "login"
      this.checkLocalStorage()
    },

    register(dataUserObj){
      
      console.log(dataUserObj);
      axios({
        url : this.base_url + "/register",
        method : "post",
        data : {
          email : dataUserObj.email,
          password : dataUserObj.password
        }
      })
      .then(response=>{
        console.log('masuk response');
        console.log(response.data);
        // kasih modal success disini
        this.page = "login"
      })
      .catch(err=>{
        console.log('masuk error');
        console.log(err.response.data);
      })
    },

    pageToRegister(){
      this.page = 'register'
    },

    pageToLogin(){
      this.page = 'login'
    },

  }
};
</script>

<style>

</style>