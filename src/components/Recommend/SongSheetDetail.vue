<template>
  <div class="SongSheet-detail">
    <music-list :songs="Songs" :bg-image="bgImage" :title="title"></music-list>
  </div>
</template>

<script>
import MusicList from '../../common/musicList'
import { getSongList } from '../../api/recommend'
import { singerMixin } from '../../utils/mixin'
export default {
  name: 'SongSheetDetail',
  mixins: [singerMixin],
  data () {
    return {
      Songs: []
    }
  },
  mounted () {
    this._getSheetList()
  },
  components: { MusicList },

  computed: {
    title () {
      return this.songSheet.title
    },
    bgImage () {
      return this.songSheet.cover
    }
  },

  methods: {
    _getSheetList () {
      if (!this.songSheet.content_id) {
        this.$router.push('/home/recommend')
        return
      }
      getSongList(this.songSheet.content_id).then(res => {
        this.Songs = this.normalizeSong(res.cdlist[0].songlist)
        // console.log(res.cdlist[0].songlist)
        // console.log(this.Songs)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .SongSheet-detail{
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
