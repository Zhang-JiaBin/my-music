<template>
  <div class="collectSheet">
    <scroll class="sheets-scroll" ref="sheetsScroll" :data="this.collectSheets">
      <song-sheet @select="selectSheet" :sheet-list="this.collectSheets"></song-sheet>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../common/scroll'
import SongSheet from '../sheet/songSheet'
import { singerMixin } from '../../utils/mixin'
export default {
  name: 'collectSheet',
  mixins: [singerMixin],
  data () {
    return {
    }
  },
  components: { SongSheet, Scroll },

  computed: {
  },

  methods: {
    refresh () {
      this.$refs.sheetsScroll.refresh()
    },
    selectSheet (sheet) {
      let index = 1
      this.selectSheetItem(sheet)
      this.$router.push({
        path: `/home/user/sheet/${sheet.content_id}`
      })
      this.$emit('select', index)
    }
  }
}

</script>
<style lang="scss" scoped>
  .collectSheet{
    height: 100%;
    width: 100%;
    .sheets-scroll{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .sheet-wrapper{
        width: 100%;
      }
    }
  }
</style>
