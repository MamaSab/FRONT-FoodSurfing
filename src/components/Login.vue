<template>
    <div id="login">
        <h1>Se connecter</h1>
        <el-form ref="form" :rules="rules" :model="form" label-width="300px">
            <el-form-item class="test" label="Nom">
                <el-input placeholder="Entrez votre nom" v-model="form.nom" prop="nom"></el-input>
            </el-form-item>
            <el-form-item class="test" label="Mot de Passe">
                <el-input placeholder="Entrez votre mot de passe"  v-model="form.mot_de_passe" prop="mot_de_passe"></el-input>
            </el-form-item>
        </el-form>
        <el-button round v-on:click="login()">Connexion <i class="el-icon-check el-icon-right"></i></el-button> 
    </div>
</template>
<!--if(!empty($_SESSION['error'])) {
    echo $_SESSION['error'];
} -->
<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        nom: '',
        mot_de_passe: '',
      },

      rules : {
           nom: [
             { required: true, message: 'Donnez un lieux de rendez-vous', trigger: 'change' }
           
          ],

            mot_de_passe: [
             { required: true, message: 'Donnez un lieux de rendez-vous', trigger: 'change' }
           
          ],
      }
    };
  },
  methods: {
    login() {
      if (this.form.nom !== '' && this.form.mot_de_passe !== '') {
        axios.post('http://localhost:8000/login', this.form)

          .then(response => {
              if (response.data != 'erreur') {
                                      console.log(response.data);
                                      this.$emit('authenticated', response.data[0]);
                                      this.$router.replace({ name: "Accueil" });
                            }
                            else {
                                alert ("Votre nom / ou mot de passe est incorrect");
                            }
                        })
                        
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
    
}
.el-form-item__label {
font-size: 25px !important;
  color: #59bf53 !important;
}

#login {
        color: #ffffff;
        width: 800px;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        background-image: url("../assets/img/3.jpg");;
        margin: auto;
        margin-top: 200px;
        padding: 40px 20px 20px 20px;
    }

    .test {
 font-size: 25px !important;
  color: #59bf53 !important;
}


</style>