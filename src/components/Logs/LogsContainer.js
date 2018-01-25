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
import { connect } from 'react-redux'
import Logs from './Logs'
import _ from 'lodash'
import { podsSelect, podsFetchLogs, podsFetch } from 'store/pods'

const mapStateToProps = ({ funcs, clusters, pods }) => {
  const func = funcs.selected
  const podsList = _.filter(pods.list, (p) => {
    return p.metadata.labels && p.metadata.labels['function'] === func.metadata.name
  })
  const logs = pods.selected ? pods.logs[pods.selected.metadata.uid] : ''
  return {
    func: funcs.selected,
    cluster: clusters.cluster,
    pods: podsList,
    selectedPod: pods.selected,
    logs: logs || ''
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSelectPod: (pod) => dispatch(podsSelect(pod)),
  onFetchLogs: (cluster, pod) => dispatch(podsFetchLogs(cluster, pod)),
  onFetchPods: (cluster) => dispatch(podsFetch(cluster))
})

export default connect(mapStateToProps, mapDispatchToProps)(Logs)
