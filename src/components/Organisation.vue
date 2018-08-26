<template>
<div>
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="Votre nom">
    <el-input v-model="form.nom"></el-input>
  </el-form-item>


  <el-form-item label="Votre prénom">
    <el-input v-model="form.prenom"></el-input>
  </el-form-item>

   <el-select v-model="form.theme" placeholder="Select">
    <el-option
      v-for="theme in themes"
      :key="theme.id"
      :label="theme.nom_du_theme"
      :value="theme.id">
    </el-option>
  </el-select>

  <el-input placeholder="Décrivez le plat que vous allez préparer" v-model="form.plat"></el-input>

  <el-input placeholder="Lieux du repas" v-model="form.lieu"></el-input>

 <el-date-picker
      v-model="form.date"
      type="datetime"
      placeholder="Select date and time">
    </el-date-picker>

    <el-button type="primary" @click="onSubmit">Organiser</el-button>
</el-form>


<router-link to="/"><el-button round icon="el-icon-arrow-left">Retour</el-button></router-link>

 </div>  
</template>

<script>
import axios from "axios";
export default {
  name: "Organisation",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",

      form: {
        nom: null,
        prenom: null,
        theme: null,
        plat: null,
        lieu: null,
        date: null
      },
      themes: []
    };
  },
  // Fetches posts when the component is created.
  beforeCreate() {
    axios
      .get(`http://localhost:8000/themes`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.themes = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });

    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  },

  methods: {
    onSubmit() {
      axios
        .post(`http://localhost:8000/repas`, {
          body: {}
        })
        .then(response => {console.log('repas créer')})
        .catch(e => {
         console.log(e)
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
