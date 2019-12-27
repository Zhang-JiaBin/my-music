import storage from 'good-storage'
import Song from './song'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200
const HISTORY_KEY = '__history__'
const HISTORY_MAX_LENGTH = 200
// 插入数据进行比较，如果有，则删掉此数据，并把val插入到第一个位置，如果数组长度大于maxLen,则把数组最后一个数据pop出去
function inserArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  // 如果有，则删除
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 在数组第一个位置添加该值
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 从数组中删除元素
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 保存搜索结果
export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  inserArray(searches, query, item => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 读取存储的搜索结果
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

// 从localstorage 中删除指定搜索历史
export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, item => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清空存储的搜索结果
export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

// 保存收藏的歌曲
export function saveFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  let songlist = songs.map(item => {
    item = new Song(item)
    return item
  })
  // console.log('变了之后:', songlist)
  inserArray(songlist, song, item => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songlist)
  return songlist
}

// 删除收藏的歌曲
export function deleteFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, item => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 加载收藏的歌曲的列表
export function loadFavorite () {
  let songs = storage.get(FAVORITE_KEY, [])
  let songlist = songs.map(item => {
    item = new Song(item)
    return item
  })
  return songlist
}
// 清空收藏的歌曲
export function clearFavorite () {
  storage.remove(FAVORITE_KEY)
  return []
}

// 保存播放历史的歌曲
export function saveHitory (song) {
  let songs = storage.get(HISTORY_KEY, [])
  let songlist = songs.map(item => {
    item = new Song(item)
    return item
  })
  // console.log('变了之后:', songlist)
  inserArray(songlist, song, item => {
    return song.id === item.id
  }, HISTORY_MAX_LENGTH)
  storage.set(HISTORY_KEY, songlist)
  return songlist
}

// 删除播放历史的歌曲
export function deleteHistory (song) {
  let songs = storage.get(HISTORY_KEY, [])
  deleteFromArray(songs, item => {
    return item.id === song.id
  })
  storage.set(HISTORY_KEY, songs)
  return songs
}

// 加载播放历史的歌曲的列表
export function loadHistory () {
  let songs = storage.get(HISTORY_KEY, [])
  let songlist = songs.map(item => {
    item = new Song(item)
    return item
  })
  return songlist
}

// 清空播放历史的歌曲
export function clearHistory () {
  storage.remove(HISTORY_KEY)
  return []
}
