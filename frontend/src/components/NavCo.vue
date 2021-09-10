<template>
    <div>
        <v-app-bar class="blue">
            <img class="rounded-circle ml-5 mr-10" width="50" alt="Logo Groupomania" src="../assets/icon.svg">
            <p id="titlenavbar" class="my-auto">Groupomania</p>
            <v-tabs class="d-flex justify-end mr-15">
                <router-link class="my-auto Navtext" to="/feed">
                    <v-tab>Voir les posts</v-tab>
                </router-link>
                <router-link class="my-auto Navtext" to="/newPost">
                    <v-tab>Créer un post</v-tab>
                </router-link>
                <router-link class="my-auto Navtext" to="/profil">
                    <v-tab>Profil</v-tab>
                </router-link>
                <div class="my-auto Navtext">
                    <v-tab @click = "exit">Se déconnecter</v-tab>
                </div>
            </v-tabs>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: 'NavCo',
    methods: {
        exit() {
            localStorage.clear()
            this.$router.push({ name: 'Home' }) 
        }
},
}
</script>

<style>
    .Navtext{
        text-decoration: none;
        color: white;
    }
</style>