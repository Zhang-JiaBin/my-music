<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content-wrapper" :data="swiperList" ref="scroll">
      <div>
        <div class="swiper-wrapper">
          <swiper class="recommend-swiper" :options="swiperOption" ref="mySwiper" v-if="swiperList && swiperList.length">
            <!-- slides -->
            <swiper-slide class="recommend-swiper-item" v-for="item in swiperList" :key="item.id">
              <a :href="item.pic_info.url">
                <img @load="loadImage" :src="item.pic_info.url">
              </a>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <little-title title="歌单推荐" @displayMore="gotoSheet"></little-title>
        <div class="recommend-sheet-wrapper">
          <song-sheet @select="selectRSheet" :sheet-list="vHotList"></song-sheet>
        </div>
        <little-title title="排行榜" @displayMore="gotoRank"></little-title>
        <recomend-rank :rank-group="this.rankGroup"></recomend-rank>
        <little-title title="精选音乐FM"></little-title>
        <recomend-song @select="startPlaying" :new-song="newSongList"></recomend-song>
      </div>
      <div class="loading-container" v-show="!vHotList.length">
        <loading></loading>
      </div>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getRecommend } from '../api/recommend'
// import 'swiper/dist/css/swiper.css'
import scroll from '../common/scroll'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import LittleTitle from '../common/LittleTitle'
import RecomendRank from '../components/Recommend/RecommendRank'
import { randomlist } from '../utils/random'
import RecomendSong from '../components/Recommend/RecommendSong'
import { singerMixin } from '../utils/mixin'
import Loading from '../common/loading'
import SongSheet from '../components/sheet/songSheet'
export default {
  name: 'Recommend',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        loop: true,
        autoplay: true,
        clickable: true
      },
      swiperList: [],
      vHotList: [],
      rankGroup: [],
      newSong: [],
      newSongList: []
    }
  },
  mounted () {
    this.setHomeMark(1)
    this._getRecommend()
    this.changeRecommendBottom()
  },
  components: {
    SongSheet,
    Loading,
    RecomendSong,
    RecomendRank,
    LittleTitle,
    // swiper,
    // swiperSlide,
    scroll
  },
  watch: {
    currentSong () {
      this.changeRecommendBottom()
    },
    pageCount () {
      this.changeRecommendBottom()
    }
  },
  computed: {},
  mixins: [singerMixin],
  methods: {
    changeRecommendBottom () {
      if (this.currentSong !== undefined) {
        this.$refs.recommend.style.bottom = `100px`
      } else {
        this.$refs.recommend.style.bottom = `50px`
      }
      this.$refs.scroll.refresh()
    },
    // 点击推荐页面的私人 FM 进行播放
    startPlaying (item) {
      this.insertSong(item)
    },
    // 跳转到歌单页面
    gotoSheet () {
      this.$router.push({
        path: 'sheet'
      })
    },
    // 跳转到排行榜页面
    gotoRank () {
      this.$router.push({
        path: 'rank'
      })
    },
    // 监听Recommend组件的子组件select,选择了一个的歌单
    selectRSheet (sheet) {
      this.selectSheetItem(sheet)
      this.$router.push({
        path: `/home/recommend/sheet/${sheet.content_id}`
      })
    },
    // 获取推荐页面数据
    _getRecommend () {
      getRecommend().then(res => {
        // console.log(res)
        this.swiperList = res.focus.data.content
        this.vHotList = res.recomPlaylist.data.v_hot
        this.rankGroup = res.toplist.data.group
        this.newSong = res.new_song.data.songlist
        this.newSongList = randomlist(this.normalizeSong(this.newSong), 15)
      })
    },
    loadImage () {
      // if (!this.checkLoaded) {
      //   // console.log('loadImage')
      //   this.$refs.scroll.refresh()
      //   this.checkLoaded = true
      // }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .recommend {
    position: fixed;
    top: 50px;
    bottom: 50px;
    width: 100%;
    z-index: 600;
    .recommend-content-wrapper{
      height: 100%;
      overflow: hidden;
      .swiper-wrapper {
        height: 170px;
        .recommend-swiper{
          position: relative;
          .recommend-swiper-item{
            a {
              width: 100%;
              height: 100%;
              @include center;
              img {
                border-radius: 8px;
                width: 92%;
                height: 100%;
              }
            }
          }
          .swiper-pagination{
            position: absolute;
            bottom: 2px;
          }
        }
      }
      .recommend-sheet-wrapper{
        width: 100%;
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
