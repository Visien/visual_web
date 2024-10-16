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


export const VideostreamList_aialgorithm = (data: any) =>
  request({
    url: '/api/videostream/playlist?project=ai_algorithm',
    method: 'get',
    data
  })


export const VideostreamList_bodyanalysis = (data: any) =>
  request({
    url: '/api/videostream/playlist?project=body_analysis',
    method: 'get',
    data
  })

export const VideostreamList_postalindustry = (data: any) =>
  request({
    url: '/api/videostream/playlist?project=postal_industry',
    method: 'get',
    data
  })

export const VideostreamList_oilfield = (data: any) =>
  request({
    url: '/api/videostream/playlist?project=oil_field',
    method: 'get',
    data
  })

export const VideostreamList_ri = (data: any) =>
  request({
    url: '/api/videostream/playlist?project=研创展演示',
    method: 'get',
    data
  })