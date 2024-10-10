import request from '@/utils/request2'

export const getMediaList = (params: any) =>
  request({
    url: '/api/mediasource/list',
    method: 'get',
    params
  })

export const createMedia = (data: any) =>
  request({
    url: '/api/mediasource',
    method: 'post',
    data
  })

export const deleteMedia = (data: any) =>
  request({
    url: '/api/mediasource?msid=' + data.msid,
    method: 'delete'
  })
