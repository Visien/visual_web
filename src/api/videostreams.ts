import request from '@/utils/request'
import { IVideoStreamData } from './types'

export const defaultVideoStreamData: IVideoStreamData = {
  id: 0,
  user: 'visen',
  type: 'local stream',
  title: '',
  info: '',
  startTime: '',
  runningTime: '',
  endTime: '',
  status: '',
  Operations: ['remove', 'retry', 'details']
}

export const getVideoStreams = (params: any) =>
  request({
    url: '/videostreams',
    method: 'get',
    params
  })

export const getVideoStream = (id: number, params: any) =>
  request({
    url: `/videostream/${id}`,
    method: 'get',
    params
  })

export const createVideoStream = (data: any) =>
  request({
    url: '/videostreams',
    method: 'post',
    data
  })

export const updateVideoStream = (id: number, data: any) =>
  request({
    url: `/videostreams/${id}`,
    method: 'put',
    data
  })

export const deleteVideoStream = (id: number) =>
  request({
    url: `/videostreams/${id}`,
    method: 'delete'
  })

export const getvsPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
