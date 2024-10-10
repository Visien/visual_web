import request from '@/utils/request2'

export const getAlgoritList = (params: any) =>
  request({
    url: '/api/algorithm/list',
    method: 'get',
    params
  })

export const createAlgorit = (data: any) =>
  request({
    url: '/api/algorithm',
    method: 'post',
    data
  })

export const deleteAlgorit = (data: any) =>
  request({
    url: '/api/algorithm?aid=' + data.aid,
    method: 'delete'
  })
