<template>
  <div class="mySheet-detail">
    <music-list :songs="Songs" :bg-image="bgImage" :title="title"></music-list>
  </div>
</template>

<script>
import MusicList from '../../common/musicList'
import { singerMixin } from '../../utils/mixin'
import Song from '../../utils/song'
export default {
  name: 'mySheetDetail',
  data () {
    return {
    }
  },

  components: { MusicList },
  mixins: [singerMixin],
  computed: {
    title () {
      return this.mySheetList.title
    },
    bgImage () {
      return this.mySheetList.pic
    },
    Songs () {
      if (this.mySheetList.sheetList) {
        let list = this.mySheetList.sheetList
        let ret = list.map(item => new Song(item))
        return ret
      } else {
        return []
      }
    }
  },

  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .mySheet-detail{
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
