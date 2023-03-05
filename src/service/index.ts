import {BASE_URL, TIME_OUT} from './config'
import HYRequest from './request'

const request = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default request
