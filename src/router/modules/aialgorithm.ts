import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const aialgorithmRouter: RouteConfig = {
  path: '/aialgorithm',
  component: Layout,
  redirect: '/aialgorithm/index',
  name: 'AIAlgorithm',
  meta: {
    title: 'AIAlgorithm',
    icon: 'gear'
  },
  children: [
    {
      path: 'universal-target-detection',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/aialgorithm/index.vue'),
      name: 'UniversalTargetDetection',
      meta: { title: 'UniversalTargetDetection' }
    },
    {
      path: 'fall-behavior-recognition',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/aialgorithm/index.vue'),
      name: 'FallBehaviorRecognition',
      meta: { title: 'FallBehaviorRecognition' }
    },
    {
      path: 'crossing-behavior-recognition',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/aialgorithm/index.vue'),
      name: 'CrossingBehaviorRecognition',
      meta: { title: 'CrossingBehaviorRecognition' }
    },
    {
      path: 'smoke-detection',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/aialgorithm/index.vue'),
      name: 'SmokeDetection',
      meta: { title: 'SmokeDetection' }
    },
    {
      path: 'flame-detection',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/aialgorithm/index.vue'),
      name: 'FlameDetection',
      meta: { title: 'FlameDetection' }
    },
  ]
}

export default aialgorithmRouter
