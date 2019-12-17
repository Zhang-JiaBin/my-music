const singer = {
  state: {
    rankGroup: [],
    singer: {},
    playing: false,
    fullScreen: true,
    playList: [],
    sequenceList: [],
    mode: 0, // 0 表示顺序播放 1 表示循环播放 2 表示随机播放
    currentIndex: -1
  },
  mutations: {
    'SET_RANKGROUP': (state, rankGroup) => {
      state.rankGroup = rankGroup
    },
    'SET_SINGER': (state, singer) => {
      state.singer = singer
    },
    'SET_PLAYING': (state, playing) => {
      state.playing = playing
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
    }
  }
}

export default singer
