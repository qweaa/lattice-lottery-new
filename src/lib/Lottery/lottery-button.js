const createLotteryButton = ({
  name,
  label,
  onsubmit,
  className,
}) => {
  if (!window[name]) {
    window[name] = function () {
      if (typeof onsubmit === 'function') onsubmit()
    }
  }

  const res = `
    <div onclick="${name}()" class="lattice__lottery__btn lottery__button ${className}">
      ${label ? `<span>${label}</span>` : ''}
    </div>
  `

  return res
}

export default createLotteryButton