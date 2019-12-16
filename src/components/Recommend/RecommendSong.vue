<template>
  <div class="RecommendSong">
    <swiper class="RecommendSong-swiper" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide class="RecommendSong-swiper-item" v-for="(page,index) in pages" :key="index">
        <div class="item-img-wrapper" v-for="item in page" :key="item.id">
          <img class="item-img" v-lazy="item.image" alt="">
          <div class="item-img-text">
            <span class="text-name">{{item.name}}</span>
            <span class="text-singer">{{item.singer}}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
export default {
  name: 'RecomendSong',
  props: {
    newSong: Array
  },
  data () {
    return {
      swiperOption: {
        // loop: true,
        autoplay: true,
        clickable: true
      }
    }
  },

  components: {
    swiper,
    swiperSlide
  },

  computed: {
    pages () {
      const pages = []
      this.newSong.forEach((item, index) => {
        const page = Math.floor(index / 3)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },

  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .RecommendSong {
    /*height: 160px;*/
    /*overflow: hidden;*/
    /*padding: 0 15px;*/
    width: 100%;
    .RecommendSong-swiper{
      width: 100%;
      .RecommendSong-swiper-item{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        padding-left: 15px;
        box-sizing: border-box;
        .item-img-wrapper{
          flex: 0 0 33.33%;
          width: 33.33%;
          height: 150px;
          @include columnTopLeft;
          .item-img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
          .item-img-text{
            margin-top: 10px;
            width: 90px;
            @include columnCenter;
            .text-name{
              font-size: $font-size-medium;
              @include ellipsis2(1)
            }
            .text-singer{
              margin-top: 8px;
              font-size: $font-size-small-s;
              @include ellipsis2(1);
              color: #a4a4a4;
            }
          }
        }
      }
    }
  }
</style>
