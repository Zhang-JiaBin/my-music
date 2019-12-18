import axios from 'axios'
// 线上qq音乐API接口
// export function getSingerSongs (mid) {
//   return axios({
//     methods: 'get',
//     url: '/api/getSingerSongs',
//     params: {
//       singermid: mid,
//       num: 30
//     }
//   }).then(res => {
//     return Promise.resolve(res.data)
//   })
// }
// import jsonp from '../utils/jsonp'
import {
  commonParams,
  options
} from './config'
// 获取歌曲的vkey用了拼接歌曲播放url
export function getSongUrl (songMid) {
  const url = '/api/getSongUrl'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 2635665603,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    rnd: Math.random(),
    format: 'json',
    data: {
      'req_0': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '2048011330',
          'songmid': [songMid],
          'songtype': [0],
          'uin': '2635665603',
          'loginflag': 1,
          'platform': '20'
        }
      },
      'comm': {
        'uin': 2635665603,
        'format': 'json',
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

// qq音乐真实接口

export function getSingerSongs (mid) {
  return axios({
    methods: 'get',
    url: '/api/getSingerDetail',
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
          'ct': 24,
          'cv': 0
        },
        'singerSongList': {
          'method': 'GetSingerSongList',
          'param': {
            'order': 1,
            'singerMid': mid,
            'begin': 0,
            'num': 100
          },
          'module': 'musichall.song_list_server'
        }
      }
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取歌手歌曲
// export function getSingerSongs (singerId) {
//   const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
//
//   const data = Object.assign({}, commonParams, {
//     hostUin: 0,
//     needNewCode: 0,
//     platform: 'yqq',
//     order: 'listen',
//     begin: 0,
//     num: 80,
//     songstatus: 1,
//     singermid: singerId
//   })
//
//   return jsonp(url, data, options)
// }
