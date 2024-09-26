import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const postalindustryRoutes: RouteConfig = {
  path: '/postalindustry',
  component: Layout,
  redirect: '/postalindustry/index',
  name: 'PostalIndustry',
  meta: {
    title: 'PostalIndustry',
    icon: 'gear'
  },
  children: [
    {
      path: 'risk-behaviors-18',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/postalindustry/index.vue'),
      name: 'RiskBehaviors18',
      meta: { title: 'RiskBehaviors18' }
    },
    {
      path: 'safety-accidents-9',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/postalindustry/index.vue'),
      name: 'SafetyAccidents9',
      meta: { title: 'SafetyAccidents9' }
    },
  ]
}

export default postalindustryRoutes
