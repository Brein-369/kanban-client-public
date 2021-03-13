<template>
  

  <div :id="categoryData.name+'-each-content'" class="each-content shadow-sm" >
    <div class="row text-right">
      <div class="col-12 text-secondary font-italic" v-if="taskData.due_date">Due date : {{taskData.due_date.split('T')[0]}}</div>
    </div>  
    <div class="row font-weight-bold">
      <div class="col-12">{{taskData.title}}</div>
    </div>
    <div class="row text-secondary font-italic">
      <div class="col-8">{{user.email}}</div>
    </div>
    <div >
      <div class="w-100 text-right">
        
        <div class="dropdown pt-3">
          <button class="btn-sm" data-toggle="modal" data-target="#exampleModal" @click.prevent="getEditTask(taskData.id)">Edit
          </button> 
          
          <button class="btn-sm" @click="deleteTask(taskData.id)">Delete
            </button> 
          <button type="button" class="btn-sm dropdown-toggle" data-toggle="dropdown">
            Move to
          </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" v-for="eachCategory in filterCategoryMinusOne" :key="eachCategory.id"
              @click.prevent="moveTask(taskData.id, eachCategory.id)"
              >{{eachCategory.name}}</a>
            </div>

            <!--ini modal edit-->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="title-" class="col-form-label">Title:</label>
                        <input type="text" class="form-control" id="title" v-model="dataEditTask.title">
                      </div>
                      <div class="form-group">
                          <div class="form-group">
                            <label for="categoryId">Task Category:</label>
                            <select class="form-control" id="categoryId" v-model="dataEditTask.CategoryId">
                              <option selected>Choose Category</option>
                              <option v-for="eachCategory in categoriesName" :key="eachCategory.id" :value="eachCategory.id">{{eachCategory.name}}</option>
                            </select>
                          </div>
                      </div>
                      <div class="form-group">
                        <label for="due_date" class="col-form-label">Due Date:</label>
                        <input type="date" class="form-control" id="due_date" v-model="date">
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal"  @click.prevent="doEditTask(taskData.id)">Edit Task</button>
                  </div>
                </div>
              </div>
            </div>
            <!--ini modal edit-->
        </div>
        
      </div>
      
    </div>
  </div>

  


</template>

<script>
import draggable from 'vuedraggable'
export default {
    name : "task",
    components : {
      draggable
    },
    data(){
        return {
          date : ''
            // inputTitle : '',
            // inputCategoryId : '',
            // inputDueDate : ''
            // date : this.convertToDate(taskData.due_date)
        }
    },
    props : ["user", "taskData", "categoryData", "categoriesName","dataEditTask"],
    methods : {
      deleteTask(id){
        this.$emit('deleteTask',id)       
      },
      moveTask(id, catId){
        console.log(id, catId);
        console.log('masuk method moveTask');
        this.$emit('moveTask',{
          dataId : Number(id),
          CategoryId : Number(catId)
        })
      },
      getEditTask(id){
        console.log('masuk get edit task', id);
        this.$emit("getEditTask", id)
      },
      doEditTask(id){
        let obj = {
          taskId : id,
          title : this.dataEditTask.title,
          CategoryId : this.dataEditTask.CategoryId,
          due_date : this.date
        }
        console.log(obj);
        this.$emit("doEditTask",obj)
      
      },
      


    },
    computed:{
      filterCategoryMinusOne(){
        console.log(this.categoriesName);
          let result = this.categoriesName.filter(e=>{
            return e.name !== this.categoryData.name
          })
          return result
      },
      convertedDate(){
        console.log( this.dataEditTask.due_date.split("T")[0])
        return this.dataEditTask.due_date.split('T')[0]
      }
      
    }
    
};
</script>

<style>
</style>