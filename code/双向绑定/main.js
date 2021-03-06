// 截取节点
function nodeToFragment(node, vm) {
  let child
  let fragment = document.createDocumentFragment()
  while(child = node.firstChild) {
    compile(child, vm)
    fragment.appendChild(child)
  }
  return fragment
}

// 解析模板绑定变量
function compile(node, vm) {
  if(node.nodeType == 1) { // 1元素节点
    const attr = node.attributes
    for(let i of attr) {
      if(i.nodeName == 'v-model') {
        const name = i.nodeValue
        node.addEventListener('input', (e) => {
          vm[name] = e.target.value
        })
        console.log(vm)
        node.value = vm[name]
        node.removeAttribute('v-model')
      }
    }
  }
  if(node.nodeType == 3) { // 3文本节点
    const reg = /\{\{(.*)\}\}/
    if(reg.test(node.nodeValue)) {
      var name = RegExp.$1.trim()
      // node.nodeValue = vm[name]
      new Watcher(vm, node, name)
    }
  }
}

// 数据劫持
function defineReactive(obj, key, val) {
  var dep = new Dep()
  Object.defineProperty(obj, key, {
    get: function() {
      if(Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function(newVal) {
      if(newVal == val) return
      val = newVal
      dep.notify()
    }
  })
}
// 观察者
function observer(obj, vm) {
  for(let key of Object.keys(obj)) {
    defineReactive(vm, key, obj[key])
  }
}

// Watcher订阅者构造函数
function Watcher(vm, node, name) {
  Dep.target = this
  this.vm = vm
  this.node = node
  this.name = name
  this.update()
  Dep.target = null
}
Watcher.prototype = {
  update() {
    this.node.nodeValue = this.vm[this.name]
  },
}
// Dep构造函数
function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

// Vue构造函数
function Vue(options) {
  this.data = options.data
  observer(this.data, this)
  const dom = nodeToFragment(document.getElementById(options.el), this)
  document.getElementById(options.el).appendChild(dom)
}

var testVue = new Vue({
  el: 'root',
  data: {
    test: 'tzest'
  }
})