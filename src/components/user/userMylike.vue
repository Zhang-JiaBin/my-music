<template>
  <div class="user-mylike">
    <Mylike @define="deletemyAllFavorite" @deleteOne="deletemyFavorite" :songs="this.favoriteList" :title="title" :text="text"/>
  </div>
</template>

<script>
import Mylike from './Mylike'
import { singerMixin } from '../../utils/mixin'
export default {
  name: 'playhistory',
  data () {
    return {
      title: '我的喜欢',
      text: '清空所有我喜欢的歌曲?'
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
  .user-mylike{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
</style>
