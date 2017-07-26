import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Session} from 'meteor/session'
import propTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

import { Notes } from '../api/notes'

export class Editor extends Component {
  constructor(props){
    super(props)
    this.state = {
      title:'',
      body:''
    }
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleRemoveNote = this.handleRemoveNote.bind(this)
  }

  handleBodyChange(e) {
    const body = e.target.value
    this.setState({body})
    this.props.call('notes.update', this.props.note._id, {body})
  }

  handleTitleChange(e){
    const title = e.target.value
    this.setState({title})
    this.props.call('notes.update', this.props.note._id, {title})
  }

  componentDidUpdate(prevProps, prevState){
    const currentNoteId = this.props.note ? this.props.note._id : undefined
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined

    if(currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }
  }

  handleRemoveNote() {
    this.props.call('notes.remove', this.props.note._id)
    this.props.browserHistory.push('/dashboard')
  }

  render() {
    const {note, selectedNoteId} = this.props
    const { title , body } = this.state
    if(note){
      return(
        <div className="editor">
          <input
            value={title}
            placeholder='Untitled Note'
            onChange={this.handleTitleChange}
          />
          <textarea
            value={body}
            placeholder="Your note here"
            onChange={this.handleBodyChange}>

            </textarea>
          <button onClick ={this.handleRemoveNote}>Delete Note</button>
        </div>
      )
    }else {
      return (
        <div className="editor">
          <p>
            {selectedNoteId ? 'Note not found' :'pick a note to get started'}
          </p>
        </div>
      )
    }
  }
}

Editor.propTypes = {
  selectedNoteId: propTypes.string,
  note: propTypes.object,
  call: propTypes.func.isRequired,
  browserHistory: propTypes.object.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  }
}, Editor)
