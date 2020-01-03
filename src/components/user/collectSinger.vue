<template>
  <div class="collectSinger">
    <scroll class="singers-scroll" ref="singersScroll" :data="this.collectSingers">
      <div class="scroll-item">
        <div class="singerItem" @click="selectSinger(item)" v-for="item in this.collectSingers" :key="item.id">
          <singer-item :mysinger="item"></singer-item>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import SingerItem from '../../common/singerItem'
import { singerMixin } from '../../utils/mixin'
import Scroll from '../../common/scroll'
export default {
  name: 'collectSinger',
  data () {
    return {
    }
  },
  mixins: [singerMixin],
  components: { Scroll, SingerItem },
  computed: {},

  methods: {
    refresh () {
      this.$refs.singersScroll.refresh()
    },
    selectSinger (item) {
      if (!item.id) {
        return
      }
      this.setFullScreen(false)
      // 二级路由不是singer,跳转到指定的二级路由的子路由
      this.setPageCount(this.pageCount + 1)
      this.$router.push({
        path: `/home/user/singer/${item.id}`
      })
      this.setSinger(item)
    }
  }
}

</script>
<style lang="scss" scoped>
  .collectSinger{
    height: 100%;
    width: 100%;
    .singers-scroll{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .scroll-item{
        .singerItem{
          width: 100%;
          height: 70px;
          display: flex;
          padding: 10px 15px 10px 15px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
