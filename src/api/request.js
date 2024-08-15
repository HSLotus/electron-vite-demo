import axios from 'axios'
const NETWORK_ERROR = '网络请求异常,请稍后重试.....'
// 创建一个axios实例对象
const service = axios.create({
  baseURL: '/api',
})

// 在请求之前做一些事情
service.interceptors.request.use((req) => {
  // 可以自定义header
  // jwt-token认证的时候 
  return req
})

// 在请求之后做一些事情
service.interceptors.response.use((res) => {
  return res.data
  // const { code, data, msg } = res.data
  // // 根据后端 协商 视情况而定
  // if (code == 0) {
  //   return data
  // } else {
  //   // 网络请求错误
  //   console.log(msg || NETWORK_ERROR)
  //   return Promise.reject(msg || NETWORK_ERROR)
  // }
})

// 封装核心函数
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data
  }
  return service(options)
}
export default request