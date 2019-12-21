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
      'currentPage',
      'clickMark',
      'songSheet',
      'rankList'
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
      'setCurrentPage',
      'setClickMark',
      'setSongSheet',
      'setRankList'
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
    // 随机选择一首歌播放
    randomPlay (list) {
      this.setSequenceList(list)
      this.setPlayList(list)
      let ranIndex = Math.floor(Math.random() * list.length)
      const item = list[ranIndex]
      this.simpleToast(`歌曲: '${item.name}'`)
      if (!item.url) {
        this.gainSongUrl(item)
      }
      console.log(ranIndex)
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
      if (index === this.currentIndex) {
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
    // 监听子组件rankItem和rankAnoter派发的事件select,选择了一个榜单
    selectTop (item) {
      this.$router.push({
        path: `/home/rank/${item.topId}`
      })
      this.simpleToast(`榜单: ${item.title}`)
      this.setRankList(item)
    }
  }
}
