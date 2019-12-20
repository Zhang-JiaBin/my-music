<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
<!--    <div class="dots" v-show="showDots">-->
<!--      <span class="dot"></span>-->
<!--    </div>-->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '../utils/dom'
export default {
  name: 'slider',
  props: {
    cIndex: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: null
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDots: {
      type: Boolean,
      default: false
    }
  },
  // mixins: [singerMixin],
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    this._initlize()
    window.addEventListener('resize', () => {
      console.log('window')
      if (!this.slider) {
        return
      }
      this._setSlideWidth(true)
      this.slider.refresh()
    })
  },
  watch: {
    data (newlist, oldlist) {
      // console.log('watch-newPlayList', newlist)
      // 进入相同的歌单都会触发每次进入
      if (!this.slider) {
        return
      }
      if (newlist[0].id === oldlist[0].id) {
        console.log('进入相同的歌手歌曲列表')
        this._setSlideWidth(true)
        this.slider.refresh()
      } else {
        this.slider.destroy()
        console.log('进入不同的歌手歌曲列表')
        this._initlize()
      }
      console.log('数据改变后渲染完成的item数目:', this.$refs.sliderGroup.children.length)
    },
    cIndex (newVal) {
      // console.log('watch-newVal:', newVal)
      this.gotoPage(newVal)
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  components: {},

  computed: {},

  methods: {
    _initlize () {
      setTimeout(() => {
        this._setSlideWidth()
        this._initSlide()
        this.slider.refresh()
        this.gotoPage(this.cIndex) // 初始化就要移动到指定的page页面
        // console.log('初始化渲染完成的item数目:', this.$refs.sliderGroup.children.length)
      }, 20)
    },
    _initSlide () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        snap: {
          loop: this.loop,
          threshold: 0.1,
          easing: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function (t) {
              return t * (2 - t)
            }
          }
        },
        click: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        probeType: 2
      })
      this.slider.on('scrollEnd', () => {
        // let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = this.slider.getCurrentPage().pageX
        this.$emit('scrollnext', this.currentPageIndex)
      })
      if (this.autoPlay) {
        clearTimeout(this.timer)
        this._play()
      }
    },
    gotoPage (x, y = 0, t = 1000) {
      this.slider && this.slider.goToPage(x, y, 1000)
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _setSlideWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _play () {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .slider{
    height: 100%;
    min-height: 1px;
    .slider-group {
      height: 100%;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      /*display: flex;*/
      /*flex-flow: row nowrap;*/
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
      }
    }
    .dots{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }
</style>
