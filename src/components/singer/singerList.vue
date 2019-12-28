<template>
    <scroll class="singerList-scroll" @scroll="scroll" :data="singerList" ref="singerScroll" :listen-scroll="this.listenScroll" :probe-type="this.probeType">
      <div>
        <div class="singerList-wrapper" ref="listTitle" v-for="(item,index) in singerList" :key="index">
          <div class="singerList-title">
            <span class="title">{{item.title}}</span>
          </div>
          <div class="singerItem" @click="selectItem(subItem)" v-for="subItem in item.items" :key="subItem.id">
            <singer-item :mysinger="subItem"></singer-item>
          </div>
        </div>
      </div>
      <div class="letter-wrapper" @touchstart="LetterTouchStart" @touchmove.stop.prevent="LetterTouchMove">
        <div class="letter-item"
             v-for="(item, index) in letters"
             :key="index"
             :data-index="index"
             :class="{'current': currentIndex === index}"
        >{{item}}</div>
      </div>
      <div class="title-fixed" v-show="fixedTitle" ref="fixed">
        <span class="title-fixed-name">{{fixedTitle}}</span>
      </div>
      <div class="title-show" v-show="showTitle">
        <span class="title-show-name">{{fixedTitle}}</span>
      </div>
      <div class="loading-container" v-show="!this.singerList.length">
        <loading></loading>
      </div>
    </scroll>
</template>

<script>
import Scroll from '../../common/scroll'
import { getData } from '../../utils/dom'
import Loading from '../../common/loading'
import SingerItem from '../../common/singerItem'
const HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  props: {
    singerList: {
      type: Array,
      default: () => []
    }
  },
  name: 'singerList',
  data () {
    return {
      touch: {},
      scrollY: -1,
      currentIndex: 0,
      diff: -1,
      showTitle: false,
      listHeight: []
    }
  },
  created () {
    this.listenScroll = true
    this.probeType = 3
  },
  components: { SingerItem, Loading, Scroll },
  watch: {
    singerList () {
      // console.log('监控')
      // console.log(this.singerList)
      this.$nextTick()
      setTimeout(() => {
        this.$nextTick(() => {
          this.calculateHeight()
        })
      }, 20)
    },
    scrollY (newY) {
      // console.log('-newY:', -newY)
      // console.log('listHeight:', this.listHeight)
      // console.log(this.listHeight.length)
      // console.log('newY:',-newY)
      const listHeight = this.listHeight
      // 滚动到顶部，newY > 0
      if (newY >= 0) {
        this.currentIndex = 0
        return
      }
      // 中间滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          // console.log(this.currentIndex)
          // console.log('diff', this.diff)
          return
        }
      }
      // 滚动到底部且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    // 监控当前滚动高度与当前所在区间的高度之差，如果小于30,则title-fixed会上移
    diff (newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  computed: {
    // 获取字母表
    letters () {
      return this.singerList.map(item => item.title.slice(0, 1))
    },
    fixedTitle () {
      // console.log(this.scrollY)
      // console.log(this.currentIndex)
      if (this.scrollY > 0) {
        return
      }
      return this.singerList[this.currentIndex] ? this.singerList[this.currentIndex].title : []
    }
  },

  methods: {
    refresh () {
      this.$refs.singerScroll.refresh()
    },
    selectItem (subItem) {
      this.$emit('select', subItem)
    },
    // refresh () {
    //   this.$refs.singerScroll.refresh()
    // },
    LetterTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    LetterTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    // 移动到指定的Dom元素
    _scrollTo (index) {
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.singerScroll.scrollToElement(this.$refs.listTitle[index], 0)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    calculateHeight () {
      // this.listHeight = []
      const list = this.$refs.listTitle
      // console.log(list)
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  /*.singerList {*/
  /*  position: absolute;*/
  /*  top: 40px;*/
  /*  bottom: 0px;*/
  /*  width: 100%;*/
  .singerList-scroll{
      position: absolute;
      /*height: 100%;*/
      top: 40px;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      .singerList-wrapper {
        display: flex;
        flex-direction: column;
        .singerList-title {
          width: 100%;
          height: 30px;
          background: $color-bg-bottom;
          @include justcenter;
          .title{
            margin-left: 15px;
            font-size: $font-size-medium;
          }
        }
        .singerItem {
          width: 100%;
          height: 70px;
          display: flex;
          padding: 10px 40px 10px 15px;
          box-sizing: border-box;
        }
      }
      .letter-wrapper {
        z-index: 300;
        position: absolute;
        right: 5px;
        top: 50%;
        width: 30px;
        border-radius: 12px;
        transform: translateY(-50%);
        padding-top: 5px;
        background: $color-bg-bottom;
        /*font-family: Helvetica;*/
        .letter-item{
          @include columnTop;
          width: 100%;
          height: 13px;
          padding-bottom: 5px;
          font-size: $font-size-small;
          &.current {
            color: $color-icon;
          }
        }
      }
      .title-fixed{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 30px;
        background: $color-bg-bottom;
        @include justcenter;
        .title-fixed-name{
          margin-left: 15px;
          font-weight: bold;
          color: $color-icon;
          font-size: $font-size-medium;
        }
      }
      .title-show {
        position: absolute;
        right: 110px;
        width: 50px;
        height: 50px;
        z-index: 100;
        top: 40%;
        border-radius: 10px;
        background: $color-bg-bottom;
        @include center;
        .title-show-name {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
</style>
