<template>
  <div class="sheet-pop-up" v-show="showSheetPop">
    <transition name="fade">
      <div class="popUp-bg" @click.stop.prevent="hide"></div>
    </transition>
    <transition name="popup-slide-up">
      <div v-show="visible" class="popUp-content" @click.stop>
        <div class="content-item" @click="seleteIndex(index, item)" v-for="(item, index) in textList" :key="index">
          <div class="icon-wrapper">
            <span :class="item.icon" class="icon"></span>
          </div>
          <div class="text-wrapper">
            <span class="iconText">{{item.text}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'

export default {
  name: 'sheetPopUp',
  data () {
    return {
      visible: false,
      textList: [{
        icon: 'icon-Fplus',
        text: '创建新的歌单'
      }, {
        icon: 'icon-manage',
        text: '歌单管理'
      }]
    }
  },
  mixins: [singerMixin],
  watch: {
    showSheetPop (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.visible = true
        })
      }
    }
  },
  components: {},

  computed: {},

  methods: {
    createSheet () {
      this.setShowCreateSheet(true)
      this.hide()
    },
    gotoSheetManage () {
      this.$router.push({
        path: '/home/user/manage'
      })
      this.hide()
    },
    hide () {
      this.visible = false
      setTimeout(() => {
        this.setShowSheetPop(false)
      }, 200)
    },
    seleteIndex (index, item) {
      switch (index) {
        case 0:
          this.createSheet()
          break
        case 1:
          this.gotoSheetManage()
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .sheet-pop-up {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 4000;
    background: rgba(0, 0, 0, 0.1);
    .popUp-bg {
      width: 100%;
      height: 100%;
      z-index: 4000;
    }
    .popUp-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 4000;
      border-radius: 12px 12px 0 0;
      background: #ffffff;
      .content-item {
        width: 100%;
        height: 50px;
        padding: 5px 15px;
        box-sizing: border-box;
        display: flex;

        .icon-wrapper {
          flex: 0 0 30px;
          width: 30px;
          @include center;

          .icon {
            font-size: 25px;

            &.icon-moveOut {
              color: $color-icon;
            }
          }
        }

        .text-wrapper {
          flex: 1;
          @include left;
          margin-left: 13px;
          border-bottom: 1px solid #f6f6f6;

          .iconText {
            line-height: 16px;
            font-size: $font-size-medium;
          }
        }
      }
    }
  }
</style>
