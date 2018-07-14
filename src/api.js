// fetch with GET does not allow body data
export function getApi (url) {
  return fetch(url)
    .then(response => response.json())
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

// fetch with POST and others (DELETE, etc.)
export function callApi (url, data = {}, method = 'POST') {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(response => response.json())
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
