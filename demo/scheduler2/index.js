import createScheduler from '../node_modules/@jaeseokk/chunk-scheduler/dist/index.js'

const CHUNK_UNIT = 300
const colorClasses = ['primary', 'secondary', 'tertiary', 'quaternary']
const containerEl = document.querySelector('.container')

function* chunkGenerator(length) {
  let result = ''

  if (!length) {
    return result
  }

  const n = Math.min(Math.pow(length, 2), 100)
  const height = containerEl.clientHeight / n
  const width = containerEl.clientWidth / n
  const counts = n * n
  const useChunk = CHUNK_UNIT > counts
  const chunkCounts = useChunk ? 1 : counts / CHUNK_UNIT
  const unitCounts = useChunk ? counts : CHUNK_UNIT

  for (let i = 0; i < chunkCounts; i++) {
    for (let j = 0; j < unitCounts; j++) {
      const color =
        colorClasses[Math.floor(Math.random() * colorClasses.length)]
      result += `<div style="height: ${height}px; width: ${width}px;" class="dot ${color}"></div>`
    }

    yield
  }

  return result
}

const scheduler = createScheduler()

const bindEvents = () => {
  document.querySelector('.my-input').addEventListener('input', async (e) => {
    if (scheduler.isRunning()) {
      scheduler.cancel()
    }

    const textValue = e.target.value
    const length = textValue ? textValue.length : 0
    const result = await scheduler.runChunks(chunkGenerator(length))

    containerEl.innerHTML = result
  })
}

bindEvents()
