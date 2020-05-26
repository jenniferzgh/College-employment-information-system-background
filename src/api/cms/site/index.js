import request from "@/utils/request"

export function getAll() {
  return request({
    url: '/cms/site/all',
    method: 'get'
  })
}
