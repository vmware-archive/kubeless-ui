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
import EntityHelper from 'utils/EntityHelper'
import { alertUpdate } from 'store/alert'
import type { Func, Cluster, ReduxAction } from 'utils/Types'

type State = {
  list: Array<Func>,
  selected?: Cluster,
  runResponse?: string,
  loading: boolean,
  editing: boolean
}
// ------------------------------------
// Constants
// ------------------------------------
export const FUNCS_SELECT = 'FUNCS_SELECT'
export const FUNCS_FETCH = 'FUNCS_FETCH'
export const FUNCS_LOADING = 'FUNCS_LOADING'
export const FUNCS_EDITING = 'FUNCS_EDITING'
export const FUNCS_RUN = 'FUNCS_RUN'
export const FUNCS_SAVE = 'FUNCS_SAVE'
export const FUNCS_CREATE = 'FUNCS_CREATE'
export const FUNCS_DELETE = 'FUNCS_DELETE'

// ------------------------------------
// Actions
// ------------------------------------
export function funcsSelect(func: Func) {
  return {
    type: FUNCS_SELECT,
    value: func
  }
}
export function funcsLoading(loading: boolean = false) {
  return {
    type: FUNCS_LOADING,
    value: loading
  }
}
export function funcsEditing(editing: boolean = false) {
  return {
    type: FUNCS_EDITING,
    value: editing
  }
}
export function funcsFetch(cluster: Cluster) {
  return (dispatch: () => void) => {
    dispatch({
      type: FUNCS_LOADING,
      value: true
    })
    return Api.get('/functions', {}, cluster).then(result => {
      dispatch({
        type: FUNCS_FETCH,
        list: result.items
      })
    }).catch(e => {
      dispatch({
        type: FUNCS_FETCH,
        list: []
      })
    })
  }
}
export function funcsSave(func: Func, cluster: Cluster, params: {}) {
  return (dispatch: () => void) => {
    const data = _.merge(func, params)
    return Api.put(`/functions/${func.metadata.name}`, data, cluster, func).then(result => {
      dispatch({
        type: FUNCS_SAVE,
        value: result
      })
    }).catch(e => {
      dispatch(alertUpdate(e.message))
    })
  }
}

export function funcsCreate(params: any, cluster: Cluster) {
  return (dispatch: () => void) => {
    const entity = EntityHelper.functionFromParams(params)
    return Api.post('/functions', entity, cluster, entity).then(result => {
      dispatch({
        type: FUNCS_CREATE,
        value: result
      })
    }).catch(e => {
      dispatch(alertUpdate(e.message))
    })
  }
}

export function funcsDelete(func: Func, cluster: Cluster) {
  return (dispatch: () => void) => {
    dispatch({
      type: FUNCS_DELETE,
      value: func
    })
    return Api.delete(`/functions/${func.metadata.name}`, {}, cluster, func).catch(e => {
      dispatch(alertUpdate(e.message))
    })
  }
}

export function funcsRun(func: Func, data: ?any, cluster: Cluster, method: ?string = 'get') {
  return (dispatch: () => void) => {
    dispatch({
      type: FUNCS_RUN,
      value: null
    })
    let _call = Api.get
    if (method === 'post') {
      _call = Api.post
    }
    return _call(`/api/v1/proxy/namespaces/${func.metadata.namespace}/services/${func.metadata.name}`,
      data || {}, cluster, func).then(result => {
        dispatch({
          type: FUNCS_RUN,
          value: result
        })
      }).catch(e => {
        dispatch({
          type: FUNCS_RUN,
          value: e.message
        })
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  list: [
    {
      kind: 'Function',
      metadata: {
        uid: 'uid1',
        name: 'test1',
        namespace: 'default'
      },
      spec: {
        'function': '',
        runtime: 'javascript',
        handler: 'test1.handler',
        type: 'HTTP'
      }
    }
  ],
  loading: false,
  editing: false
}

export default function funcsReducer(state: State = initialState, action: ReduxAction) {
  switch (action.type) {
    case FUNCS_SELECT:
      return Object.assign({}, state, {
        selected: action.value,
        runResponse: null,
        editing: false
      })
    case FUNCS_FETCH:
      return Object.assign({}, state, {
        list: action.list,
        selected: null,
        loading: false
      })
    case FUNCS_LOADING:
      return Object.assign({}, state, {
        loading: action.value
      })
    case FUNCS_EDITING:
      return Object.assign({}, state, {
        editing: action.value
      })
    case FUNCS_SAVE:
      return Object.assign({}, state, {
        list: EntityHelper.updateEntityInList(state.list, action.value),
        selected: action.value
      })
    case FUNCS_CREATE:
      const list = state.list
      list.push(action.value)
      return Object.assign({}, state, {
        list,
        selected: action.value
      })
    case FUNCS_DELETE:
      return Object.assign({}, state, {
        list: EntityHelper.deleteEntityInList(state.list, action.value),
        selected: null
      })
    case FUNCS_RUN:
      return Object.assign({}, state, {
        runResponse: action.value
      })
    default:
      return state
  }
}
