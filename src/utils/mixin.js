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
  getLyric
} from '../api/singerSong'
import {
  Base64
} from 'js-base64'
import {
  clearFavorite, clearHistory, clearRanks,
  clearSearch, clearSheets, clearSingers,
  deleteFavorite,
  deleteHistory, deleteRanks, deleteSheets, deleteSingers,
  saveFavorite,
  saveHitory, saveRanks,
  saveSearch, saveSheets, saveSingers, saveSongToSheet, saveUserSheet
} from './localStorage'
import { getSongList } from '../api/recommend'
import { getMusicList } from '../api/rank'
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
      'favoriteList',
      'homeMark',
      'historyList',
      'collectSingers',
      'collectSheets',
      'collectRanks',
      'userSheet',
      'mySheetList',
      'inMySheet',
      'showCreateSheet',
      'slideIndex',
      'showSheetPop'
    ]),
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-loop' : this.mode === playMode.loop ? 'icon-single' : 'icon-random'
    },
    attentionText () {
      return this.InSingers ? '已关注' : '关注'
    },
    // 在我的歌单页面选中的歌单数目
    selectNum () {
      let count = 0
      let list = this.userSheet.slice()
      for (let i = 0; i < list.length; i++) {
        if (list[i].select) {
          count++
        }
      }
      return count
    }

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
      'setFavoriteList',
      'setHomeMark',
      'setHistoryList',
      'setCollectSingers',
      'setCollectSheets',
      'setCollectRanks',
      'setUserSheet',
      'setMySheetList',
      'setInMySheet',
      'setShowCreateSheet',
      'setSlideIndex',
      'setShowSheetPop'
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
    // 获取歌词
    gainLyric (song) {
      if (song.lyric) {
        return Promise.resolve(song.lyric)
      }
      return new Promise((resolve, reject) => {
        getLyric(song.mid).then((res) => {
          if (res.retcode === 0) {
            song.lyric = Base64.decode(res.lyric)
            resolve(song.lyric)
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('no lyric')
          }
        })
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

    deleteSongFromList (item, list) {
      let len = list.length
      let retList = list
      const fIndex = this._findIndex(list, item)
      if (fIndex === -1) {
        return
      }
      const beforeList = list.slice(0, fIndex)
      const afterList = list.slice(fIndex + 1, len)
      retList = beforeList.concat(afterList)
      return retList
    },
    // 从列表中删除歌曲
    deleteFromSongs (item) {
      let len = this.playList.length
      let playList = this.playList
      let sequenceList = this.sequenceList
      let index = this.currentIndex
      const orginIndex = index
      const fIndex = this._findIndex(playList, item)
      if (fIndex === -1) {
        return
      }
      if (fIndex > index) {
        index = orginIndex
      } else if (fIndex === index) {
        let nextIndex = orginIndex + 1 === len ? 0 : orginIndex + 1
        index = orginIndex + 1 === len ? 0 : orginIndex
        this.playList[nextIndex].gainSongUrl()
      } else if (fIndex < index) {
        index--
      }
      this.setPlayList(this.deleteSongFromList(item, playList))
      this.setSequenceList(this.deleteSongFromList(item, sequenceList))
      this.setClickMark(true)
      if (this.playList.length === 0) {
        this.setPlayList([])
        this.setSequenceList([])
        this.setPlayering(false)
        this.setCurrentIndex(-1)
        // this.setPageCount(0)
        return
      }
      this.setCurrentIndex(index)
      this.setPlayering(true)
    },
    deleteAllSong () {
      this.setPlayList([])
      this.setSequenceList([])
      this.setCurrentIndex(-1)
      this.setPlayering(false)
    },
    // 插入歌曲到列表中
    insertSongToList (item, list, difindex) {
      let len = list.length
      let retList = list
      let index = difindex
      const fIndex = this._findIndex(list, item)
      if (fIndex > -1) {
        return retList
      } else {
        if (index === -1) {
          retList.unshift(item)
        } else {
          const beforeList = list.slice(0, index + 1)
          beforeList.push(item)
          const afterList = list.slice(index + 1, len)
          retList = beforeList.concat(afterList)
        }
        return retList
      }
    },
    // 插入歌曲进行播放，next 为true 时表示下一首播放
    insertSong (item, next = false) {
      item.gainSongUrl()
      // 播放列表的添加
      let len = this.playList.length
      let playList = this.playList
      let index = this.currentIndex
      const orginIndex = index
      const fIndex = this._findIndex(playList, item)
      if (fIndex !== orginIndex) {
        this.setPlayering(false)
      }
      if (fIndex !== -1) {
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
          index = 0
        } else {
          index = next ? orginIndex : orginIndex + 1
        }
      }
      // 对顺序列表的添加
      let Slen = this.sequenceList.length
      let sequenceList = this.sequenceList
      const SorginIndex = this._findIndex(sequenceList, this.currentSong)
      const Sindex = this._findIndex(sequenceList, item)
      if (Sindex > -1) {
        if (next) {
          let SnextIndex = SorginIndex + 1 === Slen ? 0 : SorginIndex + 1
          const SnextSong = sequenceList[SnextIndex]
          const StargetSong = sequenceList[Sindex]
          sequenceList[Sindex] = SnextSong
          sequenceList[SnextIndex] = StargetSong
        }
      }
      // if (!item.url) {
      //   this.gainSongUrl(item)
      // }
      this.setPlayList(this.insertSongToList(item, this.playList, this.currentIndex))
      this.setSequenceList(this.insertSongToList(item, this.sequenceList, SorginIndex))
      this.setCurrentIndex(index)
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
      item.gainSongUrl()
      this.simpleToast(`歌曲: '${item.name}'`)
      // if (!item.url) {
      //   this.gainSongUrl(item)
      // }
      // console.log(ranIndex)
      this.setCurrentIndex(ranIndex)
      this.setPlayering(true)
      this.setClickMark(true)
    },
    // songSheet 页面点击播放按钮
    selectSheetPlay (list, index, sheet) {
      this.setSequenceList(list)
      if (this.mode === playMode.random) {
        let randomList = shuffle(list)
        this.setPlayList(randomList)
        index = this._findIndex(randomList, list[index])
      } else {
        this.setPlayList(list)
      }
      this.setCurrentIndex(index)
      this.currentSong.gainSongUrl()
      if (!this.playering) {
        this.setPlayering(!this.playering)
      }
      this.setSongSheet(sheet)
    },
    // 获取播放的图标
    getSheetIcon (item) {
      if (this.playering && this.songSheet.content_id === item.content_id) {
        return 'icon-sheet-pause'
      } else {
        return 'icon-sheet-play'
      }
    },
    // 点击每个歌单图片上的播放按钮
    clickplay (item) {
      if (this.songSheet.content_id === item.content_id) {
        this.setPlayering(!this.playering)
      } else {
        getSongList(item.content_id).then(res => {
          let songs = this.normalizeSong(res.cdlist[0].songlist)
          this.selectSheetPlay(songs, 0, item)
        })
      }
    },
    // rankItem 排行榜图片上的点击播放按钮
    selectRankPlay (list, index, rank) {
      this.setSequenceList(list)
      if (this.mode === playMode.random) {
        let randomList = shuffle(list)
        this.setPlayList(randomList)
        index = this._findIndex(randomList, list[index])
      } else {
        this.setPlayList(list)
      }
      this.setCurrentIndex(index)
      this.currentSong.gainSongUrl()
      if (!this.playering) {
        this.setPlayering(!this.playering)
      }
      this.setRankList(rank)
    },
    getRankIcon (item) {
      if (this.playering && this.rankList.topId === item.topId) {
        return 'icon-sheet-pause'
      } else {
        return 'icon-sheet-play'
      }
    },
    clickRankPlay (item) {
      if (this.rankList.topId === item.topId) {
        this.setPlayering(!this.playering)
      } else {
        getMusicList(item.topId).then(res => {
          let songs = this.normalizeSong(res.detail.data.songInfoList)
          this.selectRankPlay(songs, 0, item)
        })
      }
    },
    // 选择一首歌曲播放
    selectPlay (list, index, item) {
      this.simpleToast(`歌曲: '${item.name}'`)
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
      this.currentSong.gainSongUrl()
      this.setPlayering(true)
    },
    // 修改播放模式
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      const text = this.mode === playMode.sequence ? '列表循环' : this.mode === playMode.loop ? '单曲循环' : '随机播放'
      this.simpleToast(text)
      let list = []
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
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
    // 删除收藏的歌曲
    deletemyFavorite (song) {
      this.setFavoriteList(deleteFavorite(song))
      this.simpleToast('已删除')
    },
    // 清空收藏的歌曲
    deletemyAllFavorite () {
      this.setFavoriteList(clearFavorite())
      this.simpleToast('已全部清空')
    },
    // 保存歌曲到播放历史
    savemyHistory (song) {
      this.setHistoryList(saveHitory(song))
    },
    // 从播放历史中删除歌曲
    deletemyHistory (song) {
      this.setHistoryList(deleteHistory(song))
    },
    // 清空播放历史
    deletemyAllHistory () {
      this.setHistoryList(clearHistory())
      this.simpleToast('已全部清空')
    },
    // 关注歌手
    savemySingers (singer) {
      this.setCollectSingers(saveSingers(singer))
    },
    // 取消关注歌手
    deletemySingers (singer) {
      this.setCollectSingers(deleteSingers(singer))
    },
    // 取消关注全部歌手
    deletemyAllSingers () {
      this.setCollectSingers(clearSingers())
    },
    // 保存收藏的歌单
    savemySheets (sheet) {
      this.setCollectSheets(saveSheets(sheet))
    },
    // 删除收藏的歌单
    deletemySheets (sheet) {
      this.setCollectSheets(deleteSheets(sheet))
    },
    // 删除全部收藏的歌单
    deletemyAllSheets () {
      this.setCollectSheets(clearSheets())
    },
    // 保存收藏的榜单
    savemyRanks (rank) {
      this.setCollectRanks(saveRanks(rank))
    },
    // 删除收藏的榜单
    deletemyRanks (rank) {
      this.setCollectRanks(deleteRanks(rank))
    },
    // 删除全部收藏的榜单
    deletemyAllRanks () {
      this.setCollectRanks(clearRanks())
    },
    // 添加到我的歌单
    addToSheet (song, item) {
      let userSheet = this.userSheet
      saveSongToSheet(song, item)
      let randomNum = Math.floor(Math.random() * item.sheetList.length)
      item.pic = item.sheetList[randomNum].image
      this.setUserSheet(userSheet)
      saveUserSheet(userSheet)
      this.simpleToast('已收藏到歌单')
    },
    // 在我的歌单页面选择一个歌单进行操作
    selectOneSheet (item) {
      item.select = !item.select
    },
    // 歌单被选中或者没有被选中状态
    iconChoose (item) {
      return item.select ? 'icon-choose' : 'icon-no-choose'
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
      const toDepth = to.path.split('/')
      this.SrouterName = toDepth[2]
      this.TrouterName = toDepth[3]
    }
  },
  methods: {
    // 跳转到歌手详情页
    goToSingerDetail (singer) {
      if (!singer.id) {
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
        path: `/home/${this.SrouterName}/singer/${singer.id}`
      })
      // const cSinger = new Singer({
      //   id: song.singerMid,
      //   name: song.singer
      // })
      this.setSinger(singer)
    }
  }
}
