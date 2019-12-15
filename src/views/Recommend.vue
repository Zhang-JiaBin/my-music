<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content-wrapper" :data="swiperList" ref="scroll">
      <div>
        <div class="swiper-wrapper">
          <swiper class="recommend-swiper" :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide class="recommend-swiper-item" v-for="item in swiperList" :key="item.id">
              <a :href="item.pic_info.url">
                <img @load="loadImage" :src="item.pic_info.url">
              </a>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <little-title title="歌单推荐"></little-title>
        <div class="recommend-list-wrapper">
          <div class="recomend-list" v-for="item in vHotList" :key="item.content_id">
            <song-item :img-url="item.cover" :songText="item.title"></song-item>
          </div>
        </div>
        <little-title title="排行榜" @displayMore="gotoRank"></little-title>
        <recomend-rank :rank-group="this.rankGroup"></recomend-rank>
        <little-title title="精选音乐FM"></little-title>
        <recomend-song :new-song="newSongList"></recomend-song>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend } from '../api/recommend'
import 'swiper/dist/css/swiper.css'
import scroll from '../common/scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import LittleTitle from '../common/LittleTitle'
import SongItem from '../common/SongItem'
import RecomendRank from '../components/Recommend/RecommendRank'
import { createSong } from '../utils/song'
import { randomlist } from '../utils/random'
import RecomendSong from '../components/Recommend/RecommendSong'
import { singerMixin } from '../utils/mixin'
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
      // rankGroup: [],
      newSong: [],
      newSongList: []
    }
  },
  mounted () {
    this._getRecommend()
  },
  components: {
    RecomendSong,
    RecomendRank,
    SongItem,
    LittleTitle,
    swiper,
    swiperSlide,
    scroll
  },

  computed: {},
  mixins: [singerMixin],
  methods: {
    gotoRank () {
      this.$router.push({
        path: 'rank'
      })
    },
    _getRecommend () {
      getRecommend().then(res => {
        console.log(res)
        this.swiperList = res.focus.data.content
        this.vHotList = res.recomPlaylist.data.v_hot
        this.setRankGroup(res.toplist.data.group)
        // this.rankGroup = res.toplist.data.group
        this.newSong = res.new_song.data.songlist
        // console.log(this.swiperList)
        // console.log(this.vHotList)
        console.log(this.rankGroup)
        // console.log(this.newSong)
        this.newSongList = randomlist(this.normalizeSong(this.newSong), 15)
        // console.log(this.newSongList)
      })
    },
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    normalizeSong (list) {
      let ret = []
      list.forEach(item => {
        if (item.album.id) {
          ret.push(createSong(item))
        }
      })
      return ret
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
      .recommend-list-wrapper {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        .recomend-list {
          flex: 0 0 33.33%;
          width: 33.33%;
          box-sizing: border-box;
          &:nth-child(3n+1) {
            padding: 0 5px 15px 15px;
          }
          &:nth-child(3n+2) {
            padding: 0 10px 15px 10px;
          }
          &:nth-child(3n+3) {
            padding: 0 15px 15px 5px;
          }
        }
      }
    }
  }
</style>
