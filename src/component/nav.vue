<template>
  <nav class="navbar">
      <div class="nav-item">
        <img
          class="logo"
          src="https://i.imgur.com/xeVCRn7.png"
          alt="kanban-logo"
        />
        <p id="text-logo-navbar">KANBAN</p>
      </div>
      <div class="nav-item">
        <ul>
          <!--hanya dicadangkan-->
          <li><a href="">HOME</a></li>
          <li><a href="">KANBAN</a></li>
          <li><a href="">ABOUT</a></li>
          <!--hanya dicadangkan-->
        </ul>
      </div>
      
      <div class="nav-item logout" @click="logout">Logout</div>
    </nav>
</template>

<script>
export default {
    name : "nav",
    methods : {
      logout(){
        this.$emit("logout")
      }
    },
    mounted:{
      
    }
} 
</script>

<style>

</style>