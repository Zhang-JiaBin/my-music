<template>
  <transition name="fade">
    <div class="confirm" v-show="showConfirm" @click="hide">
      <div class="confirm-content" @click.stop>
        <div class="confirm-text">{{text}}</div>
        <div class="confirm-btn">
          <span class="btn-cancel" @click="hide">{{cancel}}</span>
          <span class="btn-decide" @click="confirm">{{decide}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'confirm',
  data () {
    return {
      showConfirm: false
    }
  },
  props: {
    text: {
      type: String,
      default: '确定清空全部历史记录'
    },
    cancel: {
      type: String,
      default: '取消'
    },
    decide: {
      type: String,
      default: '确认'
    }
  },
  components: {},

  computed: {},

  methods: {
    show () {
      this.showConfirm = true
    },
    hide () {
      this.showConfirm = false
    },
    confirm () {
      this.$emit('confirm')
      this.hide()
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .confirm{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 3000;
    background: rgba(0,0,0,0.1);
    .confirm-content {
      position: absolute;
      top: 50%;
      left: 10%;
      width: 80%;
      height: 100px;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border-radius: 12px;
      .confirm-text{
        flex: 1;
        width: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        font-size: $font-size-medium;
        color: #9d9d9d;
        @include left;
      }
      .confirm-btn{
        flex: 0 0 40px;
        height: 40px;
        width: 100%;
        color: $color-icon;
        font-size: $font-size-medium;
        box-sizing: border-box;
        padding: 0 25px 5px 5px;
        font-weight: bold;
        @include right;
        .btn-cancel{
          line-height: 16px;
          padding: 5px;
          margin-right: 30px;
        }
        .btn-decide{
          line-height: 16px;
          padding: 5px;
        }
      }
    }
  }
</style>
