/*
Copyright 2017 Bitnami.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import StatusCodes from 'utils/StatusCodes'
import Qs from 'qs'
import _ from 'lodash'
const CONFIG = {
  server_host: __SERVER_HOST__,
  cors_proxy_port: __CORS_PROXY_PORT__
}
export default class Api {

  static apiFetch({ url, method, body, dataUrl, cluster, entity }) {
    let { url: URL, headers } = this.updateParams({ url, method, body, dataUrl, cluster, entity })

    URL = encodeURI(URL)
    if (__DEV__) {
      URL = `${'http://'}${CONFIG.server_host}:${CONFIG.cors_proxy_port}/${URL}` // proxied url for CORS
    }

    return fetch(URL, {
      method,
      headers,
      body: _.isEmpty(body) ? undefined : JSON.stringify(body)
    }).then((response = {}) => {
      console.log(`[Api] - ${URL}`, response)
      if (typeof response.text !== 'function') {
        const t = response.text
        response.text = () => new Promise(resolve => {
          resolve(t)
        })
      }
      if (!response.ok) {
        return response.text().then(t => {
          return this.handleError(Api.parseJSON(t))
        })
      }
      // avoid error when the server doesn't return json
      if (response.status === 404) {
        return {}
      }
      return response.text()
    }).then((text) => {
      if (typeof text !== 'string' || text.trim() === '') {
        return {}
      }
      const json = Api.parseJSON(text)
      if (json) { return json }
      return text
    }).then((json) => {
      return json
    }).catch((error) => {
      return this.handleError(error, url)
    })
  }

  static parseJSON(text) {
    try {
      return JSON.parse(text)
    } catch (e) {
      return null
    }
  }

  static handleError(error) {
    return Promise.reject(new Error(error.message))
  }

  static post(url, body = {}, cluster, entity) {
    return Api.apiFetch({ method: 'post', url, body, cluster, entity })
  }

  static get(url, dataUrl, cluster, entity) {
    return Api.apiFetch({ method: 'get', url, dataUrl, cluster, entity })
  }

  static put(url, body, cluster, entity) {
    return Api.apiFetch({ method: 'put', url, body, cluster, entity })
  }

  static patch(url, body, cluster, entity) {
    return Api.apiFetch({ method: 'patch', url, body, cluster, entity })
  }

  static delete(url, body, cluster, entity) {
    return Api.apiFetch({ method: 'delete', url, body, cluster, entity })
  }

  static getStatus(response = {}) {
    let status
    switch (response.status) {
      case StatusCodes.PAYMENT_REQUIRED:
        status = 'payment-required'
        break
      case StatusCodes.NOT_FOUND:
        status = 'not-found'
        break
      case StatusCodes.UNAVAILABLE:
        status = 'unavailable'
        break
      default:
        status = 'failure'
    }
    return status
  }

  static updateParams({ url, method, dataUrl, cluster, entity }) {
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (cluster && url.indexOf('http') === -1) {
      let path = ''
      if (url.indexOf('/api/v1') === -1 && url.indexOf('/apis/extensions') === -1) {
        let api = '/api/v1'
        if (url.indexOf('/functions') === 0) {
          api = '/apis/k8s.io/v1'
        } else if (url.indexOf('/deployments') === 0 ||
          url.indexOf('/ingresses') === 0 ||
          url.indexOf('/replicasets') === 0) {
          api = '/apis/extensions/v1beta1'
        }
        let namespace
        if (url.indexOf('/nodes') === -1) {
          namespace = entity ? entity.metadata.namespace : cluster.currentNamespace
        }
        path = namespace ? `${api}/namespaces/${namespace}` : api
      }
      url = `${cluster.url}${path}${url}`
    }

    // if (cluster) {
    //   if (cluster.get('token')) {
    //     headers.Authorization = 'Bearer ' + cluster.get('token')
    //   } else if (cluster.get('username')) {
    //     headers.Authorization = 'Basic ' + base64.encode(`${cluster.get('username')}:${cluster.get('password')}`)
    //   }
    // }

    if (dataUrl && Object.keys(dataUrl).length !== 0) {
      const params = Qs.stringify(dataUrl, { arrayFormat: 'repeat' })
      url = `${url}?${params}`
    }
    return { url, headers }
  }

}
