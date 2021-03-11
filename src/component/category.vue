<template>
  <div class="flex" :class="categoryData.name+'-shadow'">
        <div :id="categoryData.name+'-header'" class="flex-header header-font">{{categoryData.name}}</div>
        <div :id="categoryData.name+'-content'" class="content" >

            <Task v-for="task in filterCategory.Tasks" :key="task.id "
            :categoryData = "categoryData"
            :taskData = "task"
            :users = "filterCategory.Users"
            >
                
            </Task>

          
        </div>
        <div :id="categoryData.name+'-footer'" class="flex-footer">
          <form @submit.prevent="addTask(categoryData.name, categoryData.id)">
            <input type="text" v-model="input" :id="categoryData.name+'-input'" />
            <button type="submit">Add {{categoryData.name}}</button>
          </form>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import Task from '../component/task.vue'
export default {
    name : "category",
    components : {Task},
    data(){
        return {
            base_url : 'http://localhost:3000',
            input : '',
            tasks : []
        }
    },
    props : ["categories","categoryData"],
    methods : {
        addTask(catName, catId){
            console.log(catName, catId);
            console.log(this.input)

        }
    },
    created(){
        axios({
            url : this.base_url + "/tasks",
            method : "get",
            headers : {
                access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhbmVAbWFpbC5jb20iLCJpYXQiOjE2MTU0Njk3NzJ9.LjuH3cTkvocjnbLQ61XSu-sUU0rjJrpgjKqcvYIReNg'
            }
        })
        .then(response=>{
            console.log(response.data);
            this.tasks = response.data
        })
        .catch(err=>{
            console.log(err);
        })

    },
    computed : {
        filterCategory(){
            let result = this.tasks.filter(e => {
                console.log(this.categoryData.name);
                return e.name === this.categoryData.name
            })
            return result[0]
        }
    }

}
</script>

<style>

</style>