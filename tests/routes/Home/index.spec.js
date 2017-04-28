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
import HomeRoute from 'routes/Home'

describe('(Route) Home', () => {
  let _component
  let _wrapper

  beforeEach(() => {
    _component = HomeRoute.component
    _wrapper = shallow(<_component />)
  })

  it('Should return a route configuration object', () => {
    expect(typeof HomeRoute).toBe('object')
  })

  it('Should define a route component', () => {
    expect(_wrapper.type()).toBe('div')
  })
})
