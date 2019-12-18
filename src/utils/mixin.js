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
      'rankGroup',
      'singer',
      'playering',
      'fullScreen',
      'playList',
      'sequenceList',
      'mode',
      'currentIndex',
      'currentSong',
      'currentPage'
    ])
  },
  methods: {
    ...mapActions([
      'setRankGroup',
      'setSinger',
      'setPlayering',
      'setFullScreen',
      'setPlayList',
      'setSequenceList',
      'setMode',
      'setCurrentIndex',
      'setCurrentPage'
    ]),
    normalizeSong (list) {
      let ret = []
      list.forEach(item => {
        if (item.album.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    },
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
    // 选择歌曲播放
    selectPlay (list, index, item) {
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
      // this.setCurrentPage(1)
      // this.setFullScreen(true)
      console.log(this.currentSong)
    }
  }
}
