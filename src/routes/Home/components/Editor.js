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
