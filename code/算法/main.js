// js大数之和
function addBig(a, b) {
  var res = ''
  var p = 0
  a = a.split('')
  b = b.split('')
  while(a.length || b.length || p){
      p += ~~a.pop() + ~~b.pop() // ~~将字符串转为数字
      res = p%10 + res
      p = p > 9 // p>9进一
  }
  return res.replace(/^0+/, '')
}
// console.log(addBig('000035454135498751354', '123456'))

// 计算时区
function timeZone(str) {
  function addZero(num) {
    return num < 10? '0' + num : num
  }
  var reg = /1+/g
  var res = []
  for(let i of str.matchAll(reg)) {
    const beginHour = addZero(Math.floor(i.index / 2))
    const beginMin = i.index % 2 == 0 ? '00' : '30'
    const last = i[0].length
    const finishHour = addZero(Math.floor((i.index+last) / 2))
    const finishMin = (i.index + last) % 2 == 0 ? '00' : '30'
    const time = `${beginHour}:${beginMin}~${finishHour}:${finishMin}`
    res.push(time)
  }
  console.log(res)
  return res
}
// timeZone('110010000000000000000000000111100000000000000000')

function deepCopy(obj) {
  function toHump(str) {
    str = str.split('')
    var reg = /[a-z]/
    for(let i = 0; i < str.length; i++) {
      if(str[i] == '_' && reg.test(str[i+1])) {
        str[i+1] = str[i+1].toUpperCase()
      }
    }
    return str.join('')
  }
  if(!obj instanceof Object || obj instanceof Function || obj == null) {
    return obj
  }
}

deepCopy()