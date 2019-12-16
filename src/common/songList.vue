<template>
  <div class="songList">
    <div class="songList-wrapper" v-for="item in songs" :key="item.id">
      <div class="song-item-wrapper">
        <div class="song-item-all">
          <div class="song-item">
            <div class="item-name-wrapper">
              <span class="item-name">{{item.name}}</span>
            </div>
            <div class="item-name-wrapper">
              <span class="item-sq">SQ</span>
              <span class="item-singer">{{item.singer}}  ----  {{item.album}}</span>
            </div>
          </div>
          <div class="item-playing-wrapper">
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
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  name: 'songList',
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {}
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
          border-bottom: 1px solid #f0f0f0;
          .song-item {
            height: 100%;
            flex: 1;
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
