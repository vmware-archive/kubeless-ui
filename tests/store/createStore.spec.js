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
import { expect } from 'chai'

describe('(Store) createStore', () => {
  let store

  beforeAll(() => {
    store = createStore()
  })

  it('should have an empty asyncReducers object', () => {
    expect(store.asyncReducers).to.be.an('object')
    expect(store.asyncReducers).to.be.empty
  })

  describe('(Location)', () => {
    it('store should be initialized with Location state', () => {
      const location = {
        pathname : '/echo'
      }
      store.dispatch({
        type    : 'LOCATION_CHANGE',
        payload : location
      })
      expect(store.getState().location).to.deep.equal(location)
    })
  })
})
