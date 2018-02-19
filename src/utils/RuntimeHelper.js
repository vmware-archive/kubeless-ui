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

// @flow
import _ from 'lodash'
import Api from 'utils/Api'
import { initialState } from 'store/clusters'

const namespace = _.get(process.env, 'KUBELESS_NAMESPACE', 'kubeless')

function defaultFunction(runtime) {
  let result = ''
  switch (runtime) {
    case 'nodejs':
      result = `
module.exports = {
  <<HANDLER>>: function(req, res) {
     res.end("Hello World");
  }
};
`
      break
    case 'python':
      result = `
def <<HANDLER>>():
    return "Hello World"
`
      break
    case 'ruby':
      result = `
def <<HANDLER>>(request)
  "Hello World"
end
`
  }
  return result
}

export default class RuntimeHelper {

  static _runtimes = []

  static _getRuntimesApiCall() {
    return Api.get(
      `/api/v1/namespaces/${namespace}/configmaps/kubeless-config`,
      {},
      initialState.cluster
    )
  }

  static async getAllRuntimes() {
    if (_.isEmpty(this._runtimes)) {
      const config = await this._getRuntimesApiCall()
      const runtimes = JSON.parse(config.data['runtime-images'])
      _.each(runtimes, runtime => {
        _.each(runtime.versions, async (version) => {
          this._runtimes.push({
            value: `${runtime.ID}${version.version}`,
            label: `${runtime.ID} (${version.version})`,
            language: runtime.ID,
            depsFilename: runtime.depName,
            defaultFunction: await defaultFunction(runtime.ID)
          })
        })
      })
      return this._runtimes
    } else {
      return this._runtimes
    }
  }

  static async runtimeToLanguage(runtime: ?string):string {
    const runtimes = await this.getAllRuntimes()
    const defaultLanguage = runtimes[0].language
    if (!runtime) { return defaultLanguage }
    const runtimeObject = _.find(runtimes, (r) => r.value === runtime)
    return runtimeObject ? runtimeObject.language : defaultLanguage
  }

  static async defaultFunction(runtime: string, handler: string):string {
    const runtimes = await this.getAllRuntimes()
    const runtimeObject = _.find(runtimes, (r) => r.value === runtime)
    if (!runtimeObject) { return '' }
    handler = handler.split('.').length > 0 ? handler.split('.')[1] : 'handler'
    const defaultFunction = runtimeObject.defaultFunction.replace('<<HANDLER>>', handler)
    return defaultFunction
  }

}
