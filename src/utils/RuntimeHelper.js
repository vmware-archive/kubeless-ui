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
import runtimes from './runtimes'

export default class RuntimeHelper {

  static defaultRuntime() {
    return runtimes[0]
  }
  static getAllRuntimes() {
    return runtimes
  }

  static runtimeToLanguage(runtime: ?string):string {
    const defaultLanguage = this.defaultRuntime().language
    if (!runtime) { return defaultLanguage }
    const runtimeObject = _.find(runtimes, (r) => r.value === runtime)
    return runtimeObject ? runtimeObject.language : defaultLanguage
  }

  static defaultFunction(runtime: string, handler: string):string {
    const runtimeObject = _.find(runtimes, (r) => r.value === runtime)
    if (!runtimeObject) { return '' }
    handler = handler.split('.').length > 0 ? handler.split('.')[1] : 'handler'
    const defaultFunction = runtimeObject.defaultFunction.replace('<<HANDLER>>', handler)
    return defaultFunction
  }

  static runtimeSupportDeps(runtime: ?string):boolean {
    if (!runtime) { return false }
    const runtimeObject = _.find(runtimes, (r) => r.value === runtime)
    return runtimeObject ? runtimeObject.supportDeps : false
  }

  static runtimeDepsFilename(runtime):string {
    const runtimeObject = _.find(runtimes, (r) => r.value === runtime)
    return runtimeObject ? runtimeObject.depsFilename : ''
  }

}
