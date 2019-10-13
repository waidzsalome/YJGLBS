import request from '../../utils/request';

export function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  })
}
