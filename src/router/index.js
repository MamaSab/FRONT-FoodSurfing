import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Organisation from '@/components/Organisation';
import Participation from '@/components/Participation';
import Utilisateurs from '@/components/Utilisateurs';
import Login from "@/components/login.vue";
import Secure from "@/components/secure.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Utilisateurs',
    //   component: Utilisateurs,
    // },
    {
      path: '/',
      redirect: {
          name: "login"
      }
  },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/secure",
      name: "secure",
      component: Secure,
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/organisation',
      name: 'Organisation',
      component: Organisation,
    },
    {
      path: '/participation',
      name: 'Participation',
      component: Participation,
    },


  ],
});
