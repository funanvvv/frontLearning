// 替换 \r...\
function replace(e) {
  var reg1 = /\\r[^\\]*\\/
  var reg2 = /(?<=\\r)[^\\]*(?=\\)/
  var temp, str
  while(reg1.test(e)) {
    temp = e.match(reg2)
    str = `<span class='red'>${temp}</span>`
    e = e.replace(reg1, str)
  }
  return e
}

document.write(replace(document.getElementById('replace').innerHTML))

// 数字格式化
function formatNum(num) {
  var left = num.split('.')[0]
  var right = num.split('.')[1]
  var reg1 = /\B(?=(\d{3})+$)/g
  var reg2 = /(?<=^(\d{3})+)\B/g
  return `${left.replace(reg1, ',')}.${right.replace(reg2, ',')}`
}

function test(e) {
  var reg = /c/
  return e.search(reg)
}

console.log(formatNum('122342634568.8712246345'))
console.log(test('abcdef'))