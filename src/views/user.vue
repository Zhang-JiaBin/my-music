<template>
  <transition name="slide">
    <div class="user">
      <big-title @back="returnTo" :title="title"></big-title>
      <div class="user-song-wrapper">
        <div class="user-song-item" @click="selectOne(index)" v-for="(item, index) in showText" :key="index">
          <div class="icon-wrapper">
            <span class="icon" :class="item.icon"></span>
          </div>
          <div class="little-title-wrapper">
            <span class="little-title">{{item.title}}</span>
            <span class="title-number">({{item.num}})</span>
          </div>
        </div>
      </div>
      <div class="user-sheet-wrapper">
        <div class="sheet-tittle-wrapper">
          <div class="sheet-tittle-left">
            <div class="icon-down-wrapper">
              <span class="icon-down"></span>
            </div>
            <div class="sheet-tittle">
              <span class="title">创建的歌单</span>
            </div>
            <div class="number-wrapper">
              <span class="number">(4)</span>
            </div>
          </div>
          <div class="sheet-tittle-right">
            <div class="icon-add-wrapper">
              <div class="icon-add"></div>
            </div>
            <div class="icon-dot-wrapper">
              <div class="icon-dot"></div>
            </div>
          </div>
        </div>
      </div>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script>
import BigTitle from '../common/bigTitle'
import { singerMixin } from '../utils/mixin'
export default {
  name: 'user',
  data () {
    return {
      littleList: [{
        icon: 'icon-play',
        title: '最近播放',
        num: 0
      }, {
        icon: 'icon-add',
        title: '我的喜欢',
        num: 0
      }, {
        icon: 'icon-favorite',
        title: '我的收藏',
        num: 0
      }],
      title: '个人中心'
    }
  },

  components: { BigTitle },

  computed: {
    showText () {
      let littleText = this.littleList.slice(0)
      littleText[2].num = this.collectRanks.length + this.collectSheets.length + this.collectRanks.length
      littleText[1].num = this.favoriteList.length
      littleText[0].num = this.historyList.length
      return littleText
    }
  },
  mixins: [singerMixin],
  methods: {
    // 返回
    returnTo () {
      this.$router.go(-1)
      this.setPageCount(this.pageCount - 1)
    },
    // 跳转到我的喜欢
    gotoMylike () {
      this.$router.push({
        path: '/home/user/like'
      })
    },
    // 跳转到播放历史页面
    gotohistory () {
      this.$router.push({
        path: '/home/user/history'
      })
    },
    // 跳转到收藏页面
    gotocollection () {
      this.$router.push({
        path: '/home/user/collection'
      })
    },
    // 选择一项进行操作
    selectOne (index) {
      switch (index) {
        case 0:
          this.gotohistory()
          break
        case 1:
          this.gotoMylike()
          break
        case 2:
          this.gotocollection()
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .user {
    position: fixed;
    z-index: 1200;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background: white;
    .user-title-wrapper{
      width: 100%;
      height: 50px;
      position: relative;
      box-shadow: 0 1px 5px rgba(0,0,0,0.1);
      .user-title{
        position: absolute;
        left: 0;
        bottom: 8px;
        height: 30px;
        width: 100%;
        padding: 0 15px;
        display: flex;
        .icon-back-wrapper{
          flex: 0 0 30px;
          width: 30px;
          @include left;
          .icon-back {
            font-size: 25px;
          }
        }
        .title-wrapper{
          flex: 1;
          height: 100%;
          padding-left: 10px;
          box-sizing: border-box;
          @include left;
          .title-text{
            font-size: $font-size-large-x;
            font-weight: bold;
          }
        }
      }
    }
    .user-song-wrapper{
      /*position: absolute;*/
      /*top: 60px;*/
      width: 100%;
      /*box-shadow: 0 3px 5px rgba(0,0,0,0.1);*/
      border-bottom: 6px solid #f5f5f5;
      .user-song-item{
        height: 60px;
        width: 100%;
        display: flex;
        padding: 10px 0 10px 15px;
        box-sizing: border-box;
        .icon-wrapper{
          flex: 0 0 40px;
          width: 40px;
          height: 100%;
          @include center;
          .icon{
            color: $color-icon;
            font-size: 28px;
          }
        }
        .little-title-wrapper{
          flex: 1;
          @include left;
          border-bottom: 1px solid #f9f9f9;
          padding-left:10px;
          box-sizing: border-box;
          .little-title{
            line-height: 18px;
            font-size: $font-size-medium-x;
          }
          .title-number {
            margin-left: 5px;
            margin-bottom: 2px;
            line-height: 14px;
            color: #b4b4b4;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .sheet-tittle-wrapper{
      height: 40px;
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      .sheet-tittle-left{
        flex: 1;
        display: flex;
        @include left;
        .icon-down-wrapper{
          flex:0 0 30px;
          width: 30px;
          height: 100%;
          @include left;
          .icon-down{
            font-size: 20px;
          }
        }
        .sheet-tittle{
          flex: 0 0 83px;
          width: 83px;
          height: 100%;
          @include left;
          .title{
            font-size: $font-size-medium-x;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .number-wrapper{
          flex: 0 0 20px;
          width: 20px;
          height: 100%;
          @include center;
          .number{
            line-height: 14px;
            color: #b4b4b4;
            font-size: $font-size-medium;
          }
        }
      }
      .sheet-tittle-right{
        flex: 1;
        @include right;
        display: flex;
        .icon-add-wrapper{
          flex: 0 0 30px;
          width: 30px;
          height: 100%;
          @include center;
          .icon-add{
            font-size: 22px;
          }
        }
        .icon-dot-wrapper{
          flex: 0 0 30px;
          width: 30px;
          height: 100%;
          @include right;
          .icon-dot {
            font-size: 22px;
          }
        }
      }
    }
  }
</style>
