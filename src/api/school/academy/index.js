import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/academy/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/academy',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/academy/${id}`,
    method: 'delete'
  })
}

export function updObj(data) {
  return request({
    url: '/academy',
    method: 'put',
    data
  })
}

export function getAcademies(schoolId) {
  return request({
    url: `/academy/school/${schoolId}`,
    method: 'get'
  })
}
//获取学院详情
export function getAcademyDetail(academyId){
  return request({
    url:`/academy/${academyId}`,
    method:'get'
  })
}
