import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'


import {Notes} from '../api/notes'
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = (props) => {

  const renderNotes = () => {
    if(props.notes.length !== 0){
      return(
        props.notes.map(note => {
          return <NoteListItem key={note._id} note={note} />
        })
      )
    } else {
      return <NoteListEmptyItem />
    }
  }

  return (
    <div>
      <NoteListHeader />
      {renderNotes()}
      NoteList
    </div>
  )
}

NoteList.propTypes = {
  notes: propTypes.array.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  Meteor.subscribe('notes')

  return {
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map(note => {
      return {
        ...note,
        selected: (note._id === selectedNoteId)
      }
    })
  }
}, NoteList)
