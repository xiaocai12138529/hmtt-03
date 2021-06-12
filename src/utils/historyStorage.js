// 封装对token的三个操作
// 存  => 取  => 删

// 消除魔法字符串
const HISTORY_NAME = 'my-history'
export const saveHistory = (historyArr) => {
  localStorage.setItem(HISTORY_NAME, JSON.stringify(historyArr))
}

export const getHistory = () => {
  return JSON.parse(localStorage.getItem(HISTORY_NAME))
}

export const delHistory = () => {
  localStorage.removeItem(HISTORY_NAME)
}
