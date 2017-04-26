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
import type { Cluster, ReduxAction } from 'utils/Types'

type State = {
  cluster: Cluster
}

// ------------------------------------
// Constants
// ------------------------------------
export const CLUSTER_SELECT = 'CLUSTER_SELECT'
export const CLUSTER_LOADING = 'CLUSTER_LOADING'
export const CLUSTER_EDIT = 'CLUSTER_EDIT'

// ------------------------------------
// Actions
// ------------------------------------
export function clusterSelect(cluster: Cluster) {
  return {
    type: CLUSTER_SELECT,
    value: cluster
  }
}
export function clusterEdit(cluster: Cluster) {
  return {
    type: CLUSTER_EDIT,
    value: cluster
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  cluster: {
    id: 'id1',
    name: 'localhost',
    url: 'http://localhost:8080'
  }
}

export default function clusterReducer(state: State = initialState, action: ReduxAction) {
  switch (action.type) {
    case CLUSTER_SELECT:
      return Object.assign({}, state, {
        cluster: action.value
      })
    case CLUSTER_EDIT:
      return Object.assign({}, state, {
        cluster: action.value
      })
    default:
      return state
  }
}
