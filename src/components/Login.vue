<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="nom" v-model="form.nom" placeholder="Nom" />
        <input type="password" name="password" v-model="form.mot_de_passe" placeholder="Mot de Passe" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
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
                    if(this.form.nom == this.$parent.mockAccount.nom && this.form.mot_de_passe == this.$parent.mockAccount.mot_de_passe) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "HelloWorld" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
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