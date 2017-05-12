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

// @flowoo
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Logs.scss'
import EntityHelper from 'utils/EntityHelper'
import type { Func, Cluster, Pod } from 'utils/Types'

let refreshInterval

export default class Logs extends Component {

  props: {
    cluster: Cluster,
    func: Func,
    pods: Array<Pod>,
    selectedPod: ?Pod,
    logs: string,
    visible: ?boolean,
    onFetchLogs: (cluster: Cluster, pod: Pod) => void,
    onFetchPods: (cluster: Cluster) => void,
    onSelectPod: (pod: ?Pod) => void,
  }

  shouldScrollBottom = false
  logsContainerRef: Element

  componentWillUpdate(nextProps: any) {
    if ((!this.props.visible && nextProps.visible)) {
      this.shouldScrollBottom = true
      this.selectFirstPod()
    } else if (nextProps.logs.length > this.props.logs.length) {
      const logsContainer = ReactDOM.findDOMNode(this.refs.logsContainerRef)
      if (logsContainer) {
        // $FlowIgnore: scrollTop/scrollHeight not found
        this.shouldScrollBottom = logsContainer.scrollTop + logsContainer.offsetHeight === logsContainer.scrollHeight
      }
    }
  }

  componentDidUpdate() {
    clearInterval(refreshInterval)
    if (this.props.visible) {
      if (!this.props.selectedPod) {
        this.selectFirstPod()
      }
      refreshInterval = setInterval(() => {
        if (!this.props.visible) {
          return clearInterval(refreshInterval)
        }
        if (this.props.selectedPod) {
          this.props.onFetchLogs(this.props.cluster, this.props.selectedPod)
        }
        this.props.onFetchPods(this.props.cluster)
      }, 2000)
    }

    if (this.shouldScrollBottom) {
      this.scrollToBottom()
    }
  }

  componentWillUnmount() {
    clearInterval(refreshInterval)
  }

  selectFirstPod() {
    this.props.onSelectPod(this.props.pods.length > 0 ? this.props.pods[0] : null)
  }

  scrollToBottom() {
    const logsContainer = ReactDOM.findDOMNode(this.refs.logsContainer)
    // $FlowIgnore: scrollTop/scrollHeight not found
    logsContainer.scrollTop = logsContainer.scrollHeight
    this.shouldScrollBottom = false
  }

  render() {
    const { func, logs, pods } = this.props
    if (!func) { return }

    return (
      <div className='logs'>
        {pods.length === 0 && <div className='emptyPods'>{'Loading Pods...'}</div>}
        {this.renderPods()}
        <div ref='logsContainer' className='logsContainer'>
          <br />
          <pre>
            {logs}
          </pre>
        </div>
      </div>
    )
  }

  renderPods() {
    const { pods } = this.props
    return (
      <div className='podsList'>
        {pods.map(pod => this.renderPod(pod))}
      </div>
    )
  }

  renderPod(pod: Pod) {
    const { selectedPod } = this.props
    const isActive = selectedPod && selectedPod.metadata.uid === pod.metadata.uid
    const status = EntityHelper.entityStatus(pod)
    return (
      <div key={pod.metadata.uid} className={`podItem ${isActive ? 'active' : ''}`}
        onClick={() => this.props.onSelectPod(pod)}>
        <div className={`statusIcon ${status}`} />
        {`${pod.metadata.name}`}
      </div>
    )
  }

}
