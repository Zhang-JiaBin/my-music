import { playMode } from '../../utils/config'
import {
  loadFavorite,
  loadHistory,
  loadRanks,
  loadSearch,
  loadSheets,
  loadSingers,
  loadUserSheet
} from '../../utils/localStorage'

const singer = {
  state: {
    singer: {}, // 当前歌手
    playering: false, // 播放状态
    fullScreen: false, // 播放器全屏显示
    playList: [], // 播放列表
    sequenceList: [], // 顺序列表
    mode: playMode.sequence, // 0 表示顺序播放 1 表示循环播放 2 表示随机播放
    currentIndex: -1,
    clickMark: false, // 是否点击了下一首或者上一首的标志,
    songSheet: {}, // 歌单,
    rankList: {}, // 榜单,
    pageCount: 0, // 进入musicList组件的次数,
    searchHistory: loadSearch(), // 搜索历史,
    showPopUp: false, // 弹出框
    selectedSong: {}, // 点击songList组件的 dot Icon选中的歌曲
    favoriteList: loadFavorite(), // 收藏的歌曲的列表,
    homeMark: 0, // 控制推荐页面的播放器上移标志
    historyList: loadHistory(), // 播放历史
    collectSingers: loadSingers(), // 收藏的歌手
    collectSheets: loadSheets(), // 收藏的歌单
    collectRanks: loadRanks(), // 收藏的榜单
    userSheet: loadUserSheet(), // 用户自己创建的歌单
    mySheetList: [], // 用户自己创建的某一个歌单中的所有歌曲
    inMySheet: false // 判断是否进入我自己创建的歌单页面
  },
  mutations: {
    'SET_SINGER': (state, singer) => {
      state.singer = singer
    },
    'SET_PLAYERING': (state, playering) => {
      state.playering = playering
    },
    'SET_FULLSCREEN': (state, fullScreen) => {
      state.fullScreen = fullScreen
    },
    'SET_PLAYLIST': (state, playList) => {
      state.playList = playList
    },
    'SET_SEQUENCELIST': (state, sequenceList) => {
      state.sequenceList = sequenceList
    },
    'SET_MODE': (state, mode) => {
      state.mode = mode
    },
    'SET_CURRENTINDEX': (state, currentIndex) => {
      state.currentIndex = currentIndex
    },
    'SET_CLICKMARK': (state, clickMark) => {
      state.clickMark = clickMark
    },
    'SET_SONGSHEET': (state, songSheet) => {
      state.songSheet = songSheet
    },
    'SET_RANKLIST': (state, rankList) => {
      state.rankList = rankList
    },
    'SET_PAGECOUNT': (state, pageCount) => {
      state.pageCount = pageCount
    },
    'SET_SEARCHHISTORY': (state, searchHistory) => {
      state.searchHistory = searchHistory
    },
    'SET_SHOWPOPUP': (state, showPopUp) => {
      state.showPopUp = showPopUp
    },
    'SET_SELECTEDSONG': (state, selectedSong) => {
      state.selectedSong = selectedSong
    },
    'SET_FAVORITELIST': (state, favoriteList) => {
      state.favoriteList = favoriteList
    },
    'SET_HOMEMARK': (state, homeMark) => {
      state.homeMark = homeMark
    },
    'SET_HISTORYLIST': (state, historyList) => {
      state.historyList = historyList
    },
    'SET_COLLECTSINGERS': (state, collectSingers) => {
      state.collectSingers = collectSingers
    },
    'SET_COLLECTSHEETS': (state, collectSheets) => {
      state.collectSheets = collectSheets
    },
    'SET_COLLECTRANKS': (state, collcetRanks) => {
      state.collectRanks = collcetRanks
    },
    'SET_USERSHEET': (state, userSheet) => {
      state.userSheet = userSheet
    },
    'SET_MYSHEETLIST': (state, mySheetList) => {
      state.mySheetList = mySheetList
    },
    'SET_INMYSHEET': (state, inMySheet) => {
      state.inMySheet = inMySheet
    }
  }
}

export default singer
