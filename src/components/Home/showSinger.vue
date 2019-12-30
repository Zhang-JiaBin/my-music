<template>
  <transition name="fade">
    <div class="show-singer" v-show="visible" @click="hide">
      <div class="show-singer-content" @click.stop.prevent>
        <div class="content-title">请选择要查看的歌手</div>
        <scroll ref="singerScroll" class="singer-scroll" :data="singerGroup">
          <div class="content-singers-wrapper">
            <div class="content-singers" @click="selectSinger(item)" v-for="item in singerGroup" :key="item.id">
              <div class="img-wrapper">
                <img class="singerImg" :src="item.pic" alt="">
              </div>
              <div class="name-wrapper">
                <span class="name">{{item.name}}</span>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { singerMixin } from '../../utils/mixin'
import Scroll from '../../common/scroll'

export default {
  name: 'showSinger',
  data () {
    return {
      visible: false
    }
  },
  props: {
    singerGroup: {
      type: Array,
      default: () => []
    }
  },
  components: { Scroll },
  mixins: [singerMixin],
  computed: {
  },

  methods: {
    show () {
      this.visible = true
      setTimeout(() => {
        this.$refs.singerScroll.refresh()
      })
    },
    hide () {
      this.visible = false
    },
    selectSinger (item) {
      this.$emit('select', item)
      this.visible = false
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .show-singer{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 4100;
    background: rgba(0,0,0,0.5);
    .show-singer-content{
      position: absolute;
      top: 50%;
      background: #ffffff;
      transform: translateY(-50%);
      width: 86%;
      left: 7%;
      border-radius: 10px;
      .content-title{
        height: 60px;
        padding: 10px 25px;
        box-sizing: border-box;
        @include left;
        font-size: $font-size-medium-x;
        font-weight: bold;
      }
      .singer-scroll{
        width: 100%;
        max-height: 200px;
        overflow: hidden;
        .content-singers-wrapper{
          .content-singers{
            height: 60px;
            width: 100%;
            padding: 0px 25px 20px 25px;
            box-sizing: border-box;
            display: flex;
            @include left;
            .img-wrapper{
              flex: 0 0 40px;
              width: 40px;
              height: 40px;
              .singerImg{
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            .name-wrapper{
              flex: 1;
              padding-left: 15px;
              box-sizing: border-box;
              height: 100%;
              @include left;
              .name{
                font-size: $font-size-medium;
                line-height: 16px;
                @include ellipsis;
              }
            }
          }
        }
      }
    }
  }
</style>
