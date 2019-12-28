<template>
  <div class="singer-item">
    <div class="singer-img">
      <img class="circleImg" v-lazy="mysinger.pic" alt="">
    </div>
    <div class="singer-detail">
      <div class="singer-name">
        <span class="name">{{mysinger.name}}</span>
      </div>
      <div class="singer-attention" :class="{'current': InSingers}" @click.prevent.stop="addToSingers">
        {{attentionText}}
      </div>
    </div>
  </div>
</template>

<script>
import { singerMixin } from '../utils/mixin'

export default {
  name: 'singerItem',
  props: {
    mysinger: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [singerMixin],
  data () {
    return {
    }
  },
  components: {},

  computed: {
    InSingers () {
      const index = this._findIndex(this.collectSingers, this.mysinger)
      return index > -1
    },
    // attentionText () {
    //   return this.InSingers ? '已关注' : '关注'
    // }
  },

  methods: {
    addToSingers () {
      if (this.InSingers) {
        this.deletemySingers(this.mysinger)
      } else {
        this.savemySingers(this.mysinger)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .singer-item{
    width: 100%;
    height: 100%;
    display: flex;
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
      @include justcenter;
      .singer-name {
        flex: 1;
        @include justcenter;
        .name {
          @include ellipsis2(1);
        }
      }
      .singer-attention {
        flex: 0 0 65px;
        width: 65px;
        color: #f5315a;
        height: 25px;
        border-radius: 12px;
        background: #f2f2f2;
        @include center;
        &.current {
          opacity: 0.5;
        }
      }
    }
  }
</style>
