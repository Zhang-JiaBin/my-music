import {
  mapGetters,
  mapActions
} from 'vuex'
import { createSong } from './song'
export const singerMixin = {
  computed: {
    ...mapGetters([
      'rankGroup',
      'singer',
      'playing',
      'fullScreen',
      'playList',
      'sequenceList',
      'mode',
      'currentIndex',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'setRankGroup',
      'setSinger',
      'setPlaying',
      'setFullScreen',
      'setPlayList',
      'setSequenceList',
      'setMode',
      'setCurrentIndex'
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
    selectPlay (list, index) {
      console.log(list)
      console.log(index)
      this.setCurrentIndex(index)
      this.setPlaying(true)
      this.setPlayList(list)
      this.setFullScreen(true)
    }
  }
}
