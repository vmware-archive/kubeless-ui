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
import keycode from 'keycode'
import type { Cluster } from 'utils/Types'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import './Cluster.scss'

export default class ClusterComponent extends Component {

  props: {
    cluster: Cluster,
    onEditCluster: Cluster => void
  }

  onKeyDown = (e: any) => {
    if (keycode(e) === 'enter') {
      this.submitEditCluster(e.target.value)
    }
  }

  submitEditCluster = (value: string) => {
    if (!value) {
      return
    }
    const { cluster } = this.props
    cluster.url = value
    this.props.onEditCluster(cluster)
  }

  render() {
    const { cluster } = this.props
    return (
      <div className='cluster'>
        <FontIcon className='margin-r-normal fa fa-cube' />
        <div className='clusterUrl'>
          <label>Cluster url</label>
          <input placeholder='http://localhost:8080' defaultValue={cluster.url} onKeyDown={this.onKeyDown} />
        </div>
      </div>
    )
  }

}
