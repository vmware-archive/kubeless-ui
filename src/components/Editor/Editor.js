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
import AceEditor from 'react-ace'
import brace from 'brace' // eslint-disable-line
import 'brace/mode/python'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Button from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import './Editor.scss'

const fileType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string
}) // TODO: Move this

class Editor extends Component {

  static propTypes = {
    file: fileType
  }

  state = {
    showRunPanel: false
  }

  render() {
    const { file } = this.props
    const { showRunPanel } = this.state
    let mode = 'javascript'
    if (file && file.name.indexOf('.py') !== -1) {
      mode = 'python'
    }
    return (
      <div className='editor'>
        {!file && this.renderEmptyView()}
        {file && <AceEditor
          mode={mode}
          theme='solarized_dark'
          // onChange={onChange}
          value={file ? file.content : ''}
          name='UNIQUE_ID_OF_DIV'
        />}
        {file && !showRunPanel &&
          <div className='show-panel-button' onClick={() => this.setState({ showRunPanel: true })}>
            {'Run function'}
          </div>
        }
        {file && showRunPanel && this.renderSidePanel()}
      </div>
    )
  }

  renderEmptyView() {
    return (
      <div className='editor-empty'>
        <p>{':)'}<br />
          {'Choose a file or create a new one'}
        </p>
      </div>
    )
  }

  renderSidePanel() {
    const { file } = this.props
    return (
      <div className='editor-panel'>
        <div className='function-title'>
          <IconButton className='close-icon' iconClassName='muidocs-icon-close'
            onClick={() => this.setState({ showRunPanel: false })}
          />
          <h3>{file.name}</h3>
          <p>{ 'Function description goes here...'}</p>
        </div>
        <div className='function-run'>
          <h5>Request</h5>
          <textarea className='body' placeholder='Request body...' />
          <br /><br />
          <RadioButtonGroup name='bodyFormat' defaultSelected='json'>
            <RadioButton value='json' label='JSON'
              className='radioButton' />
            <RadioButton value='text' label='Text'
              className='radioButton' />
          </RadioButtonGroup>
          <br />
          <Button label='Run function' primary />
        </div>
        <div className='function-result'>
          <h5>Response</h5>
          <p className='body'>{`{ "data": "Hello world" }`}</p>
        </div>
      </div>
    )
  }
}

export default Editor
