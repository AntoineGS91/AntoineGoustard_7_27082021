<template>
  <div class="">
        <img id="HomeLogo" class="text-center" src="../assets/icon-left-font-monochrome-black.png">
        <div class="text-center mb-10">Merci de choisir une destination</div>
        <div class="text-center">
            <router-link class="my-auto Navtext mr-10" to="/login">Connexion</router-link>
            <router-link class="my-auto Navtext ml-10" to="/signup">Inscription</router-link>
        </div>
  </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style scoped lang="scss">
    #HomeLogo{
        width: 25%;
        margin-left: 37.5%;
    }
    .Navtext {
        text-transform: uppercase;
        font-weight: bold;
        text-decoration: underline;
    }
</style>