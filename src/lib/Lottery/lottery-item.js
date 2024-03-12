const createLotteryItem = ({
  label,
  image,
  isAct,
  style,
}) => {
  const res =
    `<div style="${style}" class="lattice__lottery__item prize__item ${isAct ? ' lattice__lottery__actItem' : ''}">` +
    (image ? `<img class="prize__item__image" src="${image}" alt="" />` : '') +
    (isAct ? `<div class="prize__item__mask"></div>` : '') +
    (label ? `<span>${label}</span>` : '') +
    `</div>`

  return res;
}

export default createLotteryItem