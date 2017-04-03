import React, { Component } from 'react'
import Editor from './Editor'
import TreeView from './TreeView'
import './Home.scss'

class Home extends Component {

  render () {
    return (
      <div className='home'>
        <TreeView />
        <Editor />
      </div>
    )
  }
}

export default Home
