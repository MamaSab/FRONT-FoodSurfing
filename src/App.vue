<template>

  <div id="app">
 <!-- <img src="./assets/img/13.jpg"> -->
      <el-row>
        <el-col :span="10" :offset="9">
          <img src="./assets/img/Logo5.png" id="logo">
        </el-col>
        <el-col :span="5">
          <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>
          Se déconnecter
          </router-link>
        </el-col>
      </el-row>

      <!-- {{ userConnected }}
      {{ authenticated }} -->
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
        idPersonnes: '',
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
      if (personne) {
        this.authenticated = true;
        this.userConnected = personne;
        // console.log(personne);
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

  body {
        background-color: rgb(245, 247, 242);
    }


    /* h1 {
        padding: 0;
        margin-top: 0;
    } */
</style>
