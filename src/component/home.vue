<template>
    <div>
      <Nav @logout="logout"></Nav> 
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
import Nav from './nav.vue'
import Category from './category.vue'
export default {
    name : 'home',
    components : {Category, Nav},
    data(){
        return {
            base_url : 'http://localhost:3000',
            categories : []
        }
    },
    created(){
        this.getCategoryName()
    },
    methods : {
        logout(){
            this.$emit("logout")
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
                this.categories = response.data
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>