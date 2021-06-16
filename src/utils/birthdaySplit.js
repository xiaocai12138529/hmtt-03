export default function birthdayDate (birthday) {
  console.log(birthday)
  const str = birthday
  const Arr = str.split('-')
  const newArr = Arr.map(item => Number(item))

  const birthdayDate = new Date(newArr[0], newArr[1] - 1, newArr[2])
  return birthdayDate
}
