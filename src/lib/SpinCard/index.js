import {
  getCode
} from '../../utils'
import "./index.less"

function defaultOption(opt) {
  if (Object.prototype.toString.call(opt) !== '[object Object]') opt = {}
  const options = {
    list: [],
    handImage: '', // 点击手势图片
    showHand: true, // 是否需要显示手势图片
    hasDrawIndex: [], // 已点击的卡片
    onend: null,
    onsubmit: null,
    ...opt,
  }
  return options
}

function createHtml({
  list,
  activeCardIndex,
  btnClickName,
  spinCardName,
  hasDrawIndex,
}) {
  let itemHtml = ''
  for (let i = 0; i < list.length; i++) {
    const _back_image = list[i].back_image
    const hasDraw = hasDrawIndex.includes(i)
    itemHtml +=
      `
        <div onclick="${btnClickName}(this, ${i})" class="SpinCard__item${activeCardIndex === i ? ' act' : ''}${_back_image ? ' preserve3d' : ''}${hasDraw ? ' play' : ''}">
            <div style="background-image: url(${list[i].front_image})" class="SpinCard__front"></div>
            ${_back_image ? `<div style="background-image: url(${_back_image})" class="SpinCard__back"></div>` : ''}
            ${hasDraw ? '<div class="SpinCard__draw__mask"></div>' : ''}
        </div>
      `
  }
  return `<div class="SpinCard ${spinCardName}">${itemHtml}</div>`
}

class SpinCard {
  options = {}
  name = ''
  element = null
  clickEvent = null
  spinCardName = ''
  btnClickName = ''

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



    if (options.element.indexOf('#') === 0) {
      this.element = document.getElementById(options.element.slice(1))
    } else if (options.element.indexOf('.') === 0) {
      this.element = document.querySelector(options.element)
    }

    if (!this.element) {
      console.error("lottery init error: Unable to get dom element: " + options.element)
      return
    }

    this.options = defaultOption(options)

    this.name = getCode()
    const btnClickName = `SpinCardClick_${this.name}`
    this.spinCardName = `SpinCard_${this.name}`
    this.btnClickName = btnClickName
    const that = this
    // 点击卡片事件
    if (!window[btnClickName]) {
      window[btnClickName] = function (event, index) {
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
      this.startHandMove()
    }

    this.updateView()
  }

  resetItemClass() {
    const card_item_arr = document.querySelectorAll(`.${this.spinCardName} .SpinCard__item`)
    for (let i = 0; i < card_item_arr.length; i++) {
      if (!this.options.hasDrawIndex.includes(i)) {
        card_item_arr[i].className = card_item_arr[i].className.replace('play', '').replace('act', '')
      }
    }
  }

  reset() {
    this.resetItemClass()
    if (this.options.showHand && this.options.handImage) {
      this.activeCardIndex = this.tempActiveCardIndex // 展示手势
      setTimeout(() => {
        this.startHandMove() // 开始手势的动画
      }, 300)
    }
  }

  update(options) {
    this.options = {
      ...this.options,
      ...options,
    }
    this.reset()
  }

  open(index) {
    if (this.options.hasDrawIndex.includes(index)) {
      console.warn("SpinCard warning: Click on the card already opened")
      return
    }
    if (this.cardsTimer) clearInterval(this.cardsTimer) // 停止手势的定时器
    this.cardsTimer = null // 重置定时器变量
    this.tempActiveCardIndex = index
    this.resetItemClass()
    this.clickEvent.className = this.clickEvent.className + ' play'
  }

  startHandMove() {
    // 开卡片手势动态切换
    if (!this.cardsTimer) {
      // 按顺序
      const {
        list,
        hasDrawIndex
      } = this.options

      const addFn = (num) => {
        if (num < list.length - 1) num += 1;
        else num = 0;
        if (
          hasDrawIndex.length < list.length
        ) {
          if (hasDrawIndex.includes(num)) return addFn(num)
          else return num
        } else {
          return num
        }
      }
      this.activeCardIndex = addFn(this.activeCardIndex)
      this.updateView()

      if (hasDrawIndex.length < list.length) {
        this.cardsTimer = window.setInterval(() => {
          this.activeCardIndex = addFn(this.activeCardIndex)
          this.updateView()
        }, 2000)
      }
    }
  }

  updateView() {
    this.element.innerHTML = createHtml({
      btnClickName: this.btnClickName,
      spinCardName: this.spinCardName,
      list: this.options.list,
      activeCardIndex: this.activeCardIndex,
      hasDrawIndex: this.options.hasDrawIndex,
    })
  }
}

export default SpinCard