<template>
    <div>
        <v-app-bar class="blue">
        <img class="rounded-circle ml-5 mr-10" width="50" alt="Logo Groupomania" src="../assets/icon.svg">
        <p id="titlenavbar" class="my-auto">Groupomania</p>
        <v-tabs class="d-flex justify-end mr-15">
            <router-link class="my-auto Navtext" to="/login">
                <v-tab>Connexion</v-tab>
            </router-link>
            <router-link class="my-auto Navtext" to="/signup">
                <v-tab>Inscription</v-tab>
            </router-link>
        </v-tabs>
        </v-app-bar>
        <div>
            <div class="mt-15 text-center mb-10">
                <h2 class="mb-5">Connexion</h2>
                <p>Merci de vous connecter afin d'accéder au mur de publications</p>
            </div>
            <div class="text-center mb-15">
                <p>Vous n'êtes pas encore inscrit ?</p>
                <router-link class="my-auto Navtext" to="/signup">Inscription</router-link>
            </div>
            <v-form method="POST" @submit.prevent ="login" id="container" class="mx-auto pl-3 pr-3 rounded-lg">
            <v-text-field
                class="mb-auto"
                label="Email"
                id="email"
                hide-details="auto"
                required>
            </v-text-field>
            <v-text-field
                class="mb-5"
                label="Mot de passe"
                id="password"
                type="password"
                hide-details="auto"
                required>
            </v-text-field>
            <v-btn 
                type="submit"
                class="text-center mb-3"
                depressed
                color="lime">
                Se connecter
            </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Login',
  data() {
    return {
        email: '',
        password: '',
    }
  },
  methods: {
    login() { //Récupération des infos saisies par l'utilisateur
    const userEmail = document.querySelector("#email").value
    const userPassword = document.querySelector("#password").value
      axios
        .post("http://localhost:3000/api/auth/login", // Envoi des information vers l'API
            {email : userEmail, password: userPassword},
            {headers: {"Content-Type": "application/json"}}
        )
        .then((res) => { //Ajout des info de l'utilisateur dans le localStorage puis redirection vers le profil
            localStorage.setItem("user", JSON.stringify(res.data))
            this.$router.push("/Profil")})
        .catch((error) => { //Affichage de l'erreur
            console.log(error)
            alert("Utilisateur non trouvé, veuillez vérifier vos identifiants") 
        })
    }
  }
}
</script>
