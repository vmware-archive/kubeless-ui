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
import Snackbar from 'material-ui/Snackbar'
import _ from 'lodash'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

export default class CoreLayout extends Component {

  props: {
    children: any,
    alertMessage: string,
    onCloseAlert: () => {}
  }

  alertRequestClose = () => {
    this.props.onCloseAlert()
  }

  render() {
    const { alertMessage } = this.props
    return (
      <div className='container text-center'>
        <Header />
        <div className='core-layout__viewport'>
          {this.props.children}
        </div>
        <Snackbar
          open={!!alertMessage}
          message={_.capitalize(alertMessage || '')}
          autoHideDuration={4000}
          onRequestClose={this.alertRequestClose}
        />
      </div>
    )
  }

}
