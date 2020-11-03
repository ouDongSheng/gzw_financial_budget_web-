import request from '@/router/axios';

export const getList = (current, size, params,messageType) => {
  return request({
    url: '/api/etop-component/message/email/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
      messageType
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/etop-component/message/email/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/etop-component/message/email/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/etop-component/message/email/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/etop-component/message/email/submit',
    method: 'post',
    data: row
  })
}
