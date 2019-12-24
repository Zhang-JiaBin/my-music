<!--  -->
<template>
  <div class="hometab">
    <router-link tag="div" class="tab-wrapper" to="/home/recommend">
      <span class="icon icon-recommend"></span>
      <span class="tab-text">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-wrapper" to="/home/rank">
      <span class="icon icon-rank"></span>
      <span class="tab-text">排行</span>
    </router-link>
    <router-link tag="div" class="tab-wrapper" to="/home/singer">
      <span class="icon icon-singer"></span>
      <span class="tab-text">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-wrapper" to="/home/sheet">
      <span class="icon icon-sheet"></span>
      <span class="tab-text">歌单</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeTab',
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
  @import "../../assets/style/scss/global";
  .hometab {
    z-index: 500;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 50px;
    background: $color-bg-bottom;
    font-size: $font-size-small;
    .tab-wrapper {
      flex: 1;
      @include columnCenter;
      .icon {
        font-size: 20px;
      }
      .tab-text {
        margin-top: 7px;
      }
      &.router-link-active {
        color:$color-icon;
        .icon{
          color: $color-icon;
        }
      }
    }
  }
</style>
