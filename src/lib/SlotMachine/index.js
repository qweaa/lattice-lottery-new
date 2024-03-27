import './index.css'

// 初始化配置参数
const defaultOption = (opt) => {
  if (Object.prototype.toString.call(opt) !== '[object Object]') opt = {}
  const options = {
    list: [],
    moveTime: 4, // 动画时间 单位秒
    concatCount: 4, // 奖品列表复制次数
    colCount: 3, // 滚筒列数
    onend: null,
    ...opt,
  }
  // 复制list长度
  let _list = [];
  if (options.list.length) {
    for (let i = 0; i < options.concatCount; i++) {
      _list = _list.concat(options.list)
    }
  }
  options._list = _list

  return options
}

// 渲染每一列
const createCol = (options) => {
  const list = options._list
  if (!list || !list.length) return

  let li_html = ''

  for (let i of list) {
    const html =
      `<div class="slotMachine__li">` +
      (i.image ? `<img class="slotMachine__image" src="${i.image}" alt="">` : '') +
      (i.label ? `<span class="slotMachine__label">${i.label}</span>` : '') +
      `</div>`
    li_html += html
  }

  const slotMachine__col = document.createElement('div')
  slotMachine__col.className = 'slotMachine__col'

  const slotMachine__ul = document.createElement("div")
  slotMachine__ul.className = 'slotMachine__ul'
  slotMachine__ul.innerHTML = li_html

  const slotMachine__li_hide = document.createElement("div")
  slotMachine__li_hide.className = 'slotMachine__li hide'

  slotMachine__col.appendChild(slotMachine__ul)
  slotMachine__col.appendChild(slotMachine__li_hide)

  slotMachine__col.play = (index) => {
    const {
      list,
      concatCount,
      moveTime
    } = options

    const ulHeight = slotMachine__ul.clientHeight; // 总高度
    const liHeight = slotMachine__li_hide.clientHeight; // 列表子模块高度
    const oneCaseHeight = ulHeight / concatCount; // 每一份列表的高度

    const translateY = -oneCaseHeight + ((list.length - index) * liHeight); // top 定位到 顶部到 index索引的高度

    const ulMoveStyle = [
      'transition-property: transform',
      `transition-duration: ${moveTime}s`,
      'transition-timing-function: ease-in-out',
      `transform: translateY(${translateY}px)`
    ]

    slotMachine__ul.style = ulMoveStyle.join(';');

    setTimeout(() => {
      const translateY = -ulHeight + ((list.length - index) * liHeight); // top 定位到 底部到 index索引的高度
      slotMachine__ul.style = `transform: translateY(${translateY}px);`;
    }, moveTime * 1000)
  }

  setTimeout(() => {
    const ulHeight = slotMachine__ul.clientHeight; // 总高度
    const liHeight = slotMachine__li_hide.clientHeight; // 列表子模块高度
    slotMachine__ul.style = `transform: translateY(${-ulHeight + liHeight}px);`;
  }, 0)

  return slotMachine__col
}

// 渲染整个抽奖组件
const createSlotMachine = (options) => {
  const slotMachine = document.createElement('div')
  slotMachine.className = 'slotMachine'

  for (let i = 0; i < options.colCount; i++) {
    slotMachine.appendChild(createCol(options))
  }

  return slotMachine
}

class SlotMachine {
  options = {}
  element = null

  oSlotMachineUl = null
  oSlotMachineLi = null

  colPlaying = false
  going = false

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

    if (options.element.indexOf('#') === 0) {
      this.element = document.getElementById(options.element.slice(1))
    } else if (options.element.indexOf('.') === 0) {
      this.element = document.querySelector(options.element)
    }

    if (!this.element) {
      console.error("lottery init error: Unable to get dom element: " + options.element)
      return
    }

    this.element.appendChild(createSlotMachine(this.options))
  }


  go(val) {
    if (Object.prototype.toString.call(val) !== '[object Array]') {
      console.error('go function error: The parameter type should be Array')
      return
    }
    if (val.length !== this.options.colCount) {
      console.error(`go function error: The length of the argument must be equal to ${this.options.colCount}`)
      return
    }
    if (this.going) {
      console.warn('go function warning: Call repeatedly')
      return
    };

    this.going = true;

    const aCols = document.querySelectorAll('.slotMachine__col')
    for (let i = 0; i < aCols.length; i++) {
      setTimeout(() => {
        aCols[i].play(val[i])
        if (i === aCols.length - 1) {
          setTimeout(() => {
            this.going = false;
            if (typeof this.options.onend === 'function') this.options.onend(val)
          }, this.options.moveTime * 1000)
        }
      }, i * 500);
    }
  }

}

export default SlotMachine;