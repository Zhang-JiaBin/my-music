import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  createSong
} from './song'
import {
  playMode
} from './config'
import {
  shuffle
} from './util'
import {
  getSongUrl
} from '../api/singerSong'
import { clearSearch, saveSearch } from './localStorage'
export const singerMixin = {
  computed: {
    ...mapGetters([
      'singer',
      'playering',
      'fullScreen',
      'playList',
      'sequenceList',
      'mode',
      'currentIndex',
      'currentSong',
      'clickMark',
      'songSheet',
      'rankList',
      'pageCount',
      'searchHistory'
    ])
  },
  methods: {
    ...mapActions([
      'setSinger',
      'setPlayering',
      'setFullScreen',
      'setPlayList',
      'setSequenceList',
      'setMode',
      'setCurrentIndex',
      'setClickMark',
      'setSongSheet',
      'setRankList',
      'setPageCount',
      'setSearchHistory'
    ]),
    // 对list每个数据进行处理，返回Song类实例数组
    normalizeSong (list) {
      let ret = []
      list.forEach(item => {
        if (item.album.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    },
    // 获取歌曲播放url
    gainSongUrl (song) {
      getSongUrl(song.mid).then(res => {
        const vkey = res.req_0.data.midurlinfo[0].purl
        song.url = 'http://ws.stream.qqmusic.qq.com/' + vkey
      })
    },
    // 从list中查找song的索引
    _findIndex (list, song) {
      return list.findIndex(item => {
        return item.id === song.id
      })
    },
    // 重新更新当前歌曲的index
    resetCurrentIndex (list) {
      let index = this._findIndex(list, this.currentSong)
      this.setCurrentIndex(index)
    },
    insertSong (item) {
      let len = this.playList.length
      let playList = this.playList
      let index = this.currentIndex
      const fIndex = this._findIndex(playList, item)
      if (fIndex > -1) {
        index = fIndex
      } else {
        if (index === -1) {
          playList.unshift(item)
          index = 0
        } else {
          const beforeList = playList.slice(0, index + 1)
          beforeList.push(item)
          const afterList = playList.slice(index + 1, len)
          playList = beforeList.concat(afterList)
          index++
        }
      }
      if (!item.url) {
        this.gainSongUrl(item)
      }
      this.setCurrentIndex(index)
      this.setPlayList(playList)
      this.setSequenceList(playList)
      this.setPlayering(true)
      this.setClickMark(true)
      // console.log('len', len)
      // console.log('playList', this.playList)
      // console.log('index', this.currentIndex)
      // console.log('secquence', this.secquenceList)
    },
    // 随机选择一首歌播放
    randomPlay (list) {
      if (!list.length) {
        return
      }
      this.setSequenceList(list)
      this.setPlayList(list)
      let ranIndex = Math.floor(Math.random() * list.length)
      const item = list[ranIndex]
      this.simpleToast(`歌曲: '${item.name}'`)
      if (!item.url) {
        this.gainSongUrl(item)
      }
      // console.log(ranIndex)
      this.setCurrentIndex(ranIndex)
      this.setPlayering(true)
      this.setClickMark(true)
    },
    // 选择一首歌曲播放
    selectPlay (list, index, item) {
      this.simpleToast(`歌曲: '${item.name}'`)
      if (!item.url) {
        this.gainSongUrl(item)
      }
      if (this.currentSong && item.mid === this.currentSong.mid) {
        this.setFullScreen(true)
      }
      this.setSequenceList(list)
      if (this.mode === playMode.random) {
        let randomList = shuffle(list)
        this.setPlayList(randomList)
        index = this._findIndex(randomList, list[index])
      } else {
        this.setPlayList(list)
      }
      this.setCurrentIndex(index)
      this.setPlayering(true)
    },
    // 监听歌单的子组件派发的事件select   跳转到子组件sheetDetail
    selectSheetItem (sheet) {
      this.setPageCount(this.pageCount + 1)
      this.simpleToast(`歌单: '${sheet.title}'`)
      this.setSongSheet(sheet)
    },
    // 监听排行榜的子组件派发的事件select   跳转到子组件rankDetail
    selectTopItem (item) {
      this.setPageCount(this.pageCount + 1)
      this.simpleToast(`榜单: '${item.title}'`)
      this.setRankList(item)
    },
    // 保存搜索结果到localstorage
    saveSearchHistory (query) {
      this.setSearchHistory(saveSearch(query))
    },
    // 删除搜索历史
    deleteAllSearchHistory () {
      this.setSearchHistory(clearSearch())
    }
  }
}
