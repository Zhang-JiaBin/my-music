<template>
  <div class="search-history" v-show="this.searchHistory.length">
    <span @click="selectquery(item)" class="item" v-for="(item,index) in searchHistory" :key="index">{{item}}</span>
  </div>
</template>

<script>
import { singerMixin } from '../../utils/mixin'

export default {
  name: 'searchHistory',
  data () {
    return {
    }
  },
  mixins: [singerMixin],
  components: {},

  computed: {},

  methods: {
    selectquery (item) {
      this.$emit('select', item)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .search-history{
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    .item{
      padding: 7px 10px;
      font-size: $font-size-small;
      line-height: 14px;
      background: #f3f3f3;
      border-radius: 15px;
      margin-right: 8px;
      margin-bottom: 8px;
      @include ellipsis;
    }
  }
</style>
