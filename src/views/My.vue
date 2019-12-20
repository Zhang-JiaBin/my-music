<template>
  <div class="My">
    <div class="slider-wrapper" v-if="this.playList.length > 0">
      <slider>
        <div v-for="item in this.playList" :key="item.id">
          <img class="imgC" :src="item.image" alt="">
        </div>
      </slider>
    </div>
    <note-beat class="notebeat"></note-beat>
  </div>
</template>

<script>
import Slider from '../common/slider'
import { singerMixin } from '../utils/mixin'
import NoteBeat from '../common/NoteBeat'
export default {
  name: 'My',
  data () {
    return {}
  },
  mixins: [singerMixin],
  components: { NoteBeat, Slider },

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
    .notebeat{
      width: 40px;
      height: 40px;
    }
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
