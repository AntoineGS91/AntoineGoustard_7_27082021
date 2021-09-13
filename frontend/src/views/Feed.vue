<template>
    <div>
        <NavCo />
        <div class="mt-15" v-for="post in posts" 
            v-bind:key="post.id">
            <div class="Post rounded-lg">
                <h3 class="mb-5 text-center"> {{ post.title }}</h3>
                <div class="post__content d-flex flex-column-reverse">
                    <div class="d-inline-flex my-auto">
                        <div class="post__user mr-5">Rédigé le {{ post.dateCreate }}</div>
                        <div class="ml-15 mr-15">par XXX</div>
                        <v-btn class="pt-n5 text-center blue">Commenter</v-btn>
                    </div>
                    <p class="post__text mb-3">{{ post.content }}</p>
                </div>
                
                <div v-if=" post.userId === id || isAdmin === true" class="float-right d-flex flex-column mt-n16">
                    <v-btn @click = "updatePost" color=lime class="mb-5 mt-n7">Modifier</v-btn>
                    <v-btn @click = "deletePost" color=red>Supprimer</v-btn>
                </div>
            </div>
            <div id="commentaries" class="mb-15">
                <div v-for="comment in comments" 
                    v-bind:key="comment.id">
                    <div class="post__content d-flex flex-column-reverse">
                        <div class="post__user">Rédigé par  le {{ comment.dateCreate }}</div>
                        <p class="post__text mb-3">{{ comment.content }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
import axios from "axios"
import NavCo from "../components/NavCo.vue"

export default {
    name : "Feed",
    components: { 
        NavCo,
    },
    data: function() {
        return {
            posts: [],
            comments: []
        }
    },
    mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.id = user.id
            this.username = user.username
            this.isAdmin = user.isAdmin
            this.token = user.token
        } else this.$router.push( '/login' )
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'))
        axios
            .get("http://localhost:3000/api/post",
                {headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token}})
            .then((response) => { 
                let posts = response.data
                this.posts = posts
                this.posts.forEach((post, index) => {
                    axios
                        .get("http://localhost:3000/api/comment/" + post.id,
                            {headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + user.token}})
                        .then((response) => { 
                            this.posts[index] = response.data},)
                        .catch((err) => { console.log(err) })
                })})
            .catch((err) => { console.log(err) })
    },
    methods:{  
        updatePost() {
            const post = this.posts
            const postId = post.id
            console.log(post.id);
            localStorage.setItem("post", JSON.stringify(postId))
            this.$router.push( '/updatePost' )
        },
        deletePost() {
            const user = JSON.parse(localStorage.getItem('user'))
            const postId = this.posts.id
            axios
                .delete("http://localhost:3000/api/post/" + postId,
                    {headers: {"Content-Type": "application/json"},
                    Authorization: "Bearer " + user.token})
                .then(() => {
                    alert("Le post a été supprimé")
                    this.$router.push( '/' )})
                .catch((error) => {
                    console.log(error)
                    alert("Impossible de supprimer le post")
                })
        }
    }
}
   
</script>

<style>
    .Post{
        border: blue solid 3px;
        width: 90%;
        margin-left: 5%;

    }
    .post__text{
        height: 100%;
        border-bottom: grey solid 2px;
    }
    .post__user{
        height: 100%;
        margin: 0;
    }
    #commentaries{
        border-bottom:cyan solid 3px;
        border-left:cyan solid 3px;
        border-right:cyan solid 3px;
        border-radius: 0 0 25% 25%;
        width: 80%;
        margin-left: 10%;
        height:50px
    }
</style>