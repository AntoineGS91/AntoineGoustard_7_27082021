import Vue from 'vue'
import VueRouter from 'vue-router'

//Import des views du site
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Feed from '../views/Feed.vue'
import Profil from '../views/Profil.vue'
import NewPost from '../views/NewPost.vue'
import updatePost from '../views/updatePost.vue'
import NewComment from '../views/NewComment.vue'

Vue.use(VueRouter)

//Application des différentes pages
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
  },
  {
    path: '/newcomment',
    name: 'newcomment',
    component: NewComment
  }
]

const router = new VueRouter({
  routes
})

export default router
