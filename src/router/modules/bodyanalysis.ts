import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const bodyanalysisRoutes: RouteConfig = {
  path: '/bodyanalysis',
  component: Layout,
  redirect: '/bodyanalysis/index',
  name: 'BodyAnalysis',
  meta: {
    title: 'BodyAnalysis',
    icon: 'gear'
  },
  children: [
    {
      path: 'body-detection',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/bodyanalysis/people_detect.vue'),
      name: 'BodyDetection',
      meta: { title: 'BodyDetection' }
    },
    {
      path: 'body-key-points',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/bodyanalysis/people_pose.vue'),
      name: 'BodyKeyPoints',
      meta: { title: 'BodyKeyPoints' }
    },
    {
      path: 'body-part-segmentation',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/bodyanalysis/people_parsing.vue'),
      name: 'BodyPartSegmentation',
      meta: { title: 'BodyPartSegmentation' }
    },
    {
      path: 'body-dense-posture',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/bodyanalysis/people_dense_pose.vue'),
      name: 'BodyDensePosture',
      meta: { title: 'BodyDensePosture' }
    },
    {
      path: 'face-detection',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/bodyanalysis/face_detect.vue'),
      name: 'FaceDetection',
      meta: { title: 'FaceDetection' }
    },
    {
      path: 'face-key-points',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/bodyanalysis/face_106.vue'),
      name: 'FaceKeyPoints',
      meta: { title: 'FaceKeyPoints' }
    },
    {
      path: 'face-recognition',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/bodyanalysis/index.vue'),
      name: 'FaceRecognition',
      meta: { title: 'FaceRecognition' }
    },
  ]
}

export default bodyanalysisRoutes
