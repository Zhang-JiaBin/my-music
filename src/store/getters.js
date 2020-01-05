const getters = {
  singer: state => state.singer.singer,
  playering: state => state.singer.playering,
  fullScreen: state => state.singer.fullScreen,
  playList: state => state.singer.playList,
  sequenceList: state => state.singer.sequenceList,
  mode: state => state.singer.mode,
  currentIndex: state => state.singer.currentIndex,
  currentSong: state => state.singer.playList[state.singer.currentIndex],
  clickMark: state => state.singer.clickMark,
  songSheet: state => state.singer.songSheet,
  rankList: state => state.singer.rankList,
  pageCount: state => state.singer.pageCount,
  searchHistory: state => state.singer.searchHistory,
  showPopUp: state => state.singer.showPopUp,
  selectedSong: state => state.singer.selectedSong,
  favoriteList: state => state.singer.favoriteList,
  homeMark: state => state.singer.homeMark,
  historyList: state => state.singer.historyList,
  collectSingers: state => state.singer.collectSingers,
  collectSheets: state => state.singer.collectSheets,
  collectRanks: state => state.singer.collectRanks,
  userSheet: state => state.singer.userSheet,
  mySheetList: state => state.singer.mySheetList,
  inMySheet: state => state.singer.inMySheet,
  showCreateSheet: state => state.singer.showCreateSheet,
  slideIndex: state => state.singer.slideIndex,
  showSheetPop: state => state.singer.showSheetPop,
  playingSheet: state => state.singer.playingSheet,
  playingRank: state => state.singer.playingRank,
  SheetOrRank: state => state.singer.SheetOrRank
}

export default getters
