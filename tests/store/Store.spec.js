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
import createStore from 'store/createStore'
import { initialState as CLUSTER_INITIAL_STATE } from 'store/clusters'
import { initialState as FUNCS_INITIAL_STATE } from 'store/funcs'
import { initialState as PODS_INITIAL_STATE } from 'store/pods'
import { initialState as LOCATION_INITIAL_STATE } from 'store/location'

describe('(Store) createStore', () => {
  let store

  beforeAll(() => {
    store = createStore()
    store.dispatch({
      type: 'FAKETYPE'
    })
  })

  it('should have an empty asyncReducers object', () => {
    expect(typeof store.asyncReducers).toBe('object')
    expect(store.asyncReducers).toEqual({})
  })

  describe('(Location)', () => {
    it('store should be initialized with initialState', () => {
      expect(store.getState().location).toEqual(LOCATION_INITIAL_STATE)
    })
  })

  describe('(Clusters)', () => {
    it('store should be initialized with initialState', () => {
      store.dispatch({
        type: 'FAKETYPE'
      })
      expect(store.getState().clusters).toEqual(CLUSTER_INITIAL_STATE)
    })
  })

  describe('(Funcs)', () => {
    it('store should be initialized with initialState', () => {
      store.dispatch({
        type: 'FAKETYPE'
      })
      expect(store.getState().funcs).toEqual(FUNCS_INITIAL_STATE)
    })
  })

  describe('(Pods)', () => {
    it('store should be initialized with initialState', () => {
      store.dispatch({
        type: 'FAKETYPE'
      })
      expect(store.getState().pods).toEqual(PODS_INITIAL_STATE)
    })
  })
})
