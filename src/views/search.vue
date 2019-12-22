<template>
  <transition name="slide">
    <div class="search">
      <div class="search-top-wrapper">
        <div class="search-title-wrapper">
          <div class="icon-back-wrapper">
            <span class="icon-back" @click="back"></span>
          </div>
          <div class="input-wrapper">
            <span class="icon-search"></span>
            <input class="input-text" @keyup.enter="searchFor" placeholder="歌曲" v-model="query" type="text" ref="input">
          </div>
        </div>
      </div>
      <div class="search-scroll-wrapper" ref="mysearch">
        <scroll class="search-scroll" ref="scroll" :data="hotKey">
          <div class="scroll-item">
            <little-title title="最近搜索" @displayMore="deleteAllSearchHistory()" :show-icon="true" :show-more="false"></little-title>
            <search-history @select="gotoSearch"></search-history>
            <little-title title="热搜榜" :show-more="false"></little-title>
            <div class="hot-search-wrapper">
              <div class="hot-search-item" @click="gotoSearch(item.k)" v-for="(item,index) in hotKey" :key="index">
                <div class="hot-index-wrapper" :class="{'classCss': index <= 2}">
                  <span class="index">{{index + 1}}</span>
                </div>
                <div class="hot-text-wrapper" :class="{'classCss': index <= 2}">
                  <span class="text">{{item.k}}</span>
                </div>
                <div class="hot-value-wrapper">
                  <span class="value">{{item.n}}</span>
                </div>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { singerMixin } from '../utils/mixin'
import { getHotSearch } from '../api/search'
import LittleTitle from '../common/LittleTitle'
import Scroll from '../common/scroll'
import SearchHistory from '../components/search/searchHistory'

export default {
  name: 'searchDetail',
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  mounted () {
    this.getFocus()
    this._getHotSearch()
    // setTimeout(() => {
    //   this.$refs.input.blur()
    // },2000)
  },
  watch: {
    pageCount (newPageCount) {
      this.getFocus()
      if (newPageCount === 1 && this.currentSong !== undefined) {
        console.log('123')
        this.$refs.mysearch.style.bottom = `50px`
      }
      this.$refs.scroll.refresh()
    }
  },
  mixins: [singerMixin],
  components: { SearchHistory, Scroll, LittleTitle },
  computed: {},
  methods: {
    getFocus () {
      setTimeout(() => {
        this.$refs.input.focus()
      }, 500)
    },
    back () {
      this.$router.go(-1)
      if (this.pageCount === 0) {
        return
      }
      this.setPageCount(this.pageCount - 1)
    },
    _getHotSearch () {
      getHotSearch().then(res => {
        this.hotKey = res.data.hotkey
      })
    },
    gotoSearch (item) {
      this.query = item
      this.searchFor()
    },
    searchFor () {
      this.saveSearchHistory(this.query)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .search {
    position: fixed;
    z-index: 1200;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background: white;
    .search-top-wrapper{
      height: 50px;
      width: 100%;
      position: relative;
      box-shadow: none;
      z-index: 500;
      .search-title-wrapper {
        position: absolute;
        left: 0;
        bottom: 8px;
        height: 30px;
        width: 100%;
        display: flex;
        @include center;
        padding: 0 15px;
        box-sizing: border-box;
        .input-wrapper {
          flex: 1;
          @include left;
          height: 100%;
          border-radius: 20px;
          background: $color-bg;
          display: flex;
          padding: 0 10px;
          box-sizing: border-box;
          color: #979797;
          .icon-search {
            flex: 0 0 30px;
            width: 30px;
            height: 30px;
            @include center;
            font-size: 25px;
          }
          .input-text {
            flex: 1;
            background-color: transparent;
            border: none;
            caret-color: $color-icon;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: 14px;
              color: #ccc;
            }
          }
        }
        .icon-back-wrapper {
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          @include left;
          .icon-back {
            font-size: 25px;
          }
        }
      }
    }
    .search-scroll-wrapper{
      position: absolute;
      width: 100%;
      top: 50px;
      bottom: 0;
      .search-scroll{
        height: 100%;
        width: 100%;
        overflow: hidden;
        .scroll-item{
          width: 100%;
          .hot-search-wrapper {
            width: 100%;
            .hot-search-item{
              padding: 0 20px;
              box-sizing: border-box;
              width: 100%;
              height: 40px;
              display: flex;
              /*border-bottom: 1px solid #eeeeee;*/
              color: #d5d5d5;
              .hot-index-wrapper{
                flex: 0 0 30px;
                width: 30px;
                height: 100%;
                font-size: $font-size-medium-x;
                @include left;
                .index{
                }
                &.classCss {
                  color: $color-icon;
                  font-weight: bold;
                }
              }
              .hot-text-wrapper{
                flex: 1;
                height: 100%;
                @include left;
                .text{
                  line-height: 18px;
                  font-size: $font-size-medium-x;
                  color: black;
                  @include ellipsis2(1);
                }
                &.classCss {
                  font-weight: bold;
                  color: #373737;
                }
              }
              .hot-value-wrapper{
                flex: 0 0 50px;
                width: 50px;
                height: 100%;
                @include right;
                .value{
                  font-size: $font-size-small;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
