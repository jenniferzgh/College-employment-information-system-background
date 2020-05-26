import request from '@/utils/request'

export function getTree() {
  return request({
    url: '/category/tree',
    method: 'get'
  })
}

export function delCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}

export function updCategory(data) {
  return request({
    url: `/category`,
    method: 'put',
    data
  })
}

export function getCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'get'
  })
}

export function addCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}
