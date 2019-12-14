<template>
  <div class="song-item">
    <div class="song-img-wrapper">
      <img class="song-img" :src="ImgUrl">
    </div>
    <div class="song-text-wrapper">
      <span class="song-text">{{songText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongItem',
  props: {
    ImgUrl: String,
    songText: String
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
  .song-item {
    @include columnCenter;
    .song-img-wrapper {
      width: 100%;
      .song-img {
        width: 100%;
        border-radius: 10px;
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
</style>
