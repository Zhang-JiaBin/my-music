<template>
  <transition name="slide">
    <div class="user">
      <big-title @back="returnTo" :title="title"></big-title>
      <div ref="scrollWrapper" class="scroll-wrapper">
        <scroll ref="userScroll" class="user-scroll" :data="this.userSheet">
          <div class="scroll-content">
            <div class="user-img-wrapper">
              <img @click="showImg" class="user-img" :src="ImgUrl" alt="">
            </div>
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
            <my-sheet></my-sheet>
          </div>
        </scroll>
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
import MySheet from '../components/user/mySheet'
import Scroll from '../common/scroll'
export default {
  name: 'user',
  data () {
    return {
      littleList: [{
        icon: 'icon-history',
        title: '最近播放',
        num: 0
      }, {
        icon: 'icon-like',
        title: '我的喜欢',
        num: 0
      }, {
        icon: 'icon-collect',
        title: '我的收藏',
        num: 0
      }],
      title: '个人中心',
      ImgUrl: require('../assets/image/user.png')
    }
  },

  components: { Scroll, MySheet, BigTitle },

  computed: {
    showText () {
      let littleText = this.littleList.slice(0)
      littleText[2].num = this.collectRanks.length + this.collectSheets.length + this.collectRanks.length
      littleText[1].num = this.favoriteList.length
      littleText[0].num = this.historyList.length
      return littleText
    }
  },
  mounted () {
    this.changeuserBottom()
  },
  watch: {
    currentSong () {
      this.changeuserBottom()
    },
    pageCount () {
      this.changeuserBottom()
    }
  },
  mixins: [singerMixin],
  methods: {
    changeuserBottom () {
      if (this.currentSong !== undefined && this.pageCount >= 1) {
        this.$refs.scrollWrapper.style.bottom = `50px`
      } else {
        this.$refs.scrollWrapper.style.bottom = `0px`
      }
      this.$refs.userScroll.refresh()
    },
    showImg () {
      this.simpleToast('这只是一张图片')
    },
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
    .scroll-wrapper{
      position: absolute;
      top: 50px;
      bottom: 0;
      width: 100%;
      .user-scroll{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .scroll-content{
          .user-img-wrapper{
            width: 100%;
            box-sizing: border-box;
            .user-img{
              width: 100%;
              height: 100%;
            }
          }
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
            width: 100%;
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
        }
      }
    }
  }
</style>
