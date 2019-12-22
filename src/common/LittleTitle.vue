<template>
  <div class="little-title">
    <div class="title-text-wrapper">
      <span class="title-text">{{title}}</span>
    </div>
    <div class="title-more-wrapper" @click="displayMore">
      <span class="title-more" v-if="showMore">更多</span>
      <span class="icon-more" v-if="showMore"></span>
      <span class="icon-deleteAll" v-if="showIcon"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LittleTitle',
  props: {
    title: String,
    showMore: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    displayMore () {
      this.$emit('displayMore')
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .little-title{
    height: 45px;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    @include space;
    .title-text-wrapper{
      height: 100%;
      font-size: $font-size-medium-x;
      color: #1a1a1a;
      font-weight: bold;
      @include center;
    }
    .title-more-wrapper {
      height: 100%;
      width: 40px;
      color: #3c3c3c;
      font-size: $font-size-small;
      @include space;
      .icon-deleteAll{
        font-size: 25px;
        margin-left: 15px;
      }
      .title-more {
      }
      .icon-search {
      }
    }
  }
</style>
