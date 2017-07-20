import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListHeader = (props) => {
  handleClick = () => {
    props.meteorCall('notes.insert')
  }
  return(
    <div>
      <button onClick={this.handleClick.bind(this)}>Create Note</button>
    </div>
  )
}

NoteListHeader.propTypes = {
  meteorCall: propTypes.func.isRequired
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  }
}, NoteListHeader)
