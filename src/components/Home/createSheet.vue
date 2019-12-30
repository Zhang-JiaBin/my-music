<template>
  <transition name="fade">
    <div class="create-sheet" v-show="showCreate" @click="hide">
      <div class="sheet-wrapper" @click.stop>
        <div class="sheet-new">
          <span class="new-text">新建歌单</span>
        </div>
        <div class="input-wrapper">
          <input v-model="title" ref="input" placeholder="请输入歌单标题" class="input-title" type="text">
        </div>
        <div class="btn-wrapper">
          <div class="btn-cancel" @click="hide">取消</div>
          <div class="btn-submit" @click="clickSubmit(false)" :class="{'showOpacity': !title}">提交</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Sheet from '../../utils/sheet'
import { singerMixin } from '../../utils/mixin'
import { saveUserSheet } from '../../utils/localStorage'

export default {
  name: 'createSheet',
  data () {
    return {
      showCreate: false,
      title: ''
    }
  },
  props: {
    add: {
      type: Boolean,
      default: false
    }
  },
  components: {},

  computed: {},
  mixins: [singerMixin],
  methods: {
    blur () {
      this.$refs.input.blur()
    },
    focus () {
      this.$refs.input.focus()
    },
    show () {
      this.showCreate = true
      setTimeout(() => {
        this.focus()
      }, 200)
    },
    hide () {
      this.showCreate = false
    },
    clickSubmit (add) {
      if (!this.title) {
        return
      } else {
        let mySheet = new Sheet({
          id: this.userSheet.length,
          title: this.title,
          sheetList: []
        })
        if (add) {
          this.addToSheet(this.selectedSong, mySheet)
          this.$emit('hideSheet')
        }
        let list = this.userSheet.slice()
        list.push(mySheet)
        this.setUserSheet(list)
        saveUserSheet(this.userSheet)
        this.title = ''
        this.hide()
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .create-sheet{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 4200;
    background: rgba(0,0,0,0.2);
    .sheet-wrapper{
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translateY(-50%);
      background: #ffffff;
      width: 80%;
      height: 160px;
      padding: 10px 20px;
      box-sizing: border-box;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      .sheet-new{
        flex: 1;
        width: 100%;
        .new-text{
          font-size: $font-size-large;
          font-weight: bold;
        }
      }
      .input-wrapper{
        flex: 1;
        width: 100%;
        border-bottom: 1px solid #9d9d9d;
        @include center;
        .input-title{
          height: 22px;
          width: 100%;
          border: none;
          caret-color: $color-icon;
          &:focus{
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #ccc;
          }
        }
      }
      .btn-wrapper {
        flex: 1;
        @include right;
        display: flex;
        font-size: $font-size-medium;
        color: $color-icon;
        font-weight: bold;
        .btn-cancel{
          flex: 0 0 40px;
          height: 80%;
          @include center;
          margin-right: 20px;
        }
        .btn-submit{
          flex: 0 0 40px;
          height: 80%;
          @include center;
          &.showOpacity {
            opacity: 0.5;
          }
        }
      }
    }
  }
</style>
