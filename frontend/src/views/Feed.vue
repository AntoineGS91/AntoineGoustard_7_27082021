<template>
    <div>
        <NavCo />
        <h1 class="mt-15 mb-15 text-center">Bonjour à vous,</h1>
        <div v-for="(post, id) in posts" 
            v-bind:key="id">
            <div class="Post rounded-lg mb-15">
                <h3 class="mb-5 text-center"></h3>
                <div class="post__content d-flex flex-column-reverse">
                    <div class="post__user">Rédigé par ... à </div>
                    <p class="post__text mb-3"></p>
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
        }
    },
    mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.id = user.id
            this.username = user.username
            this.token = user.token
            this.showFeed()
        } else this.$router.push( '/login' )
    },
    methods: {
        showFeed() {
            const user = JSON.parse(localStorage.getItem('user'))
            axios
                .get("http://localhost:3000/api/post/",
                    {headers: {"Content-Type": "application/json"},
                    Authorization: "Bearer " + user.token})
                .then (response => response.json())
                .then(data=>this.posts = data)
                .catch((error) => {
                    console.log(error)
                    alert("Impossible d'afficher les posts !")
                })
        },    
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
    }
    .post__user{
        height: 100%;
        margin: 0;
    }
</style>