import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/school/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/school',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/school/${id}`,
    method: 'delete',
  })
}

export function updObj(data) {
  return request({
    url: '/school',
    method: 'put',
    data
  })
}

export function getAll() {
  return request({
    url: '/school/all',
    method: 'get'
  })
}
