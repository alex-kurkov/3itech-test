const encode = input => [...input]
  .map((x, i) => [x.charCodeAt(0), i])
  .sort()
  .flatMap(x => x)
  .join('.')
  .match(/./g)
  .flatMap((x, i) => new Array(x == '.' ? 1 : 2 + x * 2).fill((1 + i) % 2))
  .join('')
  .replace(/(([01])\2*)/g, x => `${(+x ? '.' : '-')}${x.length}`)

const decode = input => input
  .replace(/(\.|\-)(\d+)/g, (_, p1, p2) => `${p1 === '.' ? '1' : '0'}`.repeat(+p2))
  .match(/1+|0+/g)
  .map(x => 1 - x.length ? (x.length - 2) / 2 : '.')
  .join('')
  .split('.')
  .reduce((acc, x, i, arr) => i % 2 ? acc : [...acc, [x, arr[i + 1]]], [])
  .sort((a, b) => a[1] - b[1])
  .flatMap(x => String.fromCharCode(x[0]))
  .join('')
