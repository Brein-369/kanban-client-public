<template>

  <div>
    

    <Login v-if="page === 'login' && !isLogin" 
    @doSignIn="login" 
    @loginGoogle="loginGoogle"
    @changePageRegister="pageToRegister"
    ></Login>

    <Register v-if="page === 'register' && !isLogin" 
    @doRegister="register" 
    @changePageLogin="pageToLogin"
    ></Register>

    <Home v-if="isLogin" 
    @logout="logout"
    @getCategoryName="getCategoryName"
    @getAllTask="getAllTask"
    @addTask="addTask"
    @deleteTask="deleteTask"
    @moveTask="moveTask"
    @getEditTask="getEditTask"
    @doEditTask="doEditTask"
    :categoriesName="categoriesName"
    :allTasks="allTasks"
    :dataEditTask="dataEdit"
    :currentUserName="currentUserName"
  
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
      isLogin : false,
      categoriesName : [],
      allTasks : [],
      dataEdit : {},
      isLoginGoogle :false,
      currentUserName : ""
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
        this.currentUserName = (response.data.email).split("@")[0]
        this.checkLocalStorage()
        
      })
      .catch(err=>{
        console.log(err.response.data);
      })
    },
    logout(){
      localStorage.clear()
      this.page = "login"
      this.checkLocalStorage()
      if(this.loginGoogle){
        this.isLoginGoogle = false
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }
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

    loginGoogle(id_token){
      console.log(id_token, "id token di method appvue");
      axios({
          url : this.base_url + '/loginGoogle',
          method : "post",
          data : {
            googleToken : id_token
          }
        })
        .then(response=>{
          console.log(response,"ini response access token")
          localStorage.setItem('access_token', response.data.access_token)
          this.currentUserName = (response.data.email).split("@")[0]
          this.isLoginGoogle = true
          this.checkLocalStorage()
        })
        .catch(err=>{
          console.log(err.response.data);
        })
        console.log(googleUser.getBasicProfile());
    },

    pageToRegister(){
      this.page = 'register'
    },

    pageToLogin(){
      this.page = 'login'
    },

    getCategoryName(){
      axios({
          url : this.base_url + "/tasks/category",
          method : "get",
          headers : {
              access_token : localStorage.access_token
          }
      })
      .then(response=>{
          console.log('sudah masuk response method getalldata home.vue' , response.data);
          this.categoriesName = response.data
      })
      .catch(err=>{
          console.log(err);
      })
    },

    getAllTask(){
      axios({
          url : this.base_url + "/tasks",
          method : "get",
          headers : {
              access_token : localStorage.access_token
          }
      })
      .then(response=>{
          console.log(response.data, 'sudah masuk response getAllTask');
          this.allTasks = response.data
      })
      .catch(err=>{
          console.log(err);
      })
    },
    
    addTask(data){
      axios({
        url : this.base_url + "/tasks",
        method : "post",
        headers : {
            access_token : localStorage.access_token
        },
        data :{
            title : data.title,
            CategoryId : data.CategoryId,
            due_date : data.due_date
        }
      })
      .then(response=>{
          console.log('masuk response add task', response.data);
          this.getAllTask()
      })
      .catch(err=>{
          console.log(err.response.data);
      })
    },

    deleteTask(id){
      axios({
        url : this.base_url + '/tasks/' +id,
        method : 'delete',
        headers :{
          access_token : localStorage.access_token
        }
      })
      .then(response=>{
        console.log("delete success ini response");
        console.log(response.data.message);
        this.getAllTask()
      })
      .catch(err=>{
        console.log(err.response.data);
      })
    },

    moveTask(data){
      axios({
        url: this.base_url + '/tasks/' + data.dataId,
        method : "patch",
        headers :{
          access_token : localStorage.access_token
        },
        data :{
          CategoryId : data.CategoryId
        }
      })
      .then(response=>{
        console.log(response.data);
        this.getAllTask()
      })
      .catch(err=>{
        console.log(err.response.data);
      })
    },
    getEditTask(id){
      axios({
        url : this.base_url + "/tasks/" + id,
        method : "get",
        headers : {
          access_token : localStorage.access_token
        }
      })
      .then(response=>{
        this.dataEdit = response.data
        console.log(this.dataEdit);
      })
      .catch(err=>{
        console.log(err.response.data);
      })
    },
    doEditTask(data){
      axios({
        url : this.base_url + '/tasks/' + data.taskId,
        method : "put",
        headers : {
          access_token : localStorage.access_token
        },
        data : {
          title : data.title,
          CategoryId : data.CategoryId,
          due_date : data.due_date
        }
      })
      .then(response=>{
        console.log(response.data);
        this.getAllTask()
      })
      .catch(err=>{
        console.log(err.response.data);
      })
    }

  }
};
</script>

<style>

</style>