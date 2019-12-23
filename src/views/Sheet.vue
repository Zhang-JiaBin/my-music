<template>
  <div class="sheet" ref="sheet">
    <scroll class="sheet-scroll" :data="this.sheetList" ref="scroll">
      <div class="sheet-scroll-wrapper">
        <div class="swiper-wrapper">
          <swiper :options="swiperOption" ref="mySwiper" v-if="this.swiperList && this.swiperList.length">
            <!-- slides -->
            <swiper-slide v-for="item in this.swiperList" :key="item.content_id">
              <div class="item-wrapper" @click="selectSheet(item)">
                <div class="item-img">
                  <img class="Img" :src="item.cover" alt="">
                </div>
                <div class="item-text">
                  <span class="text">{{item.title}}</span>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <little-title title="官方歌单" :show-more="false"></little-title>
        <div class="sheet-wrapper">
          <song-sheet @select="selectSheet" :sheet-list="this.sheetList"></song-sheet>
        </div>
      </div>
      <div class="loading-container" v-show="!sheetList.length">
        <loading></loading>
      </div>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { singerMixin } from '../utils/mixin'
import { getSheetList } from '../api/sheet'
import LittleTitle from '../common/LittleTitle'
import SongSheet from '../components/sheet/songSheet'
import Scroll from '../common/scroll'
import Loading from '../common/loading'

export default {
  name: 'sheet',
  data () {
    return {
      swiperOption: {
        slidesPerView: 3,
        centeredSlides: true,
        slideToClickedSlide: true,
        // centeredSlidesBounds: true,
        loop: true,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows: false
        }
      },
      swiperList: [],
      sheetList: []
    }
  },
  mounted () {
    this._getSheetList()
  },
  mixins: [singerMixin],
  components: { Loading, Scroll, SongSheet, LittleTitle, swiper, swiperSlide },
  watch: {
    currentSong () {
      if (this.currentSong !== undefined) {
        this.$refs.sheet.style.bottom = `100px`
        this.$refs.scroll.refresh()
      }
    }
  },
  computed: {},

  methods: {
    // 监听sheet组件子组件select,选择了一个的歌单
    selectSheet (sheet) {
      this.selectSheetItem(sheet)
      this.$router.push({
        path: `/home/sheet/${sheet.content_id}`
      })
    },
    _getSheetList () {
      getSheetList().then(res => {
        let list = res.playlist.data.v_playlist
        this.solveList(list)
        this.swiperList = list.slice(0, 5)
        this.sheetList = list.slice(5)
        // console.log(this.swiperList)
        // console.log(this.sheetList)
        // console.log(res)
      })
    },
    solveList (list) {
      list.forEach(item => {
        item.cover = item.cover_url_big
        item.content_id = item.tid
      })
      // console.log(list)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .sheet {
    position: fixed;
    top: 50px;
    bottom: 50px;
    width: 100%;
    z-index: 600;
    .sheet-scroll{
      height: 100%;
      width: 100%;
      overflow: hidden;
      .sheet-scroll-wrapper{
        .swiper-wrapper{
          width: 100%;
          /*height: 200px;*/
          .swiper-slide {
            opacity: 0.4;
            &.swiper-slide-active{
              opacity: 1;
              z-index: 10;
            }
            .item-wrapper{
              width: 100%;
              height: 190px;
              border-radius: 10px;
              @include columnCenter;
              .item-img{
                width: 150px;
                height: 150px;
                .Img{
                  border-radius: 10px 10px 0 0;
                  width: 100%;
                  height: 100%;
                }
              }
              .item-text{
                height: 40px;
                width: 148px;
                background: white;
                border-left: solid 1px rgba(0,0,0,0.1);
                border-right: solid 1px rgba(0,0,0,0.1);
                border-bottom: solid 1px rgba(0,0,0,0.1);
                /*box-shadow: 0 2px 0 rgba(0,0,0,.1);*/
                border-radius: 0 0 10px 10px;
                @include center;
                .text{
                  font-size: $font-size-medium;
                  @include ellipsis2(1);
                }
              }
            }
          }
        }
        .sheet-wrapper {
          width: 100%;
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
