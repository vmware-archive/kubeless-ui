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
import type { ReduxAction } from 'utils/Types'

type State = {
  message: ?string
}

// ------------------------------------
// Constants
// ------------------------------------
export const ALERT_UPDATE = 'ALERT_UPDATE'

// ------------------------------------
// Actions
// ------------------------------------
export function alertUpdate(message: ?string) {
  // return (dispatch)
  return {
    type: ALERT_UPDATE,
    value: message
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  message: null,
  queue: []
}

export default function alertReducer(state: State = initialState, action: ReduxAction) {
  switch (action.type) {
    case ALERT_UPDATE:
      return Object.assign({}, state, {
        message: action.value
      })
    default:
      return state
  }
}
