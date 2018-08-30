<template>
<div>
<el-form ref="form" :model="form" label-width="120px">
  
   <el-select v-model="form.theme" placeholder="Select">
    <el-option
      v-for="theme in themes"
      :key="theme.idthemes"
      :label="theme.nomTheme"
      :value="theme.idthemes">
    </el-option>
  </el-select></br>

  <el-input placeholder="Décrivez le plat que vous allez préparer" v-model="form.plat"></el-input>

  <el-input placeholder="Lieux du repas" v-model="form.lieu"></el-input>

 <el-date-picker
      v-model="form.date"
      type="datetime"
      placeholder="Select date and time">
    </el-date-picker>
    </br>

    Sélectionnez le nombre minimum de personnes souhaité :
  <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></br>

  Selectionnez le nombre maximum de personnes souhaité :
    </br><el-button type="primary" @click="onSubmit">Organiser</el-button>
</el-form></br>



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
      },
      themes: [],

      options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: ''
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
        
        .then(response => {console.log(response)})
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
