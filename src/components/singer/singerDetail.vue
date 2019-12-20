<template>
  <div class="singer-detail">
    <music-list :songs="Songs" :bg-image="bgImage" :title="title"></music-list>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'
import { getSingerSongs } from '../../api/singerSong'
import MusicList from '../../common/musicList'

export default {
  name: 'singerDetail',
  data () {
    return {
      Songs: []
    }
  },
  mounted () {
    this._getSingerSongs()
  },
  mixins: [singerMixin],
  components: { MusicList },

  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.pic
    }
  },

  methods: {
    _getSingerSongs () {
      if (!this.singer.id) {
        this.$router.push('/home/singer')
        return
      }
      getSingerSongs(this.singer.id).then(res => {
        const list = this.concatList(res.singerSongList.data.songList)
        this.Songs = this.normalizeSong(list)
        // this.Songs = this.normalizeSong(res.data.list)
        // console.log(this.Songs)
      })
    },
    // 处理一下歌手歌曲数据
    concatList (list) {
      let ret = []
      list.forEach(item => {
        ret.push(item.songInfo)
      })
      return ret
    }
  }
}

</script>
<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background: white;
}
</style>
