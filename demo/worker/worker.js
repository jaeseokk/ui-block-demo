self.addEventListener("message", e => {
  const { length, clientHeight, clientWidth } = e.data
  postMessage({
    message: makeDots({ length, clientHeight, clientWidth })
  });
});

const colorClasses = ['primary', 'secondary', 'tertiary', 'quaternary']

const makeDots = ({ length, clientHeight, clientWidth }) => {
  const n = Math.min(Math.pow(length, 2), 100)
  const count = n * n
  const height = clientHeight / n
  const width = clientWidth / n

  let result = '';

  for (let i = 0; i < count; i++) {
    const color = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    result += `<div style="height: ${height}px; width: ${width}px;" class="dot ${color}"></div>`
  }

  return result;
};
