import request from '@/utils/request2'

export const getVideostreamList = (params: any) =>
  request({
    url: '/api/videostream/list',
    method: 'get',
    params
  })

export const getVideostreamListManage = (params: any) =>
  request({
    url: '/api/videostream/list_manage',
    method: 'get',
    params
  })

export const createVideostream = (data: any) =>
  request({
    url: '/api/videostream',
    method: 'post',
    data
  })

export const updataVideostream = (data: any) =>
  request({
    url: '/api/videostream',
    method: 'put',
    data
  })

export const deleteVideostream = (data: any) =>
  request({
    url: '/api/videostream?vsid=' + data.vsid,
    method: 'delete'
  })

export const VideostreamStart = (data: any) =>
  request({
    url: '/api/videostream/start?vsid=' + data.vsid,
    method: 'post',
  })

export const VideostreamStop = (data: any) =>
  request({
    url: '/api/videostream/stop?vsid=' + data.vsid,
    method: 'post',
    data
  })

export const VideostreamList = (data: any) =>
  request({
    url: '/api/videostream/playlist?project=preview',
    method: 'get',
    data
  })
  