<template>
  <div class="my-sheet">
    <div class="user-sheet-wrapper">
      <div class="sheet-tittle-left" @click="showmySheet">
        <div class="icon-down-wrapper">
          <span class="icon-down" :class="{'Trotate': !visible}"></span>
        </div>
        <div class="sheet-tittle">
          <span class="title">创建的歌单</span>
        </div>
        <div class="number-wrapper">
          <span class="number">({{this.userSheet.length}})</span>
        </div>
      </div>
      <div class="sheet-tittle-right">
        <div class="icon-plus-wrapper" @click="clickAdd">
          <span class="icon-plus"></span>
        </div>
        <div class="icon-dot-wrapper">
          <span class="icon-dot"></span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="user-mysheet-wrapper" v-show="visible">
        <div class="user-mysheet" @click="gotoMySheetDetail(item)" v-for="item in this.userSheet" :key="item.id">
          <div class="mysheet-img-wrapper">
            <img class="mysheet-img" :src="item.pic" alt="">
          </div>
          <div class="mysheet-title-wrapper">
            <div class="mysheet-title">{{item.title}}</div>
            <div class="mysheet-num">{{item.sheetList.length}}首</div>
          </div>
        </div>
      </div>
    </transition>
    <create-sheet ref="createSheet"></create-sheet>
  </div>
</template>

<script>
import CreateSheet from '../Home/createSheet'
import { singerMixin } from '../../utils/mixin'
export default {
  name: 'mySheet',
  data () {
    return {
      visible: true
    }
  },
  mixins: [singerMixin],
  components: { CreateSheet },

  computed: {},

  methods: {
    // 点击下拉icon,收起创建的歌单
    showmySheet () {
      this.visible = !this.visible
    },
    // 点击加号icon，创建歌单
    clickAdd () {
      this.$refs.createSheet.show()
    },
    // 跳转到我自己创建的歌单详情页
    gotoMySheetDetail (item) {
      this.$router.push({
        path: `/home/user/mysheet/${item.id}`
      })
      this.setMySheetList(item)
      this.setPageCount(this.pageCount + 1)
      this.setInMySheet(true)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../assets/style/scss/global";
  .my-sheet{
    width: 100%;
    .user-sheet-wrapper {
      height: 40px;
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      .sheet-tittle-left{
        flex: 1;
        display: flex;
        @include left;
        .icon-down-wrapper{
          flex:0 0 30px;
          width: 30px;
          height: 100%;
          @include left;
          .icon-down{
            font-size: 20px;
            transform: rotate(0deg);
            transition-duration: 0.3s;
            &.Trotate{
              transform: rotate(-90deg);
            }
          }
        }
        .sheet-tittle{
          flex: 0 0 83px;
          width: 83px;
          height: 100%;
          @include left;
          .title{
            font-size: $font-size-medium-x;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .number-wrapper{
          flex: 0 0 20px;
          width: 20px;
          height: 100%;
          @include center;
          .number{
            line-height: 14px;
            color: #b4b4b4;
            font-size: $font-size-medium;
          }
        }
      }
      .sheet-tittle-right{
        flex: 1;
        @include right;
        display: flex;
        .icon-plus-wrapper{
          flex: 0 0 30px;
          width: 30px;
          height: 100%;
          @include center;
          .icon-plus{
            font-size:18px;
          }
        }
        .icon-dot-wrapper{
          flex: 0 0 30px;
          width: 30px;
          height: 100%;
          @include right;
          .icon-dot {
            font-size: 22px;
          }
        }
      }
    }
    .user-mysheet-wrapper{
      width: 100%;
      .user-mysheet{
        padding: 10px 15px;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        display: flex;
        @include justcenter;
        .mysheet-img-wrapper{
          flex: 0 0 40px;
          height: 100%;
          @include center;
          .mysheet-img{
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .mysheet-title-wrapper{
          flex: 1;
          height: 100%;
          padding-left: 15px;
          box-sizing: border-box;
          .mysheet-title{
            margin-top: 2px;
            font-size: $font-size-medium;
          }
          .mysheet-num{
            font-size: $font-size-small;
            margin-top: 7px;
          }
        }
      }
    }
  }
</style>
