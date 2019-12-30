export default class Sheet {
  constructor ({
    id,
    title,
    sheetList
  }) {
    this.id = id
    this.title = title
    this.sheetList = sheetList
    this.select = false
    this.pic = this.sheetList.length > 0 ? this.sheetList[0].image : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577638137840&di=298760dcb8d4df4e1b5a7cb442a4a172&imgtype=0&src=http%3A%2F%2Fbpic.wotucdn.com%2F16%2F97%2F60%2F16976059-84f699d55c6f6e33e98d8aeeae34d77b.jpg'
  }
  // eslint-disable-next-line camelcase
}

// eslint-disable-next-line camelcase
