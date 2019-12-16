<template>
  <div class="music-list">
    <div class="back-wrapper" @click="back">
      <span class="icon-back"></span>
    </div>
    <div class="bg-image" :style="bgStyle">
      <div class="filter"></div>
    </div>
    <div class="content-wrapper">
      <div class="title-wrapper">
        <span class="title-name">{{this.title}}</span>
        <div class="attention-wrapper">
          <span class="attention">已关注</span>
        </div>
      </div>
      <div class="list-wrapper">
        <div class="list-title">歌曲</div>
        <scroll class="list-scroll" :data="songs">
          <div>
            <div class="list-function-wrapper">
              <div class="list-function">
                <span class="icon-play"></span>
                <span class="function-text">播放全部 ({{this.songs.length}})</span>
              </div>
            </div>
            <song-list :songs="songs" class="list-song"></song-list>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from './songList'
import Scroll from './scroll'
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
  data () {
    return {
    }
  },

  components: { Scroll, SongList },

  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },

  methods: {
    back () {
      this.$router.go(-1)
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
    .back-wrapper{
      position: absolute;
      top: 25px;
      left: 15px;
      z-index: 50;
      width: 40px;
      height: 40px;
      .icon-back{
        font-size: $font-size-large-x;
        color: white;
      }
    }
    .bg-image {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      transform: translateY(-30px);
      .filter{
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
      .title-wrapper{
        z-index: 50;
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        left: 0;
        @include spaceTop;
        .title-name{
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
          .attention{
            font-size: $font-size-small;
          }
        }
      }
      .list-wrapper {
        position: fixed;
        top: 150px;
        bottom: 0;
        width: 100%;
        background: white;
        border-radius: 15px 15px 0 0;
        .list-title {
          height: 40px;
          font-size: $font-size-medium-x;
          font-weight: bold;
          @include center;
          color: $color-icon;
        }
        .list-scroll {
          width: 100%;
          position: absolute;
          top: 40px;
          bottom: 0;
          /*height: 100%;*/
          overflow: hidden;
          .list-function-wrapper{
            height: 40px;
            padding:0 15px;
            box-sizing: border-box;
            .list-function {
              height: 100%;
              @include justcenter;
              border-bottom: 1px solid #f0f0f0;
              .icon-play{
                font-size: 25px;
                color: $color-icon;
              }
              .function-text{
                font-size: $font-size-medium-x;
                margin-left: 15px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
</style>
