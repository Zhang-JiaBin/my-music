<template>
  <div class="rankDetail">
    <music-list :songs="Songs" :bg-image="bgImage" :title="title"></music-list>
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
    this._getRankList()
  },
  computed: {
    title () {
      return this.rankList.title
    },
    bgImage () {
      if (this.Songs.length) {
        return this.Songs[0].image
      }
    }
  },

  methods: {
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
