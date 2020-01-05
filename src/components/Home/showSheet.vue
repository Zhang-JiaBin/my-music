<template>
  <transition name="fade">
    <div class="show-sheet" v-show="visible" @click="hide">
      <div class="show-sheet-content" @click.stop>
        <div class="content-title">
          <div class="title-text-wrapper">
            <span class="title-text">收藏到歌单</span>
          </div>
          <div class="more-choose-wrapper" v-show="showMore" @click="clickMore">
            <span class="icon-list"></span>
            <span class="choose-text">多选</span>
          </div>
          <div class="complete-wrapper" :class="{'selected': selectNum}" v-show="!showMore" @click="clickCompleteMore">
            <span class="complete-text">完成</span>
            <span class="complete-num" v-show="selectNum">({{selectNum}})</span>
          </div>
        </div>
        <scroll ref="contentScroll" class="content-scroll" :data="userSheet">
          <div class="content-sheet">
            <div class="user-mysheet" @click="showNew">
              <div class="mysheet-icon-wrapper">
                <span class="icon-plus"></span>
              </div>
              <div class="mysheet-new-wrapper">
                <div class="mysheet-new">新建歌单</div>
              </div>
            </div>
            <div class="user-mysheet" @click="addTo(selectedSong,item)" v-for="(item, index) in this.userSheet" :key="index">
              <div class="mysheet-img-wrapper">
                <img class="mysheet-img" :src="item.pic" alt="">
              </div>
              <div class="mysheet-title-wrapper">
                <div class="mysheet-title">{{item.title}}</div>
                <div class="mysheet-num">{{item.sheetList.length}}首</div>
              </div>
              <div class="icon-choose-wrapper" @click.stop.prevent="selectOneSheet(item)" v-show="!showMore" :class="{'select': item.select}">
                <span :class="iconChoose(item)"></span>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { singerMixin } from '../../utils/mixin'
import Scroll from '../../common/scroll'

export default {
  name: 'showSheet',
  data () {
    return {
      visible: false,
      showMore: true
    }
  },
  mixins: [singerMixin],
  components: { Scroll },

  computed: {
  },
  watch: {
    userSheet () {
      this.$refs.contentScroll.refresh()
      this.hide()
      this.$emit('hide')
    }
  },
  mounted () {
  },
  methods: {
    addTo (song, item) {
      this.addToSheet(song, item)
      this.hide()
      this.$emit('hide')
    },
    showNew () {
      this.setShowCreateSheet(true)
    },
    show () {
      this.visible = true
      this.showMore = true
      this.userSheet.forEach(item => {
        item.select = false
      })
      setTimeout(() => {
        this.$refs.contentScroll.refresh()
      })
    },
    hidesheet () {
      this.hide()
      this.$emit('hide')
    },
    hide () {
      this.visible = false
    },
    clickMore () {
      this.showMore = !this.showMore
    },
    clickCompleteMore () {
      if (this.selectNum) {
        // let ret = list.filter(item => item.select === true)
        this.userSheet.forEach(item => {
          if (item.select === true) {
            this.addToSheet(this.selectedSong, item)
            item.select = false
          }
        })
        this.hide()
        this.$emit('hide')
      } else {
        this.showMore = !this.showMore
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .show-sheet{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 4200;
    background: rgba(0,0,0,0.5);
    .show-sheet-content{
      position: absolute;
      top: 50%;
      background: #ffffff;
      transform: translateY(-50%);
      width: 86%;
      left: 7%;
      border-radius: 10px;
      .content-title{
        width: 100%;
        height: 60px;
        display: flex;
        padding: 18px 15px;
        box-sizing: border-box;
        .title-text-wrapper{
          flex: 1;
          @include left;
          .title-text{
            font-size: $font-size-large;
            font-weight: bold;
          }
        }
        .more-choose-wrapper{
          flex: 0 0 60px;
          width: 60px;
          @include right;
          .icon-list{
            font-size: 20px
          }
          .choose-text{
            font-size: $font-size-medium;
          }
        }
        .complete-wrapper{
          flex: 0 0 60px;
          @include right;
          font-size: $font-size-medium;
          &.selected{
            color: $color-icon;
          }
          .complete-text{

          }
          .complete-num{

          }
        }
      }
      .content-scroll{
        width: 100%;
        max-height: 320px;
        overflow: hidden;
        .content-sheet{
          .user-mysheet{
            padding: 10px 15px;
            box-sizing: border-box;
            width: 100%;
            height: 60px;
            display: flex;
            @include justcenter;
            .mysheet-icon-wrapper{
              flex: 0 0 40px;
              height: 100%;
              background: #f3f3f3;
              border-radius: 5px;
              @include center;
              .icon-plus {
                font-size: 28px;
                color: $color-icon;
              }
            }
            .mysheet-new-wrapper{
              flex: 1;
              height: 100%;
              padding-left: 15px;
              box-sizing: border-box;
              @include left;
              .mysheet-new{
                font-size: $font-size-medium;
              }
            }
            .mysheet-img-wrapper{
              flex: 0 0 40px;
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
              padding-left: 15px;
              box-sizing: border-box;
              .mysheet-title{
                margin-top: 2px;
                font-size: $font-size-medium;
              }
              .mysheet-num{
                color: #83838a;
                font-size: $font-size-small;
                margin-top: 7px;
              }
            }
            .icon-choose-wrapper{
              flex: 0 0 40px;
              font-size: 22px;
              color: #9d9d9d;
              @include center;
              &.select{
                color: $color-icon;
              }
            }
          }
        }
      }
    }
  }
</style>
