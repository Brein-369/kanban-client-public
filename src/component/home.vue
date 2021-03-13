<template>
    <div>
      <Nav @logout="logout"></Nav> 
        <div class="h2 text-center pt-5 text-capitalize">Hello <span class="h2 text-center pb-3 text-capitalize">{{currentUserName}} !</span></div>
        <div class="h4 text-center pb-2 text-secondary">Feel free to drag your tasks below</div>
        <div id="container-home-page"  >
            <Category v-for="category in categoriesName" :key="category.id" 
            :categoryData="category"
            :categories ="categories"
            :categoriesName="categoriesName"
            :allTasks="allTasks"
            :dataEditTask="dataEditTask"
            @getAllTask="getAllTask"
            @addTask="addTask"
            @deleteTask="deleteTask"
            @moveTask="moveTask"
            @getEditTask="getEditTask"
            @doEditTask="doEditTask"
            >
            </Category>    
        </div>
    </div>
</template>

<script>

import Nav from './nav.vue'
import Category from './category.vue'
export default {
    name : 'home',
    components : {Category, Nav},
    props : ["categoriesName","allTasks","dataEditTask", "currentUserName"],
    data(){
        return {
            base_url : 'http://localhost:3000',
            categories : []
        }
    },
    created(){
        this.$emit("getCategoryName")
    },
    methods : {
        logout(){
            this.$emit("logout")
        },
        getAllTask(){
            this.$emit("getAllTask")
        },
        addTask(data){
            this.$emit("addTask", data)
        },
        deleteTask(id){
            this.$emit('deleteTask', id)
        },
        moveTask(data){
            this.$emit("moveTask",data)
        },
        getEditTask(id){
            this.$emit('getEditTask', id)
        },
        doEditTask(data){
            this.$emit('doEditTask', data)
        }

        
    }
}
</script>

<style>

</style>