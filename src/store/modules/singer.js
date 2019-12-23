import { playMode } from '../../utils/config'
import { loadSearch } from '../../utils/localStorage'

const singer = {
  state: {
    singer: {},
    playering: false,
    fullScreen: false,
    playList: [], // 播放列表
    sequenceList: [], // 顺序列表
    mode: playMode.sequence, // 0 表示顺序播放 1 表示循环播放 2 表示随机播放
    currentIndex: -1,
    clickMark: false, // 是否点击了下一首或者上一首的标志,
    songSheet: {}, // 歌单,
    rankList: {}, // 榜单,
    pageCount: 0, // 进入musicList组件的次数,
    searchHistory: loadSearch(), // 搜索历史,
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
    }
  }
}

export default singer
