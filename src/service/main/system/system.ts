import request from '@/service'

// 用户
export function postUsersListData(queryInfo: any) {
  return request.post({
    url: '/users/list',
    data: queryInfo,
  })
}

export function deleteUserById(id: number) {
  return request.delete({
    url: `/users/${id}`,
  })
}

export function addUser(userInfo: any) {
  return request.post({
    url: '/users',
    data: userInfo,
  })
}

export function editUserById(id: number, userInfo: any) {
  return request.patch({
    url: `/users/${id}`,
    data: userInfo,
  })
}
