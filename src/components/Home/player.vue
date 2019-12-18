<template>
  <div class="player" v-show="playList && playList.length > 0">
    <transition name="popup-slide-up">
      <div class="normal-player" v-show="fullScreen">
        <div class="background-wrapper">
          <img class="background-img" :src="SongImg">
        </div>
        <div class="player-top">
          <div class="top-wrapper">
            <div class="icon-down-wrapper" @click="back">
              <span class="icon-down"></span>
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
        <div class="player-middle">
          <div class="player-middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="cdClass">
                <img class="cd-image" src="../../assets/image/cdremovebg.png" alt="">
                <img class="image" :src="SongImg">
              </div>
            </div>
          </div>
        </div>
        <div class="player-bottom">
          <div class="player-progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar @percentChange="onProgressBarChange" :percent="percent"></progress-bar>
            </div>
            <span class="time time-r">{{format(SongDuration)}}</span>
          </div>
          <div class="player-icon-wrapper">
            <div class="icon-wrapper">
              <span class="icon-loop"></span>
            </div>
            <div class="icon-wrapper" :class="disableClass" @click="prev">
              <span class="icon-prev"></span>
            </div>
            <div class="icon-wrapper" :class="disableClass" @click="togglePlaying">
              <span :class="playIcon"></span>
            </div>
            <div class="icon-wrapper" :class="disableClass" @click="next">
              <span class="icon-next"></span>
            </div>
            <div class="icon-wrapper">
              <span class="icon-favorite"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="popup-slide-up">
      <div class="mini-player" ref="mini" @click="full" v-show="!fullScreen">
        <div class="mini-wrapper">
          <div class="mini-img-wrapper">
            <img :class="cdClass" class="mini-img" :src="SongImg" alt="">
          </div>
          <div class="mini-text-wrapper">
            <div class="mini-text-name">
              <span class="text-name">{{SongName}} - {{SongSinger}}</span>
            </div>
            <div class="mini-text-lyric">
              <span class="text-lyric">{{SongSinger}}</span>
            </div>
          </div>
          <div class="mini-player-wrapper" @click.stop="togglePlaying">
            <progress-circle class="progress-circle" :radius="radius" :percent="percent">
              <span :class="playIcon" class="icon-mini"></span>
            </progress-circle>
          </div>
          <div class="mini-songList-wrapper">
            <span class="icon-songList"></span>
          </div>
        </div>
      </div>
    </transition>
    <!--    <audio ref="audio" :src="SongUrl" @play="ready" @error="error" @timeupdate="updateTime" @ended="end" ></audio>-->
    <audio ref="myaudio" autoplay :src="SongUrl" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'
import ProgressBar from '../../common/ProgressBar'
import { playMode } from '../../utils/config'
import ProgressCircle from '../../common/ProgressCircle'

