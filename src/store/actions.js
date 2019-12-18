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
  setPlayering: ({
    commit
  }, playering) => {
    return commit('SET_PLAYERING', playering)
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
  },
  setCurrentPage: ({
    commit
  }, currentPage) => {
    return commit('SET_CURRENTPAGE', currentPage)
  }
}
export default actions
