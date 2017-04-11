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

export default class CreateFunc extends Component {

  props: {
    open: boolean,
    onDismiss: () => void,
    onCreate: ({}) => void
  }

  state = {
    name: '',
    handle: '',
    runtime: 'javascript'
  }

  createFunc() {
    const params = this.state
    this.props.onCreate(params)
  }

  render() {
    const dialogActions = [
      <FlatButton
        label='Cancel' primary
        onClick={this.props.onDismiss}
      />,
      <FlatButton
        label='Create' primary
        onClick={() => this.createFunc()}
      />
    ]

    const runtimes = [
      <MenuItem key={1} value='javascript' primaryText='Javascript' />,
      <MenuItem key={2} value='python27' primaryText='Python27' />
    ]
    return (
      <Dialog
        title='New function' modal={false} actions={dialogActions}
        open={this.props.open}
        onRequestClose={this.props.onDismiss}
        autoScrollBodyContent
      >
        <div className='createFunc'>
          <TextField
            floatingLabelText='Function name'
            hintText='Test Func'
            onChange={(e, i, value) => this.setState({ name: value })}
          />
          <TextField
            floatingLabelText='Handler'
            hintText='test.foobar'
            onChange={(e, i, value) => this.setState({ handle: value })}
          /><br />
          <SelectField
            value={this.state.runtime}
            onChange={(e, i, value) => this.setState({ runtime: value })}
          >
            {runtimes}
          </SelectField>
        </div>
      </Dialog>
    )
  }
}
