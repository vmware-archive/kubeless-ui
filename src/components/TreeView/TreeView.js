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
import { File, Cluster } from 'utils/Types'
import fileIcon from './assets/file.png'
import cubeIcon from './assets/cube.png'
import './TreeView.scss'

class TreeView extends Component {

  static propTypes = {
    files: PropTypes.arrayOf(File).isRequired,
    clusters: PropTypes.arrayOf(Cluster).isRequired,
    selectedFile: File,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onFetch: PropTypes.func
  }

  componentDidMount() {
    const cluster = this.props.clusters[0]
    this.props.onFetch && this.props.onFetch(cluster)
  }

  render() {
    return (
      <div className='treeview'>
        {this.renderHeader()}
        {this.props.loading && this.renderLoading()}
        <div className='files'>
          {this.props.files.map(file => this.renderFile(file))}
        </div>
      </div>
    )
  }

  renderHeader() {
    const cluster = this.props.clusters[0]
    return (
      <div className='folder' onClick={() => this.props.onSelect(null)}>
        <img className='folder-icon' src={cubeIcon} />
        <h3 className='folder-title'>{cluster.name}</h3>
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

  renderFile(file) {
    const { selectedFile } = this.props
    const isActive = selectedFile && file.metadata.uid === selectedFile.metadata.uid
    return (
      <div key={file.metadata.uid}
        onClick={() => this.props.onSelect(file)}
        className={`file ${isActive && 'active'}`}>
        <img src={fileIcon} />
        <h4 className='title'>{file.metadata.name}</h4>
      </div>
    )
  }
}

export default TreeView
