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
            <v-container  id="container" class="rounded-lg">
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
                class="text-center"
                depressed
                color="lime"
                @click="login">
                Se connecter
            </v-btn>
        </v-container>
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
    login() {
      const data = JSON.stringify({email : this.email, password : this.password});
      axios
          .post(this.$localhost + "api/auth/login", data, {
            header: {"Content-Type": "application/json",},
          })
          .then((res) => {
            localStorage.setItem("Token", res.data.token)
            this.$router.push("/feed")})
          .catch((error) => {
            console.log(error);
            alert("Utilisateur non trouvé, veuillez vérifier vos identifiants") 
        });
    }
  }
}
</script>

<style>
    #inspire{
        margin-top: 0;
    }
    @media all and (min-width: 375px) and (max-width: 780px) {
        #container{
            width: 75%;
        }
    }
</style>