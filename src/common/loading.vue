<template>
  <div class="loading">
    <img src="../assets/image/loading3.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '努力加载中...'
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../assets/style/scss/global";

  .loading {
    width: 100%;
    text-align: center;
    img {
      width: 40px;
      height: 40px;
    }
    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
</style>
