<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="4">
        <h1> BIENVENUE </h1>
      </el-col>
      <el-col :span="8">
        <div class="PrenomNom">
         {{prenom}} {{nom}}
        </div>
      </el-col>
    </el-row>

    <!-- <el-row> TEST DE CARD
      <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../assets/img/13.jpg">
          <div style="padding: 14px;">
            <span>Yummy hamburger</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">Operating button</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
   <el-row :gutter="20">
      <el-col :span="12" >
        <div class="grid-content bgimg1">
          <router-link to="/organisation"> Organiser un Repas</router-link><br/>
        </div>
      </el-col>
      <el-col :span="12" >
        <div class="grid-content bgimg2">
          <router-link to="/participation" class="typoRouter">Participer à un Repas</router-link>
        </div>
      </el-col>
    </el-row>

      <el-row :gutter="20">
        <el-col :span="12" >
          <div>
            <h2>Mes prochains repas à préparer : </h2>
              <el-row>
                <el-table
                    border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="dateRepas"
                      label="Date"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="plat"
                      label="Nom du Plat"
                      width="200">
                    </el-table-column>
                    <el-table-column
                       fixed="right"
                        label="Modifier ou Annuler"
                        width="200">
                        <template slot-scope="scope">
                          <el-button @click.native.prevent="editRepas(scope.row)"
                                     type="primary"
                                     icon="el-icon-edit" circle>
                          </el-button>
                          <el-button @click.native.prevent="deleteRepas(scope.row)"
                                     type="danger"
                                     icon="el-icon-delete" circle>
                          </el-button>
                        </template>
                    </el-table-column>
                </el-table>
              </el-row>
            </div>
          </el-col>
        <el-col :span="12" >
          <div>
            <h2>Là où je vais manger </h2>
              <el-row>
                <el-table
                    border
                    :data="tableData2"
                    style="width: 100%">
                    <el-table-column
                      prop="dr"
                      label="Date"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="plat"
                      label="Nom du Plat"
                      width="200">
                    </el-table-column>
                    <el-table-column
                       fixed="right"
                        label="Actions"
                        width="160">
                        <template slot-scope="scope">
                          <el-button @click="deleteRepas(scope.row)"
                                     type="danger"
                                     icon="el-icon-delete" circle>
                          </el-button>
                        </template>
                    </el-table-column>
                </el-table>
              </el-row>
            </div>
      </el-col>
    </el-row>
    <router-link to="/"><el-button round icon="el-icon-arrow-left">Retour</el-button></router-link>
    <el-dialog
      title="Modification de votre repas"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
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
        <el-select v-model="form.min"
                   placeholder="Sélectionnez le nombre minimum de personnes souhaité :">
          <el-option
            v-for="item in minvalues"
            :key="item"
            :label="item + ' personne'+ (item > 1 ? 's' : '') "
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Nombre maximum de Personne" prop="max">
        <el-select v-model="form.max"
                   placeholder="Selectionnez le nombre maximum de personnes souhaité :">
          <el-option
              v-for="item in maxvalues"
              :key="item"
              :label="item +' personne'"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
         <el-button @click="resetForm('form')">Effacer</el-button>
      </el-form-item> -->
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose(); dialogVisible = false"> Annuler</el-button>
        <el-button type="primary" @click="submit(); dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <h1>{{msg}}</h1>
    v-model, pour lire et ecrire
    <input type="text" v-model="msg"/>-->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Accueil',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      nom: this.$parent.userConnected.nom,
      prenom: this.$parent.userConnected.prenom,
      // dT: null,
      tableData: [
        // { plat: 'Test 1', date: '2018-09-27' },
        // { plat: 'Test 2', date: '2018-09-28' },
      ],
      tableData2: [
        // { plat :'test 3', dateRepas: '2018-10-30'},
        // { plat :'test 4', dateRepas: '2018-11-15'},
      ],

      dialogVisible: false,
      form: {
        id: null,
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
          { required: true, message: 'Sélectionnez un thème ', trigger: 'change' },
        ],
        plat: [
          { required: true, message: 'Donnez un nom à votre repas', trigger: 'change' },
        ],
        description: [
          { required: true, message: 'Décrivez votre repas en quelques lignes', trigger: 'change' },
        ],
        lieu: [
          { required: true, message: 'Donnez un lieux de rendez-vous', trigger: 'change' },
        ],
        date: [
          { type: 'date', required: true, message: 'Sélectionnez une date', trigger: 'change' },
        ],
        min: [
          { required: true, message: 'Sélectionnez un nombre minimum de personne ', trigger: 'change' },
        ],
        max: [
          { required: true, message: 'Sélectionnez un nombre maximum de personne', trigger: 'blur' },
        ],
      },
      themes: [],
      minvalues: [1, 2, 3, 4, 5, 6],
      maxvalues: [4, 5, 6, 7, 8, 10],
    };
  },

  beforeMount() {
    // console.log('BeforeCreate');
    // console.log('userConnected');
    // this.dT = new Date().getTime();
    // console.log(this.dT);
    // var myDate=new Date(Date.now());
    // var myTs=Math.floor(myDate.getTime() / 1000);
    // let date = new Date().toISOString().split('T')[0]
    this.recup();
    // console.log(this.tableData)
    this.recup2();
    console.log(this.tableData2)
  },

  methods:
    {
    // creation d'une fonction de recuperation des données
    // qu'on va utiliser dans nos methodes delet et submit
      recup: function () {
        let date = new Date().toISOString().split('T')[0];
        axios.get('http://localhost:8000/personnes/' + this.$parent.userConnected.idPersonnes + '/repas?date=' + date)
          .then((response) => {
            this.tableData = response.data;
          });
      },

     recup2: function() {
        axios.get('http://localhost:8000/personnes/' + this.$parent.userConnected.idPersonnes + '/participe')
        .then((response) => {
          // console.log('http://localhost:8000/personnes/' + this.$parent.userConnected.idPersonnes + '/participe'),
          this.tableData2 = response.data;
        });
      },

      editRepas(repas) {
        // console.log('repas', repas);
        axios
          .get('http://localhost:8000/themes')
          .then((response) => {
            // JSON responses are automatically parsed.
            this.themes = response.data;
            console.log(this.themes);
            // this.form = repas FONCTIONNE POUR RECUPERER LES DATAS
            // MAIS PAS LES MODIFIER DANS LE SELECT
            this.form.id = repas.idrepas;
            this.form.plat = repas.plat;
            this.form.lieu = repas.lieu;
            this.form.description = repas.description;
            this.form.theme = repas.themes_idthemes;
            this.form.date = repas.dateRepas;
            this.form.min = repas.nombre_minimum_personne;
            this.form.max = repas.nombre_maximum_personne;
            // console.log(this.themes);
            this.dialogVisible = true;
          })
          .catch((e) => {
            this.errors.push(e);
          });
      },

      deleteRepas(repas) {
        // console.log('repas on rentre dans la methode delete')
        // console.log('http://localhost:8000/repas/' + repas.id);

        axios.delete('http://localhost:8000/repas/' + repas.idrepas)

          .then((response) => {
            // console.log('response', response);
            // console.log(response)
            this.$alert('Votre repas à bien été ANNULER', 'Repas ANNULER', {
              confirmButtonText: 'Ok',
            });
            this.recup();
          })
          .catch((e) => {
            this.$alert('Le repas n\'a pas pu être supprimé', 'Repas non annulé');
          });
      },

      handleClose(done) {
        this.$confirm('Êtes-vous sûr(e) de vouloir annuler votre modification ?')
          .then((_) => {
            done();
          })
          .catch((_) => {
            console.log('trouver une fonction pour rester sur el dialogue')
          });
      },
      //  resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      submit() {
        // console.log(this.form);
        axios.put('http://localhost:8000/repas/' + this.form.id, this.form)
          .then((response) => {
            // console.log('response', response);
            this.$alert('Repas modifié!', 'Votre repas à bien été modifié');
            this.recup();
          })
          .catch((e) => {
            // console.log(e);
          });
      },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1,
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
} */
a {
  color: rgba(255, 255, 255);
}
a:hover{
color: rgb(135, 206, 147);
}

.bgimg1 {
  background-image: url("../assets/img/13.jpg");
  background-position: center;
  background-size: 700px 500px;
  border: 1px solid #ffffff;
}
.bgimg2 {
  background-image: url("../assets/img/14.jpg");
  background-position: center;
  background-size: 700px 500px;
  border: 1px solid #ffffff;
}
.grid-content {
  /* margin-left: 20px; */
  border-radius: 100px;
  height: 300px;
  width: 90%;
  text-align: center;
  font-size: 36px;
  padding-top: 25px;

}
el-table {
  width: 500px;
}

.PrenomNom {
  font-size:36px;
  font-weight: 700;
  color: rgb(20, 148, 37);
  padding-top: 20px;
}


</style>
