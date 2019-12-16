import {
  mapGetters,
  mapActions
} from 'vuex'
import { createSong } from './song'
export const singerMixin = {
  computed: {
    ...mapGetters([
      'rankGroup',
      'singer'
    ])
  },
  methods: {
    ...mapActions([
      'setRankGroup',
      'setSinger'
    ]),
    normalizeSong (list) {
      let ret = []
      list.forEach(item => {
        if (item.album.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  }
}
