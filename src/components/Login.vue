<template>
    <!-- <div> -->
      <!-- <el-row>
        <el-col :offset="8" >
          <div>
              <el-button  @click.native.prevent="createAccount()">
                <h1>Créer un nouveau compte</h1><i class="el-icon-edit el-icon-right"></i>
              </el-button>
          </div>
        </el-col>
      </el-row>


       <el-dialog
      title="Créer votre compte Utilisateur"
      :visible.sync="dialogVisible"
      width="80%"
      >
      <el-form ref="form" :rules="rules" :model="form" label-width="300px">
      <el-form-item label="Votre Nom d'Utilisateur" prop="nom">
        <el-input placeholder="Entrez un nom d'utilisateur" v-model="form.nom"></el-input>
      </el-form-item>
      <el-form-item label="Votre Prénom" prop="prenom">
        <el-input placeholder="Saisissez Votre Prénom" v-model="form.prenom">
      </el-input>
      </el-form-item>

      <el-form-item>
         <el-button @click="resetForm('form')">Effacer</el-button>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit(); dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog> -->

      <div id="login">
        <h1>Se connecter</h1>
          <el-form ref="form"  :model="form" label-width="300px">
                <el-form-item class="label-nom" label="Nom">
                  <el-input placeholder="Entrez votre nom" v-model="form.nom"></el-input>
                </el-form-item>
                <el-form-item class="label-nom" label="Mot de Passe">
                  <el-input placeholder="Entrez votre mot de passe" type="password" v-model="form.mot_de_passe"></el-input>
              </el-form-item>
          </el-form>
          <el-button round v-on:click="login()">Connexion <i class="el-icon-check el-icon-right"></i></el-button>
      </div>
    <!-- </div> -->
</template>
<!--if(!empty($_SESSION['error'])) {
    echo $_SESSION['error'];
} -->
<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      // dialogVisible: false,
      // handleClose:"",
      form: {
        nom: "",
        mot_de_passe: ""
      },
    };
  },

    //   rules:  {
    //       plat: [
    //           { required: true, message: 'Donnez un nom à votre repas', trigger: 'change' },
    //           ],
    //       description: [
    //          { required: true, message: 'Décrivez votre repas en quelques lignes', trigger: 'change' }
    //           ],
    // },

      methods: {
          // createAccount() {
          //   console.log('je rentre dans ma createAccount')

          // },

          // handleClose(done) {
          // this.$confirm('Êtes-vous sûr(e) de vouloir annuler votre modification ?')
          // .then(_ => {
          //   done();
          // })
          // .catch(_ => {});
          // },


          login() {
          if (this.form.nom !== "" && this.form.mot_de_passe !== "") {
            axios
              .post("http://localhost:8000/login", this.form)

              .then(response => {
                if (response.data != "erreur") {
                  console.log(response.data);
                  this.$emit("authenticated", response.data[0]);
                  this.$router.replace({ name: "Accueil" });
                } else {
                  alert("Votre nom / ou mot de passe est incorrect");
                }
              });

            //         if(this.form.nom == this.$parent.mockAccount.nom && this.form.mot_de_passe == this.$parent.mockAccount.mot_de_passe) {

            // } else {
            //
            // }
              } else {
                alert("Un nom et un mot de passe doivent être présent");
              }
          }
        }
    }
</script>


<style scoped>


.el-form {
  width: 80%;
  border: solid 1px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  margin: 20px auto;
  padding-top: 20px;
  padding-right: 20px;
}

#login {
  color: white;
  width: 800px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  background-image: url("../assets/img/3.jpg");
  margin: auto;
  margin-top: 100px;
  padding: 40px 40px 20px 40px;
}

</style>

<style>
.label-nom .el-form-item__label{
  font-size: 20px;
  font-weight: 600;
  /* color: blue; */
}
</style>
