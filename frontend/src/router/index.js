import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Feed from '../views/Feed.vue'
import Profil from '../views/Profil.vue'
import NewPost from '../views/NewPost.vue'
import updatePost from '../views/updatePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/addpost',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profil
  },
  {
    path: '/updatePost',
    name: 'updatePost',
    component: updatePost
  }
]

const router = new VueRouter({
  routes
})

export default router
