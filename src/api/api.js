import request from "./request"
export default {
  searchGlobal (params) {
    return request({
        url: '/search/global',
        method: 'get',
        data: params,
    })
  },
}