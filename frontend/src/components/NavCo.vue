<template>
    <v-app-bar class="blue">
        <img class="rounded-circle ml-5 mr-10" width="50" alt="Logo Groupomania" src="../assets/icon.svg">
        <p id="titlenavbar" class="my-auto">Groupomania</p>
        <v-tabs class="d-flex justify-end mr-15">
            <router-link class="my-auto Navtext" to="/login">
                <v-tab>Voir les posts</v-tab>
            </router-link>
            <router-link class="my-auto Navtext" to="/signup">
                <v-tab>Créer un post</v-tab>
            </router-link>
            <router-link class="my-auto Navtext" to="/signup">
                <v-tab>Profil</v-tab>
            </router-link>
            <router-link class="my-auto Navtext" to="/signup">
                <v-tab>Se déconnecter</v-tab>
            </router-link>
        </v-tabs>
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>
    .Navtext{
        text-decoration: none;
        color: white;
    }
</style>