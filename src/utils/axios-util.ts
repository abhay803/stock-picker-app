import axios from 'axios'

const axiosClient = axios.create()

const getRequest = (url: string, options: any = {}) =>
  axiosClient.get(url, options)

const postRequest = (url: string, options: any = {}) =>
  axiosClient.post(url, options)

export { getRequest, postRequest }
