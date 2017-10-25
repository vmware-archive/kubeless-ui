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
import qs from 'qs'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import FuncEdit from 'components/Func/FuncEdit'
import type { Func, Cluster } from 'utils/Types'
import './FuncDetail.scss'

export default class FuncDetail extends Component {

  props: {
    func: Func,
    cluster: Cluster,
    response: ?string,
    onRun: () => void,
    onSave: () => void,
    onDelete: () => void
  }

  state: {
    body: string,
    json?: boolean,
    method: string,
    running?: boolean,
    editing?: boolean,
    confirmDelete: boolean,
    errorMessage?: ?string
  }

  constructor() {
    super()
    this.state = {
      body: '',
      json: true,
      method: 'get',
      confirmDelete: false
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.state.running && this.props.response !== nextProps.response) {
      this.setState({ running: false })
    }
  }

  run = () => {
    if (this.state.running) {
      return
    }
    const { body, json, method } = this.state
    const { func, cluster } = this.props
    let requestData
    if (body) {
      try {
        requestData = json ? JSON.parse(body) : qs.parse(body)
      } catch (e) {
        this.setState({ errorMessage: e.message, running: false })
        return
      }
    }
    this.setState({ running: true, errorMessage: null })
    this.props.onRun(func, requestData, cluster, method)
  }

  delete = () => {
    const { func, cluster } = this.props
    this.props.onDelete(func, cluster)
  }

  doneEditing = (params: any) => {
    const { func, cluster } = this.props
    const data = {
      metadata: { name: params.name },
      spec: {
        deps: params.deps,
        handler: params.handler,
        runtime: params.runtime,
        type: params.type
      }
    }
    this.props.onSave(func, cluster, data)
    this.setState({ editing: false })
  }

  render() {
    const { func } = this.props
    if (!func) {
      return
    }

    const deleteActions = [
      <FlatButton label='Cancel' primary onTouchTap={() => this.setState({ confirmDelete: false })} />,
      <FlatButton label='Yes, delete it!' secondary onTouchTap={this.delete} />
    ]

    return (
      <div className='funcDetail'>
        <div className='functionTitle padding-big'>
          <p>
            <b>Handler: </b>
            {func.spec.handler}
            <br />
            <b>Runtime: </b>
            {func.spec.runtime}
            <br />
            <b>Type: </b>
            {func.spec.type}
          </p>
          <div className='actionsButtons'>
            <a className='button' onClick={() => this.setState({ editing: true })}>
              Edit
            </a>
            <a className='button button-action' onClick={() => this.setState({ confirmDelete: true })}>
              Delete
            </a>
          </div>
          <FuncEdit
            open={!!this.state.editing}
            func={func}
            onDismiss={() => this.setState({ editing: false })}
            onDone={params => this.doneEditing(params)}
          />
          <Dialog
            actions={deleteActions}
            modal={false}
            contentStyle={{ width: '300px' }}
            open={this.state.confirmDelete}
            onRequestClose={() => this.setState({ confirmDelete: false })}
          >
            {`Delete ${func.metadata.name} function from Kubeless? This cannot be undone`}
          </Dialog>
        </div>
        {this.renderRun()}
        {this.renderResponse()}
      </div>
    )
  }

  renderRun() {
    const { body, json } = this.state

    return (
      <div className='functionRun padding-big'>
        <h5>Request</h5>
        <select onChange={e => this.setState({ method: e.target.value })}>
          <option value='get'>GET</option>
          <option value='post'>POST</option>
        </select>
        <div className='radios'>
          <input name='paramType' type='radio' defaultChecked onChange={() => this.setState({ json: true })} />
          <label className='radio margin-r-normal'>JSON</label>
          <input name='paramType' type='radio' onChange={() => this.setState({ json: false })} />
          <label className='radio'>Text</label>
        </div>
        <textarea
          className='body'
          placeholder={json ? '{ "hello": "world" }' : 'hello=world'}
          value={body}
          onChange={e => this.setState({ body: e.target.value })}
        />
        <a className='button button-primary' onClick={this.run}>
          Run function
        </a>
      </div>
    )
  }

  renderResponse() {
    let { func, response } = this.props
    if (!func) {
      return
    }
    const { running, errorMessage } = this.state

    if (response && typeof response === 'object') {
      response = JSON.stringify(response)
    }
    let content
    if (running) {
      content = <p>{`Running ${func.metadata.name}...`}</p>
    } else if (errorMessage) {
      content = (
        <div>
          <h5>Error</h5>
          <p className='body'>{errorMessage}</p>
        </div>
      )
    } else if (response) {
      content = (
        <div>
          <h5>Response</h5>
          <p className='body'>{response}</p>
        </div>
      )
    }
    return <div className='functionResult padding-big'>{content}</div>
  }

}
