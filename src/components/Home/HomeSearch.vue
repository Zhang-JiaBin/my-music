<template>
  <div class="home-search">
    <div class="home-search-wrapper">
      <div class="input-wrapper">
        <span class="icon-search"></span>
        <input class="input-text" placeholder="歌曲" type="text">
      </div>
      <div class="icon-list-wrapper">
        <span class="icon-list"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSearch',
  data () {
    return {}
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .home-search {
    height: 50px;
    width: 100%;
    position: relative;
    box-shadow: none;
    /*box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);*/
    .home-search-wrapper {
      position: absolute;
      left: 0;
      bottom: 8px;
      height: 30px;
      width: 100%;
      display: flex;
      @include center;
      padding: 0 15px;
      box-sizing: border-box;
      .input-wrapper {
        flex: 1;
        @include left;
        height: 100%;
        border-radius: 20px;
        background: $color-bg;
        display: flex;
        padding: 0 10px;
        box-sizing: border-box;
        color: #979797;
        .icon-search {
          flex: 0 0 30px;
          width: 30px;
          height: 30px;
          @include center;
          font-size: 25px;
        }
        .input-text {
          flex: 1;
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #ccc;
          }
        }
      }
      .icon-list-wrapper {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        @include right;
        .icon-list {
          font-size: 25px;
        }
      }
    }
  }
</style>
