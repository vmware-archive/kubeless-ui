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
import FuncDetail from './FuncDetail'
import { funcsRun, funcsSave, funcsDelete } from 'store/funcs'

const mapStateToProps = ({ funcs, clusters }) => ({
  func: funcs.selected,
  cluster: clusters.cluster,
  response: funcs.runResponse
})

const mapDispatchToProps = (dispatch) => ({
  onRun: (func, data, cluster, method, json) => dispatch(funcsRun(func, data, cluster, method, json)),
  onSave: (func, cluster, params) => dispatch(funcsSave(func, cluster, params)),
  onDelete: (func, cluster) => dispatch(funcsDelete(func, cluster))
})

export default connect(mapStateToProps, mapDispatchToProps)(FuncDetail)
