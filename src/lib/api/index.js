import R        from 'ramda'
import Axios    from 'axios'

import ApiMap from './api-map.js'

const KEY_REGEX = /:[_0-9a-zA-Z]*/g
const INDEX_AFTER_COLON = 1


class api {
  constructor() {
    this.baseUrl = this._getBaseUrl(process.env.NODE_ENV)
  }

  _getBaseUrl(env) {
    return 'http://yourdomain.com/'
  }

  _keys(path) {
    return R.match(KEY_REGEX)(path)
  }

  _parseKeys (path, keys) {
    const swapKeyWithValue = (acc, val) => R.compose(
      R.replace(val, R.__, acc),
      R.prop(R.__, keys),
      (val) => val.substr(INDEX_AFTER_COLON),
    )(val)

    //TODO
    // throw err if path requires keys, but keys are not provided
    return R.reduce(swapKeyWithValue, path, this._keys(path))
  }

  _parseQuery(url, query) {
    const query_url = url.concat('?')
    //remove undefined field in query
    const query_list = R.toPairs(JSON.parse(JSON.stringify(query)))
    const appendQuery = (acc, val) => {
      let lastChar = acc.charAt(acc.length - 1)
      if (lastChar === '?')
        return acc.concat(val[0], '=', val[1])
      else
        return acc.concat('&', val[0], '=', val[1])
    }

    return R.reduce(appendQuery, query_url, query_list)
  }

  _getFullPath(pathFromMap, {keys, query}) {
    let path = this._parseKeys(pathFromMap, keys)
    if (query)
      path = this._parseQuery(path, query)

    return path
  }

  axiosInstance(path) {
    const baseURL = this.baseUrl

    if (R.test(/^\/api\/v1/)(path)) {
      const Authorization = 'Bearer ' + localStorage.getItem('access_token')

      return Axios.create({
        baseURL,
        withCredentials: true,
        headers: { Authorization },
      })
    } else {
      return Axios.create({baseURL})
    }
  }

  _getPath(pathName) {
    if (!ApiMap[pathName])
      throw new Error("Cannot find a path by the given [pathName]: " + pathName)

    return ApiMap[pathName]
  }

  get(pathName, { keys, query } = {}) {
    const path = this._getFullPath(this._getPath(pathName), {keys, query})

    return this
      .axiosInstance(path)

      .get(path)
  }

  post(pathName, { keys, query, body } = {}) {
    const path = this._getFullPath(this._getPath(pathName), {keys, query})

    return Bluebird.resolve(this.axiosInstance(path)
      .post(path, body)
    )
  }

  put(pathName, { keys, query, body } = {}) {
    const path = this._getFullPath(this._getPath(pathName), {keys, query})

    return Bluebird.resolve(this.axiosInstance(path)
      .put(path, body)
    )
  }

}

export default new api()
