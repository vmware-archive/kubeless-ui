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
import RuntimeHelper from 'utils/RuntimeHelper'

export default class EntityHelper {

  static updateEntityInList(list: Array<any>, entity: any): Array<any> {
    for (let i = 0; i < list.length; i++) {
      const e = list[i]
      if (e.metadata.uid === entity.metadata.uid) {
        list[i] = entity
        break
      }
    }
    return list
  }

  static deleteEntityInList(list: Array<any>, entity: any): Array<any> {
    return _.remove(list, (e) => {
      return e.metadata.uid !== entity.metadata.uid
    })
  }

  static async functionFromParams(params: {[string]: any}) {
    return {
      kind: 'Function',
      apiVersion: 'kubeless.io/v1beta1',
      metadata: {
        name: params.name,
        namespace: params.namespace || 'default'
      },
      spec: {
        deps: params.deps || '',
        'function': params['function'] || await RuntimeHelper.defaultFunction(params.runtime, params.handler),
        handler: params.handler,
        runtime: params.runtime,
        topic: params.topic || 'kubeless',
        type: params.type || 'HTTP'
      }
    }
  }

  static entityStatus(e) {
    if (e.metadata.deletionTimestamp) {
      return 'Terminating'
    }
    if (e.status.containerStatuses && e.status.containerStatuses.length > 0) {
      const containerStatus = e.status.containerStatuses[0]
      if (containerStatus.state && containerStatus.state.waiting) {
        return containerStatus.state.waiting.reason
      }
    }
    return e.status.phase
  }

}
