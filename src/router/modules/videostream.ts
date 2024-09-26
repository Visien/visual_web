import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const videostreamRouter: RouteConfig = {
  path: '/videostream',
  component: Layout,
  redirect: '/videostream/index',
  name: 'VideoStream',
  meta: {
    title: 'VideoStream',
    icon: 'tree'
  },
  children: [
    {
      path: 'mediaresource-manage',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/videostream/mediaresource-manage.vue'),
      name: 'MediaResourceManage',
      meta: { title: 'MediaResourceManage' }
    },
    {
      path: 'algorithm-manage',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/videostream/algorithm-manage.vue'),
      name: 'AlgorithmManage',
      meta: { title: 'AlgorithmManage' }
    },
    {
      path: 'videostream-manage',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/videostream/videostream-manage.vue'),
      name: 'VideoStreamManage',
      meta: { title: 'VideoStreamManage' }
    },
  ]
}

export default videostreamRouter
