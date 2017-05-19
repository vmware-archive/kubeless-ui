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
import FuncCreateContainer from 'components/Func/FuncCreateContainer'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import cubeIcon from './assets/cube.png'
import './TreeView.scss'
import Store from 'store/Store'

export default class TreeView extends Component {

  props: {
    funcs: Array<Func>,
    cluster: Cluster,
    selectedFunc?: Func,
    loading: boolean,
    onSelect: (?Func) => void,
    onFetch: (Cluster) => void,
    onEditCluster: (Cluster) => void,
    onCreateFunc: ({}, Cluster) => void
  }

  state = {
    editClusterOpen: false,
    editedClusterUrl: '',
    newFuncOpen: false
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    const cluster = this.props.cluster
    this.props.onFetch(cluster)
  }

  headerPressed = () => {
    this.props.onSelect(null)
    this.setState({ editClusterOpen: true })
  }

  doneEditCluster = () => {
    this.setState({ editClusterOpen: false })
    if (!this.state.editedClusterUrl) { return }
    const { cluster } = this.props
    cluster.url = this.state.editedClusterUrl
    this.props.onEditCluster(cluster)
    this.props.onFetch(cluster)
  }

  createFunc = (params: {}) => {
    this.props.onCreateFunc(params, this.props.cluster)
    this.setState({ newFuncOpen: false })
  }

  onSelect = (func: ?Func) => {
    const { funcs: FuncsStore } = Store.getState()
    if (FuncsStore.editing && FuncsStore.selected) {
      if (!confirm('You have unsaved changes, do you still want to leave this page? All changes will be lost')) {
        return
      }
    }
    this.props.onSelect(func)
  }

  render() {
    return (
      <div className='treeview'>
        {this.renderHeader()}
        {this.renderLoader()}
        {this.props.funcs.length > 0 &&
          <FuncsList
            funcs={this.props.funcs} selectedFunc={this.props.selectedFunc}
            onSelect={this.onSelect}
          />
        }
        {this.renderFooter()}
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
        onClick={this.doneEditCluster}
      />
    ]
    return (
      <div className='treeviewHeader' onClick={this.headerPressed}>
        <img className='folderIcon' src={cubeIcon} />
        <h3 className='folderTitle'>{cluster.url}</h3>
        <FontIcon className='material-icons editIcon'>create</FontIcon>
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
          <FlatButton
            label='Refresh'
            onClick={this.refresh}
            icon={<FontIcon className='material-icons'>replay</FontIcon>}
          />
        </p>
      )
    } else { return }
    return <div className='centerMessage'>{content}</div>
  }

  renderFooter() {
    return (
      <div className='treeviewFooter'>
        <IconButton tooltip='New Function' tooltipPosition='top-right'
          onClick={() => this.setState({ newFuncOpen: true })}>
          <FontIcon className='material-icons'>add</FontIcon>
        </IconButton>
        <IconButton tooltip='Refresh Functions' tooltipPosition='top-left'
          onClick={this.refresh} style={{ marginLeft: 'auto' }}>
          <FontIcon className='material-icons'>replay</FontIcon>
        </IconButton>
        <FuncCreateContainer open={this.state.newFuncOpen}
          onDismiss={() => this.setState({ newFuncOpen: false })}
        />
      </div>
    )
  }

}
