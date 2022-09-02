import request from '@/utils/axiosReq'

export function submit(data) {
  return request({
    url: '/api/todo',
    data,
    method: 'post',
    bfLoading: false,
    isParams: true,
    isAlertErrorMsg: false,
    baseURL: import.meta.env.VITE_APP_PROXY_URL
  })
}

export function pullData(params) {
  return request({
    url: '/api/todo/list',
    method: 'get',
    isParams: true,
    data: params,
    baseURL: import.meta.env.VITE_APP_PROXY_URL
  })
}
