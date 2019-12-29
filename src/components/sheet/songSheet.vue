<template>
  <div class="song-sheet-wrapper">
    <div class="song-sheet" v-for="item in sheetList" :key="item.content_id">
      <div class="song-item" @click="selectItem(item)">
        <div class="song-img-wrapper">
          <img class="song-img" v-lazy="item.cover">
          <div class="play-wrapper" @click.prevent.stop="clickplay(item)">
            <span :class="getSheetIcon(item)"></span>
          </div>
        </div>
        <div class="song-text-wrapper">
          <span class="song-text">{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'

export default {
  name: 'songSheet',
  props: {
    sheetList: {
      type: Array,
      default: () => []
    }
  },
  mixins: [singerMixin],
  data () {
    return {
    }
  },
  mounted () {
  },
  components: {},

  computed: {
  },

  methods: {
    selectItem (item) {
      this.$emit('select', item)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .song-sheet-wrapper {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    .song-sheet {
      flex: 0 0 33.33%;
      width: 33.33%;
      box-sizing: border-box;
      &:nth-child(3n+1) {
        padding: 0 5px 15px 15px;
      }
      &:nth-child(3n+2) {
        padding: 0 10px 15px 10px;
      }
      &:nth-child(3n+3) {
        padding: 0 15px 15px 5px;
      }
      .song-item {
        @include columnCenter;
        .song-img-wrapper {
          width: 100%;
          position: relative;
          .song-img {
            width: 100%;
            border-radius: 10px;
          }
          .play-wrapper {
            position: absolute;
            width: 22px;
            height: 22px;
            right: 2px;
            bottom: 8px;
            font-size: 16px;
            background: rgba(0,0,0,0.2);
            border-radius: 50%;
            @include center;
            color: #f0f0f0;
            .icon-play{
            }
          }
        }
        .song-text-wrapper {
          width: 100%;
          font-size: $font-size-small;
          line-height: 16px;
          .song-text {
            @include ellipsis2(2);
          }
        }
      }
    }
  }
</style>
