<template>
  <div>
<!-- <ul> EXEMPLE AFFICHAGE BOUCLE, TABLEAU ITEM
  <li v-for="item in minvalues">{{item}} </li>
</ul>

<ul> TABLEAU OBJET
  <li v-for="item in maxvalues">{{item}} </li>
</ul> -->    

      {{ form.personne }}

    <el-form ref="form" :rules="rules" :model="form" label-width="300px">
        <el-form-item label="Themes" prop="theme">
          <el-select v-model="form.theme" placeholder="Choissisez votre theme">
            <el-option
              v-for="theme in themes"
              :key="theme.idthemes"
              :label="theme.nomTheme"
              :value="theme.idthemes">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="Plat" prop="plat">
        <el-input placeholder="Titre du Plat" v-model="form.plat"></el-input>
      </el-form-item>
      <el-form-item label="Description du plat" prop="description">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="Décrivez votre plat en quelques mots"
          v-model="form.description">
        </el-input>
      </el-form-item>
      <el-form-item label="Lieu" prop="lieu">
        <el-input placeholder="Lieux du repas" v-model="form.lieu"></el-input>
      </el-form-item>
      <el-form-item label="Date" prop="date">
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="Select date and time">
        </el-date-picker>
      </el-form-item>  
      <el-form-item label="Nombre minimum de personne" prop="min"> 
        <el-select v-model="form.min" placeholder="Sélectionnez le nombre minimum de personnes souhaité :">
          <el-option
            v-for="item in minvalues"
            :key="item"
            :label="item + ' personne'+ (item > 1 ? 's' : '') "
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Nombre maximum de Personne" prop="max">
        <el-select v-model="form.max" placeholder="Selectionnez le nombre maximum de personnes souhaité :">
          <el-option
              v-for="item in maxvalues"
              :key="item"
              :label="item +' personne'"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>         
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">Organiser</el-button>
         <el-button @click="resetForm('form')">Effacer</el-button>
      </el-form-item>
      <router-link to="/accueil">
        <el-button round icon="el-icon-arrow-left">Retour</el-button>
      </router-link>
    </el-form>  
  </div>  
</template>


<script>
import axios from 'axios';

export default {
  name: 'Organisation',
  
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        theme: null,
        plat: null,
        lieu: null,
        date: null,
        personne: this.$parent.userConnected.idPersonnes,
        description: null,
        min: null,
        max: null,
       
      },

      rules: {
                theme: [
            { required: true, message: 'Sélectionnez un thème ', trigger: 'change' } ,
            
          ],
          plat: [
            { required: true, message: 'Donnez un nom à votre repas', trigger: 'change' },
          
          ],
          description: [
            { required: true, message: 'Décrivez votre repas en quelques lignes', trigger: 'change' }
          ],
          lieu: [
             { required: true, message: 'Donnez un lieux de rendez-vous', trigger: 'change' }
           
          ],
           date: [
            { type: 'date', required: true, message: 'Sélectionnez une date', trigger: 'change' }
          ],
          min: [
            { required: true, message: 'Sélectionnez un nombre minimum de personne ', trigger: 'change' }
          ],
          max: [
            { required: true, message: 'Sélectionnez un nombre maximum de personne', trigger: 'blur' }
          ]

      },

      themes: [],

      minvalues: [1, 2, 3, 4, 5, 6],

      maxvalues :[
        4, 5, 6, 7, 8, 10
      ],
   
      
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
     
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

          console.log(this.form);
                axios
                  .post(`http://localhost:8000/repas`, this.form)

                  .then(response => {
                    console.log(response);
                  })
                  .catch(e => {
                    console.log(e);
                  });

            alert('Repas Créer!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
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

.el-form {

  width: 70%;
}



</style>
