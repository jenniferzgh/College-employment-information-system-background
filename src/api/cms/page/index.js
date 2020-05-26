import request from "@/utils/request"

export function page(params, page, size) {
  return request({
    url: `/cms/page/${page}/${size}`,
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/cms/page',
    method: 'post',
    data
  })
}

export function delById(pageId) {
  return request({
    url: `/cms/page/${pageId}`,
    method: 'delete'
  })
}

export function updPage(data) {
  return request({
    url: `/cms/page`,
    method: 'put',
    data
  })
}

export function getOne(pageId) {
  return request({
    url: `/cms/page/${pageId}`,
    method: 'get'
  })
}

