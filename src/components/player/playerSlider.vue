<template>
  <div class="slider-wrapper" v-if="songs.length > 0">
    <slider @scrollnext="selectNextOrPrev">
      <div class="mini-slider-wrapper" v-for="item in songs" :key="item.id">
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
</template>

<script>
import Slider from '../../common/slider'
import { singerMixin } from '../../utils/mixin'
export default {
  name: 'playerSlider',
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    playingLyric: {
      type: String,
      default: ''
    }
  },
  mixins: [singerMixin],
  data () {
    return {
    }
  },

  components: { Slider },

  computed: {},

  methods: {
    selectNextOrPrev (nextIndex) {
      if (this.currentIndex < nextIndex) {
        console.log('next')
        this.next()
      }
      if (this.currentIndex > nextIndex) {
        console.log('prev')
        this.prev()
      }
      console.log('currentIndex', this.currentIndex)
      console.log('nextIndex', nextIndex)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .slider-wrapper{
    position: relative;
    height: 100%;
    width: 100%;
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
    }
  }
</style>
