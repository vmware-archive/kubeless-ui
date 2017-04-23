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
import { expect } from 'chai'
import sinon from 'sinon'

describe('(Internal Module) Location', () => {
  it('Should export a constant LOCATION_CHANGE.', () => {
    expect(LOCATION_CHANGE).to.equal('LOCATION_CHANGE')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(locationReducer).to.be.a('function')
    })

    it('Should initialize with a state of null.', () => {
      expect(locationReducer(undefined, {})).to.equal(null)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = locationReducer(undefined, {})
      expect(state).to.equal(null)
      state = locationReducer(state, { type: '@@@@@@@' })
      expect(state).to.equal(null)

      const locationState = { pathname: '/yup' }
      state = locationReducer(state, locationChange(locationState))
      expect(state).to.equal(locationState)
      state = locationReducer(state, { type: '@@@@@@@' })
      expect(state).to.equal(locationState)
    })
  })

  describe('(Action Creator) locationChange', () => {
    it('Should be exported as a function.', () => {
      expect(locationChange).to.be.a('function')
    })

    it('Should return an action with type "LOCATION_CHANGE".', () => {
      expect(locationChange()).to.have.property('type', LOCATION_CHANGE)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      const locationState = { pathname: '/yup' }
      expect(locationChange(locationState)).to.have.property('payload', locationState)
    })

    it('Should default the "payload" property to "/" if not provided.', () => {
      expect(locationChange()).to.have.property('payload', '/')
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
      expect(updateLocation).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(updateLocation({ dispatch: _dispatchSpy })).to.be.a('function')
    })

    it('Should call dispatch exactly once.', () => {
      updateLocation({ dispatch: _dispatchSpy })('/')
      expect(_dispatchSpy.calledOnce)
    })
  })
})
