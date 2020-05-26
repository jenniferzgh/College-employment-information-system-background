import request from '@/utils/request'
// /jos/info/examine?pageSize=10&pageSum=1   {pageSiize:10,pageSum:1}
export function page(params) {
  return request({
    url: `/jos/info/examine`,
    method: 'get',
    params
  })
}

// /user              {id:１, username: 'zhangshan'}
export function addObj(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

// /user/12/34
export function updObj(id, examine) {
  return request({
    url: `/jos/examine/${id}/${examine}`,
    method: 'put'
  })
}

export function delObj(id) {
  return request({
    url: `/student/re/${id}`,
    method: 'delete'
  })
}
// /jos/12
export function checkDetail(id){
  return request({
    url:`/jos/${id}`,
    method:'get'
  })
}

export function checkCompany(id){
  return request({
    url:`/company/string/${id}`,
    method:'get'
  })
}

export function addArticle(data) {
  return request({
    url: '/guidance',
    method: 'post',
    data
  })
}

// /guidance/page

export function getAllArtical(params) {
  return request({
    url: `/guidance/page`,
    method: 'get',
    params
  })
}


