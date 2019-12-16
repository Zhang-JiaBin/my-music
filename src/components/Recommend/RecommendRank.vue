<template>
  <div class="swiperRank-wrapper">
    <swiper class="recommendRank-swiper" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide class="recommendRank-swiper-item" v-for="item in topList" :key="item.id">
        <rank-item :rank-list="item"></rank-item>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import RankItem from '../../common/rankItem'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  props: {
    rankGroup: Array
  },
  name: 'RecomendRank',
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
    RankItem,
    swiperSlide,
    swiper
  },

  computed: {
    topList () {
      return this.rankGroup[0] ? this.rankGroup[0].toplist : []
    }
  },

  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .swiperRank-wrapper {
    height: 135px;
    /*overflow: hidden;*/
    /*padding: 0 15px;*/
    width: 100%;
    .recommendRank-swiper{
      width: 100%;
      .recommendRank-swiper-item{
        width: 90%;
      }
    }
  }
</style>
