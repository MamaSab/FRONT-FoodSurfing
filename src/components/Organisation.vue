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
</el-form>


<router-link to="/">Retour</router-link>

 </div>  
</template>

<script>
export default {
  name: 'Organisation',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      
      form: {
        nom: null,
        prenom: null,
        theme: null,
        plat: null,
        lieu: null,
        date: null,
      },
      themes: [   

]


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