export default {
  name: 'player',
  data () {
    return {
      songReady: false,
      currentTime: 0,
      playing: this.playing,
      radius: 28
    }
  },
  mixins: [singerMixin],
  components: { ProgressCircle, ProgressBar },
  mounted () {
  },
  computed: {
    // 进度条进度
    percent () {
      return this.currentTime / this.SongDuration
    },
    // 歌曲总时长
    SongDuration () {
      return this.currentSong ? this.currentSong.duration : ''
    },
    // 歌曲加载失败时候play,next,prev按钮变灰
    disableClass () {
      return this.songReady ? '' : 'disable'
    },
    // 开始旋转和暂停旋转动画
    cdClass () {
      return this.playering ? 'play' : 'play pause'
    },
    // 点击播放按钮时更换图标样式
    playIcon () {
      return this.playering ? 'icon-pause' : 'icon-play'
    },
    SongImg () {
      // console.log(this.currentSong)
      return this.currentSong ? this.currentSong.image : ''
    },
    SongName () {
      return this.currentSong ? this.currentSong.name : ''
    },
    SongSinger () {
      return this.currentSong ? this.currentSong.singer : ''
    },
    SongUrl () {
      return this.currentSong ? this.currentSong.url : ''
    }
  },
  watch: {
    // 根据playing状态控制音乐播放
    playering (newPlayering) {
      // console.log('newPlayering:', newPlayering)
      const myaudio = this.$refs.myaudio
      this.$nextTick(() => {
        newPlayering ? myaudio.play() : myaudio.pause()
      })
    },
    currentSong (newSong, oldSong) {
      if (newSong === undefined) {
        return
      }
      const nId = newSong ? newSong.id : ''
      const oId = oldSong ? oldSong.id : ''
      if (nId === oId) {
        // console.log('1')
        return
      }
    },
    // 监控当前页面是否在歌曲列表页面
    currentPage (newPage) {
      if (newPage === 0) {
        this.$refs.mini.style.transform = `translateY(-50px)`
        this.$refs.mini.style.transition = `transform 0.3s`
        // setTimeout(() => {
        //   this.$refs.mini.style.bottom = `50px`
        // }, 300)
      } else {
        this.$refs.mini.style.transform = `translateY(0px)`
        this.$refs.mini.style.transition = `transform 0.3s`
      }
    }
  },
  methods: {
    onProgressBarChange (percent) {
      const currentTime = this.SongDuration * percent
      this.$refs.myaudio.currentTime = currentTime
      if (!this.playering) {
        this.togglePlaying()
      }
    },
    // 给秒补两个零
    pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    // 格式化歌曲时间
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this.pad(interval % 60)
      return `${minute}:${second}`
    },
    back () {
      this.setFullScreen(false)
    },
    full () {
      this.setFullScreen(true)
    },
    // 更新进度条时间
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    // 歌曲加载失败设置true不会影响正常的按钮操作
    error () {
      this.songReady = true
    },
    // 歌曲播放准备，解决连续点击下一曲按钮的报错
    ready () {
      this.songReady = true
      // this.savePlayHistory(this.currentSong)
    },
    // 歌曲播放结束
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.setPlayering(!this.playering)
    },
    loop () {
      this.$refs.myaudio.currentTime = 0
      this.$refs.myaudio.play()
    },
    // 上一曲
    prev () {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
        this.setPlayering(true)
        return
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        if (!this.playList[index].url) {
          this.gainSongUrl(this.playList[index])
        }
        this.setCurrentIndex(index)
        if (!this.playering) {
          this.togglePlaying()
        }
        this.songReady = false
      }
    },
    // 下一曲
    next () {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
        this.setPlaying(true)
        return
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        if (!this.playList[index].url) {
          this.gainSongUrl(this.playList[index])
        }
        this.setCurrentIndex(index)
        if (!this.playering) {
          this.togglePlaying()
        }
        this.songReady = false
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import "../../assets/style/scss/global";
.player {
  .normal-player {
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
    .player-top {
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
        .icon-down-wrapper {
          flex: 0 0 40;
          width: 40px;
          height: 100%;
          z-index: 200;
          @include right;
          .icon-down {
            font-size: 25px;
            color: #ffffff;
          }
        }
        .player-title-wrapper {
          flex: 1;
          height: 100%;
          padding-left: 20px;
          box-sizing: border-box;
          .player-title-name {
            height: 50%;
            @include left;
            .song-name {
              font-weight: bold;
              font-size: $font-size-large;
              @include ellipsis2(1);
              color: #ffffff;
            }
            .singer-name {
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
    .player-middle {
      position: fixed;
      width: 100%;
      top: 70px;
      bottom: 100px;
      white-space: nowrap;
      font-size: 0;
      .player-middle-l {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 10px;
          width: 80%;
          height: 80%;
          padding: 40px 20px 0 20px;
          box-sizing: border-box;
          .cd {
            position: relative;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            /*border: 40px solid rgba(255, 255, 255, 0.1);*/
            border-radius: 50%;
            @include center;
            &.play {
              animation: rotate 20s linear infinite;
            }
            // 存在bug,不会暂停，而是重新开始动画
            &.pause {
              /*-webkit-animation: none！important;*/
              animation-play-state: paused;
              /*-webkit-animation-play-state: paused;*/
            }
            .cd-image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            .image {
              z-index: 20;
              width: 60%;
              height: 60%;
              border: 3px solid #0b0a0a;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .player-bottom {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      .player-progress-wrapper {
        width: 90%;
        margin: 0 auto;
        @include center;
        margin-bottom: 15px;
        .progress-bar-wrapper {
          flex: 1;
        }
        .time {
          color: $color-text;
          flex: 0 0 40px;
          width: 40px;
          line-height: 30px;
          font-size: $font-size-small;
          &.time-l {
            @include left;
          }
          &.time-r {
            @include right;
          }
        }
      }
      .player-icon-wrapper {
        width: 100%;
        height: 50px;
        display: flex;
        padding: 0 20px;
        box-sizing: border-box;
        .icon-wrapper {
          flex: 1;
          height: 100%;
          @include center;
          font-size: 28px;
          color: #ffffff;
          .icon-serach {
          }
          .icon-play {
            font-size: 45px;
          }
          .icon-pause {
            font-size: 45px;
          }
        }
      }
    }
  }
  .mini-player {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1500;
    width: 100%;
    height: 50px;
    background: white;
    box-shadow: 0 -1px rgb(0, 0, 0, 0.1);
    .mini-wrapper {
      width: 100%;
      height: 100%;
      @include justcenter;
      padding: 0 10px;
      box-sizing: border-box;
      .mini-img-wrapper {
        flex: 0 0 40px;
        width: 40px;
        height: 100%;
        @include center;
        .mini-img {
          width: 100%;
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite;
          }
          // animation-play-state: paused; 无法使动画暂停，改为这个
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .mini-text-wrapper {
        flex: 1;
        height: 100%;
        margin-left: 10px;
        .mini-text-name {
          height: 50%;
          font-size: $font-size-medium;
          @include left;
          .text-name {
            line-height: 16px;
            @include ellipsis2(1);
          }
        }
        .mini-text-lyric {
          height: 50%;
          font-size: $font-size-small;
          @include left;
          color: #aeaeae;
          .text-lyric {
            line-height: 14px;
            @include ellipsis2(1);
          }
        }
      }
      .mini-player-wrapper {
        flex: 0 0 40px;
        width: 40px;
        height: 100%;
        //@include center;
        padding: 10px 5px;
        box-sizing: border-box;
        position: relative;
        .progress-circle {
          top: -1px;
        }
        .icon-mini{
          z-index: 100;
          font-size: 32px;
          position: absolute;
          left: -2px;
          top: 1px;
          color: #c0c0c0;
        }
        /*.icon-play {*/
        /*  font-size: 30px;*/
        /*}*/
        /*.icon-pause {*/
        /*  font-size: 30px;*/
        /*}*/
      }
      .mini-songList-wrapper {
        flex: 0 0 40px;
        width: 40px;
        height: 100%;
        color: #c0c0c0;
        @include center;
        .icon-songList {
          font-size: 30px;
        }
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotate2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
