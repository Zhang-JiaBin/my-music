import axios from 'axios'
// 获取热搜关键词
export function getHotSearch () {
  return axios({
    methods: 'get',
    url: '/api/getHotSearch',
    params: {
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
