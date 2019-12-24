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
            <span class="icon-delete" @click="clearquery" v-show="query"></span>
          </div>
        </div>
      </div>
      <div class="search-scroll-wrapper" ref="mysearch" v-show="!query">
        <scroll class="search-scroll" ref="scroll" :data="hotKey">
          <div class="scroll-item">
            <little-title title="最近搜索" @displayMore="showDeleteConfrim" :show-icon="true" :show-more="false"></little-title>
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
      <div class="search-result-wrapper" ref="myresult" v-show="query">
        <search-result @listlistScroll="blurInput" @search="searchMore" :query="query" :songs="Songs" :search-singer="searchSinger" :has-more="hasMore"></search-result>
      </div>
      <confirm decide="清空" ref="confirm" @confirm="deleteAllSearchHistory()"></confirm>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script>
import { singerMixin } from '../utils/mixin'
import { getHotSearch, search } from '../api/search'
import LittleTitle from '../common/LittleTitle'
import Scroll from '../common/scroll'
import SearchHistory from '../components/search/searchHistory'
import SearchResult from '../components/search/searchResult'
import Singer from '../utils/singer'
import Confirm from '../common/confirm'
const perpage = 20
const showSinger = true
export default {
  name: 'searchDetail',
  data () {
    return {
      page: 1,
      hotKey: [],
      query: '',
      searchSinger: {},
      hasMore: true,
      Songs: []
    }
  },
  mounted () {
    this.getFocus()
    this._getHotSearch()
    // 适配有mini播放器的底部滚动高度
    this.changeSBottom()
  },
  watch: {
    // 适配有mini播放器的底部滚动高度
    pageCount (newPageCount) {
      this.getFocus()
      this.changeSBottom()
    },
    query (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    }
  },
  mixins: [singerMixin],
  components: { Confirm, SearchResult, SearchHistory, Scroll, LittleTitle },
  computed: {},
  methods: {
    // 适配有mini播放器的底部滚动高度
    changeSBottom () {
      if (this.currentSong !== undefined && this.pageCount >= 1) {
        this.$refs.mysearch.style.bottom = `50px`
        this.$refs.myresult.style.bottom = '50px'
        this.$refs.scroll.refresh()
      }
    },
    showDeleteConfrim () {
      this.$refs.confirm.show()
    },
    // 使input框失去焦点
    blurInput () {
      this.$refs.input.blur()
    },
    // 清除搜索词
    clearquery () {
      this.query = ''
      this.searchSinger = {}
      this.Songs = []
    },
    // 获取焦点
    getFocus () {
      setTimeout(() => {
        this.$refs.input.focus()
      }, 500)
    },
    back () {
      if (this.query) {
        this.query = ''
      } else {
        this.query = ''
        this.searchSinger = {}
        this.Songs = []
        this.$router.go(-1)
        if (this.pageCount === 0) {
          return
        }
        this.setPageCount(this.pageCount - 1)
      }
    },
    _getHotSearch () {
      getHotSearch().then(res => {
        this.hotKey = res.data.hotkey
        this.hotKey.forEach(item => {
          item.k = item.k.trim()
        })
      })
    },
    gotoSearch (item) {
      this.query = item
      this.searchFor()
    },
    // 第一次搜索
    searchFor () {
      this.Songs = []
      this.page = 1
      this.hasMore = true
      this.saveSearchHistory(this.query)
      search(this.query, this.page, showSinger, perpage).then(res => {
        console.log(res.data)
        const data = res.data
        if (data.zhida && data.zhida.singermid) {
          this.searchSinger = new Singer({
            id: data.zhida.singermid,
            name: data.zhida.singername
          })
        } else {
          this.searchSinger = {}
        }
        this.handleResult(res.data)
      })
    },
    // 检查是否有更多的搜索结果
    checkMore (data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    // 搜索更多
    searchMore () {
      // console.log('more')
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        this.handleResult(res.data)
        this.checkMore(res.data)
      })
    },
    handleResult (data) {
      let ret = []
      const list = data.song.list
      list.forEach(item => {
        item.album = {
          id: item.albumid,
          mid: item.albummid,
          name: item.albumname,
          title: item.albumname_hilight
        }
        item.id = item.songid
        item.mid = item.songmid
        item.name = item.songname
      })
      ret = this.normalizeSong(list)
      this.Songs = this.Songs.concat(ret)
      // console.log(this.Songs)
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
            line-height: 20px;
            font-size: $font-size-medium-x;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: 14px;
              color: #ccc;
            }
          }
          .icon-delete {
            flex: 0 0 30px;
            width: 30px;
            height: 30px;
            @include center;
            font-size: 18px;
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
    .search-result-wrapper{
      position: absolute;
      width: 100%;
      top: 50px;
      bottom: 0;
    }
  }
</style>
