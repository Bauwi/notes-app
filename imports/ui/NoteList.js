import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'


import {Notes} from '../api/notes'
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'

export const NoteList = (props) => {
  const renderNotes = () => {
    return(
      props.notes.map(note => {
        return <NoteListItem key={note._id} note={note} />
      })
    )
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
  Meteor.subscribe('notes')

  return {
    notes: Notes.find().fetch()
  }
}, NoteList)
