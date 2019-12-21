import axios from 'axios'
import {
  commonParams,
} from './config'

// 获取排行榜指定榜单的歌曲
export function getMusicList(topid) {
  const url = '/api/getMusicList'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 2635665603,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    format: 'json',
    data: {
      'detail': {
        'module': 'musicToplist.ToplistInfoServer',
        'method': 'GetDetail',
        'param': {
          'topId': topid,
          'offset': 0,
          'num': 20
          // 'period': getdate()
        }
      },
      'comm': {
        'ct': 24,
        'cv': 0
      }
    }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
