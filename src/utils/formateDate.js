// 保存与时间格式化相关的方法，以供在不同项目中使用

export const relativeTime = val => {
  const t = new Date(val)
  const diff = Date.now() - t.getTime()

  const year = Math.floor(diff / (1000 * 3600 * 24 * 365))
  if (year) {
    return `${year}年前`
  }
  const month = Math.floor(diff / (1000 * 3600 * 24 * 30))
  if (month) {
    return `${month}月前`
  }
  const day = Math.floor(diff / (1000 * 3600 * 24))
  if (day) {
    return `${day}天前`
  }
  const hour = Math.floor(diff / (1000 * 3600))
  if (hour) {
    return `${hour}小时前`
  }
  const minute = Math.floor(diff / (1000 * 60))
  if (minute) {
    return `${minute}分钟前`
  } else {
    return '刚才'
  }
}

export default {
  install: (Vue) => {
    Vue.filter('relativeTime', relativeTime)
  }
}
