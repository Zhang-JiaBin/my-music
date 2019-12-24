import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200
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
export function loadSearch() {
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
  inserArray(songs, song, item => item.id === song.id, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 删除收藏的歌曲
export function deleteFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, item => item.mid === song.mid)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 加载收藏的歌曲的列表
export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}
// 清空收藏的歌曲
export function clearFavorite () {
  storage.remove(FAVORITE_KEY)
}
