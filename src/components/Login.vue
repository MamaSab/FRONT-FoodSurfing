<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="nom" v-model="form.nom" placeholder="Nom" />
        <input type="password" name="password" v-model="form.mot_de_passe" placeholder="Mot de Passe" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>
<!--if(!empty($_SESSION['error'])) {
    echo $_SESSION['error'];
} -->
<script>
import axios from "axios";
    export default { 
        name: 'Login',
        data() {
            return {
                form: {
                    nom: "",
                    mot_de_passe: ""
                }
            }
        },
        methods: {
            login() {
                if(this.form.nom != "" && this.form.mot_de_passe != "") {
                    axios.post(`http://localhost:8000/login`, this.form)
                        .then(response => {
                            if (response.data === 'ok') {
                                      this.$emit("authenticated", true);
                                      this.$router.replace({ name: "HelloWorld" });
                            }
                            else {
                                alert("The username and / or password is incorrect");
                            }
                        })
                        
                    //         if(this.form.nom == this.$parent.mockAccount.nom && this.form.mot_de_passe == this.$parent.mockAccount.mot_de_passe) {
                  
                    // } else {
                    //     
                    // }
                } else {
                    alert("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>

     #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>