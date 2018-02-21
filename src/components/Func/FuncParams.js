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
  runtime: '',
  type: 'HTTP',
  deps: ''
}
export default class FuncParams extends Component {

  props: {
    func?: Func
  }

  constructor(props) {
    super(props)
    const { func } = props
    if (func) {
      this.state = {
        name: func.metadata.name,
        handler: func.spec.handler,
        runtime: func.spec.runtime,
        type: func.spec.type,
        deps: func.spec.deps
      }
    } else {
      this.state = initialState
    }
  }

  async componentDidMount() {
    const r = await RuntimeHelper.getAllRuntimes()
    this.setState({
      runtimes: r
    })
  }

  getParams(): { [string]: string } {
    return this.state
  }

  handleChangeProperty = (property: string, value: any) => {
    this.setState({ [property]: value })
  }

  render() {
    let runtimes = <option> Loading </option>
    if (this.state.runtimes) {
      runtimes = this.state.runtimes.map(r => {
        return (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        )
      })
    }
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
              onChange={e => this.handleChangeProperty('name', e.target.value)}
            />
            <label htmlFor='handler'>Handler</label>
            <input
              name='handler'
              id='handler'
              placeholder='hello.world'
              value={this.state.handler}
              onChange={e => this.handleChangeProperty('handler', e.target.value)}
            />
          </div>
          <div className='col-3'>
            <label htmlFor='type'>Type</label>
            <select
              name='type'
              value={this.state.type}
              onChange={e => this.handleChangeProperty('type', e.target.value)}
            >
              {types}
            </select>
            <label htmlFor='runtime'>Runtime</label>
            <select
              name='runtime'
              value={this.state.runtime}
              onChange={e => {
                this.handleChangeProperty('runtime', e.target.value)
                this.handleChangeProperty('deps', '')
              }}
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
            onChange={deps => this.handleChangeProperty('deps', deps.join('\n'))}
          />
        </div>
      )
    }
    const runtimeObject = _.find(this.state.runtimes, (r) => r.value === this.state.runtime)
    const depFileName = runtimeObject ? runtimeObject.depsFilename : ''
    return (
      <div className='depsContainer'>
        <label>Dependencies ({depFileName})</label>
        <textarea
          placeholder={`Paste ${depFileName}`}
          onChange={e => this.handleChangeProperty('deps', e.target.value)}
        >
          {this.state.deps}
        </textarea>
      </div>
    )
  }

}
