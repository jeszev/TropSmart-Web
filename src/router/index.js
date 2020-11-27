import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SideMenu from '../components/SideMenu.vue'
import MainMenu from '../components/MainMenu.vue'
import UsersListContent from '../components/UserList.Content.vue'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import Cargoes from '../components/Cargoes.vue'
import DriverProfile from '../components/DriverProfile'
import Favorites from '../components/Favorites'
import Blockeds from '../components/Blockeds'
import Settings from '../components/Settings'
import Recharge from '../components/Recharge';
import Subscriptions from '../components/Subscriptions';
import Notification from '../components/Notification';


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/side',
    name: 'SideMenu',
    component: SideMenu
  },
  {
    path: '/profile',
    name: 'MainMenu',
    component: MainMenu
  },
  {
    path: '/users',
    name: 'UsersListContent',
    component: UsersListContent
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/cargoes',
    name: 'Cargoes',
    component: Cargoes
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: Recharge
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    component: Subscriptions
  },
  {
    path: '/driver/id',
    name: 'Drivers',
    component: DriverProfile
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component : Favorites
  },
  {
    path: '/blockeds',
    name: 'Blockeds',
    component : Blockeds
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification
  },
  {
    path: '/about',
    name: 'About',

    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
