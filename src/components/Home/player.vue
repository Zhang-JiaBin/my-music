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
        <div class="player-middle" @touchstart="middleTouchStart" @touchmove="middleTouchMove" @touchend="middleTouchEnd">
          <div class="player-middle-l" ref="middleL">
            <div class="cd-wrapper">
              <div class="cd" :class="cdClass">
                <img class="cd-image" src="../../assets/image/cdremovebg.png" alt="">
                <img class="image" :src="SongImg">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <scroll class="player-middle-r" :data="currentLyric && currentLyric.lines" ref="lyricList">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine" :class="{'current': currentLineNum === index}" class="text" v-for="(line, index) in currentLyric.lines" :key="index">
                  {{line.txt}}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="player-bottom">
          <div class="player-dot-wrapper">
            <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
          </div>
          <div class="player-progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar @percentChange="onProgressBarChange" :percent="percent"></progress-bar>
            </div>
            <span class="time time-r">{{format(SongDuration)}}</span>
          </div>
          <div class="player-icon-wrapper">
            <div class="icon-wrapper" @click="changeMode">
              <span :class="iconMode"></span>
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
          <div class="slider-wrapper" v-if="playList.length > 0">
            <slider :data="this.playList" :c-index="this.currentIndex" @scrollnext="selectNextOrPrev" ref="slider">
              <div class="mini-slider-wrapper" v-for="item in playList" :key="item.id" ref="sliderItem">
                <div class="mini-img-wrapper">
                  <img :class="cdClass" class="mini-img" :src="item.image" alt="">
                </div>
                <div class="mini-text-wrapper">
                  <div class="mini-text-name">
                    <span class="text-name">{{item.name}} - {{item.singer}}</span>
                  </div>
                  <div class="mini-text-lyric">
                    <span class="text-lyric" v-if="playingLyric">{{playingLyric}}</span>
                    <span class="text-lyric" v-else>专辑: {{item.album}}</span>
                  </div>
                </div>
              </div>
            </slider>
          </div>
          <div class="mini-player-wrapper" @click.stop="togglePlaying">
            <div class="mini-circle">
              <progress-circle class="progress-circle" :radius="radius" :percent="percent">
              </progress-circle>
              <span :class="miniplayIcon" class="icon-mini"></span>
            </div>
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
import Lyric from 'lyric-parser'
import Scroll from '../../common/scroll'
import { shuffle } from '../../utils/util'
import slider from '../../common/slider'

