<template>
  <div class="music-list">
    <div class="back-wrapper" @click="back">
      <span class="icon-back"></span>
      <span class="back-text" ref="smallTitle">{{this.title}}</span>
    </div>
    <div class="bg-image" :style="bgStyle" ref="Image">
      <div class="filter"></div>
    </div>
    <div class="content-wrapper" ref="content">
      <div class="title-wrapper" ref="bigTitle">
        <span class="title-name">{{this.title}}</span>
        <div class="attention-wrapper">
          <span class="attention">已关注</span>
        </div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <div class="list-wrapper" ref="listWrapper">
        <div ref="songWrapper" class="list-title">歌曲</div>
        <scroll ref="scrollList" @scroll="scroll" :listen-scroll="this.listenScroll" :probe-type="this.probeType" class="list-scroll" :data="songs">
          <div>
            <div class="list-function-wrapper">
              <div class="list-function">
                <span class="icon-play"></span>
                <span class="function-text">播放全部 ({{this.songs.length}})</span>
              </div>
            </div>
            <song-list ref="scrollItem" @selete="selectItem" :songs="songs" class="list-song"></song-list>
          </div>
          <div class="loading-container" v-show="!this.songs.length">
            <loading></loading>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from './songList'
import Scroll from './scroll'
import Loading from './loading'
import { singerMixin } from '../utils/mixin'
export default {
  name: 'musicList',
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    bgImage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  mixins: [singerMixin],
  data () {
    return {
      scrollY: 0,
      ItemArr: []
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.setCurrentPage(1)
    this.ItemArr = this.$refs.scrollItem.getRefsSongItem()
    // this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  components: { Loading, Scroll, SongList },
  watch: {
    scrollY (newY) {
      // console.log('newY', newY)
      if (newY >= 0) {
        this.$refs.content.style.top = `${90 + newY}px`
        this.$refs.bigTitle.style.opacity = 1
        this.$refs.smallTitle.style.opacity = 0
        this.$refs.Image.style.filter = `blur(0px)`
        this.$refs.Image.style.opacity = 1
        if (newY <= 30) {
          this.$refs.Image.style.transform = `translateY(${newY - 30}px)`
        }
      }
      if (-newY > 0 && -newY <= 85) {
        // console.log('-newY:', -newY)
        let opacity = (-newY / 85)
        this.$refs.Image.style.opacity = 0.5
        // console.log('imgO:', imgOpacity)
        // console.log('opacity:', opacity)
        this.$refs.content.style.top = `${90 + newY}px`
        this.$refs.bigTitle.style.opacity = -newY <= 50 ? `${1 - opacity}` : 0
        this.$refs.smallTitle.style.opacity = -newY <= 60 ? `${opacity}` : 1
        this.$refs.Image.style.filter = `blur(${-newY / 4}px)`
        // this.$refs.scrollList.$el.style.transform = `translateY(${newY}px)`
        // this.$refs.scrollList.style.transform = `translateY(${newY}px)`
      } else if (-newY > 85) {
        this.$refs.content.style.top = `5px`
        this.$refs.bigTitle.style.opacity = 0
        this.$refs.smallTitle.style.opacity = 1
        this.$refs.Image.style.filter = `blur(21px)`
      }
    },
    currentSong () {
      if (this.currentSong !== undefined) {
        this.$refs.listWrapper.style.bottom = `50px`
        this.$refs.scrollList.refresh()
      }
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
      this.setCurrentPage(0)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    // 获取歌曲播放地址
    selectItem (item, index) {
      this.selectPlay(this.songs, index, item)
      // 选择歌曲后滚动到相应的位置
      if (index > 4) {
        let songEl = this.ItemArr[index]
        this.$refs.scrollList.scrollToElement(songEl, 1000)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import "../assets/style/scss/global";
.music-list {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  .back-wrapper {
    position: absolute;
    top: 25px;
    left: 15px;
    z-index: 120;
    width: 100%;
    height: 40px;
    @include justcenter;
    .icon-back {
      font-size: $font-size-large-x;
      color: white;
    }
    .back-text {
      margin-left: 10px;
      font-size: $font-size-large;
      color: white;
      opacity: 0;
    }
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    opacity: 1;
    padding-top: 100%;
    transform-origin: top;
    background-size: cover;
    transform: translateY(-30px);
    filter: blur(0);
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
    }
  }
  .content-wrapper {
    position: absolute;
    width: 100%;
    top: 90px;
    bottom: 0;
    left: 0;
    z-index: 100;
    .title-wrapper {
      z-index: 50;
      width: 100%;
      height: 60px;
      position: absolute;
      top: 0;
      left: 0;
      @include spaceTop;
      .title-name {
        color: white;
        margin-left: 15px;
        font-size: $font-size-large-x;
      }
      .attention-wrapper {
        width: 65px;
        height: 24px;
        color: $color-icon;
        font-weight: bold;
        background: transparent;
        border: 1px solid #83838a;
        border-radius: 12px;
        margin-right: 14px;
        @include center;
        .attention {
          font-size: $font-size-small;
        }
      }
    }
    .bg-layer {
      position: relative;
      width: 100%;
      top: 60px;
      height: 100%;
      z-index: 30;
      background: white;
      border-radius: 15px 15px 0 0;
    }
    .list-wrapper {
      position: absolute;
      top: 60px;
      bottom: 0;
      width: 100%;
      z-index: 30;
      background: white;
      border-radius: 15px 15px 0 0;
      .list-title {
        height: 40px;
        font-size: $font-size-medium-x;
        font-weight: bold;
        z-index: 30;
        @include center;
        color: $color-icon;
      }
      .list-scroll {
        width: 100%;
        position: absolute;
        top: 40px;
        bottom: 0;
        z-index: 30;
        /*height: 100%;*/
        overflow: hidden;
        background: white;
        .list-function-wrapper {
          height: 40px;
          padding: 0 15px;
          box-sizing: border-box;
          .list-function {
            height: 100%;
            @include justcenter;
            border-bottom: 1px solid #f0f0f0;
            .icon-play {
              font-size: 25px;
              color: $color-icon;
            }
            .function-text {
              font-size: $font-size-medium-x;
              margin-left: 15px;
              font-weight: bold;
            }
          }
        }
        .loading-container {
          position: absolute;
          width: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
