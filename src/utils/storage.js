// 封装对token的三个操作
// 存  => 取  => 删

// 消除魔法字符串
const tokenName = 'my-token'
export const saveToken = (tokenObj) => {
  localStorage.setItem(tokenName, JSON.stringify(tokenObj))
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem(tokenName))
}

export const delToken = () => {
  localStorage.removeItem(tokenName)
}
