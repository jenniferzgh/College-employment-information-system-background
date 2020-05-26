import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/guidance/page',
    method: 'get',
    params
  })
}

export function delObj(id) {
  return request({
    url: `/guidance/${id}`,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: `/guidance/${id}`,
    method: 'get'
  })
}