export default {
  name: 'player',
  data () {
    return {
      songReady: false,
      currentTime: 0,
      radius: 34,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: ''
    }
  },
  mixins: [singerMixin],
  components: { Scroll, ProgressCircle, ProgressBar, slider },
  mounted () {
  },
  created () {
    this.touch = {}
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
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-loop' : this.mode === playMode.loop ? 'icon-single' : 'icon-random'
    },
    // 点击播放按钮时更换图标样式
    playIcon () {
      return this.playering ? 'icon-pause' : 'icon-play'
    },
    miniplayIcon () {
      return this.playering ? 'icon-miniPause' : 'icon-miniPlay'
    },
    // SongAlbum () {
    //   return this.currentSong ? this.currentSong.album : ''
    // },
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
    playList (list) {
      // console.log(list)
    },
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
      // 解决下一首歌时歌词还在上一首歌的跳动范围
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.myaudio.play()
        this._getLyric()
      }, 1000)
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
    // 左滑右滑选择上一曲下一曲
    selectNextOrPrev (nextIndex) {
      const sum = this.playList.length
      if (nextIndex === sum - 1 && this.currentIndex === 0) {
        nextIndex = -1
      }
      if (nextIndex === 0 && this.currentIndex === sum - 1) {
        nextIndex = sum
      }
      // console.log('change', nextIndex)
      if (this.currentIndex < nextIndex) {
        this.next()
      }
      if (this.currentIndex > nextIndex) {
        this.prev()
      }
    },
    // 修改播放模式
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      const text = this.mode === playMode.sequence ? '列表循环' : this.mode === playMode.loop ? '单曲循环' : '随机播放'
      this.simpleToast(text)
      let list = []
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    // 触摸开始
    middleTouchStart (e) {
      this.touch.initiated = true
      this.touch.percent = 0
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    // 触摸移动
    middleTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const Width = window.innerWidth
      const left = this.currentShow === 'cd' ? 0 : -Width
      // console.log('left:', left)
      // 表示歌词页向左的偏移量
      const offsetWidth = Math.min(0, Math.max(-Width, left + deltaX))
      // console.log('offsetWidth:', offsetWidth)
      this.touch.percent = Math.abs(offsetWidth / Width)
      // console.log(this.touch.percent)
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style.transitionDuration = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style.transitionDuration = 0
    },
    // 触摸结束
    middleTouchEnd (e) {
      console.log('percent:', this.touch.percent)
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent > 0.9 || this.touch.percent === 0) {
          offsetWidth = -window.innerWidth
          opacity = 0
        } else {
          offsetWidth = 0
          opacity = 1
          this.currentShow = 'cd'
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style.transitionDuration = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style.transitionDuration = `${time}ms`
      this.touch.initiated = false
      this.touch.percent = 0
    },
    // 获取歌词
    _getLyric () {
      this.currentSong.getLyric().then(lyric => {
        // console.log(lyric)
        if (this.currentSong.lyric !== lyric) {
          return
        }
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        if (this.playering) {
          this.currentLyric.play()
        }
      }).catch(() => {
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLineNum = 0
      })
    },
    // 获取歌词后的回调函数，歌词向下滚动
    // 参数对象结构
    handleLyric ({ lineNum, txt }) {
      // console.log('txt', txt)
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    // 监听子组件progress-bar的percent进度改变，触发歌曲播放进度改变
    onProgressBarChange (percent) {
      const currentTime = this.SongDuration * percent
      this.$refs.myaudio.currentTime = currentTime
      if (!this.playering) {
        this.togglePlaying()
      }
      // 进度条拖动时，歌词到指定位置
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
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
    // 缩小到mini-player
    back () {
      this.setFullScreen(false)
    },
    // 全屏
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
    },
    // 歌曲播放结束
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
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
        // vuex 确定点击了上一首
        this.setClickMark(true)
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        if (!this.playList[index].url) {
          this.gainSongUrl(this.playList[index])
        }
        this.setCurrentIndex(index)
        this.simpleToast(`歌曲: ${this.currentSong.name}`)
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
        // vuex 确定点击了上一首
        this.setClickMark(true)
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        if (!this.playList[index].url) {
          this.gainSongUrl(this.playList[index])
        }
        this.setCurrentIndex(index)
        this.simpleToast(`歌曲: ${this.currentSong.name}`)
        // console.log(this.currentSong)
        if (!this.playering) {
          this.togglePlaying()
        }
        this.songReady = false
      }
    },
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.setPlayering(!this.playering)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    loop () {
      this.$refs.myaudio.currentTime = 0
      this.$refs.myaudio.play()
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
            color: $color-icon;
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
      bottom: 150px;
      white-space: nowrap;
      font-size: 0;
      .player-middle-l {
        display: inline-block;
        vertical-align: top;
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
        .playing-lyric-wrapper{
          position: absolute;
          width: 90%;
          left: 5%;
          height: 30px;
          @include center;
          .playing-lyric {
            line-height: 20px;
            color: $color-text-l;
            font-size: $font-size-medium;
            @include ellipsis2(1);
          }
        }
      }
      .player-middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
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
      .player-dot-wrapper{
        @include center;
        margin-bottom: 15px;
        .dot {
          width: 8px;
          height: 8px;
          margin: 0 4px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
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
      .slider-wrapper{
        width: 75%;
        height: 100%;
        overflow: hidden;
        .mini-slider-wrapper{
          width: 100%;
          height: 100%;
          display: flex;
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
                @include left;
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
                @include left;
                @include ellipsis2(1);
              }
            }
          }
        }
      }
      .mini-player-wrapper {
        flex: 0 0 40px;
        width: 40px;
        height: 100%;
        @include center;
        .mini-circle{
          width: 100%;
          height: 40px;
          position: relative;
          .progress-circle {
            position: absolute;
            left: 3px;
            top: 3px;
          }
          .icon-mini {
            z-index: 100;
            font-size: 32px;
            position: absolute;
            left: 4px;
            top: 4px;
            color: #c0c0c0;
          }
        }
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
</style>
