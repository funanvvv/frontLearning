function defineReactive(data, key, val) {
  // 递归监听
  observe(val)
  Object.defineProperty(data, key, {
    get: function() {
      return val
    },
    set: function(value) {
      if(val == value) {
        return
      }
      val = value
      console.log('属性' + key + '=>' + value.toString())
    }
  })
}

function observe(data) {
  if (!data || typeof data !== 'object') {
      return
  }
  Object.keys(data).forEach(function(key) {
      defineReactive(data, key, data[key]);
  })
}