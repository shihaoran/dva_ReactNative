export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export function padNumber(num, fill) {
  const len = (`${num}`).length
  return (Array(
    fill > len ? fill - len + 1 || 0 : 0,
  ).join(0) + num)
}
