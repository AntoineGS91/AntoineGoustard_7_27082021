<template>
    <div>
        <NavCo />
        <h1 class="mt-10 text-center">Mon compte</h1>
        <h2 class="mt-10 mb-10 text-center">{{ username }}</h2>
        <div class="mb-15 rounded-lg" id="formUpdater">
            <v-form class="formInfo pl-3 pr-3 mt-5">
                <h4>Modifier l'adresse Email</h4>
                <v-text-field
                class="mb-5"
                label="Email"
                id="email"
                hide-details="auto"
                ></v-text-field>
                <v-btn
                type="submit"
                class="text-center mb-15"
                depressed
                color="lime">Modifier</v-btn>
            </v-form>
            <v-form class="pl-3 pr-3 formInfo">
                <h4>Modifier le mot de passe</h4>
                <v-text-field class="mb-5"
                label="Mot de passe"
                id="password"
                type="password"
                hide-details="auto"
                ></v-text-field>
                <v-btn
                type="submit"
                class="text-center mb-3"
                depressed
                color="lime">Modifier</v-btn>
            </v-form>
        </div>
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
            token: "", 
            username:"",
        }
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.id = user.id
            this.username = user.username
            this.token = user.token
        } else this.$router.push({ name: 'login' })
    },
    methods: {
        deleteUser(){
            const user = JSON.parse(localStorage.getItem('user'))
            axios
                .delete("http://localhost:3000/api/auth/user/" + user.id,
                    {headers: {"Content-Type": "application/json"},
                    Authorization: "Bearer" + user.token})
                .then((res) => {
                    console.log(res)
                    localStorage.clear()
                    this.$router.push( '/' ) 
                .catch((error) => {
                    console.log(error)
                    alert("Impossible de supprimer le compte") 
                })})
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