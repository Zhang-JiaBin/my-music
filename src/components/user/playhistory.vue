<template>
  <div class="play-history">
    <Mylike @define="deletemyAllHistory" :songs="this.historyList" @deleteOne="deletemyHistory" :title="title" :text="text"/>
  </div>
</template>

<script>
import Mylike from './Mylike'
import { singerMixin } from '../../utils/mixin'
export default {
  name: 'playhistory',
  data () {
    return {
      title: '播放历史',
      text: '清空所有播放历史?'
    }
  },
  mixins: [singerMixin],
  components: { Mylike },

  computed: {},

  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .play-history{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
</style>
