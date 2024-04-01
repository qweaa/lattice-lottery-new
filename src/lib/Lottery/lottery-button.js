const createLotteryButton = ({
  name,
  label,
  onsubmit,
  className,
}) => {
  const btnClickName = `lotteryBtn_${name}`
  if (!window[btnClickName]) {
    window[btnClickName] = function (event, num) {
      console.dir(event)
      console.log(num)
      if (typeof onsubmit === 'function') onsubmit()
    }
  }

  const res = `
    <div onclick="${btnClickName}(this, 123)" class="lattice__lottery__btn lottery__button ${className}">
      ${label ? `<span>${label}</span>` : ''}
    </div>
  `

  return res
}

export default createLotteryButton