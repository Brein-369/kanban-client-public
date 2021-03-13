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
        <div class="d-flex justify-content-center">
          <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess">TES</GoogleLogin>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: "login",
  components : {
    GoogleLogin
  },
  data() {
    return {
      email: "",
      password: "",
      params: {
          client_id: "426626517402-7jig5uiuun145isk64p0oekgki73k37r.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      }
    };
  },
  methods: {
    login() {
      this.$emit("doSignIn", { email: this.email, password: this.password });
    },
    toPageRegister() {
      this.$emit("changePageRegister");
    },
    onSuccess(googleUser) {
        console.log(googleUser, 'google.user');
        let id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token, "id token<<<<");
        // This only gets the user information: id, name, imageUrl and email
        this.$emit("loginGoogle", id_token)
    }
  }
};
</script>

<style>

</style>