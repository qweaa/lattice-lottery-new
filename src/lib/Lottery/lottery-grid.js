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

  let beginThreeItem = ''
  for (let i = 0; i < 3; i++) {
    beginThreeItem += createLotteryItem({
      isAct: i === listIndex,
      image: list[i].image,
      label: list[i].label
    })
  }
  let endThreeItem = ''
  for (let i = 4; i < 7; i++) {
    endThreeItem += createLotteryItem({
      isAct: i === listIndex,
      image: list[i].image,
      label: list[i].label
    })
  }

  const res =
    `
    <div class="lottery__box--grid">
      <div class="lattice__lottery__box">
        <div class="lottery__row">
          ${beginThreeItem}
        </div>
        <div class="lottery__row right">
          ${createLotteryItem({
            isAct: 3 === listIndex,
            image: list[3].image,
            label: list[3].label
          })}
          ${createLotteryButton({
            name,
            label: btnText,
            onsubmit,
          })}
          ${createLotteryItem({
            isAct: 7 === listIndex,
            image: list[7].image,
            label: list[7].label
          })}
        </div>
        <div class="lottery__row right">
          ${endThreeItem}
        </div>
      </div>
    </div>
  `

  return res
}

class LotteryGrid extends Lottery {

  constructor(options) {
    super()

    this.init('grid', options, createHtml)
  }
}

export default LotteryGrid