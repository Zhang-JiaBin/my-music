<!--  -->
<template>

    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" />
    </svg>
<!--    <slot></slot>-->
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dashArray: Math.PI * 100
    }
  },

  components: {},

  computed: {
    dashOffset () {
      return (1 - this.percent) * this.dashArray
    }
  },

  methods: {}
}

</script>
<style lang="scss" scoped>
@import "../assets/style/scss/global";
/*.progress-circle {*/
  circle {
    stroke-width: 8px;
    transform-origin: center;
    z-index: 1800;
    &.progress-background {
      transform: scale(0.9);
      stroke: transparent;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-icon;
    }
  }
/*}*/
</style>
