import {
  getCode
} from './utils'

class Lottery {
  name = ''

  element = null

  options = {}
  isMoving = false
  listIndex = null
  luckyIndex = 0
  baseSpeed = 300
  speed = 20
  hasCircleTimes = 0
  hasMoveTimes = 0

  createHtml = null

  init(type, options, createHtml) {
    if (!options.element || typeof options.element !== 'string') {
      console.error("lottery init error: The variable type of 'element' should be a string")
      return
    }

    this.options = this.defaultOption(options, type)
    this.createHtml = createHtml

    if (options.element.indexOf('#') === 0) {
      this.element = document.getElementById(options.element.slice(1))
    } else if (options.element.indexOf('.') === 0) {
      this.element = document.querySelector(options.element)
    }

    if (!this.element) {
      console.error("lottery init error: Unable to get dom element: " + options.element)
      return
    }

    this.name = getCode()

    this.updateView()
  }

  updateView() {
    if (this.element && typeof this.createHtml === 'function') {
      this.element.innerHTML = this.createHtml({
        name: this.name,
        list: this.options._list,
        listIndex: this.listIndex,
        btnText: this.options.btnText,
        onsubmit: this.options.onsubmit,
      })
    } else {
      console.error("lottery error: An exception that cannot be handled")
    }
  }

  defaultOption(opt, type) {
    if (Object.prototype.toString.call(opt) !== '[object Object]') opt = {}

    const options = {
      list: [],
      circleTimes: 3, // 转圈次数
      velocity: 'speed', // 跳动的动画，默认 speed 慢-快-慢; invariance 匀速
      btnText: '抽奖',
      onsubmit: null,
      onend: null,
      ...opt,
    }
    if (!options.list || Object.prototype.toString.call(options.list) !== '[object Array]') {
      console.error("lottery init error: The variable type of 'list' should be an array")
      return
    }
    // 补全列表，补全内容：谢谢参与
    let _list = JSON.parse(JSON.stringify(options.list));
    if (type === 'grid') {
      const len = _list.length;
      if (len < 8) {
        for (let i = 0; i < 8 - len; i++) {
          _list.push({
            label: "谢谢参与",
            id: i + len + 1,
            index: i + len,
          });
        }
      } else if (len > 8) {
        _list.splice(8);
      }
    }
    options._list = _list

    return options
  }

  start(speed) {
    const {
      velocity,
      circleTimes,
      _list,
      onend
    } = this.options
    // 转动计算时间
    if (velocity === 'speed') { //非匀速
      if (this.hasMoveTimes < 5) speed -= (this.speed + this.hasMoveTimes * 10)
      else if (this.hasMoveTimes > circleTimes * 8 - 7) speed += (this.speed + (circleTimes * 8 - this.hasMoveTimes) * 10)
    }
    setTimeout(() => {
      if (this.hasCircleTimes !== -1) { //如果没转完定义好的圈圈次数，继续转圈圈
        if (this.listIndex < _list.length - 1) {
          this.listIndex += 1
        } else {
          this.listIndex = 0
          this.hasCircleTimes++
        }
        if (this.hasCircleTimes >= circleTimes) { //是否转了circleTimes次
          this.hasCircleTimes = -1 //转圈圈结束
        }
        this.hasMoveTimes++ //记录跳动了多少次
        this.updateView()
        this.start(speed) //递归
      } else { //转圈次数已经达到
        if (this.listIndex < this.luckyIndex) { //如果当前cur位置没到中奖位置，继续跳
          this.listIndex += 1 //跳下一个
          this.hasMoveTimes++ //记录跳动次数
          this.updateView()
          this.start(speed) //递归
        } else { //cur位置到达中奖位置，停止
          if (_list[this.luckyIndex]) {
            if (typeof onend === 'function') onend(_list[this.luckyIndex])
          } else {
            this.listIndex = 0
            console.error(`go function error: undefined list[${this.luckyIndex}]`)
          }
          this.hasMoveTimes = 0
          this.isMoving = false
          this.updateView()
        }
      }
    }, speed);
  }

  go(index) {
    if (this.isMoving) {
      console.warn('go function warning: Call repeatedly')
      return
    }

    let luckyIndex = Number(index)

    if (isNaN(luckyIndex)) {
      console.error('go function error: The parameter type should be Number')
      return
    }

    if (luckyIndex < 0 || luckyIndex >= this.options._list.length) {
      console.error(`go function error: Parameter values should be between 0 and ${this.options._list.length - 1}`)
      return
    }

    this.isMoving = true
    this.luckyIndex = luckyIndex //中奖索引
    this.hasCircleTimes = 0 //初始化转圈圈数
    if (this.listIndex === null) this.listIndex = 0
    else this.listIndex += 1 //立即切换到下个位置
    if (typeof this.options.onstart === 'function') this.options.onstart()
    this.updateView()
    this.start(this.baseSpeed) //开始动画
  }
}

export default Lottery