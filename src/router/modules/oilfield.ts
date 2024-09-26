import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const oilfieldRoutes: RouteConfig = {
  path: '/oilfield',
  component: Layout,
  redirect: '/oilfield/index',
  name: 'Oilfield',
  meta: {
    title: 'Oilfield',
    icon: 'gear'
  },
  children: [
    {
      path: 'personnel-clothing',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/oilfield/index.vue'),
      name: 'PersonnelClothing',
      meta: { title: 'PersonnelClothing' }
    },
    {
      path: 'hand-hanging',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/oilfield/index.vue'),
      name: 'HandHanging',
      meta: { title: 'HandHanging' }
    },
    {
      path: 'gas-cylinder-placement',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/oilfield/index.vue'),
      name: 'GasCylinderPlacement',
      meta: { title: 'GasCylinderPlacement' }
    },
    {
      path: 'seat-belt',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/oilfield/index.vue'),
      name: 'SeatBelt',
      meta: { title: 'SeatBelt' }
    },
    {
      path: 'specification-behavior',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/oilfield/index.vue'),
      name: 'SpecificationBehavior',
      meta: { title: 'SpecificationBehavior' }
    },
  ]
}

export default oilfieldRoutes
