<template>
  <div class="home">
    <home-search></home-search>
    <home-tab></home-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import HomeSearch from '../components/Home/HomeSearch'
import HomeTab from '../components/Home/HomeTab'
import player from '../components/Home/player'
import { singerMixin } from '../utils/mixin'
export default {
  name: 'home',
  mixins: [singerMixin],
  components: {
    HomeTab,
    HomeSearch,
    player
  }
}
</script>
<style scoped lang="scss">
  @import "../assets/style/scss/global";
  /*.home {*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*}*/
</style>
