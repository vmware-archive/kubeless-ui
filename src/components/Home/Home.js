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
import Editor from 'components/Editor'
import Cluster from 'components/Cluster'
import TreeView from 'components/TreeView'
import './Home.scss'

export default class Home extends Component {

  render() {
    return (
      <div className='home'>
        <Cluster />
        <div className='content'>
          <TreeView />
          <Editor />
        </div>
      </div>
    )
  }

}
