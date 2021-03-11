<template>
  <div id="home-page">
   
    <Nav></Nav>

    <div id="container-home-page"  >
        
        <Category v-for="category in categories" :key="category.id" 
        :categoryData="category"
        :categories ="categories"

        >

        </Category>
        
    </div>
  </div>    
</template>

<script>
import axios from 'axios'
import Nav from './component/nav.vue'
import Category from './component/category.vue'

export default {
  name: "App",
  components : {Category, Nav},
  data() {
    return {
      base_url : 'http://localhost:3000',
      categories : []
    };
  },
  
  created(){
        console.log('tes masuk created')
        axios({
            url : this.base_url + "/tasks/category",
            method : "get",
            headers : {
                access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhbmVAbWFpbC5jb20iLCJpYXQiOjE2MTU0Njk3NzJ9.LjuH3cTkvocjnbLQ61XSu-sUU0rjJrpgjKqcvYIReNg'
            }
        })
        .then(response=>{
            console.log('sudah masuk response created app vue' , response.data);
            this.categories = response.data
        })
        .catch(err=>{
            console.log(err);
        })
    }
};
</script>

<style>

</style>