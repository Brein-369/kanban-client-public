<template>
  <div>
    <div class="display-2 text-center pt-5">Kanban App</div>
    <div class="row justify-content-around">
      <div class="col-6 text-center">
        <img src="https://image.freepik.com/free-vector/work-together-vector_65141-115.jpg" alt="login-image">
      </div>
      <div class="w-25 p-5 col-4 mt-5 text-left shadow">
        <label for="register" class="display-4">Login Form</label>

        <form action="#" class="was-validated">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" class="form-control" id="email" placeholder="Enter Email" v-model="email" required>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" placeholder="Enter password" v-model="password" required>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="login">Sign in</button>
        </form>
            <p class="text-center pt-5">Didn't have an account ? Register <a href="#" @click="toPageRegister">here</a></p>   
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
    name : "login",
    data(){
        return {
            email : '',
            password : ''
        }
    },
    methods : {
        login(){
            this.$emit("doSignIn", {email : this.email, password : this.password})
        },
        toPageRegister(){
            this.$emit("changePageRegister")
        }
    }
}
</script>

<style>

</style>