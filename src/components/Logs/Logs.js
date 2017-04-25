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
import './Logs.scss'
import type { Func, Cluster, Pod } from 'utils/Types'

let refreshInterval

export default class Logs extends Component {

  props: {
    cluster: Cluster,
    func: Func,
    pod: Pod,
    logs: ?string,
    visible: ?boolean,
    onFetchLogs: (cluster: Cluster, pod: Pod) => void
  }

  componentDidUpdate() {
    clearInterval(refreshInterval)
    if (this.props.visible) {
      refreshInterval = setInterval(() => {
        this.props.onFetchLogs(this.props.cluster, this.props.pod)
      }, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(refreshInterval)
  }

  render() {
    const { func, pod, logs } = this.props
    console.log(this.props)
    if (!func) { return }

    return (
      <div className='logs'>
        <pre className='logsText'>
          {pod && pod.metadata.name} <br /><br />
          {logs}
        </pre>
      </div>
    )
  }

}
