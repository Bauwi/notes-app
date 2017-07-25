import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export const NoteListHeader = (props) => {
  handleClick = () => {
    props.meteorCall('notes.insert', (err, res) =>{
      if(res) {
        props.Session.set('selectedNoteId', res)
      }
    })
  }
  return(
    <div>
      <button onClick={this.handleClick.bind(this)}>Create Note</button>
    </div>
  )
}

NoteListHeader.propTypes = {
  meteorCall: propTypes.func.isRequired,
  Session: propTypes.object.isRequired
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  }
}, NoteListHeader)
