<template>
  <div class="NoteBeat">
    <div class="spectrum spectrum1"></div>
    <div class="spectrum spectrum2"></div>
    <div class="spectrum spectrum3"></div>
    <div class="spectrum spectrum4"></div>
    <div class="spectrum spectrum5"></div>
    <div class="spectrum spectrum6"></div>
  </div>
</template>

<script>
export default {
  name: 'NoteBeat',
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
  .NoteBeat{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    .spectrum {
      flex: 0 0 9%;
      height: 80%;
      background: transparent;
      display: inline-block;
      border-radius: 6px 6px 0 0;
      transform-origin: bottom;
      animation: dancing 1s ease-in-out infinite;
      background: $color-icon;
      &.spectrum1 {
        animation-delay: 0.4s;
      }
      &.spectrum2 {
        animation-delay: 0.2s;
      }
      &.spectrum3 {
        animation-delay: 0.5s;
      }
      &.spectrum4 {
        animation-delay: 0.8s;
      }

      &.spectrum5 {
        animation-delay: 0.1s;
      }
      &.spectrum6 {
        animation-delay: 0.9s;
      }
    }
  }
  @keyframes dancing {
    0% {
      transform: scaleY(0.1);
    }

    50% {
      transform: scaleY(1);
    }

    100% {
      transform: scaleY(0.1);
    }
  }
</style>
