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
import './Editor.scss'
import { File as FileType } from 'utils/Types'
import RunFunc from './RunFunc'

class Editor extends Component {

  static propTypes = {
    file: FileType,
    onRun: PropTypes.func,
    onSave: PropTypes.func
  }

  state = {
    showRunPanel: true
  }

  render() {
    const { file, onRun } = this.props
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
        {file && showRunPanel && <RunFunc file={file} onRun={onRun} />}
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
}

export default Editor
