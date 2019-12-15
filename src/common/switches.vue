<template>
  <ul class="switches">
    <li class="switch-item" @click="switchItem(index)" v-for="(item,index) in switches"  :key="index">
      <span class="item-name" :class="{'active': cIndex === index}">{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'switches',
  props: {
    switches: {
      type: Array,
      default: () => []
    },
    cIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    switchItem (index) {
      this.$emit('switch', index)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../assets/style/scss/global";
  .switches{
    z-index: 1000;
    @include justcenter;
    width: 180px;
    margin: 0 auto;
    height: 40px;
    .switch-item{
      flex: 1;
      z-index: 1000;
      padding: 8px;
      text-align: center;
      font-size: $font-size-medium;
      color: black;
      .item-name{
        padding-bottom: 5px;
        &.active {
          color: $color-icon;
          border-bottom: red 2px solid;
        }
      }
    }
  }
</style>
