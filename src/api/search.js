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

// 获取搜索内容
export function search (query, page, zhida, perpage) {
  return axios({
    methods: 'get',
    url: '/api/search',
    params: {
      g_tk: 5381,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: query,
      zhidaqu: 1,
      catZhida: zhida ? 1 : 0,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      perpage: perpage,
      n: 20,
      p: page,
      remoteplace: 'txt.mqq.all'
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
