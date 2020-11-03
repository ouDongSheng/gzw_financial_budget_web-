import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const loginByUsername = (tenantId, username, password, type) => request({
  url: baseUrl + '/api/blade-auth/oauth/token',
  method: 'post',
  headers: {
    'Tenant-Id': tenantId
  },
  params: {
    tenantId,
    username,
    password,
    grant_type: "password",
    scope: "all",
    type
  }
})
console.log('2222',baseUrl)
export const refreshToken = (refresh_token, tenantId) => request({
  url:  baseUrl + '/api/blade-auth/oauth/token',
  method: 'post',
  headers: {
    'Tenant-Id': tenantId
  },
  params: {
    tenantId,
    refresh_token,
    grant_type: "refresh_token",
    scope: "all",
  }
})

// 获取租户列表
export const tenantList = (u) => request({
  url:  baseUrl + '/api/blade-auth/tenantx/list',
  method: 'post',
  params: {
    u
  }
});

// 获取用户信息(使用该接口返回的tenantId覆盖登录接口返回的tenantId，避免tenantId为000000时的问题)
export const getTenantId = () => request({
  url:  baseUrl + '/api/blade-auth/oauth/user-info',
  method: 'get'
});

export const getButtons = () => request({
  url: '/api/blade-system/menu/buttons',
  method: 'get'
});

export const getUserInfo = () => request({
  url: baseUrl + '/user/getUserInfo',
  method: 'get'
});

export const sendLogs = (list) => request({
  url: baseUrl + '/user/logout',
  method: 'post',
  data: list
})

export const logout = () => request({
  url: baseUrl + '/user/logout',
  method: 'get'
})
