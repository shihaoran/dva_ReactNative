
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return true
  }
  return false
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, options)

  const status = checkStatus(response)
  const data = await response.json()
  if (status) {
    return data
  }
  const error = new Error(data)
  error.response = data
  throw error
}
