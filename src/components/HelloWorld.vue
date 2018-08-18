<template>
<div>

<router-link to="/organisation">Organiser un Repas</router-link><br/>
<router-link to="/participation">Participer à un Repas</router-link>
   <!-- <h1>{{msg}}</h1>
 v-model, pour lire et ecrire 
  <input type="text" v-model="msg"/>-->
 </div>  
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
