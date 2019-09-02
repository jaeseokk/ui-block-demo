const containerEl = document.querySelector('.container')
const worker = new Worker('worker.js')

const bindEvents = () => {
  document.querySelector('.my-input').addEventListener('input', (e) => {
    const textValue = e.target.value
    const length = textValue ? textValue.length : 0

    if (!length) {
      containerEl.innerHTML = ''
      return
    }

    worker.postMessage({
      length,
      clientHeight: containerEl.clientHeight,
      clientWidth: containerEl.clientWidth,
    })
  })

  worker.onmessage = (e) => {
    containerEl.innerHTML = e.data.message
  }
}

bindEvents()
