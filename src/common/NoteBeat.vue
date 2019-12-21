<template>
  <div class="NoteBeat">
    <div class="spectrum spectrum1" :class="noteBeatClass"></div>
    <div class="spectrum spectrum2" :class="noteBeatClass"></div>
    <div class="spectrum spectrum3" :class="noteBeatClass"></div>
    <div class="spectrum spectrum4" :class="noteBeatClass"></div>
    <div class="spectrum spectrum5" :class="noteBeatClass"></div>
    <div class="spectrum spectrum6" :class="noteBeatClass"></div>
  </div>
</template>

<script>
export default {
  props: {
    playing: {
      type: Boolean,
      default: false
    }
  },
  name: 'NoteBeat',
  data () {
    return {
    }
  },
  watch: {
  },
  components: {},

  computed: {
    noteBeatClass () {
      return this.playing ? 'play' : 'play pause'
    }
  },

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
      border-radius: 10px 10px 0 0;
      transform-origin: bottom;
      animation: dancing 1s ease-in-out infinite;
      background: $color-icon;
      &.play {
        animation: dancing 1s ease-in-out infinite;
      }
      &.pause {
        animation-play-state: paused;
      }
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
