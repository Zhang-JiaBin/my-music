// function mock(app, url, data) {
//   app.get(url, (request, response) => {
//     response.json(data)
//   })
// }
//
// const musicData = require('./src/mock/music.js')
// const listData = require('./src/mock/musicall.js')
// const singerData = require('./src/mock/singer.js')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: true,
  devServer: {
    // before(app) {
    //   mock(app, '/music/swipper', musicData)
    //   mock(app, '/music/all', listData)
    //   mock(app, '/music/singer', singerData)
    // },
    proxy: {
      '/api/getRecommend': {
        target: `https://u.y.qq.com/cgi-bin/musicu.fcg`,
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com'
          req.headers.host = 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getRecommend': ''
        }
      },
      // 线上qq音乐API
      '/api/getSingerSongs': {
        target: `https://api.qq.jsososo.com/singer/songs`,
        // bypass: function (req, res, proxyOptions) {
        //   req.headers.referer = 'https://c.y.qq.com'
        //   req.headers.host = 'c.y.qq.com'
        // },
        pathRewrite: {
          '^/api/getSingerSongs': ''
        }
      },
      // 真实qq音乐API
      '/api/getSingerDetail': {
        target: `https://u.y.qq.com/cgi-bin/musicu.fcg`,
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://u.y.qq.com'
          req.headers.host = 'u.y.qq.com'
        },
        pathRewrite: {
          '^/api/getSingerDetail': ''
        }
      },
      '/api/getSongUrl': {
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://u.y.qq.com'
          req.headers.host = 'u.y.qq.com'
        },
        pathRewrite: {
          '^/api/getSongUrl': ''
        }
      },
      '/api/getLyric': {
        target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com'
          req.headers.host = 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getLyric': ''
        }
      }
      // '/api/getSongUrl': {
      //   target: `https://api.qq.jsososo.com/song/urls`,
      //   // bypass: function (req, res, proxyOptions) {
      //   //   req.headers.referer = 'https://c.y.qq.com'
      //   //   req.headers.host = 'c.y.qq.com'
      //   // },
      //   pathRewrite: {
      //     '^/api/getSongUrl': ''
      //   }
      // }
      // '/api/getSingerList': {
      //   target: `https://api.qq.jsososo.com/singer/list`,
      //   // bypass: function (req, res, proxyOptions) {
      //   //   req.headers.referer = 'https://c.y.qq.com'
      //   //   req.headers.host = 'c.y.qq.com'
      //   // },
      //   pathRewrite: {
      //     '^/api/getSingerList': ''
      //   }
      // }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  }
}
