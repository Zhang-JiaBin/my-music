<template>
  <div class="collectRank">
    <scroll class="ranks-scroll" ref="ranksScroll" :data="this.collectRanks">
      <div class="scroll-item">
        <div class="rank-wrapper" v-for="item in this.collectRanks" :key="item.topId">
          <rank-item @select="selectRank" :rank-top="item"></rank-item>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>

import Scroll from '../../common/scroll'
import { singerMixin } from '../../utils/mixin'
import RankItem from '../Rank/rankItem'
export default {
  name: 'collectRank',
  data () {
    return {
    }
  },
  mixins: [singerMixin],
  components: { RankItem, Scroll },

  computed: {},

  methods: {
    refresh () {
      this.$refs.ranksScroll.refresh()
    },
    selectRank (item) {
      this.selectTopItem(item)
      this.$router.push({
        path: `/home/user/rank/${item.topId}`
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .collectRank{
    height: 100%;
    width: 100%;
    .ranks-scroll{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .scroll-item{
        .rank-wrapper{

        }
      }
    }
  }
</style>
