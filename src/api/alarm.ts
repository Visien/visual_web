import request from '@/utils/request2'

export const getAlarmList = (params: any) =>
  request({
    url: '/api/alarm/list',
    method: 'get',
    params
  })

export const createAlarm = (data: any) =>
  request({
    url: '/api/alarm',
    method: 'post',
    data
  })

export const deleteAlarm = (data: any) =>
  request({
    url: '/api/alarm?aid=' + data.aid,
    method: 'delete'
  })

export const getAlarmAlarm = (data: any) =>
  request({
    url: '/api/alarm/get_alarm?vsid=' + data.vsid,
    method: 'get'
  })

export const getAlarmHistory = (data: any) =>
  request({
    url: '/api/alarm/history_list?vsid=' + data.vsid,
    method: 'get'
  })
