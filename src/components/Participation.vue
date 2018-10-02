<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" >
        <div>
          <h2> Voici la Liste des repas auxquels vous pouvez participer : </h2>
            <el-row>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="dateRepas"
                  label="Date"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="lieu"
                  label="Lieu"
                  width="220">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="S'inscrire"
                   width="150">
                </el-table-column>
              </el-table>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12" >
          <div><h2> Sélectionnez dans la liste suivante, quelque chose à rapporter  : </h2>
            <el-form ref="form" :model="form" label-width="60px">
              <el-form-item  label="Ajout">
                <el-select v-model="form.ajout" placeholder="Choissisez ce que vous rapportez">
                  <el-option
                    v-for="ajout in ajouts"
                    :key="ajout.nomAjout"
                    :label="ajout.nomAjout"
                    :value="ajout.nomAjout">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>

          </div>
        </el-col>
      </el-row>


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
      tableData: [],
      form: {
        ajout: null,
        date: null,
      },
      ajouts: [],
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
          });
      },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.el-input__inner{
  width: 350px;
}

</style>
