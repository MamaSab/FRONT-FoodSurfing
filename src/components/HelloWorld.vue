<template>
<div>
 
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
<router-link to="/"><el-button round icon="el-icon-arrow-left">Retour</el-button></router-link>



   <!-- <h1>{{msg}}</h1>
 v-model, pour lire et ecrire 
  <input type="text" v-model="msg"/>-->
 </div>  
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
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
  color: #fff;
}


 .bgimg1 {
  background-image: url('../assets/img/13.jpg');
   background-position: center;
   background-size: 700px 500px 
}
 
 .bgimg2 {
  background-image: url('../assets/img/14.jpg');
  background-position: center;
  background-size: 700px 500px;
}

.grid-content {
   min-height: 500px;
  text-align:  center;

  }


</style>
