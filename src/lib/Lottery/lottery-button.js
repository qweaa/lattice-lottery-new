const createLotteryButton = ({
  name,
  label,
  onsubmit,
  className,
}) => {
  const btnClickName = `lotteryBtn_${name}`
  if (!window[btnClickName]) {
    window[btnClickName] = function () {
      if (typeof onsubmit === 'function') onsubmit()
    }
  }

  const res = `
    <div onclick="${btnClickName}()" class="lattice__lottery__btn lottery__button ${className}">
      ${label ? `<span>${label}</span>` : ''}
    </div>
  `

  return res
}

export default createLotteryButton