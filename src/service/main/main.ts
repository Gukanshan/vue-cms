import request from '@/service'

export function getEntireRoles() {
  return request.post({
    url: '/role/list',
  })
}

export function getEntireDepartment() {
  return request.post({
    url: '/department/list',
  })
}
