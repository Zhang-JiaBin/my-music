<template>
  <div class="SongSheet-detail">
    <music-list @attention="addToSheets" :songs="Songs" :bg-image="bgImage" :title="title" :attention="collectText"></music-list>
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
    this.setSlideIndex(1)
    this.setSheetOrRank(0)
    this._getSheetList()
  },
  components: { MusicList },

  computed: {
    InSheets () {
      const index = this.collectSheets.findIndex(item => {
        return item.content_id === this.songSheet.content_id
      })
      return index > -1
    },
    collectText () {
      return this.InSheets ? '已收藏' : '收藏'
    },
    title () {
      return this.songSheet.title
    },
    bgImage () {
      return this.songSheet.cover
    },
    contentId () {
      return this.songSheet.content_id
    }
  },
  watch: {
    contentId (newContentId) {
      // console.log('newcontentId', newContentId)
      this._getSheetList()
    }
  },
  methods: {
    // 选择收藏还是删除
    addToSheets () {
      if (this.InSheets) {
        this.deletemySheets(this.songSheet)
      } else {
        this.savemySheets(this.songSheet)
      }
    },
    _getSheetList () {
      if (!this.songSheet.content_id) {
        this.$router.push('/home/recommend')
        return
      }
      getSongList(this.songSheet.content_id).then(res => {
        // console.log('sheet', res.cdlist[0].songlist)
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
