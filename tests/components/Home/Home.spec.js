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
import Home from 'components/Home'
import Editor from 'components/Editor'
import TreeView from 'components/TreeView'
import Cluster from 'components/Cluster'
import { shallow } from 'enzyme'

describe('(View) Home', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Home />)
  })

  it('Should render Cluster, Editor and TreeView children', () => {
    expect(_wrapper.contains(<Cluster />)).toBe(true)
    expect(_wrapper.contains(<Editor />)).toBe(true)
    expect(_wrapper.contains(<TreeView />)).toBe(true)
  })
})
