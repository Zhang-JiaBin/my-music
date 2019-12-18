<template>
  <div class="rank" ref="rank">
    <scroll class="rank-scroll" :data="this.rankGroup" ref="scroll">
      <div>
        <div class="rank-list-wrapper" v-for="item in ThreerankGroup" :key="item.groupId">
          <little-title :title="item.groupName" :show-more="false"></little-title>
          <div class="rank-list" v-for="(subItem,index) in item.toplist" :key="index">
            <rank-item :rank-list="subItem" :show-another="showAnother(item.groupId)"></rank-item>
          </div>
        </div>
        <little-title title="全球榜" :show-more="false"></little-title>
        <rank-another :global-list="globalList"></rank-another>
      </div>
    </scroll>
  </div>
</template>

<script>
import LittleTitle from '../common/LittleTitle'
import RankItem from '../common/rankItem'
import { singerMixin } from '../utils/mixin'
import Scroll from '../common/scroll'
import RankAnother from '../common/rankAnother'
import Loading from '../common/loading'
export default {
  name: 'rank',
  data () {
    return {}
  },
  mixins: [singerMixin],
  components: { Loading, RankAnother, Scroll, RankItem, LittleTitle },

  computed: {
    ThreerankGroup () {
      return this.rankGroup.slice(0, 3)
    },
    globalList () {
      console.log(this.rankGroup[3].toplist)
      return this.rankGroup ? this.rankGroup[3].toplist : []
    }
  },
  watch: {
    currentSong () {
      if (this.currentSong !== undefined) {
        this.$refs.rank.style.bottom = `100px`
        this.$refs.scroll.refresh()
      }
    }
  },
  methods: {
    showAnother (id) {
      return id === 3
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .rank {
    position: fixed;
    top: 50px;
    bottom: 50px;
    width: 100%;
    .rank-scroll {
      height: 100%;
      overflow: hidden;
      .rank-list-wrapper {
        width: 100%;
        .rank-list{

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
