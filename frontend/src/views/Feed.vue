<template>
    <div>
        <NavCo />
        <div class="mt-15" v-for="post in posts" 
            :key="post.id">
            <div class="Post rounded-lg">
                <h3 class="mb-5 text-center">{{ post.title }} // {{post.userId}} // {{ post.id      }}
                </h3>
                <div class="post__content d-flex flex-column-reverse">
                    <div class="d-inline-flex my-auto">
                        <div class="post__user mr-5">{{ post.dateCreate }}</div>
                    </div>
                    <p class="post__text d-flex mb-3">{{ post.content }}</p>
                </div>
                <div id="btnOptions" class="float-right d-flex flex-column mt-n16">
                    <div v-if=" post.userId === id || isAdmin === 1">
                        <v-btn @click = "updatePost(id)" color=lime class="mb-5 mt-n7"><i class="fas fa-pen-alt"></i></v-btn>
                        <v-btn @click = "deletePost(post.id)" color=red><i class="fas fa-trash"></i></v-btn>
                    </div>
                    <v-btn id="#commentBtn" color=blue><i class="fas fa-comment"></i></v-btn>
                </div>
            </div>
            <div id="commentaries" class="mb-15">
                <div v-for="comment in post.comments" 
                    v-bind:key="comment.id">
                    <div class="comment__content d-flex flex-column-reverse">
                        <div class="comment__user">Rédigé le {{ comment.dateCreate }}</div>
                        <p class="comment__text mb-3">{{ comment.content }}</p>
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
            .get("http://localhost:3000/api/post", //Envoi requete de récupération des posts
                {headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token}})
            .then((response) => { 
                let posts = response.data //Récupération de la réponse à la requete
                this.posts = posts
                this.posts.forEach((post, index) => {
                    axios
                        .get("http://localhost:3000/api/comment/" + post.id, //Envoi requete de récupération des commentaires
                            {headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + user.token}})
                        .then((response) => { //Récupération de la réponse à la requete
                            this.posts[index].comments = response.data},)
                        .catch((err) => { console.log(err) }) //Affichage de l'erreur
                })})
            .catch((err) => { console.log(err) })  //Affichage de l'erreur
    },
    methods:{ 
        updatePost() { //Fonctionnalité encore non déployée
            this.$router.push( '/updatePost' )
        },
        deletePost(post) { //Suppression d'un post par le bouton
            const user = JSON.parse(localStorage.getItem('user'))
            axios
                .delete("http://localhost:3000/api/post/" + post,
                    {headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + user.token}})
                .then(() => {
                    alert("Le post a été supprimé")
                    location.reload()
                    })
                .catch((error) => {
                    console.log(error)
                    alert("Impossible de supprimer le post")
                })
        }        
    }
} 
</script>

<style>

    #btnOptions{
        width: 20px;
        margin-right: -3%;
    }
    .Post{
        border: blue solid 3px;
        width: 85%;
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
    @media all and (min-width: 780px) {
        #container{
            width: 50%;
        }
    }

</style>