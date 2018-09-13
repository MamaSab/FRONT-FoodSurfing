<template>
<div>
  <!-- <p  v-for="phrase in phrases" :key="phrase">
      {{phrase}}                 
 </p> -->
 
  <h3>Liste Utilisateurs </h3>

   <el-form ref="form"  :model="form" label-width="300px">
        <el-form-item label="Utilisateur">
          <el-select v-model="form.utilisateur" placeholder="Choissisez un utilisateur">
            <el-option
              v-for="utilisateur in utilisateurs"
              :key="utilisateur.nom"
              :label="utilisateur.nom"
              :value="utilisateur.nom">
            </el-option>
          </el-select>
        </el-form-item>
    </el-form>
  <router-link to="/helloWorld">
  Valider</router-link><br/>

 </div>  
</template>

<script>
import axios from "axios";
export default {
  name: 'Utilisateurs',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      
      form:{
        utilisateur: null,
        // phrase: null,
      },
      utilisateurs:[],
      // phrases:['phrase 1', 'phrase 2', 'phrase 3'],
    };
  },

  beforeCreate() {
    axios
      .get(`http://localhost:8000/personnes`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.utilisateurs = response.data;
        console.log(this.utilisateurs);
      })
      .catch(e => {
        this.errors.push(e);
      });

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
/* li {
  display: inline-block;
  margin: 0 10px;
} */
a {
  color: #42b983;
}
</style>

