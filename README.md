# GROUPOMANIA

Développement d'une application de réseau social interne à l'entreprise

---


## TECHNOLOGIES UTILISEES

<p align="left"> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> 
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> 
    </a> 
    <a href="https://www.mysql.com/" target="_blank"> 
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> 
    <a href="https://nodejs.org" target="_blank"> 
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> 
    </a> 
    <a href="https://vuejs.org/" target="_blank"> 
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" alt="vuejs" width="40" height="40"/> 
    </a> 
    <a href="https://vuetifyjs.com/en/" target="_blank"> 
        <img src="https://bestofjs.org/logos/vuetify.svg" alt="vuetify" width="40" height="40"/> 
    </a> 
</p>

---


## INSTALLATION


### Dépot

Cloner le dépot grâce au code suivant :  
`$ git clone https://github.com/AntoineGS91/AntoineGoustard_7_27082021.git VotreDossier`

### Base de données

Créez un fichier .env contenant les données de connexion à votre base de données
>HOST = '127.0.0.1'  
>DTBS = 'groupomania'  
>USER = 'root'  
>PASS = Mot de passe (non obligatoire)  

Conectez vous à votre base de données via MySQL  
`$ mysql -u root -p`  
Entrez ensuite votre mot de passe choisis dans le fichier .env  

Creez la base de données :  
`$ CREATE DATABASE groupomania`  

Puis deconnectez vous :
`$ exit`

Importer le fichier de base de données
`$ mysql -u root -p groupomania < GroupomaniaDB.sql`  

Utilisez la base de données :  
`$ USE groupomania`

### Packages

Installez les différents packages necessaires à l'utilisation de l'application

Pour le backend :  
        * bcrypt  
        * body-parser  
        * mysql2  
        * dotenv  
        * express  
        * jsonwebtoken  
        * sanitize-middleware  
        * helmet  

Pour le frontend :  
        * axios  
### Serveur

Ouvrez un terminal de commande directement via votre éditeur de code et taper la commande suivante :  
`$ cd backend`  
`$ npm start`

### Application

Ouvrez un terminal de commande directement via votre éditeur de code et taper la commande suivante :  
`$ cd frontend`  
`$ npm run serve`  
  
    
      
# Vous pouvez maintenant accéder au site !