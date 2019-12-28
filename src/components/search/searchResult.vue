<template>
  <scroll class="result-scroll"
          :data="songs"
          :before-scroll="beforeScroll"
          :pullup="pullup"
          @beforeScroll="listScroll"
          @scrollToEnd="searchMoreResult">
    <div class="scroll-content-wrpper" v-if="this.searchSinger.id || this.songs.length">
      <div class="singer-wrapper" v-show="this.searchSinger.id">
        <little-title title="歌手" :show-more="false"></little-title>
        <div class="singerItem" @click="selectSinger()">
          <singer-item :mysinger="searchSinger"></singer-item>
        </div>
      </div>
      <div class="song-wrapper" v-show="this.songs.length">
        <little-title title="单曲" :show-more="false"></little-title>
        <song-list @select="selectMixSong" :songs="songs" :show-pic="false"></song-list>
      </div>
      <loading v-show="hasMore && songs.length"></loading>
    </div>
    <div class="no-result" v-else>
      <div class="no-result-text">未找到与"{{query}}"相关的内容</div>
    </div>
  </scroll>
</template>

<script>
import LittleTitle from '../../common/LittleTitle'
import SongList from '../../common/songList'
import Scroll from '../../common/scroll'
import Loading from '../../common/loading'
import { singerMixin } from '../../utils/mixin'
import SingerItem from '../../common/singerItem'
export default {
  name: 'searchResult',
  props: {
    searchSinger: {
      type: Object,
      default: () => {}
    },
    songs: {
      type: Array,
      default: () => []
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      beforeScroll: true,
      pullup: true
    }
  },
  mixins: [singerMixin],
  components: { SingerItem, Loading, Scroll, SongList, LittleTitle },

  computed: {},

  methods: {
    // 选择歌手，跳转到歌手页面
    selectSinger () {
      if (!this.searchSinger.id) {
        return
      }
      this.simpleToast(`歌手 '${this.searchSinger.name}'`)
      this.setPageCount(this.pageCount + 1)
      this.$router.push({
        path: `/home/search/singer/${this.searchSinger.id}`
      })
      this.setSinger(this.searchSinger)
    },
    // 选择歌曲，进行播放
    selectMixSong (item, index) {
      this.simpleToast(`歌曲 '${item.name}'`)
      this.insertSong(item)
    },
    listScroll () {
      this.$emit('listScroll')
    },
    searchMoreResult () {
      this.$emit('search')
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .result-scroll{
    height: 100%;
    overflow: hidden;
    .scroll-content-wrpper{
      .singer-wrapper {
        .singerItem {
          width: 100%;
          height: 70px;
          display: flex;
          padding: 10px 15px 10px 15px;
          box-sizing: border-box;
        }
      }
      .song-wrapper {
      }
    }
    .no-result{
      position: absolute;
      top: 12%;
      width: 100%;
      height: 40px;
      .no-result-text {
        height: 100%;
        width: 100%;
        @include center;
        font-size: $font-size-medium;
        color: #9d9d9d;
      }
    }
  }
</style>
