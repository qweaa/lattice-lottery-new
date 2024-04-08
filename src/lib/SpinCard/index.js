import {
  getCode,
  getRandom,
} from '../../utils'
import "./index.less"

function defaultOption(opt) {
  if (Object.prototype.toString.call(opt) !== '[object Object]') opt = {}
  const options = {
    list: [],
    handImage: '', // 点击手势图片
    showHand: true, // 是否需要显示手势图片
    showHndType: 'sequence', // 按顺序：sequence；随机：random；默认 sequence
    hasOpenIndex: [], // 已点击的卡片
    onsubmit: null,
    ...opt,
  }
  return options
}

function createHtml({
  list,
  activeCardIndex,
  name,
  hasOpenIndex,
}) {
  let itemHtml = ''
  for (let i = 0; i < list.length; i++) {
    const _back_image = list[i].back_image
    const hasDraw = hasOpenIndex.includes(i)
    itemHtml +=
      `
        <div onclick="${name}(this, ${i})" class="SpinCard__item${activeCardIndex === i ? ' act' : ''}${_back_image ? ' preserve3d' : ''}${hasDraw ? ' play' : ''}">
            <div style="background-image: url(${list[i].front_image})" class="SpinCard__front"></div>
            ${_back_image ? `<div style="background-image: url(${_back_image})" class="SpinCard__back"></div>` : ''}
            ${hasDraw ? '<div class="SpinCard__draw__mask"></div>' : ''}
        </div>
      `
  }
  return `<div class="SpinCard ${name}">${itemHtml}</div>`
}

class SpinCard {
  options = {}
  name = ''
  element = null
  clickEvent = null

  cardsTimer = null
  activeCardIndex = -1
  tempActiveCardIndex = -1

  constructor(options) {
    if (!options.element || typeof options.element !== 'string') {
      console.error("SpinCard init error: The variable type of 'element' should be a string")
      return
    }
    if (!options.list || Object.prototype.toString.call(options.list) !== '[object Array]') {
      console.error("SpinCard init error: The variable type of 'list' should be an array")
      return
    }

    for (let i of options.list) {
      if (!i.front_image) {
        console.error("SpinCard init error: The field of 'front_image' cannot be empty")
        return
      }
    }

    if (options.element.indexOf('#') === 0) {
      this.element = document.getElementById(options.element.slice(1))
    } else if (options.element.indexOf('.') === 0) {
      this.element = document.querySelector(options.element)
    }

    if (!this.element) {
      console.error("SpinCard init error: Unable to get dom element: " + options.element)
      return
    }

    this.options = defaultOption(options)

    this.name = `SpinCard_${getCode()}`
    const that = this
    // 点击卡片事件
    if (!window[this.name]) {
      window[this.name] = function (event, index) {
        that.clickEvent = event
        // 卡片的翻转动画会影响弹窗消失的动画闪烁 所以延迟260毫秒 等卡片快翻转结束后弹出弹窗
        if (typeof that.options.onsubmit === 'function') that.options.onsubmit(index)
      }
    }

    // 手势
    if (options.handImage) {
      const handImageStyle =
        `
        .SpinCard__item.act:after {
          content: "";
          position: absolute;
          z-index: 2;
          top: 138px;
          left: 72px;
          width: 108px;
          height: 118px;
          animation: scale 1s ease-in-out 0s forwards infinite;
          background-image: url('${options.handImage}');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      `
      const style = document.createElement("style")
      style.innerHTML = handImageStyle
      document.head.appendChild(style)
    }

    this.updateView()
    this.handMove()
  }

  resetItemClass() {
    const card_item_arr = document.querySelectorAll(`.${this.name} .SpinCard__item`)
    for (let i = 0; i < card_item_arr.length; i++) {
      if (!this.options.hasOpenIndex.includes(i)) {
        card_item_arr[i].className = card_item_arr[i].className.replace('play', '').replace('act', '')
      }
    }
  }

  handMove() {
    // 开卡片手势动态切换
    if (!this.cardsTimer) {
      // 按顺序
      const {
        list,
        hasOpenIndex,
        showHndType,
      } = this.options

      const addFn = (num) => {
        if (showHndType === 'random') {
          // 随机展示手势
          num = getRandom(0, list.length - 1)
        } else {
          // 按顺序展示手势
          if (num < list.length - 1) num += 1;
          else num = 0;
        }
        if (
          hasOpenIndex.length < list.length
        ) {
          if (hasOpenIndex.includes(num)) return addFn(num)
          else return num
        } else {
          return num
        }
      }
      this.activeCardIndex = addFn(this.activeCardIndex)
      this.updateView()

      if (hasOpenIndex.length < list.length - 1) {
        this.cardsTimer = window.setInterval(() => {
          this.activeCardIndex = addFn(this.activeCardIndex)
          this.updateView()
        }, 2000)
      } else {
        clearInterval(this.cardsTimer)
      }
    }
  }

  updateView() {
    this.element.innerHTML = createHtml({
      list: this.options.list,
      name: this.name,
      activeCardIndex: this.activeCardIndex,
      hasOpenIndex: this.options.hasOpenIndex,
    })
  }

  // 用于外部调用的方法 start
  reset() {
    this.resetItemClass()
    if (this.options.showHand && this.options.handImage) {
      this.activeCardIndex = this.tempActiveCardIndex // 展示手势
      // 翻转动画结束后再更新页面
      setTimeout(() => {
        this.handMove() // 开始手势的动画
      }, 300)
    } else {
      this.activeCardIndex = -1 // 关闭手势
      // 翻转动画结束后再更新页面
      setTimeout(() => {
        this.updateView()
      }, 300)
    }
  }

  updateOptions(options) {
    this.options = {
      ...this.options,
      ...options,
    }
    this.reset()
  }
  updateList(index, options) {
    if (this.options.list[index]) {
      this.options.list[index] = {
        ...this.options.list[index],
        ...options,
      }
      this.updateView()
    }
  }
  stopHandMove() {
    this.options.showHand = false
  }
  startHandMove() {
    this.options.showHand = true
  }
  pushHasOpenIndex(index) {
    const {
      hasOpenIndex,
    } = this.options
    if (hasOpenIndex.includes(index)) {
      console.warn(`SpinCard warning: Value '${index}' to exist`)
      return
    }
    hasOpenIndex.push(index)
    this.reset()
  }
  open(index) {
    if (this.options.hasOpenIndex.includes(index)) {
      console.warn("SpinCard warning: The card has opened")
      return
    }
    if (this.cardsTimer) clearInterval(this.cardsTimer) // 停止手势的定时器
    this.cardsTimer = null // 重置定时器变量
    this.tempActiveCardIndex = index
    this.resetItemClass()
    this.clickEvent.className = this.clickEvent.className + ' play'
  }
  // 用于外部调用的方法 end
}

export default SpinCard