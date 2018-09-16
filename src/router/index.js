import Vue from 'vue';
import Router from 'vue-router';
import Accueil from '@/components/Accueil';
import Organisation from '@/components/Organisation';
import Participation from '@/components/Participation';
// import Utilisateurs from '@/components/Utilisateurs';
import Login from '@/components/Login';
import Secure from '@/components/Secure';

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
        name: 'login',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
    },
    {
      path: '/accueil',
      name: 'Accueil',
      component: Accueil,
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
