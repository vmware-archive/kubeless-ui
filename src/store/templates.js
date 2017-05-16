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
import type { Template, ReduxAction } from 'utils/Types'
import GithubApi from 'utils/GithubApi'

type State = {
  list: Array<Template>,
  loading: boolean
}

// ------------------------------------
// Constants
// ------------------------------------
export const TEMPLATES_FETCH = 'TEMPLATES_FETCH'
export const TEMPLATES_LOADING = 'TEMPLATES_LOADING'

// ------------------------------------
// Actions
// ------------------------------------

export function templatesFetch() {
  return (dispatch: () => void) => {
    dispatch({
      type: TEMPLATES_LOADING,
      value: true
    })
    return GithubApi.fetchTemplates().then(result => {
      console.log('-', result)
      dispatch({
        type: TEMPLATES_FETCH,
        list: result
      })
    }).catch(e => {
      dispatch({
        type: TEMPLATES_FETCH,
        list: []
      })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  list: [
    { id: '1', name: 'Template A', description: 'Description A', files: [] },
    { id: '2', name: 'Template B', description: 'Description B', files: [] },
    { id: '3', name: 'Template C', description: 'Description C', files: [] },
    { id: '4', name: 'Template D', description: 'Description D', files: [] },
    { id: '5', name: 'Template E', description: 'Description E', files: [] },
    { id: '6', name: 'Template F', description: 'Description F', files: [] }
  ],
  loading: false
}

export default function templatesReducer(state: State = initialState, action: ReduxAction) {
  switch (action.type) {
    case TEMPLATES_FETCH:
      return Object.assign({}, state, {
        list: action.list,
        loading: false
      })
    case TEMPLATES_LOADING:
      return Object.assign({}, state, {
        loading: action.value
      })
    default:
      return state
  }
}
