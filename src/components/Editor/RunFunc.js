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
import React, { Component, PropTypes } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Button from 'material-ui/RaisedButton'
import { File as FileType } from 'utils/Types'

class RunFunc extends Component {

  static propTypes = {
    file: FileType,
    onRun: PropTypes.func
  }

  state = {
    body: '',
    json: true,
    running: false,
    result: null
  }

  run = () => {
    const { body, json } = this.state
    let requestBody
    try {
      requestBody = json ? JSON.parse(body) : body
    } catch (e) {
      console.log('e', e)
      return this.setState({ result: e.message })
    }
    console.log('Executing function with body: ', requestBody)
    this.setState({ running: true })
    setTimeout(() => {
      this.setState({ running: false, result: `{ "data": "Hello world" }` })
    }, 2000)
  }

  render() {
    const { file } = this.props
    const { body, json } = this.state
    if (!file) { return false }
    return (
      <div className='editor-panel'>
        <div className='function-title'>
          <h3>{file.name}</h3>
          <p>{ 'Function description goes here...'}</p>
        </div>
        <div className='function-run'>
          <h5>Request</h5>
          <textarea className='body' placeholder='Request body...'
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
        {this.renderResult()}
      </div>
    )
  }

  renderResult() {
    const { file } = this.props
    const { running, result } = this.state
    let content
    if (running) {
      content = (
        <p>{`Running ${file.name}...`}</p>
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
      <div className='function-result'>
        {content}
      </div>
    )
  }
}

export default RunFunc
