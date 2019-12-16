const singer = {
  state: {
    rankGroup: [],
    singer: {}
  },
  mutations: {
    'SET_RANKGROUP': (state, rankGroup) => {
      state.rankGroup = rankGroup
    },
    'SET_SINGER': (state, singer) => {
      state.singer = singer
    }
  }
}

export default singer
