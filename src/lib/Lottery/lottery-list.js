import './index.css'

import createLotteryItem from './lottery-item'
import createLotteryButton from './lottery-button'

import Lottery from './publish'

const createHtml = ({
  name,
  list,
  listIndex,
  btnText,
  onsubmit
}) => {

  let itemList = ''
  for (let i = 0; i < list.length; i++) {
    itemList += createLotteryItem({
      isAct: i === listIndex,
      image: list[i].image,
      label: list[i].label,
      style: i > 5 ? "margin-bottom: 0;" : ""
    })
  }

  const res =
    `
    <div class="lottery__box--list">
      <div class="lottery__list lattice__lottery__box">
        ${itemList}
      </div>
      <div class="lottery__btn">
        ${createLotteryButton({
          label: btnText,
          onsubmit,
          className: "list",
          name,
        })}
      </div>
    </div>
  `

  return res
}

class LotteryList extends Lottery {
  constructor(el, ops) {
    super()

    this.options = this.defaultOption(ops)

    if (el.indexOf('#') === 0) {
      this.el = document.getElementById(el)
    } else if (el.indexOf('.') === 0) {
      this.el = document.querySelector(el)
    }

    this.updateView()
  }

  updateView() {
    if (this.el) {
      this.el.innerHTML = createHtml({
        name: this.name,
        list: this.options._list,
        listIndex: this.listIndex,
        btnText: this.options.btnText,
        onsubmit: this.options.onsubmit,
      })
    }
  }
}

export default LotteryList