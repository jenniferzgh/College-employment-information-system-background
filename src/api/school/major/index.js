import request from '@/utils/request'

export function getMajorList(params) {
  return request({
    url: '/major/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/major',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/major/${id}`,
    method: 'delete'
  })
}

export function updObj(data) {
  return request({
    url: '/major',
    method: 'put',
    data
  })
}

export function getBySIdAndAid(schoolId, academyId) {
  return request({
    url: `/major/school/${schoolId}/academy/${academyId}`,
    method: 'get'
  })
}


export function getAllAcademyList(){
  return request({
    url:`/academy/all`,
    method:'get'
  })
}

export function getMajorDetail(id){
  return request({
    url:`/major/${id}`,
    method:'get'
  })
}
export function getMajorAndAcademyList(){
  return request({
    url:'/academy/tree',
    method:'get'
  })
}