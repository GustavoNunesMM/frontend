import { createRouter, createWebHistory } from 'vue-router'
import user from '../views/user.vue'
import home from '../views/home.vue'
import {userAlreadyLoggedIn } from '../middleware/tokenValidation'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/user/:id/',
      name:'User',
      component: user,
      props: true
    },
    {
      path:'/',
      name:'Home',
      beforeEnter: async (to, from, next) => { //até aqui ok
        let res = await userAlreadyLoggedIn()
        if(res) {
          next(`/user/${res.user.id}`)}
          else if (to.meta.permissionLevel && user.permissionLevel !== to.meta.permissionLevel) console.log("Não autorizado")        
          else next()
      },
      component: home
    },

  ]
})

export default router
