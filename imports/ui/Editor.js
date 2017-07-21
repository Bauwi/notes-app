import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Session} from 'meteor/session'
import propTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'

import { Notes } from '../api/notes'

export class Editor extends Component {

  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    })
  }

  handleTitleChange(e){
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    })
  }

  render() {
    const {note, selectedNoteId} = this.props
    if(note){
      return(
        <div>
          <input
            value={note.title}
            placeholder='Untitled Note'
            onChange={this.handleTitleChange.bind(this)}
          />
          <textarea
            value={note.body}
            placeholder="Your note here"
            onChange={this.handleBodyChange.bind(this)}>

            </textarea>
          <button>Delete Note</button>
        </div>
      )
    }else {
      return (
        <p>
          {selectedNoteId ? 'Note not found' :'pick a note to get started'}
        </p>
      )
    }
  }
}

Editor.propTypes = {
  selectedNoteId: propTypes.string,
  note: propTypes.object
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  }
}, Editor)
