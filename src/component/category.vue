<template>
  <div class="flex" :class="categoryData.name+'-shadow'">
        <div :id="categoryData.name+'-header'" class="flex-header header-font">{{categoryData.name}}</div>
        <div :id="categoryData.name+'-content'" class="content" >

         <draggable  group="tasks" :list="filterCategory.Tasks" @change="drag($event)">
                <Task v-for="task in filterCategory.Tasks" :key="task.id"
                :categoryData = "categoryData"
                :categoriesName= "categoriesName"
                :taskData = "task"
                :user = "task.User"
                :dataEditTask = "dataEditTask"
                @deleteTask = "deleteTask"
                @moveTask = "moveTask"
                @getEditTask = "getEditTask"
                @doEditTask= "doEditTask"
                >
                </Task>

         </draggable>


            

          
        </div>
        <div :id="categoryData.name+'-footer'" class="flex-footer">
          <form @submit.prevent="addTask(categoryData.name, categoryData.id)">
            <label :for="categoryData.name+'-input'" class="text-capitalize">{{categoryData.name+' title'}}</label>
            <input type="text" v-model="inputTaskTitle" :id="categoryData.name+'-input'" />
            <label :for="categoryData.name+'-due_date'" class="text-capitalize">{{categoryData.name+' due date'}}</label>
            <input type="date" v-model="inputTaskDueDate" :id="categoryData.name+'-due_date'" />
            <button class="text-capitalize" type="submit">Add {{categoryData.name}}</button>
          </form>
        </div>
      </div>
</template>

<script>
import draggable from 'vuedraggable'
import Task from './task.vue'
export default {
    name : "category",
    components : {Task, draggable},
    data(){
        return {
            
            inputTaskTitle : '',
            inputTaskDueDate : '',
        }
    },
    props : ["categories","categoryData","allTasks", "categoriesName", "dataEditTask"],
    methods : {
        
        addTask(catName, catId){
            
            this.$emit("addTask",{
                title : this.inputTaskTitle,
                CategoryId : catId,
                due_date : this.convertDateToString
            })
            this.inputTaskTitle = ''
            this.inputTaskDueDate = ""
            
        },
        getAllTask(){
            this.$emit("getAllTask")
        },
        deleteTask(id){
            this.$emit('deleteTask', id)
        },
        moveTask(data){
            console.log(data);
            this.$emit("moveTask",data)
        },
        getEditTask(id){
            this.$emit('getEditTask', id)
        },
        doEditTask(data){
            this.$emit('doEditTask',data)
        },
        drag(event){
            console.log(event.added.newIndex);
            let obj ={
                dataId : event.added.element.id, 
                CategoryId: event.added.newIndex+=1
            }
            console.log(obj);
            this.$emit('moveTask', obj);
        }
        
    },
    created(){
        this.$emit("getAllTask")

    },
    computed : {
        filterCategory(){
            let result = this.allTasks.filter(e => {
                console.log(this.categoryData.name);
                return e.name === this.categoryData.name
            })
            return result[0]
        },
        convertDateToString(){
            return this.inputTaskDueDate.split("T")[0]
        },
        getIdTask(){
            re
        }
    }

}
</script>

<style>

</style>