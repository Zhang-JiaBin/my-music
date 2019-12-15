export function randomlist (list, n = 8) {
  let len = list.length
  let ret = new Set()
  for (let i = 0; ; i++) {
    let index = Math.floor(Math.random() * len)
    if (ret.size <= n - 1) {
      ret.add(list[index])
    } else {
      break
    }
  }
  return Array.from(ret)
}
