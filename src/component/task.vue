<template>

  <div :id="categoryData.name+'-each-content'" class="each-content">
    <div class="row">
      <div class="col-12">{{taskData.title}}</div>
    </div>
    <div class="row">
      <div class="col-8">{{user.email}}</div>
    </div>
    <div class="row justify-content-around">
      <div class="w-100 mx-auto">
        <button>Edit</button> <button>Delete</button> <button>Done</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
    name : "task",
    data(){
        return {
            
        }
    },
    props : ["user", "taskData", "categoryData"],
    
};
</script>

<style>
</style>