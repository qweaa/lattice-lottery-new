import './index.css'

// 初始化配置参数
const defaultOption = (opt) => {
  if (Object.prototype.toString.call(opt) !== '[object Object]') opt = {}
  const options = {
    list: [],
    tableBg: '', // 背景图
    skew: false,
    onend: null,
    onsubmit: null,
    ...opt,
  }

  return options
}

class Turntable {
  element = null
  options = {}

  drawing = false
  deg = 0
  prizeIndex = 0
  isFirstMove = true

  listLength = 0
  rotateDeg = 0

  turntable__table = null

  constructor(options) {
    if (!options.element || typeof options.element !== 'string') {
      console.error("SlotMachine init error: The variable type of 'element' should be a string")
      return
    }
    if (!options.list || Object.prototype.toString.call(options.list) !== '[object Array]') {
      console.error("SlotMachine init error: The variable type of 'list' should be an array")
      return
    }
    this.options = defaultOption(options)
    const listLength = this.options.list.length
    this.listLength = listLength
    this.rotateDeg = Number((360 / listLength).toFixed(2))
    if (this.options.skew) {
      this.deg = -1 * (Math.floor(this.rotateDeg / 2))
    }

    if (options.element.indexOf('#') === 0) {
      this.element = document.getElementById(options.element)
    } else if (options.element.indexOf('.') === 0) {
      this.element = document.querySelector(options.element)
    }

    if (!this.element) {
      console.error("lottery init error: Unable to get dom element: " + options.element)
      return
    }

    this.element.appendChild(this.createHtml())
  }

  createHtml() {
    const turntable = document.createElement("div")
    turntable.className = "turntable"

    const turntable__table = document.createElement("div")
    turntable__table.className = "turntable__table"
    turntable__table.style = `transform: rotate(${this.deg}deg); background-image: url('${this.options.tableBg}');`
    this.turntable__table = turntable__table

    const turntable__btn = document.createElement("div")
    turntable__btn.className = "turntable__btn"
    turntable__btn.style = `background-image: url('${this.options.tableBtn}');`
    const that = this
    turntable__btn.onclick = function () {
      if (typeof that.options.onsubmit === 'function') that.options.onsubmit()
    }


    turntable.appendChild(turntable__table)
    turntable.appendChild(turntable__btn)

    return turntable
  }

  start() {
    if (this.drawing) {
      this.turntable__table.className = "turntable__table move"
    } else {
      this.turntable__table.className = "turntable__table"
    }
    this.turntable__table.style = `transform: rotate(${this.deg}deg); background-image: url('${this.options.tableBg}');`
  }

  go(index) {
    let prizeIndex = Number(index) + 1
    if (!prizeIndex) {
      console.warn("Turntable go error: The parameter type should be Number")
      return
    }
    if (prizeIndex >= this.listLength) {
      console.warn(`Turntable go error: Parameter values should be between 0 and ${this.options.list.length - 1}`)
      return
    }
    if (this.drawing) return
    this.drawing = true
    // 上一轮转动角度 + 圈数 + (一圈 - (上一轮奖品索引值 - 本轮奖品索引值) * 奖品角度)
    this.deg =
      this.deg + 360 * 6 + (360 - (prizeIndex - this.prizeIndex) * this.rotateDeg)
    if (this.isFirstMove) {
      this.deg += Math.floor(this.rotateDeg / 2)
      this.isFirstMove = false
    }
    this.prizeIndex = prizeIndex
    this.start()
    setTimeout(() => {
      this.drawing = false
      this.start()
      const res = this.options.list[index]
      if (typeof this.options.onend === 'function') this.options.onend(res)
    }, 6000)
  }
}

export default Turntable