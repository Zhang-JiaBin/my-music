<template>
  <div class="userMylike">
    <big-title @back="hide" @clear="showConfirm" :title="title" :show-delete="true"></big-title>
    <div class="mylike-scroll-wrapper" ref="scrollWrapper">
      <scroll ref="mylikeScroll" class="mylike-scroll" :data="songs">
        <div class="scroll-content">
          <div class="playAll-wrapper">
            <div class="playAll">
              <div class="icon-wrapper" @click="selectPlay(songs,0,songs[0])">
                <span class="icon-play"></span>
              </div>
              <div class="play-text-wrapper">
                <span class="play-text">播放全部</span>
                <span class="song-number">(共{{songs.length}}首)</span>
                <span class="icon-deleteAll" @click="showDelete"></span>
              </div>
            </div>
          </div>
          <div class="songlist-wrapper">
            <song-list @select="selectMixSong" @delete="deleteOne" :show-delete="showdelete" :songs="songs" :show-pic="false"></song-list>
          </div>
        </div>
      </scroll>
    </div>
    <confirm ref="confirm" @confirm="selectDefine" :text="text" decide="清空"></confirm>
  </div>
</template>

<script>
import BigTitle from '../../common/bigTitle'
import Scroll from '../../common/scroll'
import SongList from '../../common/songList'
import { singerMixin } from '../../utils/mixin'
import Confirm from '../../common/confirm'
export default {
  name: 'userMylike',
  mounted () {
    this.changeMyBottom()
    setTimeout(() => {
      this.$refs.mylikeScroll.refresh()
    }, 20)
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showdelete: false
    }
  },
  mixins: [singerMixin],
  watch: {
    currentSong () {
      this.changeMyBottom()
    },
    // 适配有mini播放器的底部滚动高度
    pageCount () {
      this.changeMyBottom()
    }
  },
  components: { Confirm, SongList, Scroll, BigTitle },

  computed: {},

  methods: {
    deleteOne (item) {
      this.$emit('deleteOne', item)
    },
    // 展示delete-icon
    showDelete () {
      this.showdelete = !this.showdelete
    },
    // 确认框组件向父组件派发事件
    selectDefine () {
      this.$emit('define')
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    // 选择歌曲，进行播放
    selectMixSong (item, index) {
      this.insertSong(item)
      this.simpleToast(`歌曲 '${item.name}'`)
    },
    changeMyBottom () {
      if (this.currentSong !== undefined && this.pageCount >= 1) {
        this.$refs.scrollWrapper.style.bottom = `50px`
      } else {
        this.$refs.scrollWrapper.style.bottom = `0px`
      }
      this.$refs.mylikeScroll.refresh()
    },
    show () {
      setTimeout(() => {
        this.$refs.mylikeScroll.refresh()
      }, 20)
    },
    hide () {
      this.$router.go(-1)
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
                display: flex;
                @include left;
                .play-text{
                  flex: 0 0 70px;
                  font-size: $font-size-medium-x;
                }
                .song-number{
                  flex: 1;
                  font-size: $font-size-small;
                  margin-left: 5px;
                  color: #b4b4b4;
                }
                .icon-deleteAll {
                  flex: 0 0 30px;
                  width: 30px;
                  font-size: 20px;
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
