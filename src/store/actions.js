const actions = {
  setRankGroup: ({
    commit
  }, rankGroup) => {
    return commit('SET_RANKGROUP', rankGroup)
  },
  setSinger: ({
    commit
  }, singer) => {
    return commit('SET_SINGER', singer)
  },
  setPlaying: ({
    commit
  }, playing) => {
    return commit('SET_PLAYING', playing)
  },
  setFullScreen: ({
    commit
  }, fullScreen) => {
    return commit('SET_FULLSCREEN', fullScreen)
  },
  setPlayList: ({
    commit
  }, playList) => {
    return commit('SET_PLAYLIST', playList)
  },
  setSequenceList: ({
    commit
  }, sequenceList) => {
    return commit('SET_SEQUENCELIST', sequenceList)
  },
  setMode: ({
    commit
  }, mode) => {
    return commit('SET_MODE', mode)
  },
  setCurrentIndex: ({
    commit
  }, currentIndex) => {
    return commit('SET_CURRENTINDEX', currentIndex)
  }
}
export default actions
