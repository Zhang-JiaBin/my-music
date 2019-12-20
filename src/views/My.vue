<template>
  <div class="My">
    <div class="slider-wrapper" v-if="this.playList.length > 0">
      <slider>
        <div v-for="item in this.playList" :key="item.id">
          <img class="imgC" :src="item.image" alt="">
        </div>
      </slider>
    </div>
  </div>
</template>

<script>
import Slider from '../common/slider'
import { singerMixin } from '../utils/mixin'
export default {
  name: 'My',
  data () {
    return {}
  },
  mixins: [singerMixin],
  components: { Slider },

  computed: {},

  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .My {
    position: fixed;
    top: 50px;
    bottom: 50px;
    width: 100%;
    .slider-wrapper{
      position: relative;
      height: 150px;
      width: 100%;
      overflow: hidden;
      .imgC{
        width: 100%;
        height: 100%;
      }
    }
    .imgC{

    }
  }
</style>
