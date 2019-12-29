<template>
  <div class="collection">
    <big-title @back="hide" :title="title"></big-title>
    <switches :switches="switches" @switch="selectIndex" :c-index="cIndex"></switches>
    <div class="Tab">
      <div class="icon-wrapper">
        <span class="icon" :class="Icon"></span>
      </div>
      <div class="Tab-text">
        <span class="text">{{tabText}}</span>
        <span class="num">{{tabnum}}</span>
      </div>
      <div class="icon-wrapper" @click="showConfrim">
        <span class="icon-deleteAll"></span>
      </div>
    </div>
    <div class="collection-swiper-wrapper" ref="collect">
      <swiper class="collection-swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide><collect-singer ref="mysingers"></collect-singer></swiper-slide>
        <swiper-slide><collect-sheet ref="mysheets"></collect-sheet></swiper-slide>
        <swiper-slide><collect-rank ref="myranks"></collect-rank></swiper-slide>
      </swiper>
    </div>
    <confirm ref="confirm" @confirm="deleteAll" :text='confirmText'></confirm>
  </div>
</template>

<script>
import BigTitle from '../../common/bigTitle'
import Switches from '../../common/switches'
import CollectSinger from './collectSinger'
import { playerMixin, singerMixin } from '../../utils/mixin'
import Confirm from '../../common/confirm'
import CollectSheet from './collectSheet'
import CollectRank from './collectRank'
export default {
  name: 'collection',
  data () {
    return {
      title: '我的收藏',
      switches: [{
        name: '歌手'
      }, {
        name: '歌单'
      }, {
        name: '榜单'
      }],
      cIndex: 0,
      swiperOption: {

      },
      swiper: {},
      tabText: '',
      tabnum: '',
      Icon: '',
      confirmText: ''
    }
  },
  mixins: [singerMixin, playerMixin],
  mounted () {
    this.setHomeMark(0)
    this.swiper = this.$refs.mySwiper.swiper
    this.swiper.slideTo(this.cIndex)
    this.changeCoBottom()
  },
  components: { CollectRank, CollectSheet, Confirm, CollectSinger, Switches, BigTitle },
  computed: {
    activeIndex () {
      return this.swiper.activeIndex
    }
  },
  watch: {
    activeIndex (newVal) {
      this.cIndex = newVal
      if (newVal === 0) {
        this.tabText = '歌手'
        this.tabnum = `(共${this.collectSingers.length}位)`
        this.Icon = 'icon-singer'
        this.confirmText = '确定取消关注所有歌手?'
      } else if (newVal === 1) {
        this.tabText = '歌单'
        this.tabnum = `(${this.collectSheets.length})`
        this.Icon = 'icon-sheet'
        this.confirmText = '确定删除所有收藏的歌单?'
      } else {
        this.tabText = '榜单'
        this.tabnum = `(${this.collectRanks.length})`
        this.Icon = 'icon-rank'
        this.confirmText = '确定删除所有收藏的榜单?'
      }
    },
    currentSong () {
      this.changeCoBottom()
    },
    // 适配有mini播放器的底部滚动高度
    pageCount () {
      this.changeCoBottom()
    }
  },
  methods: {
    // 改变底部高度适应mini播放器
    changeCoBottom () {
      if (this.currentSong !== undefined && this.pageCount >= 1) {
        this.$refs.collect.style.bottom = `50px`
      } else {
        this.$refs.collect.style.bottom = `0px`
      }
      this.$refs.mysingers.refresh()
      this.$refs.mysheets.refresh()
      this.$refs.myranks.refresh()
    },
    hide () {
      this.$router.go(-1)
    },
    selectIndex (index) {
      this.cIndex = index
      this.swiper.slideTo(index)
    },
    showConfrim () {
      this.$refs.confirm.show()
    },
    deleteAll () {
      if (this.cIndex === 0) {
        this.deletemyAllSingers()
      } else if (this.cIndex === 1) {
        this.deletemyAllSheets()
      } else {
        this.deletemyAllRanks()
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .collection{
    position: fixed;
    z-index: 1300;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background: white;
    .Tab{
      width: 100%;
      height: 30px;
      background: $color-bg-bottom;
      @include justcenter;
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      .Tab-text{
        flex: 1;
        font-size: $font-size-medium;
        line-height: 16px;
        margin-left: 5px;
        .text {
          font-weight: bold;
        }
        .num{
          color: #9c9c9c;
          margin-left: 5px;
        }

      }
      .icon-wrapper{
        flex: 0 0 25px;
        height: 100%;
        font-size: 20px;
        @include center;
        .icon{
          color: $color-icon;
        }
      }
    }
    .collection-swiper-wrapper{
      position: absolute;
      top: 120px;
      bottom: 0;
      width: 100%;
      .collection-swiper{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
