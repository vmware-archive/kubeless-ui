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
import Api from 'utils/Api'
import type { File, Cluster, ReduxAction } from 'utils/Types'

type State = {
  list: Array<Cluster>,
  selected?: Cluster,
  loading: boolean
}
// ------------------------------------
// Constants
// ------------------------------------
export const FILES_SELECT = 'FILES_SELECT'
export const FILES_FETCH = 'FILES_FETCH'
export const FILES_LOADING = 'FILES_LOADING'
export const FILES_RUN = 'FILES_RUN'
export const FILES_SAVE = 'FILES_SAVE'

// ------------------------------------
// Actions
// ------------------------------------
export function filesSelect(file: File) {
  return {
    type: FILES_SELECT,
    item: file
  }
}
export function filesLoading(loading: boolean = false) {
  return {
    type: FILES_LOADING,
    loading
  }
}
export function filesFetch(cluster: Cluster) {
  filesLoading(true)
  return (dispatch: () => void) => {
    return Api.get('/functions', {}, cluster).then(result => {
      dispatch({
        type: FILES_FETCH,
        list: result.items
      })
    })
  }
}
export function filesSave(file: File) {
  return {
    type: FILES_SAVE,
    item: file
  }
}
export function filesRun(file: File, body: string) {
  return {
    type: FILES_RUN,
    item: file,
    body
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: [],
  loading: false
}
export default function fileReducer(state: State = initialState, action: ReduxAction) {
  switch (action.type) {
    case FILES_SELECT:
      return Object.assign({}, state, {
        selected: action.item
      })
    case FILES_FETCH:
      return Object.assign({}, state, {
        list: action.list,
        selected: null,
        loading: false
      })
    case FILES_LOADING:
      return Object.assign({}, state, {
        loading: action.item
      })
    case FILES_SAVE:
      return state
    case FILES_RUN:
      return state
    default:
      return state
  }
}
