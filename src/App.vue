<template>
  <div id="app">
 <!-- <img src="./assets/img/13.jpg"> -->
      <div id="nav">
          <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>
          Se déconnecter
          </router-link>
      </div>
      {{ userConnected }}
      {{ authenticated }}
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      authenticated: false,
      userConnected: {
        idPersonnes:'',
        nom: '',
        prenom: '',
        ville: '',
        age: '',
      },
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: 'login' });
    }
  },
  methods: {
    setAuthenticated(personne) {
      if(personne) {
        this.authenticated = true;
        this.userConnected = personne;
        console.log(personne);

      }
      
    },
    logout() {
      this.authenticated = false;
    },
  },
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
  /* width: 1024px;
  margin: auto; */
}

  /* body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    } */
</style>
