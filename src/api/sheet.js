import axios from 'axios'
// 获取官方歌单列表
export function getSheetList () {
  return axios({
    methods: 'get',
    url: '/api/getSheetList',
    params: {
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data: {
        'comm': {
          'ct': 24
        },
        'playlist': {
          'method': 'get_playlist_by_category',
          'param': {
            'id': 3317,
            'curPage': 1,
            'size': 100,
            'order': 5,
            'titleid': 3317
          },
          'module': 'playlist.PlayListPlazaServer' }
      }
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
