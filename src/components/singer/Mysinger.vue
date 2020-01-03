<template>
  <div class="my-singer">
    <div class="Tab">
      <div class="icon-wrapper">
        <span class="icon-singer"></span>
      </div>
      <div class="Tab-text">
        <span class="text">{{tabText}}</span>
        <span class="num">{{tabnum}}</span>
      </div>
      <div class="icon-wrapper" @click="showConfrim">
        <span class="icon-deleteAll"></span>
      </div>
    </div>
    <scroll class="singers-scroll" ref="singersScroll" :data="this.collectSingers">
      <div class="scroll-item">
        <div class="singerItem" @click="selectSinger(item)" v-for="item in this.collectSingers" :key="item.id">
          <singer-item :mysinger="item"></singer-item>
        </div>
      </div>
      <confirm ref="confirm" @confirm="deleteAll" text='确定取消关注所有歌手?'></confirm>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../common/scroll'
import SingerItem from '../../common/singerItem'
import { singerMixin } from '../../utils/mixin'
import Confirm from '../../common/confirm'
export default {
  name: 'Mysinger',
  data () {
    return {
      tabText: '歌手'
    }
  },
  mixins: [singerMixin],
  components: { Confirm, SingerItem, Scroll },

  computed: {
    tabnum () {
      return `(共${this.collectSingers.length}位)`
    }
  },

  methods: {
    showConfrim () {
      this.$refs.confirm.show()
    },
    deleteAll () {
      this.deletemyAllSingers()
    },
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
        path: `/home/singer/${item.id}`
      })
      this.setSinger(item)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .my-singer{
    position: absolute;
    /*height: 100%;*/
    top: 40px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .Tab{
      width: 100%;
      height: 30px;
      background: $color-bg-bottom;
      @include justcenter;
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      .Tab-text{
        flex: 1;
        font-size: $font-size-medium;
        line-height: 16px;
        margin-left: 5px;
        .text {
          font-weight: bold;
        }
        .num{
          color: #9c9c9c;
          margin-left: 5px;
        }

      }
      .icon-wrapper{
        flex: 0 0 25px;
        height: 100%;
        font-size: 20px;
        @include center;
        .icon{
          color: $color-icon;
        }
      }
    }
    .singers-scroll{
      width: 100%;
      position: absolute;
      top: 30px;
      bottom: 0;
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
