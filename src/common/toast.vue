<template>
  <transition name="fade">
    <div class="toast-bg-wrapper" v-show="visible" @click.prevent>
      <div class="toast-bg">
        <span class="toast-wrapper" v-html="showText">
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    text: [String, Number],
    timeout: {
      type: Number,
      default: 1200
    }
  },
  data () {
    return {
      visible: false,
      showText: ''
    }
  },
  methods: {
    hide () {
      this.visible = false
    },
    show () {
      this.updateText(this.text)
      clearTimeout(this.task)
      this.task = null
      this.visible = true
      this.task = setTimeout(() => {
        this.visible = false
      }, this.timeout)
    },
    continueShow () {
      this.updateText(this.text)
      clearTimeout(this.task)
      this.task = null
      this.visible = true
    },
    updateText (text) {
      this.showText = text
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/scss/global";
.toast-bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2500;
  width: 100%;
  height: 100%;
  background: transparent;
  .toast-bg {
    position: absolute;
    bottom: 20%;
    left: 50%;
    margin: 0 0 0 -50%;
    z-index: 3000;
    width: 100%;
    @include center;
    .toast-wrapper {
      line-height: 20px;
      padding: 10px 20px;
      box-sizing: border-box;
      background: #dadada;
      border-radius: 7px;
      font-size: 14px;
      font-weight: bold;
      color: $color-icon;
      text-align: center;
      /*word-break: break-all;*/
      @include ellipsis2(2);
      /*<!--.toast {-->*/
      /*<!--  text-align: center;-->*/
      /*<!--  !*word-break: break-all;*!-->*/
      /*<!--  @include ellipsis2(2);-->*/
      /*<!--}-->*/
    }
  }
}
</style>
