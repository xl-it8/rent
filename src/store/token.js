export const setItem = (key, data) => {
  if (typeof data === 'object') {
    window.localStorage.setItem(key, JSON.stringify(data))
  } else {
    window.localStorage.setItem(key, data)
  }
}

export const getItem = (key) => {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}

export const removeItem = (key) => {
  return window.localStorage.removeItem(key)
}

export const clearItem = () => {
  return window.localStorage.clear()
}
