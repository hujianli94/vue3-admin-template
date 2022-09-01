import request from '@/utils/axiosReq'

export function submit(data) {
  return request({
    url: '/api/todo',
    data,
    method: 'post',
    bfLoading: false,
    isParams: true,
    isAlertErrorMsg: false
  })
}

export function pullData(params) {
  return request({
    url: '/api/todo',
    method: 'get',
    data: params
  })
}
