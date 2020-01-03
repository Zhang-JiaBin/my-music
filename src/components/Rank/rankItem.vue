<template>
  <div class="rank-item">
    <div class="rank-item-wrapper" @click="selectItem(rankTop)">
      <div class="rank-img-wrapper">
        <img class="rank-img" v-lazy="rankTop.frontPicUrl" alt="">
        <div class="play-wrapper" @click.prevent.stop="clickRankPlay(rankTop)">
          <span :class="getRankIcon(rankTop)"></span>
        </div>
      </div>
      <div class="rank-song-wrapper">
        <div class="rank-song-item" v-for="subItem in rankTop.song" :key="subItem.id">
          <div class="rank-index">{{subItem.rank}}</div>
          <div class="rank-song">
            <span class="song-name">{{subItem.title}}</span>
            <span class="song-singer">{{subItem.singerName}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'

export default {
  name: 'rankItem',
  props: {
    rankTop: Object
  },
  data () {
    return {
    }
  },
  mixins: [singerMixin],
  components: {},

  computed: {},

  methods: {
    selectItem (rankTop) {
      this.$emit('select', rankTop)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .rank-item{
    width: 100%;
    .rank-item-wrapper {
      padding-left: 15px;
      box-sizing: border-box;
      display: flex;
      height: 135px;
      .rank-img-wrapper{
        flex: 0 0 35%;
        width: 35%;
        position: relative;
        .rank-img{
          border-radius: 10px;
          width: 100%;
        }
        .play-wrapper {
          position: absolute;
          width: 22px;
          height: 22px;
          right: 2px;
          bottom: 12px;
          font-size: 16px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          @include center;
          color: #f0f0f0;
          .icon-play{
          }
        }
      }
      .rank-song-wrapper{
        flex: 0 0 65%;
        height: 100%;
        width: 65%;
        padding-top: 5px;
        padding-left: 15px;
        /*padding: 5px 0 5px 15px;*/
        box-sizing: border-box;
        @include columnLeft;
        .rank-song-item{
          height: 33.33%;
          width: 100%;
          @include top;
          .rank-index{
            margin-top: 3px;
            flex: 0 0 20px;
            width: 20px;
            height: 100%;
            font-size: $font-size-small;
          }
          .rank-song{
            flex: 1;
            height: 100%;
            @include columnTopLeft;
            .song-name{
              line-height: 16px;
              font-size: $font-size-medium;
              @include ellipsis2(1);
            }
            .song-singer{
              margin-top: 5px;
              color: #9c9c9c;
              line-height: 14px;
              font-size: $font-size-small;
              @include ellipsis;
            }
          }
        }
      }
    }
  }
</style>
