<template>
    <div>
      <el-row>
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
      <el-form ref="form" status-icon :rules="rules" :model="form" label-width="300px">
      <el-form-item label="Votre Nom d'Utilisateur" prop="nom">
        <el-input placeholder="Entrez un nom d'utilisateur" v-model="form.nom"></el-input>
      </el-form-item>
      <el-form-item label="Votre Prénom" prop="prenom">
        <el-input placeholder="Saisissez Votre Prénom" v-model="form.prenom">
        </el-input>
      </el-form-item>
      <el-form-item label="Choissisez un mot de passe" prop="mot_de_passe">
        <el-input placeholder="Mot de passe" type="password" v-model="form.mot_de_passe">
        </el-input>
      </el-form-item>
      <el-form-item label="Confirmez le mot de passe"  prop="checkPass">
        <el-input type="password" v-model="form.checkPass" >
        </el-input>
      </el-form-item>
      <el-form-item label="Votre ville" prop="ville">
        <el-input placeholder="Saissisez votre ville" v-model="form.ville">
        </el-input>
      </el-form-item>
      <el-form-item label="Votre age" prop="age">
        <el-input placeholder="Saissisez votre age" v-model.number="form.age">
        </el-input>
      </el-form-item>
      <el-form-item>
         <el-button @click="resetForm('form')">Effacer</el-button>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annuler</el-button>
        <el-button type="primary" @click="submitForm('form'); dialogVisible = false">Confirmer</el-button>
      </span>
    </el-dialog>

      <div id="login">
        <h1>Se connecter</h1>
          <el-form ref="form"  :model="form" label-width="300px">
                <el-form-item class="label-nom" label="Nom">
                  <el-input placeholder="Entrez votre nom" v-model="form.nom"></el-input>
                </el-form-item>
                <el-form-item class="label-nom" label="Mot de Passe">
                  <el-input placeholder="Entrez votre mot de passe"
                            type="password"
                            v-model="form.mot_de_passe">
                  </el-input>
              </el-form-item>
          </el-form>
          <el-button round v-on:click="login()">
            Connexion
          <i class="el-icon-check el-icon-right"></i></el-button>

      </div>
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

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.form.mot_de_passe) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    };

    var checkAge = (rule, value, callback) => {
       if (!value) {
          return callback(new Error('Please input the age'));
        }
       setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'));
          } else {
            if (value < 18) {
              callback(new Error('Age must be greater than 18'));
            } else {
              callback();
            }
          }
        }, 1000);
    };
    return {
      dialogVisible: false,
      // handleClose:'',
      form: {
        id: '',
        nom: '',
        prenom: '',
        mot_de_passe: '',
        checkPass: '',
        ville: '',
        age: '',
      },
      rules:  {
      nom: [
      { required: true, message: 'Veuillez saisir votre nom d\'utilisateur', trigger: 'change' },
      ],
      prenom: [
      { required: true, message: 'Veuillez saisir votre prénom', trigger: 'change' },
      ],
       mot_de_passe: [
      { required: true, message: 'Veuillez saisir un  mot de passe', trigger: 'change' },
      ],
      checkPass: [
      { validator: validatePass2, trigger: 'blur' },
      ],
      ville: [
      { required: true, message: 'Veuillez saisir votre ville', trigger: 'change' },
      ],
      age: [
      { validator: checkAge, trigger: 'blur' },
      ],
    },
   };
},

  methods: {
    createAccount() {
        this.dialogVisible =  true;
    },

    // handleClose(done) {
    // this.$confirm('Êtes-vous sûr(e) de vouloir annuler votre modification ?')
    // .then(_ => {
    //   done();
    // })
    // .catch(_ => {});
    // },

    login() {
      if (this.form.nom !== '' && this.form.mot_de_passe !== '') {
        axios
          .post('http://localhost:8000/login', this.form)

          .then((response) => {
            if (response.data !== 'erreur') {
              // console.log(response.data);
              this.$emit('authenticated', response.data[0]);
              this.$router.replace({ name: 'Accueil' });
            } else {
              this.$alert('Votre nom / mot de passe est incorrect', 'Incorrect', {
                confirmButtonText: 'Je vais corrigé ça',
              });
            }
          });
        // if(this.form.nom == this.$parent.mockAccount.nom &&
        //  this.form.mot_de_passe == this.$parent.mockAccount.mot_de_passe) {
        // } else {
        // }
      } else {
        this.$alert('Un nom et un mot de passe doivent être présent', 'Incorrect', {
          confirmButtonText: 'Ok',
        });
      }
    },

    submitForm(formUser) {
      this.$refs[formUser].validate((valid) => {
        if (valid) {
          // console.log(this.form);
          axios.post('http://localhost:8000/personne', this.form)

            .then((response) => {
              // console.log(response);
            })
            .catch((e) => {
              // console.log(e);
            });

          this.$alert('Féliciations votre compte à bien été créer!', {
            confirmButtonText: 'Ok',
          });
        } else {
            this.$alert('Votre inscription n\'a pas été prise en compte', {
            confirmButtonText: 'Ok',
          });
          return false;
        }
      });
    },
      resetForm(formUser) {
      this.$refs[formUser].resetFields();
    },
  }
};
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
