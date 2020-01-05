<template>
  <div class="slider" ref="slider">
    <div class="slider-group" v-show="this.data.length" ref="sliderGroup">
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
    mode: {
      type: Number,
      default: 0
    },
    cIndex: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: null
    },
    // loop: {
    //   type: Boolean,
    //   default: true
    // },
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
      currentPageIndex: 0,
      loop: true
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSlideWidth(true)
      this.slider.refresh()
    })
  },
  watch: {
    data (newlist, oldlist) {
      // if (newlist.length === 1) {
      //   this.loop = false
      // } else {
      //   this.loop = true
      // }
      // if (newlist.length === 0) {
      //   this.refresh()
      //   console.log('destroy1111')
      //   this.destroy()
      // }
      // if (!this.slider) {
      //   return
      // }
      if (this.compareList(newlist, oldlist)) {
        // console.log('进入相同的歌手歌曲列表')
        this._setSlideWidth(true)
        this.refresh()
      } else {
        this.refresh()
        this.destroy()
        // console.log('进入不同的歌手歌曲列表')
        if (newlist.length === 1) {
          this._NoSlider()
        } else {
          this._initlize()
        }
      }
    },
    cIndex (newVal) {
      // console.log('slider接收的当前的currentIndex', newVal)
      this.gotoPage(newVal)
    }
  },
  // destroyed () {
  //   clearTimeout(this.timer)
  // },
  components: {},

  computed: {},
  methods: {
    compareList (newlist, oldlist) {
      const nlen = newlist.length
      const olen = oldlist.length
      if (nlen === olen && olen === 1) {
        return false
      }
      if (nlen !== olen) {
        return false
      }
      for (let i = 0; i < nlen; i++) {
        if (newlist[i].id !== oldlist[i].id) {
          return false
        }
      }
      return true
    },
    _initlize () {
      setTimeout(() => {
        this._setSlideWidth()
        this._initSlide()
        this.refresh()
        this.gotoPage(this.cIndex) // 初始化就要移动到指定的page页面
      }, 40)
    },
    _NoSlider () {
      this.refresh()
      this.$refs.sliderGroup.style.width = `266px`
      this.$refs.sliderGroup.style.transform = 'none'
      // this._setSlideWidth(true)
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
        this.currentPageIndex = this.slider.getCurrentPage().pageX
        this.$emit('scrollnext', this.currentPageIndex)
      })
    },
    refresh () {
      this.slider && this.slider.refresh()
    },
    destroy () {
      this.slider && this.slider.destroy()
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
      // console.log('sliderWidth', sliderWidth)
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize && this.data.length > 1) {
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
