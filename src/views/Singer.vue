<template>
  <div class="singer" ref="singer">
    <switches class="switches" :switches="switches" @switch="changeIndex" :c-index="cIndex"></switches>
    <singer-list ref="singerlist" @select="selectSinger" :singer-list="singerList" v-show="cIndex === 0"></singer-list>
    <mysinger ref="mysinger" v-show="cIndex === 1"></mysinger>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Switches from '../common/switches'
import { getSingerList } from '../api/singer'
import Singer from '../utils/singer'
import SingerList from '../components/singer/singerList'
import { singerMixin } from '../utils/mixin'
import Mysinger from '../components/singer/Mysinger'
export default {
  name: 'Singer',
  mixins: [singerMixin],
  data () {
    return {
      switches: [
        {
          name: '歌手'
        },
        {
          name: '我的歌手'
        }
      ],
      cIndex: 0,
      singerList: []
    }
  },
  components: { Mysinger, SingerList, Switches },
  watch: {
    currentSong () {
      this.changeSingerBottom()
    },
    pageCount () {
      this.changeSingerBottom()
    },
    cIndex () {
      this.$refs.singerlist.refresh()
      this.$refs.mysinger.refresh()
    }
  },
  computed: {},
  mounted () {
    this._getSingerList()
    this.changeSingerBottom()
  },
  methods: {
    changeSingerBottom () {
      if (this.currentSong !== undefined) {
        this.$refs.singer.style.bottom = `100px`
      } else {
        this.$refs.singer.style.bottom = `50px`
      }
      this.$refs.singerlist.refresh()
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/home/singer/${singer.id}`
      })
      this.setPageCount(this.pageCount + 1)
      this.setSinger(singer)
    },
    changeIndex (index) {
      this.cIndex = index
    },
    _getSingerList () {
      getSingerList().then(res => {
        // console.log(res.data.list)
        this.singerList = this.normalizeList(res.data.list)
      })
    },
    normalizeList (list) {
      let ret = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 10) {
          ret.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!ret[key]) {
          ret[key] = {
            title: key,
            items: []
          }
        }
        ret[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      let res = []
      let hot = []
      for (let key in ret) {
        let val = ret[key]
        if (val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        } else if (val.title === '热门') {
          hot.push(val)
        }
      }
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(res)
    }
  }
}

</script>
<style lang="scss" scoped>
@import "../assets/style/scss/global";
.singer {
  position: fixed;
  top: 50px;
  bottom: 50px;
  width: 100%;
  z-index: 600;
}
</style>
