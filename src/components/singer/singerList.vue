<template>
  <div class="singerList">
    <scroll class="singerList-scroll">
      <div>
        <div class="singerList-wrapper" v-for="(item,index) in singerList" :key="index">
        <div class="singerList-title">
          <span class="title">{{item.title}}</span>
        </div>
        <div class="singerItem" v-for="subItem in item.items" :key="subItem.id">
          <div class="singer-img">
            <img class="circleImg" v-lazy="subItem.pic" alt="">
          </div>
          <div class="singer-detail">
            <div class="singer-name">
              <span class="name">{{subItem.name}}</span>
            </div>
            <div class="singer-attention">
              <span class="attention">关注</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../common/scroll'
export default {
  props: {
    singerList: {
      type: Array,
      default: () => []
    }
  },
  name: 'singerList',
  data () {
    return {
    }
  },

  components: { Scroll },

  computed: {},

  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .singerList {
    position: absolute;
    top: 40px;
    bottom: 0px;
    width: 100%;
    .singerList-scroll{
      height: 100%;
      overflow: hidden;
      .singerList-wrapper {
        display: flex;
        flex-direction: column;
        .singerList-title {
          width: 100%;
          height: 30px;
          background: $color-bg-bottom;
          @include justcenter;
          .title{
            margin-left: 15px;
            font-size: $font-size-medium;
          }
        }
        .singerItem {
          width: 100%;
          height: 70px;
          display: flex;
          padding: 10px 40px 10px 15px;
          box-sizing: border-box;
          .singer-img{
            flex: 0 0 50px;
            width: 50px;
            .circleImg {
              width: 100%;
              border-radius: 50%;
            }
          }
          .singer-detail {
            flex: 1;
            display: flex;
            font-size: $font-size-medium;
            margin-left: 20px;
            border-bottom: 1px solid #e8e8e8;
            .singer-name {
              flex: 1;
              @include justcenter;
              .name {
              }
            }
            .singer-attention {
              flex: 0 0 80px;
              width: 60px;
              @include center;
              .attention{
                color: #f5315a;
                padding: 5px 18px;
                border-radius: 12px;
                background: #f2f2f2;
              }
            }
          }
        }
      }
    }
  }
</style>
