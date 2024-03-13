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
  constructor(options) {
    super()

    this.init('list', options, createHtml)
  }
}

export default LotteryList