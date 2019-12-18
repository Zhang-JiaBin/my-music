<!--  -->
<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from '../utils/dom'
const transform = prefixStyle('transform')
const progressBtnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  created () {
    this.touch = {}
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        // 进度条的总宽度
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = newPercent * barWidth
        this.offset(offsetWidth)
      }
    }
  },
  components: {},

  computed: {},

  methods: {
    // 点击进度条跳转播放
    progressClick (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this.offset(offsetWidth)
      // this.offset(e.offsetX)
      this.triggerPercent()
    },
    // 封装方法，使得小球和进度条随着offsetWidth改变而改变
    offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    },
    // 进度条触摸开始事件
    progressTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      // 记录进度条的宽度
      this.touch.left = this.$refs.progress.clientWidth
    },
    // 进度条触摸移动事件
    progressTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const delatX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + delatX))
      this.offset(offsetWidth)
    },
    // 进度条触摸结束事件
    progressTouchEnd () {
      this.touch.initiated = false
      this.triggerPercent()
    },
    triggerPercent () {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  }
}

</script>
<style lang="scss" scoped>
@import "../assets/style/scss/global";
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-icon;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-icon;
      }
    }
  }
}
</style>
