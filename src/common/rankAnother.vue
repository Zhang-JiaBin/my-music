<template>
  <div class="rank-another-wrapper">
    <div class="rank-another-img-wrapper" v-for="item in globalList" :key="item.listenNum">
      <img class="rank-another-img" v-lazy="item.frontPicUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'rankAnother',
  props: {
    globalList: {
      type: Array,
      default: () => []
    }
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
  .rank-another-wrapper{
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    .rank-another-img-wrapper{
      flex: 0 0 50%;
      width: 50%;
      box-sizing: border-box;
      &:nth-child(odd) {
        padding:0 5px 5px 0;
      }
      &:nth-child(even) {
        padding:0 0 5px 5px;
      }
      .rank-another-img{
        border-radius: 12px;
        width: 100%;
      }
    }
  }
</style>

