
import Vue from "vue"
import App from "./App.vue"

new Vue ({
    render : h=>h(App),
}).$mount('#app')







// const app = new Vue({
//     el : '#app',
//     data : {
//         page : "home",
//         products : [
//             {   
//                 id : 1,
//                 name : "product 1",
//                 task : "task1"
//             },
//             {
//                 id : 2,
//                 name : "product 2",
//                 task : "task2"
//             },
//             {
//                 id : 3,
//                 name : "product 3",
//                 task : "task3"
//             },
//             {
//                 id : 4,
//                 name : "product 4",
//                 task : "task4"
//             },
//             {
//                 id : 5,
//                 name : "product 5",
//                 task : "task5"
//             }
//         ]
//     },
//     methods :{
//         deleteProduct(id){
//             console.log(id);
//             this.products = this.products.filter((e,i)=>{
//                 console.log(i);
//                 if(e.id !== id){
//                     console.log((e.id, id));
//                     return e
//                 }
//             })
//             return this.products
//         }
//     }


// })