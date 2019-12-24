<template>
    <div class="popUp" v-show="showPopUp">
      <transition name="fade">
        <div class="popUp-bg" @click.stop.prevent="hide"></div>
      </transition>
      <transition name="popup-slide-up">
        <div v-show="visible" class="popUp-content" @click.stop>
        <div class="content-top">
          <div class="img-wrapper">
            <img class="top-img" :src="ImgUrl" alt="">
          </div>
          <div class="text-wrapper">
            <div class="song-text">歌曲: {{SongName}}</div>
            <div class="singer-text">{{SongSinger}}</div>
          </div>
        </div>
        <div class="content-item" @click="seleteIndex(index, item)" v-for="(item, index) in showTextList" :key="index">
          <div class="icon-wrapper">
            <span :class="item.icon" class="icon"></span>
          </div>
          <div class="text-wrapper">
            <span class="iconText">{{item.text}}</span>
          </div>
        </div>
        <div class="content-bottom" @click="hide">取消</div>
      </div>
      </transition>
    </div>
</template>

<script>
  import { playerMixin, singerMixin } from '../../utils/mixin'

export default {
  name: 'popUp',
  mixins: [singerMixin, playerMixin],
  data () {
    return {
      visible: false,
      textList: [{
        icon: 'icon-nextSong',
        text: '下一首播放'
      }, {
        icon: 'icon-add',
        text: '添加到收藏'
      }, {
        icon: 'icon-singer',
        text: ``
      }, {
        icon: 'icon-moveOut',
        text: '从收藏中删除'
      }]
    }
  },
  watch: {
    showPopUp (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.visible = true
        })
      }
    }
  },
  components: {},
  mounted () {
  },
  computed: {
    showTextList () {
      this.textList[2].text = `歌手: ${this.SongSinger}`
      if (this.InFavorite) {
        return this.textList
      }
      return this.textList.slice(0, 3)
    },
    InFavorite () {
      const index = this._findIndex(this.favoriteList, this.selectedSong)
      return index > -1
    },
    ImgUrl () {
      return this.selectedSong ? this.selectedSong.image : ''
    },
    SongName () {
      return this.selectedSong ? this.selectedSong.name : ''
    },
    SongSinger () {
      return this.selectedSong ? this.selectedSong.singer : ''
    }
  },

  methods: {
    seleteIndex (index) {
      switch (index) {
        case 0:
          this.insertSong(this.selectedSong, true)
          break
        case 1:
          this.savemyFavorite(this.selectedSong)
          break
        case 2:
          this.goToSingerDetail(this.selectedSong)
          break
        case 3:
          this.deletemyFavorite(this.selectedSong)
          break
      }
      this.hide()
    },
    hide () {
      this.visible = false
      setTimeout(() => {
        this.setShowPopUp(false)
      }, 200)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .popUp {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 4000;
    background: rgba(0,0,0,0.1);
    .popUp-bg{
      width: 100%;
      height: 100%;
      z-index: 4000;
    }
    .popUp-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 4000;
      border-radius: 12px 12px 0 0;
      background: #ffffff;
      .content-top {
        width: 100%;
        height: 80px;
        padding: 15px 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #f6f6f6;
        display: flex;
        .img-wrapper{
          flex: 0 0 50px;
          width: 50px;
          height: 50px;
          .top-img{
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .text-wrapper{
          flex: 1;
          display: flex;
          flex-direction: column;
          .song-text{
            flex: 1;
            width: 100%;
            @include left;
            font-size: $font-size-medium;
            margin-left: 15px;
          }
          .singer-text{
            flex: 0 0 20px;
            height: 20px;
            font-size: $font-size-small;
            margin-left: 15px;
            color: #aeaeae;
            @include left;
          }
        }
      }
      .content-item{
        width: 100%;
        height: 50px;
        padding: 5px 15px;
        box-sizing: border-box;
        display: flex;
        .icon-wrapper {
          flex: 0 0 30px;
          width: 30px;
          @include center;
          .icon{
            font-size: 25px;
          }
        }
        .text-wrapper{
          flex: 1;
          @include left;
          margin-left: 13px;
          border-bottom: 1px solid #f6f6f6;
          .iconText {
            line-height: 16px;
            font-size: $font-size-medium;
          }
        }
      }
      .content-bottom {
        width: 100%;
        height: 60px;
        @include center;
        color: $color-icon;
        font-size: $font-size-large;
        font-weight: bold;
      }
    }
  }
</style>
