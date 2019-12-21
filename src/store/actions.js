const actions = {
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
  },
  setClickMark: ({
    commit
  }, clickMark) => {
    return commit('SET_CLICKMARK', clickMark)
  },
  setSongSheet: ({
    commit
  }, songSheet) => {
    return commit('SET_SONGSHEET', songSheet)
  },
  setRankList: ({
    commit
  }, rankList) => {
    return commit('SET_RANKLIST', rankList)
  },
  setRouterMark: ({
    commit
  }, routerMark) => {
    return commit('SET_ROUTERMARK', routerMark)
  }
}
export default actions
