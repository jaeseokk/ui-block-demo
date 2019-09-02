const colorClasses = ['primary', 'secondary', 'tertiary', 'quaternary']
const containerEl = document.querySelector('.container')

const bindEvents = () => {
  document.querySelector('.my-input').addEventListener('input', async (e) => {
    const textValue = e.target.value
    const length = textValue ? textValue.length : 0
    let result = ''

    if (!length) {
      containerEl.innerHTML = result
      return
    }

    const n = Math.min(Math.pow(length, 2), 100)
    const height = containerEl.clientHeight / n
    const width = containerEl.clientWidth / n
    const counts = n * n

    for (let i = 0; i < counts; i++) {
      const color =
        colorClasses[Math.floor(Math.random() * colorClasses.length)]
      result += `<div style="height: ${height}px; width: ${width}px;" class="dot ${color}"></div>`
    }

    containerEl.innerHTML = result
  })
}

bindEvents()
