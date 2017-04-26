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
import type { Cluster, Pod, ReduxAction } from 'utils/Types'
import Api from 'utils/Api'

type State = {
  list: Array<Pod>,
  logs: {},
  loading: boolean
}

// ------------------------------------
// Constants
// ------------------------------------
export const PODS_FETCH = 'PODS_FETCH'
export const PODS_LOADING = 'PODS_LOADING'
export const PODS_LOGS = 'PODS_LOGS'

// ------------------------------------
// Actions
// ------------------------------------
export function podsFetch(cluster: Cluster) {
  return (dispatch: () => void) => {
    dispatch({
      type: PODS_LOADING,
      value: true
    })
    return Api.get('/pods', {}, cluster).then(result => {
      dispatch({
        type: PODS_FETCH,
        list: result.items
      })
    }).catch(e => {
      dispatch({
        type: PODS_FETCH,
        list: []
      })
    })
  }
}

export function podsFetchLogs(cluster: Cluster, pod: Pod) {
  return (dispatch: () => void) => {
    dispatch({
      type: PODS_LOADING,
      value: true
    })
    return Api.get(`/pods/${pod.metadata.name}/log`, {}, cluster, pod).then(result => {
      dispatch({
        type: PODS_LOGS,
        list: result,
        value: pod
      })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: [],
  logs: {},
  loading: false
}

export default function podsReducer(state: State = initialState, action: ReduxAction) {
  switch (action.type) {
    case PODS_FETCH:
      return Object.assign({}, state, {
        list: action.list,
        loading: false
      })
    case PODS_LOGS:
      const logs = state.logs
      const pod = action.value
      logs[pod.metadata.uid] = action.list
      return Object.assign({}, state, {
        logs
      })
    case PODS_LOADING:
      return Object.assign({}, state, {
        loading: action.value
      })
    default:
      return state
  }
}
