<template>
  <div class="sheet-manage">
    <big-title @back="hide" @clear="selectAll" :title="title" :show-delete="true" :delete-text="deleteText"></big-title>
    <div class="scroll-wrapper" ref="scrollWrapper">
      <scroll :data="this.userSheet" ref="manageScroll" class="manage-scroll">
        <div class="scroll-item">
          <div class="user-mysheet" v-for="item in this.userSheet" :key="item.id">
        <div class="icon-choose-wrapper" @click.stop.prevent="selectOneSheet(item)" :class="{'select': item.select}">
          <span :class="iconChoose(item)"></span>
        </div>
        <div class="mysheet-img-wrapper">
          <img class="mysheet-img" :src="item.pic" alt="">
        </div>
        <div class="mysheet-title-wrapper">
          <div class="mysheet-title">{{item.title}}</div>
          <div class="mysheet-num">{{item.sheetList.length}}首</div>
        </div>
        <div class="icon-list-wrapper">
          <span class="icon-list"></span>
        </div>
      </div>
        </div>
      </scroll>
    </div>
    <div class="manage-bottom" ref="manageBottom">
      <span class="icon-deleteAll" @click="showConfirm"></span>
      <span class="deletet-text">删除</span>
    </div>
    <confirm ref="confirm" @confirm="deleteSelectSheet" text="确定删除歌单吗?" decide="删除"></confirm>
  </div>
</template>

<script>
import BigTitle from '../../common/bigTitle'
import { singerMixin } from '../../utils/mixin'
import Confirm from '../../common/confirm'
import { saveUserSheet } from '../../utils/localStorage'
import Scroll from '../../common/scroll'
export default {
  name: 'SheetManage',
  data () {
    return {
    }
  },
  mixins: [singerMixin],
  components: { Scroll, Confirm, BigTitle },
  mounted () {
    let userSheet = this.userSheet
    userSheet.forEach(item => {
      item.select = false
    })
    this.changeMaBottom()
  },
  computed: {
    title () {
      return `已选择${this.selectNum}项`
    },
    deleteText () {
      let userSheet = this.userSheet
      const all = userSheet.every(item => item.select === true)
      return all ? '取消全选' : '全选'
    },
    IfChooseSheet () {
      let userSheet = this.userSheet
      const all = userSheet.some(item => item.select === true)
      return all
    }
  },
  watch: {
    currentSong () {
      this.changeMaBottom()
    },
    // 适配有mini播放器的底部滚动高度
    pageCount () {
      this.changeMaBottom()
    }
  },
  methods: {
    // 改变底部高度适应mini播放器
    changeMaBottom () {
      console.log('bottom')
      if (this.currentSong !== undefined && this.pageCount >= 1) {
        this.$refs.scrollWrapper.style.bottom = `101px`
        this.$refs.manageBottom.style.bottom = `50px`
      } else {
        this.$refs.scrollWrapper.style.bottom = `51px`
        this.$refs.manageBottom.style.bottom = '0px'
      }
      this.$refs.manageScroll.refresh()
    },
    hide () {
      this.$router.go(-1)
    },
    selectAll () {
      let userSheet = this.userSheet
      if (this.deleteText === '取消全选') {
        userSheet.forEach(item => {
          item.select = false
        })
      } else {
        userSheet.forEach(item => {
          item.select = true
        })
      }
    },
    showConfirm () {
      if (this.IfChooseSheet) {
        this.$refs.confirm.show()
      } else {
        this.simpleToast('未选择歌单')
      }
    },
    deleteSelectSheet () {
      let userSheet = this.userSheet
      const result = userSheet.filter(item => item.select === false)
      this.setUserSheet(result)
      saveUserSheet(result)
      this.simpleToast('已删除')
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .sheet-manage{
    position: fixed;
    z-index: 4000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background: white;
    .scroll-wrapper{
      position: absolute;
      top: 50px;
      bottom: 51px;
      width: 100%;
      .manage-scroll{
        height: 100%;
        width: 100%;
        overflow: hidden;
        .scroll-item{
          .user-mysheet{
            padding: 5px 15px;
            box-sizing: border-box;
            width: 100%;
            height: 60px;
            display: flex;
            @include justcenter;
            .icon-choose-wrapper{
              flex: 0 0 40px;
              font-size: 22px;
              color: #9d9d9d;
              @include left;
              &.select{
                color: $color-icon;
              }
            }
            .mysheet-img-wrapper{
              flex: 0 0 50px;
              height: 100%;
              @include center;
              .mysheet-img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            .mysheet-title-wrapper{
              flex: 1;
              height: 100%;
              padding: 5px 15px;
              box-sizing: border-box;
              .mysheet-title{
                margin-top: 2px;
                font-size: $font-size-medium;
              }
              .mysheet-num{
                color: #83838a;
                font-size: $font-size-small;
                margin-top: 9px;
              }
            }
            .icon-list-wrapper {
              flex: 0 0 40px;
              font-size: 25px;
              color: #9d9d9d;
              @include center;
              .icon-list {

              }
            }
          }
        }
      }
    }
    .manage-bottom {
      z-index: 4000;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      @include columnCenter;
      border-top: #f7f7f7 1px solid;
      color: #8a8a8a;
      .icon-deleteAll{
        font-size: 22px;
      }
      .deletet-text{
        margin-top: 2px;
        font-size: $font-size-medium;
      }
    }
  }
</style>
