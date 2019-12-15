import {
  mapGetters,
  mapActions
} from 'vuex'
export const singerMixin = {
  computed: {
    ...mapGetters([
      'rankGroup'
    ])
  },
  methods: {
    ...mapActions([
      'setRankGroup'
    ])
  }
}
