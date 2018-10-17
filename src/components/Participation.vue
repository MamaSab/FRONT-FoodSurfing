<template>
  <div>
     <el-row>
      <el-col :span="6" :offset="1">
        <h1> BIENVENUE </h1>
      </el-col>
      <el-col :span="8">
        <div class="PrenomNom">
         {{prenom}} {{nom}}
        </div>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20">
      <el-col :span="12" > -->
       <el-main>
        <div>
          <h2> Voici la Liste des repas auxquels vous pouvez participer :
          </h2>
          <el-row>
            <el-col :span="16" :offset="4">
              <div>
              <el-table
                :data="tableData"
                style="width: 100%">
                  <el-table-column type="expand">
                  <template slot-scope="props">
                    <p>{{props.row.idrepas}}</p>
                    <p>Theme: {{ props.row.nt }}</p>
                    <p>Plat: {{ props.row.plat }}</p>
                    <p>Description: {{ props.row.description }}</p>
                    <p>Les personnes présentes au repas: {{ props.row.personnes_au_repas }}</p>
                    <p>Nom du cuistot: {{ props.row.np }}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="dateRepas"
                  label="Date"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  prop="lieu"
                  label="Lieu"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="S'inscrire"
                  width="auto">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="inscription(scope.row)"
                              type="primary"
                              icon="el-icon-edit" circle>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              </div>
            </el-col>
          </el-row>
      </div>
    </el-main>


        <el-dialog
          title="Sélectionner quelque chose à rapporter lors du repas"
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">
            <!-- <el-col :span="12" > -->
          <div><h2> Sélectionnez dans la liste suivante, quelque chose à rapporter  : </h2>
            <el-form ref="form" :model="form" label-width="60px">
              <el-form-item  label="Ajout">
                <el-select class="ajout" v-model="form.ajout" placeholder="Choissisez ce que vous rapportez">
                  <el-option
                    v-for="ajout in ajouts"
                    :key="ajout.idajout"
                    :label="ajout.nomAjout"
                    :value="ajout.idajout">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        <!-- </el-col> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm(); dialogVisible = false">Confirm</el-button>
        </span>
      </el-dialog>




          <router-link to="/accueil">
        <el-button round icon="el-icon-arrow-left">Retour</el-button>
    </router-link>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Particpation',
  data() {
    return {
      // msg: 'Welcome to Your Vue.js App',
      nom: this.$parent.userConnected.nom,
      prenom: this.$parent.userConnected.prenom,
      repasclic : null,
      tableData: [{

     }],
      form: {
        ajout: null,
        idpersonne :null,
        idrepas:null,
        date: null,
        theme: null,
      },
      ajouts: [],

      dialogVisible: false,
    };
  },


  beforeMount() {
    // console.log('BeforeCreate');
    let date = new Date().toISOString().split('T')[0];
    this.recup();
  },


  beforeCreate() {
    axios
      .get('http://localhost:8000/ajout')
      .then((response) => {
        // JSON responses are automatically parsed.
        this.ajouts = response.data;
        // console.log(this.ajouts);
      })
      .catch((e) => {
        // console.log('ça marche pas essai encore');
        this.errors.push(e);
      });

      //Plus besoin de la requete axios themes puisqu'on recupere le nom du theme dans le Inner JOIn recup
      //     axios
      // .get('http://localhost:8000/themes')
      // .then((response) => {
      //   // JSON responses are automatically parsed.
      //   this.themes2 = response.data;
      //   console.log(this.themes2);
      // })
      // .catch((e) => {
      //   this.errors.push(e);
      // });
  },


  methods:
    {
      recup: function () {
        let date = new Date().toISOString().split('T')[0];
        // console.log('http://localhost:8000/personnes/' + this.$parent.userConnected.idPersonnes + '/autre')
        axios
          .get('http://localhost:8000/personnes/' + this.$parent.userConnected.idPersonnes + '/autre')
          .then((response) => {
            this.tableData = response.data;
            console.log(this.tableData);
          });
      },


      inscription(repas) {
        console.log(repas);
        this.repasclic=repas;
        this.dialogVisible = true;
        // console.log('http://localhost:8000/personnes/' + this.$parent.userConnected.idPersonnes + '/autre')
        // axios
        //   .get('http://localhost:8000/inscription/' + this.$parent.userConnected.idPersonnes +'/'+ id)
        //   .then((response) => {
        //     this.tableData = response.data;
        //   });
      },

      submitForm(ajout) {
        console.log('je rentre bien ds le submit'),
        this.form.idrepas=this.repasclic.idrepas,
        this.form.idpersonne=this.$parent.userConnected.idPersonnes,
        console.log(this.form);
          axios.post('http://localhost:8000/ajout', this.form)

            .then((response) => {
              console.log(response);
               this.$alert('Ajout validé!', {
            confirmButtonText: 'Ok',
          });

            })
            .catch((e) => {
               console.log('error submit!!');
              this.$alert('Votre ajout n\'a pas été enregistré', {
            confirmButtonText: 'Ok',
          });
          return false;
            });
        },

        handleClose(done) {
          this.$confirm('Êtes-vous sûr(e) de vouloir annuler votre modification ?')
          .then((_) => {
            done();
          })
          .catch((_) => {});
      },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.ajout{
  width: 80%;
}

.PrenomNom {
  font-size:36px;
  font-weight: 700;
  color: rgb(71, 184, 86);
  padding-top: 20px;
}


</style>
