const app = new Vue({
  el:"#app",
  data:{
    logo: "KanbanFox",
    username: "<h2>Welcome Jack</h2>",
    page: "todo-page",
  },
  methods:{ 
    changePage(to){
      this.page = to;
    }
  }
})