<template>
  <div class="player" v-show="playList && playList.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background-wrapper">
        <img class="background-img" :src="SongImg">
      </div>
      <div class="player-top">
        <div class="top-wrapper">
          <div class="icon-down-wrapper" @click="back">
            <span class="icon-back"></span>
          </div>
          <div class="player-title-wrapper">
            <div class="player-title-name">
              <span class="song-name">{{SongName}}</span>
            </div>
            <div class="player-title-name">
              <span class="singer-name">{{SongSinger}}</span>
              <span class="icon-more"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'

export default {
  name: 'playing',
  data () {
    return {
    }
  },
  mixins: [singerMixin],
  components: {},

  computed: {
    SongImg () {
      console.log(this.currentSong)
      return this.currentSong ? this.currentSong.image : ''
    },
    SongName () {
      return this.currentSong ? this.currentSong.name : ''
    },
    SongSinger () {
      return this.currentSong ? this.currentSong.singer : ''
    }
  },

  methods: {
    back () {
      this.setFullScreen(false)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .player {
    .normal-player{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1500;
      background: white;
      .background-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.7;
        filter: blur(20px);
        .background-img {
          width: 100%;
          height: 100%;
        }
      }
      .player-top{
        position: relative;
        height: 70px;
        width: 100%;
        .top-wrapper {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          display: flex;
          .icon-down-wrapper{
            flex: 0 0 40;
            width: 40px;
            height: 100%;
            z-index: 200;
            @include right;
            .icon-back {
              font-size: 25px;
              color: #ffffff;
            }
          }
          .player-title-wrapper{
            flex: 1;
            height: 100%;
            padding-left: 20px;
            box-sizing: border-box;
            .player-title-name{
              height: 50%;
              @include left;
              .song-name{
                font-weight: bold;
                font-size: $font-size-large;
                @include ellipsis2(1);
                color: #ffffff;
              }
              .singer-name{
                font-size: $font-size-medium;
                @include ellipsis2(1);
                line-height: 16px;
                color: #7a7572;
              }
              .icon-more {
                flex: 1;
                font-size: $font-size-small;
                color: #7a7572;
                margin-left: 2px;
              }
            }
          }
        }
      }
    }
  }
</style>
