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
import type { Func, Cluster } from 'utils/Types'
import FuncsList from './FuncsList'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import cubeIcon from './assets/cube.png'
import './TreeView.scss'

export default class TreeView extends Component {

  props: {
    funcs: Array<Func>,
    cluster: Cluster,
    selectedFunc?: Func,
    loading: boolean,
    onSelect: (?Func) => void,
    onFetch: (Cluster) => void,
    onEditCluster: (Cluster) => void
  }

  state = {
    editClusterOpen: false,
    editedClusterUrl: ''
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    const cluster = this.props.cluster
    this.props.onFetch(cluster)
  }

  headerPressed() {
    this.props.onSelect(null)
    this.setState({ editClusterOpen: true })
  }

  doneEditCluster() {
    console.log('???', this.state.editedClusterUrl)
    const { cluster } = this.props
    cluster.url = this.state.editedClusterUrl
    this.setState({ editClusterOpen: false })
    this.props.onEditCluster(cluster)
    this.props.onFetch(cluster)
  }

  render() {
    return (
      <div className='treeview'>
        {this.renderLoader()}
        {this.renderHeader()}
        <FuncsList
          funcs={this.props.funcs} selectedFunc={this.props.selectedFunc}
          onSelect={this.props.onSelect}
        />
      </div>
    )
  }

  renderHeader() {
    const cluster = this.props.cluster
    const dialogActions = [
      <FlatButton
        label='Cancel' primary
        onClick={() => this.setState({ editClusterOpen: false })}
      />,
      <FlatButton
        label='Done' primary
        onClick={() => this.doneEditCluster()}
      />
    ]
    return (
      <div className='folder' onClick={() => this.headerPressed()}>
        <img className='folder-icon' src={cubeIcon} />
        <h3 className='folder-title'>{cluster.url}</h3>
        <Dialog
          title='Cluster info' modal={false} actions={dialogActions}
          open={this.state.editClusterOpen}
          onRequestClose={() => this.setState({ editClusterOpen: false })}
        >
          <TextField
            floatingLabelText='Cluster url'
            defaultValue={cluster.url}
            onChange={(e) => this.setState({ editedClusterUrl: e.target.value })}
          />
          <br />
        </Dialog>
      </div>
    )
  }
  renderLoader() {
    let content
    if (this.props.loading) {
      content = (<p>{'...Loading functions...'}</p>)
    } else if (this.props.funcs.length === 0) {
      content = (
        <p>{'No function found'}<br />
          <a href='#' onClick={() => this.refresh()}>Refresh</a>
        </p>
      )
    } else { return }
    return <div className='centerMessage'>{content}</div>
  }

}
