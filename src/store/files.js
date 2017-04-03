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
// ------------------------------------
// Constants
// ------------------------------------
export const FILE_SELECT = 'FILE_SELECT'
export const FILE_LOADING = 'FILE_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
export function fileSelect(file) {
  return {
    type: FILE_SELECT,
    file: file
  }
}
export function fileLoading(loading = false) {
  return {
    type: FILE_LOADING,
    loading: loading
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: [
    { id: 'id1', name: 'foo.py', content: `
def foo(context):
  return context.json
` },
    { id: 'id2', name: 'bar.js', content: `
function bar(context) {
  return context.json;
}` }
  ],
  selected: null,
  loading: false
}
export default function fileReducer(state = initialState, action) {
  switch (action.type) {
    case FILE_SELECT:
      return Object.assign({}, state, {
        selected: action.file
      })
    case FILE_LOADING:
      return Object.assign({}, state, {
        loading: action.loading
      })
    default:
      return state
  }
}
