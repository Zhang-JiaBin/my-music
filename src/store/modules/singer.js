import { playMode } from '../../utils/config'

const singer = {
  state: {
    rankGroup: [],
    singer: {},
    playering: false,
    fullScreen: true,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence, // 0 表示顺序播放 1 表示循环播放 2 表示随机播放
    currentIndex: -1,
    currentPage: 0 // 0表示在底部有Tab组件的时候，1在底部没有Tab组件的时候
  },
  mutations: {
    'SET_RANKGROUP': (state, rankGroup) => {
      state.rankGroup = rankGroup
    },
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
    }
  }
}

export default singer
