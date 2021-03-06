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
  productionSourceMap: false,
  devServer: {
    // before(app) {
    //   mock(app, '/music/swipper', musicData)
    //   mock(app, '/music/all', listData)
    //   mock(app, '/music/singer', singerData)
    // },
    proxy: {
      '/api/getRecommend': {
        target: `https://u.y.qq.com/cgi-bin/musicu.fcg`,
        changeOrgin: true,
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com'
          req.headers.host = 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getRecommend': ''
        }
      },
      // 获取官方歌单
      '/api/getSheetList': {
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/' // 需要加斜杆
          req.headers.host = 'y.qq.com'
        },
        pathRewrite: {
          '^/api/getSheetList': ''
        }
      },
      // 获取指定歌单的歌曲列表
      '/api/getSongList': {
        target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/' // 需要加斜杆
          req.headers.host = 'y.qq.com'
        },
        pathRewrite: {
          '^/api/getSongList': ''
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
      // 真实qq音乐API-歌手歌曲列表
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
      // 获取排行榜指定榜单的歌曲列表
      '/api/getMusicList': {
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/' // 需要加斜杆
          req.headers.host = 'y.qq.com'
        },
        pathRewrite: {
          '^/api/getMusicList': ''
        }
      },
      // 获取Vkey拼接播放地址
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
      // 获取歌词
      '/api/getLyric': {
        target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com'
          req.headers.host = 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getLyric': ''
        }
      },
      // 获取热搜
      '/api/getHotSearch': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/' // 需要加斜杆
          req.headers.host = 'y.qq.com'
        },
        pathRewrite: {
          '^/api/getHotSearch': ''
        }
      },
      '/api/search': {
        target: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/' // 需要加斜杆
          req.headers.host = 'y.qq.com'
        },
        pathRewrite: {
          '^/api/search': ''
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
  // 警告 webpack 的性能提示
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
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
