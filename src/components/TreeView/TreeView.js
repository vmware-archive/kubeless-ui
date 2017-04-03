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
import React, { Component } from 'react'
import fileIcon from './assets/file.png'
import cubeIcon from './assets/cube.png'
import './TreeView.scss'

class TreeView extends Component {

  state = {
    loading: true,
    files: [],
    selectedIndex: null
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false, files: ['foo.py', 'bar.js'], selectedIndex: 0 })
    }, 1000)
  }

  render() {
    return (
      <div className='treeview'>
        {this.renderHeader()}
        {this.state.loading && this.renderLoading()}
        <div className='files'>
          {this.state.files.map((file, i) => this.renderFile(file, i))}
        </div>
      </div>
    )
  }

  renderHeader() {
    return (
      <div className='folder'>
        <img className='folder-icon' src={cubeIcon} />
        <h3 className='folder-title'>{'k8s-bitnami'}</h3>
      </div>
    )
  }
  renderLoading() {
    return (
      <div className='loading'>
        <p>{'...Loading functions...'}</p>
      </div>
    )
  }

  renderFile(file, i) {
    return (
      <div key={i}
        onClick={() => this.setState({ selectedIndex: i })}
        className={`file ${i === this.state.selectedIndex && 'active'}`}>
        <img src={fileIcon} />
        <h4 className='title'>{file}</h4>
      </div>
    )
  }
}

export default TreeView
