import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// Import Pages-components...
import Static from '@/components/Static'
import HelloWorld from '@/components/HelloWorld'
import News from '@/components/News'
import User from '@/components/User'
import UserDefault from '@/components/user/UserDefault'
import UserProfile from '@/components/user/UserProfile'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Register from '@/components/Register'
//Import Admin Pages-components...
import Admin from '@/components/admin/Dashboard'
import CandidatesListPage from '@/components/admin/pages/candidates/CandidatesList'
import ViewCandidateProfile from '@/components/admin/pages/candidates/ViewCandidateProfile'
import CandidatesAddNew from '@/components/admin/pages/candidates/CandidatesAddNew'
import OpeningsList from '@/components/admin/pages/openings/OpeningsList'
import MessagesPage from '@/components/admin/pages/messages/Messages'
import HistoryPage from '@/components/admin/pages/history/History'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/static',
      component: Static,
    },
    {
      path: '/news',
      component: News,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/:username',
      component: User,
      children: [
          {
            path: '',
            component: UserDefault
          },
          {
            path: 'profile',
            component: UserProfile
          }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      component: Register
    },
    /* {
      path: '/admin',
      component: Admin,
      children: [
          {
            path: '/admin/candidates',
            component: CandidatesListPage,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            },
            children: [
                {
                  path: '',
                    component: CandidatesListPage
                },
                {
                  path: 'profile/:id',
                  component: ViewCandidateProfile
                }
            ]
          },
          {
            path: '/admin/candidates/add',
            component: CandidatesAddNew,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
          },
          {
            path: '/admin/openings',
            component: OpeningsList,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
          },
          {
            path: '/admin/messages',
            component: MessagesPage,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
          },
          {
            path: '/admin/history',
            component: HistoryPage,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
          }
      ],
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    } */
    {
      path: '/admin',
      components: {default: Admin},
      children: [
          {
            path: 'candidates',
            component: CandidatesListPage,
            beforeEnter: (to, from, next) => {
              console.log('candidates route loaded!');
              next()
            }
          },
          {
            path: 'candidates/profile/:id',
            component: ViewCandidateProfile
          },
          {
            path: 'candidates/addnew',
            component: CandidatesAddNew
          },
          {
            path: 'openings',
            component: OpeningsList
          },
          {
            path: 'messages',
            component: MessagesPage
          },
          {
            path: 'history',
            component: HistoryPage
          }
      ],
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        },

        /*
        beforeUpdate: (to, from, next) => {
          store.dispatch('setTest')
            if(from.path == '/admin' || to.path == '/admin') {
                const isAdmin = store.state.userData.admin;
                if(isAdmin != '1') {
                    next(from.path)
                } else {
                    next(from.path)
                }
            }
        } */

    },
  ]
})
