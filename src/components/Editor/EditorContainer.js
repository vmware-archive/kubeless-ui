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
import Editor from './Editor'
import { funcsSave, funcsDelete, funcsEditing } from 'store/funcs'

const mapStateToProps = ({ funcs, clusters }) => {
  return {
    func: funcs.selected,
    cluster: clusters.cluster,
    editing: funcs.editing
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSave: (func, cluster, params) => dispatch(funcsSave(func, cluster, params)),
  onDelete: (func, cluster) => dispatch(funcsDelete(func, cluster)),
  onSetEditing: (editing) => dispatch(funcsEditing(editing))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
