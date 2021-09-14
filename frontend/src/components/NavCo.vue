<template>
    <div>
        <div id="Navbar" class="blue d-flex">
            <img class="rounded-circle ml-5 mr-10" width="50" alt="Logo Groupomania" src="../assets/icon.svg">
            <p id="titlenavbar" class="mr-15 my-auto">Groupomania</p>
            <div id="Navtabs" class="ml-15 d-flex flex-xs-column flex-sm-wrap">
                <router-link class="my-auto ml-5 Navtext" to="/feed">
                    <v-tab>Voir les posts</v-tab>
                </router-link>
                <router-link class="my-auto Navtext" to="/addpost">
                    <v-tab>Créer un post</v-tab>
                </router-link>
                <router-link class="my-auto Navtext" to="/profil">
                    <v-tab>Profil</v-tab>
                </router-link>
                <div class="my-auto Navtext">
                    <v-tab @click = "exit">Se déconnecter</v-tab>
                </div>
            </div>
        </div>
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
        color: black;
    }
    #Navtabs > a:nth-child(1) > div, 
    #Navtabs > a:nth-child(2) > div,
    #Navtabs > a:nth-child(3) > div{
        color: black;
    }
    #Navbar{
        height: 70px;
        display: inline-block;
    }
    @media all and (max-width: 850px) {
         #Navtabs{
            background-color: #2196f3;
            position: absolute;
            margin-bottom: 20px;
            top: 65px;
            left: -75px;
            height: 50px;
            width: 103.5%; 
         }
    }
    @media all and (max-width: 500px) {
        #Navbar{
            margin-bottom: 150px;
            width: 100% !important;
        }
        #Navtabs{
            height: 100px;
            flex-wrap: nowrap;
        }
    }
</style>