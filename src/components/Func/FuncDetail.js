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
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Button from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
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
        <div className='functionTitle'>
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
            <Button className='button' label='Edit' primary onClick={() => this.setState({ editing: true })} />
            <Button
              className='button'
              label='Delete'
              secondary
              onClick={() => this.setState({ confirmDelete: true })}
            />
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
    const { body, json, method } = this.state

    const methods = [
      <MenuItem key={1} value='get' primaryText='GET' />,
      <MenuItem key={2} value='post' primaryText='POST' />
    ]
    return (
      <div className='functionRun'>
        <h5>Request</h5>
        <RadioButtonGroup
          name='bodyFormat'
          valueSelected={json ? 'json' : 'text'}
          onChange={(o, v) => this.setState({ json: v === 'json' })}
        >
          <RadioButton value='json' label='JSON' className='radioButton' />
          <RadioButton value='text' label='Text' className='radioButton' />
        </RadioButtonGroup>
        <textarea
          className='body'
          placeholder={json ? '{ "hello": "world" }' : 'hello=world'}
          value={body}
          onChange={e => this.setState({ body: e.target.value })}
        />
        <br />
        <br />
        <div className='methodContainer'>
          <SelectField
            value={method}
            fullWidth
            style={{ paddingLeft: 10, marginTop: -5 }}
            underlineStyle={{ border: 0 }}
            labelStyle={{ color: 'white' }}
            onChange={(e, i, method) => this.setState({ method })}
          >
            {methods}
          </SelectField>
        </div>
        <Button className='runButton' label='Run function' primary onClick={this.run} />
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
    return <div className='functionResult'>{content}</div>
  }

}
