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
import TreeView from './TreeView'
import { funcsSelect, funcsFetch } from 'store/funcs'
import { clusterEdit } from 'store/clusters'

const mapStateToProps = ({ funcs, clusters }) => ({
  funcs: funcs.list,
  selectedFunc: funcs.selected,
  loading: funcs.loading,
  cluster: clusters.cluster
})

const mapDispatchToProps = (dispatch) => ({
  onSelect: (func) => dispatch(funcsSelect(func)),
  onFetch: (cluster) => dispatch(funcsFetch(cluster)),
  onEditCluster: (cluster) => dispatch(clusterEdit(cluster))
})

export default connect(mapStateToProps, mapDispatchToProps)(TreeView)
