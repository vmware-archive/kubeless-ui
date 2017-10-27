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
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import logo from './assets/kubeless-dark-text.png'
import './Header.scss'

export default class Header extends Component {

  render() {
    return (
      <div className='header bg-brand padding-h-big'>
        <div className='left'>
          <img className='logo' src={logo} />
        </div>
        <div className='right'>
          <a href='https://github.com/kubeless/kubeless-ui' target='_blank'>
            <IconButton tooltip='Github'>
              <FontIcon className='fa fa-github' color='white' />
            </IconButton>
          </a>
        </div>
      </div>
    )
  }

}
