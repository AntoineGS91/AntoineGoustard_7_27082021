<template>
  <div>
        <NavCo />
        <h1 class="mt-15 mb-15 text-center">Bonjour à vous, {{ username }}</h1>
        <div class="mt-15">
            <v-form method="POST" @submit.prevent ="publishComment" id="container" class="mx-auto pl-3 pr-3 rounded-lg">
                <v-textarea
                    class="mb-10 mt-5"
                    label="Contenu"
                    id="post_content"
                    placeholder="Le contenu de mon commentaire"
                    hide-details="auto"
                    required>
                </v-textarea>
                <v-btn
                    type="submit"
                    class="text-center mb-3"
                    depressed
                    color="lime">
                    Publier</v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import NavCo from "../components/NavCo.vue"

export default {
    name : "NewComment",
    components: { 
        NavCo,
    },
    methods: {
        publish() {
        const user = JSON.parse(localStorage.getItem('user')) 
        const post = JSON.parse(localStorage.getItem('postSelected')) 
        const commentContent = document.querySelector("#comment_content").value
        const comment = JSON.stringify({'content': commentContent, 'userId': user.id, 'postId': post.id})
        axios
            .post("http://localhost:3000/api/comment", comment,
                {headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token}})
            .then(() => {
                this.$router.push( '/feed' )})
            .catch((error) => {
                console.log(error)
            })
        }       
    }  
}
</script>

<style>

</style>