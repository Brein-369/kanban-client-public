<template>
  <div class="flex" :class="categoryData.name+'-shadow'">
        <div :id="categoryData.name+'-header'" class="flex-header header-font">{{categoryData.name}}</div>
        <div :id="categoryData.name+'-content'" class="content" >

            <Task v-for="task in filterCategory.Tasks" :key="task.id "
            :categoryData = "categoryData"
            :taskData = "task"
            :user = "task.User"
            >
            </Task>

          
        </div>
        <div :id="categoryData.name+'-footer'" class="flex-footer">
          <form @submit.prevent="addTask(categoryData.name, categoryData.id)">
            <label :for="categoryData.name+'-input'">{{categoryData.name+' title'}}</label>
            <input type="text" v-model="inputTaskTitle" :id="categoryData.name+'-input'" />
            <label :for="categoryData.name+'-due_date'">{{categoryData.name+' due date'}}</label>
            <input type="date" v-model="inputTaskDueDate" :id="categoryData.name+'-due_date'" />
            <button type="submit">Add {{categoryData.name}}</button>
          </form>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import Task from './task.vue'
export default {
    name : "category",
    components : {Task},
    data(){
        return {
            base_url : 'http://localhost:3000',
            inputTaskTitle : '',
            inputTaskDueDate : '',
            tasks : []
        }
    },
    props : ["categories","categoryData"],
    methods : {
        addTask(catName, catId){
            console.log( "masuk method addtask",this.inputTaskTitle, catId, this.inputTaskDueDate);
            
            axios({
                url : this.base_url + "/tasks",
                method : "post",
                headers : {
                    access_token : localStorage.access_token
                },
                data :{
                    title : this.inputTaskTitle,
                    CategoryId : catId,
                    due_date : this.convertDateToString
                }
            })
            .then(response=>{
                console.log('masuk response add task', response.data);
                this.getAllTask()
            })
            .catch(err=>{
                console.log(err.response.data);
            })
            //then setelah catch mirip always()
            .then(()=>{
                this.inputTaskTitle = ''
                this.inputTaskDueDate = ""
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
                this.tasks = response.data
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    created(){
        this.getAllTask()

    },
    computed : {
        filterCategory(){
            let result = this.tasks.filter(e => {
                console.log(this.categoryData.name);
                return e.name === this.categoryData.name
            })
            return result[0]
        },
        convertDateToString(){
            return this.inputTaskDueDate.split("T")[0]
        }
    }

}
</script>

<style>

</style>