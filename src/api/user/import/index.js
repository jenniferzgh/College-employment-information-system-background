import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/import/page',
    method: 'get',
    params
  })
}

export function studentPage(params) {
  return request({
    url: '/student/page',
    method: 'get',
    params
  })
}

export function delObj(id) {
  return request({
    url: `/import/${id}`,
    method: 'delete'
  })
}

export function addObj(data) {
  return request({
    url: `/student`,
    method: 'post',
    data
  })
}


