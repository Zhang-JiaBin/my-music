<template>
  <div class="little-title">
    <div class="title-text-wrapper">
      <span class="title-text">{{title}}</span>
    </div>
    <div class="title-more-wrapper">
      <span class="title-more">更多</span>
      <span class="icon-more"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LittleTitle',
  props: {
    title: String
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
  .little-title{
    height: 40px;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    @include space;
    .title-text-wrapper{
      height: 100%;
      color: black;
      @include center;
    }
    .title-more-wrapper {
      height: 100%;
      width: 50px;
      color: #a5a5a5;
      @include space;
      /*.title-more {*/
      /*}*/
      /*.icon-search {*/

      /*}*/
    }
  }
</style>
