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
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import './TreeView.scss'
import Store from 'store/Store'

export default class TreeView extends Component {

  props: {
    funcs: Array<Func>,
    cluster: Cluster,
    selectedFunc?: Func,
    loading: boolean,
    onSelect: (?Func) => void,
    onFetch: Cluster => void,
    onCreateFunc: ({}, Cluster) => void
  }

  state = {
    newFuncOpen: false
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    const cluster = this.props.cluster
    this.props.onFetch(cluster)
  }

  toggleCreateModal = () => {
    this.setState({ newFuncOpen: !this.state.newFuncOpen })
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
        {this.renderLoader()}
        {!this.props.loading &&
          this.props.funcs.length > 0 && (
            <FuncsList funcs={this.props.funcs} selectedFunc={this.props.selectedFunc} onSelect={this.onSelect} />
          )}
        {this.renderFooter()}
      </div>
    )
  }

  renderLoader() {
    let content
    if (this.props.loading) {
      content = <p>Loading functions...</p>
    } else if (this.props.funcs.length === 0) {
      content = (
        <div>
          <p>No function found</p>
          <a className='button button-primary' onClick={this.refresh}>
            Refresh
          </a>
        </div>
      )
    } else {
      return
    }
    return <div className='centerMessage'>{content}</div>
  }

  renderFooter() {
    return (
      <div className='treeviewFooter'>
        <IconButton tooltip='New Function' tooltipPosition='top-right' onClick={this.toggleCreateModal}>
          <FontIcon className='fa fa-plus' />
        </IconButton>
        <IconButton
          tooltip='Refresh Functions'
          tooltipPosition='top-left'
          onClick={this.refresh}
          style={{ marginLeft: 'auto' }}
        >
          <FontIcon className='fa fa-refresh' />
        </IconButton>
        <FuncCreateContainer open={this.state.newFuncOpen} onDismiss={this.toggleCreateModal} />
      </div>
    )
  }

}
