<template>
  <div class="rank-item">
    <div class="rank-item-wrapper">
      <div class="rank-img-wrapper">
        <img class="rank-img" v-lazy="rankList.frontPicUrl" alt="">
      </div>
      <div class="rank-song-wrapper">
        <div class="rank-song-item" v-for="subItem in rankList.song" :key="subItem.id">
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
export default {
  name: 'rankItem',
  props: {
    rankList: Object,
  },
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
        .rank-img{
          border-radius: 10px;
          width: 100%;
        }
      }
      .rank-song-wrapper{
        flex: 0 0 65%;
        height: 100%;
        width: 65%;
        padding: 5px 0 10px 15px;
        box-sizing: border-box;
        @include columnLeft;
        .rank-song-item{
          height: 33.33%;
          width: 100%;
          @include top;
          .rank-index{
            flex: 0 0 20px;
            width: 20px;
            height: 100%;
            font-size: $font-size-small;
          }
          .rank-song{
            flex: 1;
            @include columnTopLeft;
            .song-name{
              font-size: $font-size-small;
              @include ellipsis2(1)
            }
            .song-singer{
              margin-top: 5px;
              color: #9c9c9c;
              font-size: $font-size-small-s;
              @include ellipsis2(1)
            }
          }
        }
      }
    }
    .rank-another-wrapper{
      padding-left: 15px;
      box-sizing: border-box;
      display: flex;
      height: 160px;
      .rank-another-img-wrapper{
        flex: 0 0 50%;
        width: 50%;
        .rank-another-img{
          border-radius: 10px;
          width: 100%;
        }
      }
    }
  }
</style>
