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
import type { Cluster, Pod, ReduxAction } from 'utils/Types'
import Api from 'utils/Api'

type State = {
  list: Array<Pod>,
  selected?: Pod,
  logs: {},
  loading: boolean
}

// ------------------------------------
// Constants
// ------------------------------------
export const PODS_SELECT = 'PODS_SELECT'
export const PODS_FETCH = 'PODS_FETCH'
export const PODS_LOADING = 'PODS_LOADING'
export const PODS_LOGS = 'PODS_LOGS'

// ------------------------------------
// Actions
// ------------------------------------
export function podsSelect(pod: Pod) {
  return {
    type: PODS_SELECT,
    value: pod
  }
}
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
export const initialState = {
  list: [],
  logs: {},
  loading: false
}

export default function podsReducer(state: State = initialState, action: ReduxAction) {
  switch (action.type) {
    case PODS_SELECT:
      return Object.assign({}, state, {
        selected: action.value
      })
    case PODS_FETCH:
      const newPods = action.list
      let { selected } = state
      if (selected) {
        selected = _.find(newPods, ['metadata.uid', selected.metadata.uid])
      }
      return Object.assign({}, state, {
        list: action.list,
        loading: false,
        selected
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
