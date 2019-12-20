<template>
  <div class="playerSwiper">
    <swiper class="playerSwiper-swiper" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide class="playerSwiper-swiper-item" v-for="item in songs" :key="item.id">
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
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { singerMixin } from '../../utils/mixin'
export default {
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
  watch: {
    currentIndex (newIndex, oldIndex) {
      this.lastIndex = oldIndex
      this.swiper.slideTo(newIndex)
    }
  },
  name: 'playerSwiper',
  data () {
    return {
      swiperOption: {
        // loop: true,
        // autoplay: true,
        clickable: true,
        on: {
          slideChangeTransitionEnd () {
            // this.next()
            // console.log('curr:', this.lastIndex)
            // console.log('active:', this.activeIndex) // 切换结束时，告诉我现在是第几个slide
          }
        }
      },
      lastIndex: -1
    }
  },
  mixins: [singerMixin],
  components: {
    swiperSlide,
    swiper
  },

  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
    // // 开始旋转和暂停旋转动画
    // cdClass () {
    //   return this.playering ? 'play' : 'play pause'
    // }
  },

  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .playerSwiper{
    width: 100%;
    height: 100%;
    .playerSwiper-swiper{
      width: 100%;
      height: 100%;
      .playerSwiper-swiper-item{
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
  }
</style>
