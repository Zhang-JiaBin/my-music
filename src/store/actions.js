import searchHistory from '../components/search/searchHistory'
import search from '../views/search'

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
  setPageCount: ({
    commit
  }, pageCount) => {
    return commit('SET_PAGECOUNT', pageCount)
  },
  setSearchHistory: ({
    commit
  }, searchHistory) => {
    return commit('SET_SEARCHHISTORY', searchHistory)
  },
  setShowPopUp: ({
    commit
  }, showPopUp) => {
    return commit('SET_SHOWPOPUP', showPopUp)
  },
  setSelectedSong: ({
    commit
  }, selectedSong) => {
    return commit('SET_SELECTEDSONG', selectedSong)
  },
  setFavoriteList: ({
    commit
  }, favoriteList) => {
    return commit('SET_FAVORITELIST', favoriteList)
  }
}
export default actions
