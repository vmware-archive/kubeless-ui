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
import React, { Component } from 'react'
import AceEditor from 'react-ace'
import brace from 'brace' // eslint-disable-line
import 'brace/mode/python'
import 'brace/theme/solarized_dark'
import './Editor.scss'

class Editor extends Component {

  render () {
    return (
      <div className='editor'>
        <AceEditor
          mode='python'
          theme='solarized_dark'
          // onChange={onChange}
          name='UNIQUE_ID_OF_DIV'
        />
      </div>
    )
  }
}

export default Editor
