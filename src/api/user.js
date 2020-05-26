import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info/' + token,
    method: 'get',
  })
}

export function logout(token) {
  return request({
    url: `/auth/logout/${token}`,
    method: 'get',
  })
}
