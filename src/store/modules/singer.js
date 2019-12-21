import { playMode } from '../../utils/config'

const singer = {
  state: {
    singer: {},
    playering: false,
    fullScreen: false,
    playList: [], // 播放列表
    sequenceList: [], // 顺序列表
    mode: playMode.sequence, // 0 表示顺序播放 1 表示循环播放 2 表示随机播放
    currentIndex: -1,
    currentPage: 0, // 0表示在底部有Tab组件的时候，1在底部没有Tab组件的时候,
    clickMark: false, // 是否点击了下一首或者上一首的标志,
    songSheet: {}, // 歌单,
    rankList: {}, // 榜单,
    routerMark: true // 看是否是跳转到子路由
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
    'SET_CURRENTPAGE': (state, currentPage) => {
      state.currentPage = currentPage
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
    'SET_ROUTERMARK': (state, routerMark) => {
      state.routerMark = routerMark
    }
  }
}

export default singer
