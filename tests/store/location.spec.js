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
import {
  LOCATION_CHANGE,
  locationChange,
  updateLocation,
  default as locationReducer
} from 'store/location'
import sinon from 'sinon'

describe('(Internal Module) Location', () => {
  it('Should export a constant LOCATION_CHANGE.', () => {
    expect(LOCATION_CHANGE).toEqual('LOCATION_CHANGE')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(typeof locationReducer).toBe('function')
    })

    it('Should initialize with a state of null.', () => {
      expect(locationReducer(undefined, {})).toEqual(null)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = locationReducer(undefined, {})
      expect(state).toEqual(null)
      state = locationReducer(state, { type: '@@@@@@@' })
      expect(state).toEqual(null)

      const locationState = { pathname: '/yup' }
      state = locationReducer(state, locationChange(locationState))
      expect(state).toEqual(locationState)
      state = locationReducer(state, { type: '@@@@@@@' })
      expect(state).toEqual(locationState)
    })
  })

  describe('(Action Creator) locationChange', () => {
    it('Should be exported as a function.', () => {
      expect(typeof locationChange).toBe('function')
    })

    it('Should return an action with type "LOCATION_CHANGE".', () => {
      expect(locationChange().type).toEqual(LOCATION_CHANGE)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      const locationState = { pathname: '/yup' }
      expect(locationChange(locationState).payload).toEqual(locationState)
    })

    it('Should default the "payload" property to "/" if not provided.', () => {
      expect(locationChange().payload).toEqual('/')
    })
  })

  describe('(Specialized Action Creator) updateLocation', () => {
    let _globalState
    let _dispatchSpy

    beforeEach(() => {
      _globalState = {
        location : locationReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          location : locationReducer(_globalState.location, action)
        }
      })
    })

    it('Should be exported as a function.', () => {
      expect(typeof updateLocation).toBe('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(typeof updateLocation({ dispatch: _dispatchSpy })).toBe('function')
    })

    it('Should call dispatch exactly once.', () => {
      updateLocation({ dispatch: _dispatchSpy })('/')
      expect(_dispatchSpy.calledOnce)
    })
  })
})
