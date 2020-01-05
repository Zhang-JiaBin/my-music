<template>
  <div class="home">
    <home-search></home-search>
    <home-tab></home-tab>
    <router-view></router-view>
    <player class="player"></player>
    <pop-up></pop-up>
    <create-sheet></create-sheet>
    <sheet-pop-up></sheet-pop-up>
  </div>
</template>

<script>
import HomeSearch from '../components/Home/HomeSearch'
import HomeTab from '../components/Home/HomeTab'
import player from '../components/Home/player'
import { singerMixin } from '../utils/mixin'
import PopUp from '../components/Home/popUp'
import CreateSheet from '../components/Home/createSheet'
import SheetPopUp from '../components/Home/sheetPopUp'
export default {
  name: 'home',
  mixins: [singerMixin],
  components: {
    SheetPopUp,
    CreateSheet,
    PopUp,
    HomeTab,
    HomeSearch,
    player
  }
}
</script>
<style scoped lang="scss">
  @import "../assets/style/scss/global";
</style>
