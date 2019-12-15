const singer = {
  state: {
    rankGroup: []
  },
  mutations: {
    'SET_RANKGROUP': (state, rankGroup) => {
      state.rankGroup = rankGroup
    }
  }
}

export default singer
