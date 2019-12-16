import axios from 'axios'
export function getSingerSongs (mid) {
  return axios({
    methods: 'get',
    url: '/api/getSingerSongs',
    params: {
      singermid: mid,
      num: 40
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
