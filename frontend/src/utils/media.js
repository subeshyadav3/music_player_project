import { API_BASE_URL } from '../api/client'

const backendRoot = API_BASE_URL.replace(/\/api\/v1\/?$/, '')

const toMediaUrl = (pathOrUrl) => {
  if (!pathOrUrl) {
    return ''
  }

  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  if (pathOrUrl.startsWith('/media/')) {
    return `${backendRoot}${pathOrUrl}`
  }

  if (pathOrUrl.startsWith('media/')) {
    return `${backendRoot}/${pathOrUrl}`
  }

  if (pathOrUrl.startsWith('/')) {
    return `${backendRoot}${pathOrUrl}`
  }

  return `${backendRoot}/media/${pathOrUrl}`
}

export { toMediaUrl }
