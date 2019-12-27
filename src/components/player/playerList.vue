<template>
  <div class="playerList" v-show="showlist">
    <transition name="fade">
      <div class="playerList-bg" @click.stop.prevent="hide"></div>
    </transition>
    <transition name="popup-slide-up">
      <div class="playerList-content" v-show="showContent">
        <div class="playerList-top-wrapper">
          <div class="icon-down" @click="hide"></div>
          <div class="playerList-function">
            <div class="icon-wrapper" @click="changeMode">
              <span :class="iconMode"></span>
            </div>
            <div class="text-wrapper">
              <span class="text">{{ModeText}}</span>
            </div>
            <div class="icon-wrapper" @click="showConfirm">
              <span class="icon-deleteAll"></span>
            </div>
          </div>
        </div>
        <div class="scroll-wrapper" ref="scrollWrapper">
          <scroll :data="this.playList" ref="myscroll" class="playerList-scroll">
            <div class="song-item-wrapper">
              <song-list @select="chooseSong" ref="scrollItem" @delete="deleteOneSong" :songs="this.playList" :show-delete="true" :show-dot="false" :show-pic="false"></song-list>
            </div>
          </scroll>
        </div>
      </div>
    </transition>
    <confirm ref="confirm" @confirm="deleteAllSong" text="确定清空歌曲播放列表内容"></confirm>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'
import { playMode } from '../../utils/config'
import Scroll from '../../common/scroll'
import SongList from '../../common/songList'
import Confirm from '../../common/confirm'

export default {
  name: 'playerList',
  data () {
    return {
      showlist: false,
      showContent: false
    }
  },
  watch: {
    playList (newList) {
      // console.log('数据改变')
      this.$refs.myscroll.refresh()
      setTimeout(() => {
        this.scrollToSong(this.currentSong)
      })
      if (newList.length === 0) {
        this.hide()
      }
    },
    mode (newMode) {
      if (newMode === 2 || newMode === 0) {
        this.scrollToSong(this.currentSong)
      }
    },
    currentSong (newSong, oldSong) {
      const nId = newSong ? newSong.id : ''
      const oId = oldSong ? oldSong.id : ''
      if (!this.showContent || nId === oId) {
        return
      }
      this.scrollToSong(newSong)
    }
  },
  created () {
    this.probetype = 3
  },
  mounted () {
    this.$refs.scrollWrapper.style.top = `${this.ScrollTop}px`
  },
  mixins: [singerMixin],
  components: { Confirm, SongList, Scroll },
  computed: {
    ModeText () {
      const text = this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ? '单曲循环' : '随机播放'
      return `${text} (${this.playList.length} 首)`
    },
    ScrollTop () {
      const top = window.innerHeight * 0.4 + 80
      return top
    }
  },
  methods: {
    chooseSong (item, index) {
      this.insertSong(item)
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    show () {
      this.showlist = true
      setTimeout(() => {
        this.showContent = true
      })
      setTimeout(() => {
        this.$refs.myscroll.refresh()
      }, 40)
      setTimeout(() => {
        this.scrollToSong(this.currentSong)
      }, 100)
    },
    hide () {
      this.showContent = false
      setTimeout(() => {
        this.showlist = false
      }, 200)
    },
    deleteOneSong (item) {
      this.deleteFromSongs(item)
      // console.log(item)
    },
    scrollToSong (current) {
      const ItemArr = this.$refs.scrollItem.getRefsSongItem()
      const index = this._findIndex(this.playList, current)
      if (index === -1) {
        return
      }
      let songEl = ItemArr[index]
      if (this.playList.length < 5) {
        return
      } else {
        this.$refs.myscroll.scrollToElement(songEl, 1000)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .playerList {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 3000;
    background: rgba(0,0,0,0.3);
    .playerList-bg{
      width: 100%;
      height: 100%;
      z-index: 3000;
    }
    .playerList-content {
      position: absolute;
      top: 40%;
      left: 0;
      width: 100%;
      height: 60%;
      z-index: 3000;
      background: #ffffff;
      border-radius: 12px 12px 0 0;
      .playerList-top-wrapper {
        flex: 0 0 80px;
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        .icon-down{
          flex: 0 0 35px;
          @include center;
          font-size: 20px;
        }
        .playerList-function{
          flex: 1;
          width: 100%;
          display: flex;
          padding: 0 20px 0 15px;
          box-sizing: border-box;
          .icon-wrapper{
            flex: 0 0 30px;
            width: 30px;
            font-size: 25px;
            @include center;
            &.icon-loop{

            }
            &.icon-deleteAll{

            }
          }
          .text-wrapper{
            flex: 1;
            font-size: $font-size-large;
            padding-left: 10px;
            box-sizing: border-box;
            @include left;
            .text{

            }
          }
        }
      }
      .scroll-wrapper{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        .playerList-scroll{
          height: 100%;
          overflow: hidden;
          width: 100%;
          .song-item-wrapper {
            overflow: hidden;
            width: 100%;
          }
        }
      }
    }
  }
</style>
