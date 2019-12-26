<template>
  <transition name="slide">
    <div class="userMylike" v-show="visible">
      <big-title @back="hide" :title="title" :show-delete="true"></big-title>
      <div class="mylike-scroll-wrapper" ref="scrollWrapper">
        <scroll ref="mylikeScroll" class="mylike-scroll" :data="songs">
          <div class="scroll-content">
            <div class="playAll-wrapper">
              <div class="playAll">
                <div class="icon-wrapper">
                  <span class="icon-play"></span>
                </div>
                <div class="play-text-wrapper">
                  <span class="play-text">播放全部</span>
                  <span class="song-number">(共{{songs.length}}首)</span>
                </div>
              </div>
            </div>
            <div class="songlist-wrapper">
              <song-list @select="selectMixSong" :songs="songs" :show-pic="false"></song-list>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import BigTitle from '../../common/bigTitle'
import Scroll from '../../common/scroll'
import SongList from '../../common/songList'
import { singerMixin } from '../../utils/mixin'
export default {
  name: 'userMylike',
  mounted () {
    this.changeMyBottom()
    this.$refs.mylikeScroll.refresh()
  },
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      title: '我的喜欢'
    }
  },
  mixins: [singerMixin],
  watch: {
    currentSong (newSong) {
      if (newSong === undefined) {
        this.changeMyBottom()
      }
    },
    // 适配有mini播放器的底部滚动高度
    pageCount (newPageCount) {
      this.changeMyBottom()
    }
  },
  components: { SongList, Scroll, BigTitle },

  computed: {},

  methods: {
    // 选择歌曲，进行播放
    selectMixSong (item, index) {
      this.insertSong(item)
      this.simpleToast(`歌曲 '${item.name}'`)
    },
    changeMyBottom () {
      if (this.currentSong !== undefined && this.pageCount >= 1) {
        console.log('changeBottom')
        this.$refs.scrollWrapper.style.bottom = `50px`
      } else {
        this.$refs.scrollWrapper.style.bottom = `0px`
      }
      this.$refs.mylikeScroll.refresh()
    },
    show () {
      this.visible = true
      // this.changeMyBottom()
      setTimeout(() => {
        this.$refs.mylikeScroll.refresh()
      }, 20)
    },
    hide () {
      this.visible = false
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .userMylike{
    position: fixed;
    z-index: 1300;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background: white;
    .mylike-scroll-wrapper{
      position: absolute;
      top: 50px;
      bottom: 0;
      width: 100%;
      .mylike-scroll{
        height: 100%;
        width: 100%;
        overflow: hidden;
        .scroll-content{
          .playAll-wrapper{
            width: 100%;
            height: 50px;
            padding: 0 15px;
            box-sizing: border-box;
            .playAll{
              width: 100%;
              height: 100%;
              display: flex;
              border-bottom: 1px solid #f5f5f5;
              .icon-wrapper{
                flex: 0 0 40px;
                width: 40px;
                height: 100%;
                @include left;
                .icon-play{
                  font-size: 25px;
                }
              }
              .play-text-wrapper{
                flex: 1;
                @include left;
                .play-text{
                  font-size: $font-size-medium-x;
                }
                .song-number{
                  font-size: $font-size-small;
                  margin-left: 5px;
                  color: #b4b4b4;
                }
              }
            }
          }
          .songlist-wrapper{
            width: 100%;
          }
        }
      }
    }
  }
</style>
