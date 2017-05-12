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
import AceEditor from 'react-ace'
import brace from 'brace' // eslint-disable-line
import 'brace/mode/python'
import 'brace/mode/ruby'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import './Editor.scss'
import type { Func, Cluster } from 'utils/Types'
import RuntimeHelper from 'utils/RuntimeHelper'
import FuncDetail from './FuncDetailContainer'
import Logs from 'components/Logs'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

const LOGS_DEFAULT_HEIGHT = 200

export default class Editor extends Component {

  props: {
    func: Func,
    cluster: Cluster,
    editing: boolean,
    onRun: () => void,
    onSave: () => void,
    onDelete: () => void,
    onSetEditing: (boolean) => void
  }

  state: {
    content: string,
    logsHeight: number
  }

  hotkeysMap = [
    { name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
      exec: () => this.save()
    },
    { name: 'logs',
      bindKey: { win: 'Ctrl-P', mac: 'Command-P' },
      exec: () => this.toggleLogs()
    }
  ]

  constructor(props: any) {
    super(props)
    this.state = {
      content: props.func ? props.func.spec['function'] : '',
      logsHeight: 0
    }
  }

  componentWillReceiveProps(nextProps: { [string]: any }) {
    if (nextProps.func !== this.props.func) {
      const closeLogs = !nextProps.func ||
        (this.props.func && nextProps.func.metadata.uid !== this.props.func.metadata.uid)
      this.setState({
        logsHeight: closeLogs ? 0 : this.state.logsHeight,
        content: nextProps.func ? nextProps.func.spec['function'] : ''
      })
    }
  }

  onTextChange = (text: string) => {
    this.setState({ content: text })
    this.props.onSetEditing(true)
  }

  save = () => {
    const { func, cluster } = this.props
    const params = {
      ...func,
      spec: { 'function': this.state.content }
    }
    this.props.onSave(func, cluster, params)
    this.props.onSetEditing(false)
  }

  delete = () => {
    const { func, cluster } = this.props
    this.props.onDelete(func, cluster)
  }

  runtimeToMode = () => {
    const { func } = this.props
    const runtime = func ? func.spec.runtime : null
    return RuntimeHelper.runtimeToLanguage(runtime)
  }

  toggleLogs = () => {
    const newHeight = this.state.logsHeight === 0 ? LOGS_DEFAULT_HEIGHT : 0
    this.setState({ logsHeight: newHeight })
  }

  mouseDown: boolean
  dragStart: number
  heightAtStart: number
  onMouseDown = (e:any) => {
    if (this.state.logsHeight > 0 && e.target === this.refs.footerBar) {
      this.mouseDown = true
      this.dragStart = e.pageY
      this.heightAtStart = this.state.logsHeight
    }
  }
  onMouseUp = () => {
    this.mouseDown = false
  }
  onMouseMove = (e:any) => {
    if (this.mouseDown) {
      const newHeight = Math.max(0, this.heightAtStart - (e.pageY - this.dragStart))
      this.setState({ logsHeight: newHeight })
    }
  }

  render() {
    const { func } = this.props
    let mode = this.runtimeToMode()
    return (
      <div className='editor'
        onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseLeave={this.onMouseUp}
        onMouseMove={this.onMouseMove}>
        <div className='editorInnerContainer'>
          {!func && this.renderEmptyView()}
          {func && <AceEditor
            mode={mode}
            theme='solarized_dark'
            onChange={this.onTextChange}
            value={this.state.content}
            name='ACE_EDITOR_01'
            commands={this.hotkeysMap}
            enableBasicAutocompletion
          />}
          {func && this.renderFooter()}
        </div>
        {func && <FuncDetail />}
      </div>
    )
  }

  renderFooter() {
    const isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
    const saveButton = (
      <IconButton
        onClick={this.save} tooltip={`Save (${isMac ? 'Cmd-S' : 'Ctrl-S'})`} tooltipPosition='top-center'>
        <FontIcon className='fa fa-cloud-upload' />
      </IconButton>
    )
    return (
      <div className='editorFooter'>
        <div className='editorFooterLinks' ref='footerBar'
          style={{ cursor: this.state.logsHeight > 0 ? 'row-resize' : 'default' }}>
          {this.props.editing && saveButton}
          <IconButton style={{ marginLeft: 'auto' }}
            onClick={this.toggleLogs} tooltip={`Logs (${isMac ? 'Cmd-P' : 'Ctrl-P'})`} tooltipPosition='top-center'>
            <FontIcon className='fa fa-terminal' />
          </IconButton>
        </div>
        <div style={{ display: 'flex', height: this.state.logsHeight }}>
          <Logs visible={this.state.logsHeight > 0} />
        </div>
      </div>
    )
  }
  renderEmptyView() {
    return (
      <div className='editorEmpty'>
        <p>{':)'}<br />
          {'Choose a function or create a new one'}
        </p>
      </div>
    )
  }

}
