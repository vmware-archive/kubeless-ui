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
import TestUtils from 'react-addons-test-utils'
import CoreLayout from 'components/CoreLayout/CoreLayout'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<CoreLayout {...props} />)
}

describe('(Layout) Core', function() {
  let _component
  let _props
  let _child

  beforeEach(function() {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children : _child
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render as a <div>.', function() {
    expect(_component.type).to.equal('div')
  })
})
