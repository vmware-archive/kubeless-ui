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
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Button from 'material-ui/RaisedButton'
import type { Func } from 'utils/Types'

export default class FuncDetail extends Component {

  props: {
    func?: Func,
    onRun?: () => void,
    onSave?: () => void,
    onDelete?: () => void
  }

  state: {
    body: string,
    json: boolean,
    running: boolean,
    result?: string
  }

  constructor() {
    super()
    this.state = {
      body: '',
      json: true,
      running: false
    }
  }

  run=() => {
    const { body, json } = this.state
    let requestBody
    try {
      requestBody = json ? JSON.parse(body) : body
    } catch (e) {
      console.log('e', e)
      this.setState({ result: e.message })
      return
    }
    console.log('Executing function with body: ', requestBody)
    this.setState({ running: true })
    setTimeout(() => {
      this.setState({ running: false, result: `{ "data": "Hello world" }` })
    }, 2000)
    this.props.onRun && this.props.onRun()
  }

  render() {
    const { func } = this.props
    if (!func) { return }
    return (
      <div className='editorPanel'>
        <div className='functionTitle'>
          <h3>{func.metadata.name}</h3>
          <p>
            <b>Handler: </b>{func.spec.handler}<br />
            <b>Runtime: </b>{func.spec.runtime}<br />
            <b>Type: </b>{func.spec.type}
          </p>
        </div>
        {this.renderRun()}
        {this.renderResult()}
      </div>
    )
  }

  renderRun() {
    const { body, json } = this.state
    return (
      <div className='functionRun'>
        <h5>Request</h5>
        <textarea className='body' placeholder='Request data...'
          value={body} onChange={(e) => this.setState({ body: e.target.value })} />
        <br /><br />
        <RadioButtonGroup name='bodyFormat'
          valueSelected={json ? 'json' : 'text'}
          onChange={(o, v) => this.setState({ json: v === 'json' })}>
          <RadioButton value='json' label='JSON'
            className='radioButton' />
          <RadioButton value='text' label='Text'
            className='radioButton' />
        </RadioButtonGroup>
        <br />
        <Button label='Run function' onClick={this.run} />
      </div>
    )
  }
  renderResult() {
    const { func } = this.props
    if (!func) { return }
    const { running, result } = this.state
    let content
    if (running) {
      content = (
        <p>{`Running ${func.metadata.name}...`}</p>
      )
    } else if (result) {
      content = (
        <div>
          <h5>Response</h5>
          <p className='body'>
            {result}
          </p>
        </div>
      )
    }
    return (
      <div className='functionResult'>
        {content}
      </div>
    )
  }
}
