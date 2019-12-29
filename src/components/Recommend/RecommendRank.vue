<template>
  <div class="swiperRank-wrapper">
    <swiper class="recommendRank-swiper" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide class="recommendRank-swiper-item" v-for="item in topList" :key="item.id">
        <rank-item @select="selectRTop" :rank-top="item"></rank-item>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import RankItem from '../Rank/rankItem'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import { singerMixin } from '../../utils/mixin'
export default {
  props: {
    rankGroup: Array
  },
  name: 'RecomendRank',
  mixins: [singerMixin],
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
    RankItem
  },
  computed: {
    topList () {
      return this.rankGroup[0] ? this.rankGroup[0].toplist : []
    }
  },

  methods: {
    // 监听Recommend组件子组件rankItem和rankAnoter派发的事件select,选择了一个榜单
    selectRTop (item) {
      this.selectTopItem(item)
      this.$router.push({
        path: `/home/recommend/rank/${item.topId}`
      })
    }
  }
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
