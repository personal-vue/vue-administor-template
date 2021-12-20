/**
 * user相关api的第一代版本
 */
import request from '@/utils/request'

/**
 * 注册
 * @param {*} data
 * @returns
 */
export const userRegister = (data) => {
  return request({
    url: '/user/userRegister',
    method: 'post',
    data
  })
}

/**
 * 登录
 * @param {*} data
 * @returns
 */
export const userLogin = (data) => {
  return request({
    url: '/user/userLogin',
    method: 'post',
    data
  })
}

export const deleteUser = (param) => {
  return request({
    url: `/user/deleteUser/${param}`,
    method: 'delete'
  })
}

/**
 * 重置密码
 * @param {*} data
 * @returns
 */
export const resetPassword = (data) => {
  return request({
    url: '/user/resetPassword',
    method: 'patch',
    data
  })
}

/**
 * 获取角色
 * @param {*} params
 * @returns
 */
export const getRoles = (params) => {
  return request({
    url: '/role/getRoles',
    method: 'get',
    params
  })
}
