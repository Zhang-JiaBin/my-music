<template>
  <div class="home">
    <home-search></home-search>
    <home-tab></home-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import HomeSearch from '../components/Home/HomeSearch'
import HomeTab from '../components/Home/HomeTab'
export default {
  name: 'home',
  components: {
    HomeTab,
    HomeSearch
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
