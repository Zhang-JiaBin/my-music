<template>
  <transition-group name="list" tag="div" class="songList">
    <div class="song-item-wrapper" ref="songItem" @click.prevent="selectSong(item, index)" v-for="(item,index) in songs" :key="item.id">
      <div class="song-item-all">
        <div class="item-img-wrapper" v-show="showPic">
          <img class="item-img" v-lazy="item.image" alt="">
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
          <div class="note-wrapper">
            <note-beat class="playing-beat" :playing="playering"></note-beat>
          </div>
        </div>
        <div class="item-playing-wrapper" v-show="showDot" @click.prevent.stop="showPop(item)">
          <span class="icon-dot icon"></span>
        </div>
        <div class="item-playing-wrapper" v-show="showDelete" @click.prevent.stop="deleteItem(item)">
          <span class="icon-delete icon"></span>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { singerMixin } from '../utils/mixin'
import NoteBeat from './NoteBeat'

export default {
  props: {
    showDelete: {
      type: Boolean,
      default: false
    },
    showDot: {
      type: Boolean,
      default: true
    },
    songs: {
      type: Array,
      default: () => []
    },
    showPic: {
      type: Boolean,
      default: true
    }
  },
  name: 'songList',
  mixins: [singerMixin],
  data () {
    return {
    }
  },
  components: { NoteBeat },

  computed: {
  },

  methods: {
    showPlaying (item) {
      if (this.currentSong && this.currentSong.id === item.id) {
        return true
      }
      return false
    },
    selectSong (item, index) {
      this.$emit('select', item, index)
    },
    // 获取歌曲的dom元素数组
    getRefsSongItem () {
      return this.$refs.songItem
    },
    showPop (item) {
      this.setSelectedSong(item)
      this.setShowPopUp(true)
      // console.log(this.selectedSong)
    },
    deleteItem (item) {
      this.$emit('delete', item)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .songList{
    width: 100%;
    height: 100%;
    /*.songList-wrapper{*/
    .song-item-wrapper{
        height: 60px;
        width: 100%;
        padding: 5px 15px;
        box-sizing: border-box;
        &.list-leave-active {
          transition: all 0.5s;
        }
        &.list-enter,
        &.list-leave-to{
          opacity: 0;
          transform: translateX(-100%)
        }
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
                line-height: 18px;
                font-size: $font-size-medium-x;
                @include ellipsis2(1);
              }
              .item-sq{
                font-size: $font-size-small;
                color: $color-icon;
                padding: 1px 2px;
                border: solid 1px $color-icon;
                border-radius: 5px;
              }
              .item-singer {
                margin-left: 4px;
                line-height: 14px;
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
            .note-wrapper{
              width: 30px;
              height: 25px;
              .playing-beat{
                width: 100%;
                height: 100%;
              }
            }
            .icon {
              font-size: 25px;
              margin-left: 10px;
            }
            .icon-dot{
            }
            .icon-delete{
              font-size: 20px;
            }
          }
        }
      }
    /*}*/
  }
</style>
