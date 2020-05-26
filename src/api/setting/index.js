import request from '@/utils/request'

export function getSetting() {
  return request({
    url: '/setting/1',
    method: 'get'
  })
}

export function updSetting(data) {
  return request({
    url: '/setting',
    method: 'put',
    data
  })
}
