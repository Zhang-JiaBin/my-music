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
import { clearFavorite, clearSearch, deleteFavorite, saveFavorite, saveSearch } from './localStorage'
import Singer from './singer'
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
      'searchHistory',
      'showPopUp',
      'selectedSong',
      'favoriteList'
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
      'setSearchHistory',
      'setShowPopUp',
      'setSelectedSong',
      'setFavoriteList'
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
    // 插入歌曲进行播放，next 为true 时表示下一首播放
    insertSong (item, next = false) {
      let len = this.playList.length
      let playList = this.playList
      let index = this.currentIndex
      const orginIndex = index
      const fIndex = this._findIndex(playList, item)
      if (fIndex > -1) {
        index = fIndex
        if (next) {
          index = orginIndex
          let nextIndex = orginIndex + 1 === len ? 0 : orginIndex + 1 // 当前播放歌曲的下一个索引
          const Nextsong = playList[nextIndex] // 当前播放歌曲的下一首歌曲
          const Targetsong = playList[fIndex] // 要添加到下一首的歌曲
          playList[fIndex] = Nextsong // 两者互换位置
          playList[nextIndex] = Targetsong
        }
      } else {
        if (index === -1) {
          playList.unshift(item)
          index = 0
        } else {
          const beforeList = playList.slice(0, index + 1)
          beforeList.push(item)
          const afterList = playList.slice(index + 1, len)
          playList = beforeList.concat(afterList)
          index = next ? index : index + 1
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
      if (next) {
        this.simpleToast('添加到下一首')
      }
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
    // 删除全部搜索历史
    deleteAllSearchHistory () {
      this.setSearchHistory(clearSearch())
    },
    // 保存收藏歌曲列表到localstorage
    savemyFavorite (song) {
      this.setFavoriteList(saveFavorite(song))
      this.simpleToast('已收藏')
    },
    deletemyFavorite (song) {
      this.setFavoriteList(deleteFavorite(song))
      this.simpleToast('已删除')
    },
    deletemyAllFavorite () {
      this.setFavoriteList(clearFavorite())
    }
  }
}

export const playerMixin = {
  data () {
    return {
      SrouterName: '',
      TrouterName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      // const fromDepth = from.path.split('/')
      const toDepth = to.path.split('/')
      // console.log('from', fromDepth)
      // console.log('to', toDepth)
      this.SrouterName = toDepth[2]
      this.TrouterName = toDepth[3]
    }
  },
  methods: {
    // 跳转到歌手详情页
    goToSingerDetail (song) {
      if (!song.singerMid) {
        return
      }
      this.setFullScreen(false)
      // 如果二级路由或者三级就是singer直接return，不用跳转
      console.log('goto:', this.SrouterName, this.TrouterName)
      if (this.SrouterName === 'singer' || this.TrouterName === 'singer') {
        return
      }
      // 二级路由不是singer,跳转到指定的二级路由的子路由
      this.setPageCount(this.pageCount + 1)
      this.$router.push({
        path: `/home/${this.SrouterName}/singer/${song.singerMid}`
      })
      const cSinger = new Singer({
        id: song.singerMid,
        name: song.singer
      })
      this.setSinger(cSinger)
    }
  }
}
