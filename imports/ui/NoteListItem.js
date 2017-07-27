import React from 'react'
import propTypes from 'prop-types'
import moment from 'moment'
import { Session } from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data'

export const NoteListItem = (props) => {
  const className = props.note.selected ? "item item--selected" : "item"
  return (
    <div
      className={className}
      onClick={() => {
      props.Session.set('selectedNoteId', props.note._id)
    }}>
      <h5 className="item__title">{ props.note.title || 'Untitled note' }</h5>
      { props.note.selected ? 'selected' : undefined}
      <p className="item__subtitle">{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: propTypes.object.isRequired,
  Session: propTypes.object.isRequired
}

export default createContainer(() => {
  return { Session }
}, NoteListItem)
