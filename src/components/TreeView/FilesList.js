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
import type { File } from 'utils/Types'
import fileIcon from './assets/file.png'
import './TreeView.scss'

export default class FilesList extends Component {

  props: {
    files: Array<File>,
    selectedFile?: File,
    onSelect: (?File) => void,
  }

  render() {
    return (
      <div className='files'>
        {this.props.files.map(file => this.renderFile(file))}
      </div>
    )
  }

  renderFile(file: File) {
    const { selectedFile, onSelect } = this.props
    const isActive = selectedFile && file.metadata.uid === selectedFile.metadata.uid
    return (
      <div key={file.metadata.uid}
        onClick={() => onSelect(file)}
        className={`file ${isActive ? 'active' : ''}`}>
        <img src={fileIcon} />
        <h4 className='title'>{file.metadata.name}</h4>
      </div>
    )
  }
}
