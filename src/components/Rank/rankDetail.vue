<template>
  <div class="rankDetail">
    <music-list @attention="addToRanks"  :songs="Songs" :bg-image="bgImage" :attention="collectText" :title="title"></music-list>
  </div>
</template>

<script>
import MusicList from '../../common/musicList'
import { singerMixin } from '../../utils/mixin'
import { getMusicList } from '../../api/rank'
export default {
  name: 'rankDetail',
  data () {
    return {
      Songs: []
    }
  },
  mixins: [singerMixin],
  components: {
    MusicList
  },
  mounted () {
    this.setSlideIndex(2)
    this._getRankList()
  },
  computed: {
    InRanks () {
      const index = this.collectRanks.findIndex(item => {
        return item.topId === this.rankList.topId
      })
      return index > -1
    },
    collectText () {
      return this.InRanks ? '已收藏' : '收藏'
    },
    title () {
      return this.rankList.title
    },
    bgImage () {
      if (this.Songs.length) {
        return this.Songs[0].image
      }
      return this.rankList.frontPicUrl
    },
    topId () {
      return this.rankList.topId
    }
  },
  watch: {
    topId (newtopId) {
      // console.log('newtopId', newtopId)
      this._getRankList()
    }
  },
  methods: {
    addToRanks () {
      if (this.InRanks) {
        this.deletemyRanks(this.rankList)
      } else {
        this.savemyRanks(this.rankList)
      }
    },
    _getRankList () {
      if (!this.rankList.topId) {
        this.$router.push('home/rank')
        return
      }
      getMusicList(this.rankList.topId).then(res => {
        this.Songs = this.normalizeSong(res.detail.data.songInfoList)
        // console.log(this.Songs)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .rankDetail{
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
