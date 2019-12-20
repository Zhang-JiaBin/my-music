<template>
  <div class="songList">
    <div ref="songItem" class="songList-wrapper" @click.prevent="seleteSong(item, index)" v-for="(item,index) in songs" :key="item.id">
      <div class="song-item-wrapper">
        <div class="song-item-all">
          <div class="item-img-wrapper">
            <img class="item-img" :src="item.image" alt="">
          </div>
          <div class="song-item">
            <div class="item-name-wrapper">
              <span class="item-name">{{item.name}}</span>
            </div>
            <div class="item-name-wrapper">
              <span class="item-sq">SQ</span>
              <span class="item-singer">{{item.singer}} - {{item.album}}</span>
            </div>
          </div>
          <div class="item-playing-wrapper" v-show="showPlaying(item)">
            <span class="icon-playing"></span>
          </div>
          <div class="item-playing-wrapper">
            <span class="icon-dot"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { singerMixin } from '../utils/mixin'

export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  name: 'songList',
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
    showPlaying (item) {
      if (this.currentSong && this.currentSong.id === item.id) {
        return true
      }
      return false
    },
    seleteSong (item, index) {
      this.$emit('selete', item, index)
    },
    getRefsSongItem () {
      return this.$refs.songItem
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .songList{
    width: 100%;
    height: 100%;
    .songList-wrapper{
      .song-item-wrapper{
        height: 60px;
        width: 100%;
        padding: 5px 15px;
        box-sizing: border-box;
        .song-item-all{
          height: 100%;
          display: flex;
          @include center;
          box-sizing: border-box;
          border-bottom: 1px solid #f0f0f0;
          .item-img-wrapper {
            height: 100%;
            flex: 0 0 50px;
            width: 50px;
            @include center;
            .item-img {
              width: 40px;
              height: 40px;
              border-radius: 5px;
            }
          }
          .song-item {
            height: 100%;
            flex: 1;
            padding-left: 5px;
            box-sizing: border-box;
            .item-name-wrapper{
              width: 100%;
              height: 50%;
              @include justcenter;
              .item-name{
                font-size: $font-size-medium-x;
                @include ellipsis2(1);
              }
              .item-sq{
                font-size: $font-size-small;
                color: $color-icon;
                padding: 1px 3px;
                border: solid 1px $color-icon;
                border-radius: 5px;
              }
              .item-singer {
                margin-left: 4px;
                font-size: $font-size-small;
                @include ellipsis2(1);
                color: #828282;
              }
            }
          }
          .item-playing-wrapper {
            height: 100%;
            flex: 0 0 30px;
            width: 30px;
            @include center;
            margin-right: 10px;
            .icon-playing{
              font-size: 25px;
              color: $color-icon;
            }
            .icon-dot{
              font-size: 25px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
</style>
