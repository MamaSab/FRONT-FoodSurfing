<template>
<div>
<ul>
  <li v-for="item in minvalues">{{item}} </li>
</ul>

<ul>
  <li v-for="item in maxvalues">{{item}} </li>
</ul>


<el-form ref="form" :model="form" label-width="300px">
  <el-form-item label="Themes">
   <el-select v-model="form.theme" placeholder="Choissisez votre theme">
    <el-option
      v-for="theme in themes"
      :key="theme.idthemes"
      :label="theme.nomTheme"
      :value="theme.idthemes">
    </el-option>
  </el-select>
  </el-form-item>

  <el-form-item label="Plat">
    <el-input placeholder="Titre du Plat" v-model="form.plat">
    </el-input>
  </el-form-item>

  <el-form-item label="Description du plat">
    <el-input
  type="textarea"
  :rows="5"
  placeholder="Décrivez votre plat en quelques mots"
  v-model="form.description">
</el-input>
</el-form-item>


  <el-form-item label="Lieu">
    <el-input placeholder="Lieux du repas" v-model="form.lieu"></el-input>
  </el-form-item>

<el-form-item label="Date">
 <el-date-picker
      v-model="form.date"
      type="datetime"
      placeholder="Select date and time">
    </el-date-picker>
    </el-form-item>
    

   <el-form-item label="Nombre minimum de Personne"> 
  <el-select v-model="form.min" placeholder="Sélectionnez le nombre minimum de personnes souhaité :">
    <el-option
      v-for="item in minvalues"
      :key="item"
      :label="item + ' personne'+ (item>1?'s':'') "
      :value="item">
    </el-option>
  </el-select>
  </el-form-item>

 <!-- <el-form-item label="Nombre maximum de Personne">
   <el-select v-model="form.max" placeholder="Selectionnez le nombre maximum de personnes souhaité :">
    <el-option
      v-for="item in max"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>-->

  <el-form-item>
    <el-button type="primary" @click="onSubmit">Organiser</el-button>
  </el-form-item>
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
        theme: null,
        plat: null,
        lieu: null,
        date: null,
        personne: 1,
        description: null,
        min:null,
        max:null,
      },
      themes: [],

      minvalues: [1, 2, 3, 4, 5, 6],

      maxvalues :[
        {option1: '4 personnes'},
        {option2: '5 personnes'},
        {option3: '6 personnes'},
        {option4: '7 personnes'},
        {option5: '8 personnes'},

      ]
   
      
    };
  },
  // Fetches posts when the component is created.
  beforeCreate() {
    axios
      .get(`http://localhost:8000/themes`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.themes = response.data;
        console.log(this.themes);
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
      console.log(this.form);
      axios
        .post(`http://localhost:8000/repas`, this.form)

        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
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
  /*list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;*/
}
a {
  color: #42b983;
}

.el-form{
  width: 50%;
}
</style>
