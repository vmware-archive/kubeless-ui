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
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import type { Func } from 'utils/Types'

const initialState = {
  name: '',
  handler: '',
  runtime: 'javascript',
  type: 'HTTP'
}
export default class CreateFunc extends Component {

  props: {
    func?: Func,
    open: boolean,
    onDismiss: () => void,
    onDone: ({}) => void
  }

  state = initialState

  componentWillReceiveProps(nextProps: any) {
    if (!this.props.open && nextProps.open) {
      const { func } = nextProps
      if (func) {
        this.setState({
          name: func.metadata.name,
          handler: func.spec.handler,
          runtime: func.spec.runtime,
          type: func.spec.type
        })
      } else {
        this.setState(initialState)
      }
    }
  }

  donePressed = () => {
    const params = this.state
    this.props.onDone(params)
  }

  render() {
    const doneAction = this.props.func ? 'Edit' : 'Create'
    const title = this.props.func ? 'Edit function' : 'New function'

    const dialogActions = [
      <FlatButton
        label='Cancel' primary
        onClick={this.props.onDismiss}
      />,
      <FlatButton
        label={doneAction} primary
        onClick={this.donePressed}
      />
    ]

    const runtimes = [
      <MenuItem key={1} value='javascript' primaryText='Javascript' />,
      <MenuItem key={2} value='nodejs6.10 ' primaryText='NodeJS 6.10' />,
      <MenuItem key={2} value='python27' primaryText='Python27' />
    ]
    const types = [
      <MenuItem key={1} value='HTTP' primaryText='HTTP' />,
      <MenuItem key={2} value='PubSub' primaryText='PubSub' />
    ]
    return (
      <Dialog
        title={title} modal={false} actions={dialogActions}
        open={this.props.open}
        onRequestClose={this.props.onDismiss}
        contentStyle={{ width: '310px' }}
        autoScrollBodyContent
      >
        <div className='createFunc'>
          <TextField
            floatingLabelText='Function name'
            hintText='Test Func'
            disabled={!!this.props.func}
            value={this.state.name}
            onChange={(e, value) => this.setState({ name: value })}
          /><br />
          <TextField
            floatingLabelText='Handler'
            hintText='test.foobar'
            value={this.state.handler}
            onChange={(e, value) => this.setState({ handler: value })}
          /><br />
          <SelectField
            value={this.state.type}
            onChange={(e, i, value) => this.setState({ type: value })}
          >
            {types}
          </SelectField><br />
          <SelectField
            value={this.state.runtime}
            onChange={(e, i, value) => this.setState({ runtime: value })}
          >
            {runtimes}
          </SelectField><br /><br />
        </div>
      </Dialog>
    )
  }
}
