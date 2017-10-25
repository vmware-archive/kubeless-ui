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
import React, { Component } from 'react'
import _ from 'lodash'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import type { Func } from 'utils/Types'
import RuntimeHelper from 'utils/RuntimeHelper'
import './FuncParams.scss'

const initialState = {
  name: '',
  handler: '',
  runtime: RuntimeHelper.defaultRuntime().value,
  type: 'HTTP',
  deps: ''
}
export default class FuncParams extends Component {

  props: {
    func?: Func
  }

  state = initialState

  componentWillMount() {
    const { func } = this.props
    if (func) {
      this.setState({
        name: func.metadata.name,
        handler: func.spec.handler,
        runtime: func.spec.runtime,
        type: func.spec.type,
        deps: func.spec.deps
      })
    } else {
      this.setState(initialState)
    }
  }

  getParams(): { [string]: string } {
    return this.state
  }

  render() {
    const runtimes = RuntimeHelper.getAllRuntimes().map(r => {
      return (
        <option key={r.value} value={r.value}>
          {r.label}
        </option>
      )
    })
    const types = [
      <option key={1} value='HTTP'>
        HTTP
      </option>,
      <option key={2} value='PubSub'>
        PubSub
      </option>
    ]
    return (
      <div className='funcParams padding-v-big'>
        <div className='row'>
          <div className='col-3'>
            <label htmlFor='name'>Function name</label>
            <input
              name='name'
              id='name'
              placeholder='hello'
              value={this.state.name}
              disabled={!!this.props.func}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <label htmlFor='handler'>Handler</label>
            <input
              name='handler'
              id='handler'
              placeholder='hello.world'
              value={this.state.handler}
              onChange={e => this.setState({ handler: e.target.value })}
            />
          </div>
          <div className='col-3'>
            <label htmlFor='type'>Type</label>
            <select name='type' value={this.state.type} onChange={e => this.setState({ type: e.target.value })}>
              {types}
            </select>
            <label htmlFor='runtime'>Runtime</label>
            <select
              name='runtime'
              value={this.state.runtime}
              onChange={e => this.setState({ runtime: e.target.value, deps: '' })}
            >
              {runtimes}
            </select>
          </div>
        </div>
        {this.renderDependencies()}
      </div>
    )
  }

  renderDependencies() {
    if (this.state.runtime.indexOf('python') !== -1) {
      return (
        <div className='depsContainer'>
          <label>Dependencies</label>
          <TagsInput
            value={_.words(this.state.deps, /[^,\n ]+/g)}
            inputProps={{ placeholder: 'Add dependencies' }}
            onChange={deps => this.setState({ deps: deps.join('\n') })}
          />
        </div>
      )
    }
    const depFileName = RuntimeHelper.runtimeDepsFilename(this.state.runtime)
    return (
      <div className='depsContainer'>
        <label>Dependencies ({depFileName})</label>
        <textarea placeholder={`Paste ${depFileName}`} onChange={e => this.setState({ deps: e.target.value })}>
          {this.state.deps}
        </textarea>
      </div>
    )
  }

}
