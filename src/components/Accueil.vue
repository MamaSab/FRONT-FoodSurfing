<template>
  <div>
    <div class="entete"><h1> BIENVENUE </h1> {{prenom}} {{nom}}</div>
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
          <router-link to="/organisation">Organiser un Repas</router-link><br/>
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
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="plat"
                      label="Nom"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="Actions">
                    </el-table-column>
                </el-table>
              </el-row>

                          <el-button type="primary" icon="el-icon-edit" circle> Modifier </el-button>
                          <el-button type="danger" icon="el-icon-delete" circle> Annuler</el-button>
            </div>
          </el-col>
        <el-col :span="12" >
        <div>
            <h2>Là où je vais manger </h2>
              <el-row>
                <el-table
                    border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="dateRepas"
                      label="Date"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="plat"
                      label="Nom"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="Actions"
                      width="180">
                    </el-table-column>
                </el-table>
              </el-row>
            </div>
      </el-col>
    </el-row>



    <router-link to="/"><el-button round icon="el-icon-arrow-left">Retour</el-button></router-link>
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
      nom:  this.$parent.userConnected.nom,
      prenom:  this.$parent.userConnected.prenom,
      // dT: null,
      tableData: [
        // { plat: 'Test 1', date: '2018-09-27' },
        // { plat: 'Test 2', date: '2018-09-28' },
      ],
    };
  },
  beforeMount() {
    console.log('BeforeCreate');
    // console.log('userConnected');
    // this.dT = new Date().getTime();
    // console.log(this.dT);

    // var myDate=new Date(Date.now());
    // var myTs=Math.floor(myDate.getTime() / 1000);

    let date = new Date().toISOString().split('T')[0]
    console.log('http://localhost:8000/personnes/' + this.$parent.userConnected.idPersonnes + '/repas?date=' + date);

   axios.get('http://localhost:8000/personnes/' + this.$parent.userConnected.idPersonnes + '/repas?date=' + date)
    .then(response => {
      console.log(response)
      this.tableData = response.data
    })
  }
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
  color: #fff;
}

.bgimg1 {
  background-image: url("../assets/img/13.jpg");
  background-position: center;
  background-size: 700px 500px;
}

.bgimg2 {
  background-image: url("../assets/img/14.jpg");
  background-position: center;
  background-size: 700px 500px;
}

.grid-content {
  min-height: 500px;
  text-align: center;
}

el-table{
  width: 500px;
}

.entete {
  display:inline-block;
}
</style>
