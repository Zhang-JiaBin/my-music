// import axios from 'axios'
// export function getSingerList () {
//   return axios({
//     methods: 'get',
//     url: '/api/getSingerList'
//   }).then(res => {
//     return Promise.resolve(res.data)
//   })
// }
import jsonp from '../utils/jsonp'
import {
  commonParams,
  options
} from './config'

// 获取歌手列表
export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

// export function getSongUrl (mid) {
//   return axios({
//     methods: 'get',
//     url: '/api/getSongUrl',
//     params: {
//       id: mid
//     }
//   }).then(res => {
//     return Promise.resolve(res.data)
//   })
// }
