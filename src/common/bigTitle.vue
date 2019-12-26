<template>
  <div class="bigTitle">
    <div class="user-title">
      <div class="icon-back-wrapper">
        <span class="icon-back" @click.stop.prevent="back"></span>
      </div>
      <div class="title-wrapper">
        <span class="title-text">{{title}}</span>
      </div>
      <div class="delete-wrapper" v-show="showDelete">
        <span class="delete-text">{{deleteText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bigTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    deleteText: {
      type: String,
      default: '清空'
    },
    showDelete: {
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
    back () {
      this.$emit('back')
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .bigTitle{
    width: 100%;
    height: 50px;
    position: relative;
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    .user-title{
      position: absolute;
      left: 0;
      bottom: 8px;
      height: 30px;
      width: 100%;
      padding: 0 15px;
      display: flex;
      .icon-back-wrapper{
        flex: 0 0 30px;
        width: 30px;
        @include left;
        .icon-back {
          font-size: 25px;
        }
      }
      .title-wrapper{
        flex: 1;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        @include left;
        .title-text{
          font-size: $font-size-large-x;
          font-weight: bold;
        }
      }
      .delete-wrapper{
        flex:0 0 65px;
        width: 65px;
        height: 100%;
        @include left;
        .delete-text{
          font-size: $font-size-large;
        }
      }
    }
  }
</style>
