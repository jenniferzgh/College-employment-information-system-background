import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/clazz/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/clazz',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/clazz/${id}`,
    method: 'delete'
  })
}

export function updObj(data) {
  return request({
    url: '/clazz',
    method: 'put',
    data
  })
}

export function getBySAMId(schoolId, academyId, majorId) {
  return request({
    url: `/clazz/school/${schoolId}/academy/${academyId}/major/${majorId}`,
    method: 'get'
  })
}
