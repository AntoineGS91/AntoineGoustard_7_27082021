<template>
    <div>
        <NavCo />
        <h1 class="mt-10 text-center">Mon compte</h1>
        <h2 class="mt-10 mb-15 text-center">{{ username }}</h2>
        <h2 class="mt-10 mb-15 text-center">{{ email }}</h2>
        <!-- <div class="mb-15 rounded-lg" id="formUpdater">
            <v-form class="formInfo pl-3 pr-3 mt-5">
                <h4>Modifier l'adresse Email</h4>
                <v-text-field
                class="mb-5"
                label="Email"
                id="email"
                hide-details="auto"
                ></v-text-field>
                <v-btn
                @click = "updateUser"
                type="submit"
                class="text-center mb-15"
                depressed
                color="lime">Modifier</v-btn>
                <h4>Modifier le mot de passe</h4>
                <v-text-field class="mb-5"
                label="Mot de passe"
                id="password"
                type="password"
                hide-details="auto"
                ></v-text-field>
                <v-btn
                @click = "updateUser"
                type="submit"
                class="text-center mb-3"
                depressed
                color="lime">Modifier</v-btn>
            </v-form>
        </div> -->
        <div id="deleteUser">
            <v-btn 
                @click = "deleteUser"
                type="submit"
                class="text-center mb-3"
                depressed
                color="red">Supprimer le compte
            </v-btn>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import NavCo from "../components/NavCo.vue"

export default {
    name: 'Profil',
    components: { 
        NavCo,
    },
    data: function() {
        return {
            id: "",
            password: "", 
            token: "", 
            username:"",
            email: "",
        }
    },
    mounted() { //Gestion des données de l'utilisateur sur la page
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.id = user.id
            this.email = user.email
            this.imageUrl = user.imageUrl
            this.username = user.username
            this.token = user.token
        } else this.$router.push({ name: 'login' })
    },
    methods: {
        updateUser() { //Fonctionnalité encore non deployée
            const user = JSON.parse(localStorage.getItem('user'))
            const userId = user.id
            const newEmail = document.querySelector('#email').value
            const newPassword = document.querySelector('#password').value
            axios
                .put("http://localhost:3000/api/auth/users/" + userId,
                    {email : newEmail, password: newPassword},
                    {headers: {"Content-Type": "application/json"},
                    Authorization: "Bearer " + user.token})
                .then((res) => {
                    alert("Votre compte a été modifié")
                    localStorage.setItem("user", JSON.stringify(res.data))
                    this.$router.push( '/' )})
                .catch((error) => {
                    console.log(error)
                    alert("Impossible de modifier les informations du compte !")
                })
        },
        deleteUser() { //Suppression du compte utilisateur
            const user = JSON.parse(localStorage.getItem('user'))
            const userId = user.id
            axios
                .delete("http://localhost:3000/api/auth/users/" + userId, //Envoi de la requete de suppression
                    {headers: {"Content-Type": "application/json"},
                    Authorization: "Bearer " + user.token})
                .then(() => {
                    alert("Votre compte a été supprimé") //Suppression du local storage + Redirection
                    localStorage.clear()
                    this.$router.push( '/' )})
                .catch((error) => { //Affichage erreur
                    console.log(error)
                    alert("Impossible de supprimer le compte")
                })
        }
    }
}

</script>

<style>
    .formInfo{
        text-align: center;       
    }
    #formUpdater{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        border: blue solid 3px; 
    }
    #deleteUser{
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
</style>