import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const systemconfRoutes: RouteConfig = {
  path: '/systemconf',
  component: Layout,
  redirect: '/systemconf/complex-table',
  name: 'SystemConf',
  meta: {
    title: 'systemConf',
    icon: 'gear'
  },
  children: [
    {
      path: 'equipment-manage',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/systemconf/dynamic-table/index.vue'),
      name: 'EquipmentManage',
      meta: { title: 'equipmentManage' }
    },
    {
      path: 'user-manage',
      component: () => import(/* webpackChunkName: "draggable-table" */ '@/views/systemconf/draggable-table.vue'),
      name: 'UserManage',
      meta: { title: 'userManage' }
    },
    {
      path: 'data-manage',
      component: () => import(/* webpackChunkName: "inline-edit-table" */ '@/views/systemconf/inline-edit-table.vue'),
      name: 'DataManage',
      meta: { title: 'dataManage' }
    },
  ]
}

export default systemconfRoutes
