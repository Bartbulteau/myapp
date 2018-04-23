import Vue from 'vue'
import Router from 'vue-router'

import Menu from '@/components/Menu'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu
    },
    {
    	path: '/users/:id',
    	name: 'Edit',
    	component: Edit
    }
  ]
})
