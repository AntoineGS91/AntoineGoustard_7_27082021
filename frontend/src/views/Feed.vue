<template>
    <div>
        {{ comments }}
        <NavCo />
        <h1 class="mt-15 mb-15 text-center">Bonjour à vous, {{ username }}</h1>
        <div v-for="post in posts" 
            v-bind:key="post.id">
            <div class="Post rounded-lg">
                <h3 class="mb-5 text-center"> {{ post.title }}</h3>
                <div class="post__content d-flex flex-column-reverse">
                    <div class="post__user">Rédigé par  le {{ post.dateCreate }}</div>
                    <p class="post__text mb-3">{{ post.content }}</p>
                </div>
                <div class="float-right d-flex flex-column mt-n16">
                    <v-btn color=lime class="mb-5 mt-n7">Modifier</v-btn>
                    <v-btn color=red>Supprimer</v-btn>
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
            this.token = user.token
        } else this.$router.push( '/login' )
    },
    created() {
        axios
            .get("http://localhost:3000/api/post")
            .then((response) => { 
                let posts = response.data
                this.posts = posts})
            .catch((err) => { console.log(err) })

        axios
            .get("http://localhost:3000/api/comment")
            .then((response) => { 
                let comments = response.data
                this.comments = comments})
            .catch((err) => { console.log(err) })
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