export const formatDate = (dateTime) => {
  // console.log(date)
  // date = new Date();
  const date = new Date(dateTime) // 转换成Data();
  console.log(date)
  var y = date.getFullYear()
  console.log(y)
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}
