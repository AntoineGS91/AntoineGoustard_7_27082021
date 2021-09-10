<template>
    <div>
        <v-app-bar id="Navbar" class="blue">
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
                <h2 class="mb-5">Inscription</h2>
                <p>Merci de procéder à l'inscription afin d'accéder au mur de publications</p>
            </div>
            <div class="mb-15 text-center">
                <p>Vous êtes déjà inscrit ?</p>
                <router-link class="my-auto Navtext" to="/login">Connexion</router-link>
        </div>
        <v-app id="inspire">
        <div>
            <v-form method="POST" @submit.prevent ="signup" id="container" class="mx-auto pl-3 pr-3 rounded-lg">
                <v-text-field
                    class="mb-10 mt-5"
                    label="Email"
                    id="email"
                    placeholder="example@example.fr"
                    hide-details="auto"
                    required>
                </v-text-field>
                <v-text-field
                    class="mb-10"
                    label="Pseudo"
                    placeholder="El Chapo"
                    id="username"
                    hide-details="auto"
                    required>
                </v-text-field>
                <v-text-field
                    class="mb-10"
                    label="Mot de passe"
                    placeholder="********"
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
                S'inscrire</v-btn>
            </v-form>
        </div>
        </v-app>
    </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Signup',
    data() {
    return {
        email: '',
        password: '',
        username: '',
    }
  },
  methods: {
    signup() {
    const userEmail = document.querySelector("#email").value
    const userPassword = document.querySelector("#password").value
    const userUsername = document.querySelector("#username").value
      axios
        .post("http://localhost:3000/api/auth/signup",
            {email : userEmail, username: userUsername, password: userPassword},
            {headers: {"Content-Type": "application/json"}}
        )
        .then((res) => {
            console.log("Inscription réussi !");
            localStorage.setItem("User", res)
            this.$router.push("/login")})
        .catch((error) => {
            console.log(error)
            alert("Echec de l'inscription") 
        })
    }
  }
}

</script>   

<style>
    #titlenavbar{
        color: white;
        font-size: 1.5em;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .Navtext{
        text-decoration: none;
        color: white;
    }
    #inspire{
        height: 350px;
    }
    #container{
        text-align: center;
        width: 85%;
        height: 100%;
        border: blue solid 3px;
    }
    @media all and (min-width: 780px) {
        #container{
            width: 50%;
        }
    }
</style>