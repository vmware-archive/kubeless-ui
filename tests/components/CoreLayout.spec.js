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
import React from 'react'
import store from 'store/Store'
import { initialState } from 'store/alert'
import CoreLayoutContainer from 'components/CoreLayout/CoreLayoutContainer'
import CoreLayout from 'components/CoreLayout/CoreLayout'

describe('(Component) CoreLayout', () => {
  let _component
  let _container

  beforeEach(() => {
    _container = shallow(
      <CoreLayoutContainer store={store}>
        <h1 className='child'>Child</h1>
      </CoreLayoutContainer>
    )
    _component = shallow(
      <CoreLayout onCloseAlert={() => {}}>
        <h1 className='child'>Child</h1>
      </CoreLayout>
    )
  })

  it('Should render as a <div>.', () => {
    expect(_component.type()).toBe('div')
  })

  it('Container should have required props', () => {
    expect(_container.prop('alertMessage')).toBe(initialState.message)
    expect(_container.prop('onCloseAlert')).toBeInstanceOf(Function)
  })
})
