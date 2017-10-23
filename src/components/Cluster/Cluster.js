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
import type { Cluster } from 'utils/Types'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import './Cluster.scss'

export default class ClusterComponent extends Component {

  props: {
    cluster: Cluster,
    onEditCluster: Cluster => void
  }

  state = {
    editClusterOpen: false,
    editedClusterUrl: ''
  }

  onPress = () => {
    this.setState({ editClusterOpen: true })
  }

  doneEditCluster = () => {
    this.setState({ editClusterOpen: false })
    if (!this.state.editedClusterUrl) {
      return
    }
    const { cluster } = this.props
    cluster.url = this.state.editedClusterUrl
    this.props.onEditCluster(cluster)
  }

  render() {
    const cluster = this.props.cluster
    const dialogActions = [
      <FlatButton label='Cancel' primary onClick={() => this.setState({ editClusterOpen: false })} />,
      <FlatButton label='Done' primary onClick={this.doneEditCluster} />
    ]
    return (
      <div className='cluster' onClick={this.onPress}>
        <h3 className='clusterTitle'>
          <FontIcon className='clusterIcon fa fa-cube' />
          {cluster.url}
        </h3>
        <Dialog
          title='Cluster info'
          modal={false}
          actions={dialogActions}
          open={this.state.editClusterOpen}
          onRequestClose={() => this.setState({ editClusterOpen: false })}
        >
          <TextField
            floatingLabelText='Cluster url'
            defaultValue={cluster.url}
            onChange={e => this.setState({ editedClusterUrl: e.target.value })}
          />
          <br />
        </Dialog>
      </div>
    )
  }

}
