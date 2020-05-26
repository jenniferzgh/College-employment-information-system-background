import request from "@/utils/request"

export function getAll() {
  return request({
    url: '/cms/template/all',
    method: 'get'
  })
}
