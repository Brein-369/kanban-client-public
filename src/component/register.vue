<template>
   
  <div>
    <div class="display-2 text-center pt-5">Register</div>
    <div class="row justify-content-around">
      <div class="w-25 p-5 col-4 mt-5 text-left shadow">
        <label for="register" class="display-4">Register Form</label>

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
          <button type="submit" class="btn btn-primary" @click.prevent="register">Sign up</button>
        </form>
        <p class="text-center pt-5">Already have an account ? Sign In <a href="#" @click="toPageLogin">here</a></p>   

      </div>
      <div class="col-6 text-center">
        <img src="https://i.imgur.com/9D6l9Q7.png" alt="login-image">
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
    name : 'register',
    data(){
        return {
            email : "",
            password : ""
        }
    },
    methods : {
        register(){
            this.$emit('doRegister', {email: this.email, password:this.password})
        },
        toPageLogin(){
            this.$emit('changePageLogin')
        }
    }
}
</script>

<style>

</style>