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
  }
}
export default actions
