// import {
//   getSongUrl
// } from '../api/singer'
// import {
//   getLyric
// } from '../api/song'
// import {
//   ERR_OK
// } from '../api/config'
// import {
//   Base64
// } from 'js-base64'

// 推荐页面指定歌单和排行榜指定榜单所有歌曲的所有歌曲形成的类
export default class Song {
  constructor ({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  // getLyric() {
  //   if (this.lyric) {
  //     return Promise.resolve(this.lyric)
  //   }
  //   return new Promise((resolve, reject) => {
  //     getLyric(this.mid).then((res) => {
  //       if (res.retcode === ERR_OK) {
  //         this.lyric = Base64.decode(res.lyric)
  //         resolve(this.lyric)
  //       } else {
  //         reject('no lyric')
  //       }
  //     })
  //   })
  // }
}

export function createSong (item) {
  let song = new Song({
    id: item.id,
    mid: item.mid,
    singer: filterSinger(item.singer),
    name: item.name,
    album: item.album.name,
    duration: item.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`
  })
  // 获取歌曲vkey并且拼接播放地址，给song对象添加url属性
  // let url
  // getSongUrl(item.mid).then(res => {
  //   const vkey = res.req_0.data.midurlinfo[0].purl
  //   url = 'http://ws.stream.qqmusic.qq.com/' + vkey
  //   song.url = url
  // })
  return song
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}
