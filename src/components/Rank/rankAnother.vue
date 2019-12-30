<template>
  <div class="rank-another-wrapper">
    <div class="rank-another-img-wrapper" @click="selectItem(item)" v-for="item in globalList" :key="item.listenNum">
      <img class="rank-another-img" v-lazy="item.frontPicUrl" alt="">
      <div class="play-wrapper" @click.prevent.stop="clickRankPlay(item)">
        <span :class="getRankIcon(item)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'

export default {
  name: 'rankAnother',
  props: {
    globalList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  mixins: [singerMixin],
  components: {},

  computed: {},

  methods: {
    selectItem (item) {
      this.$emit('select', item)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .rank-another-wrapper{
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    .rank-another-img-wrapper{
      flex: 0 0 50%;
      width: 50%;
      box-sizing: border-box;
      position: relative;
      &:nth-child(odd) {
        padding:0 5px 5px 0;
      }
      &:nth-child(even) {
        padding:0 0 5px 5px;
      }
      .rank-another-img{
        border-radius: 12px;
        width: 100%;
      }
      .play-wrapper {
        position: absolute;
        width: 22px;
        height: 22px;
        right: 8px;
        bottom: 18px;
        font-size: 16px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        @include center;
        color: #f0f0f0;
        .icon-play{
        }
      }
    }
  }
</style>
