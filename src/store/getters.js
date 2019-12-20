const getters = {
  rankGroup: state => state.singer.rankGroup,
  singer: state => state.singer.singer,
  playering: state => state.singer.playering,
  fullScreen: state => state.singer.fullScreen,
  playList: state => state.singer.playList,
  sequenceList: state => state.singer.sequenceList,
  mode: state => state.singer.mode,
  currentIndex: state => state.singer.currentIndex,
  currentSong: state => state.singer.playList[state.singer.currentIndex],
  currentPage: state => state.singer.currentPage,
}

export default getters
