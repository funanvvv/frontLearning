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