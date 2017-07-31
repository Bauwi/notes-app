import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'


import {Notes} from '../api/notes'
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'


export class NoteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (e) {
    const search = e.target.value
    this.setState({search})
  }

  renderNotes() {
    if(this.props.notes.length !== 0){
      return(
        this.props.notes.map(note => {
          if(note.title.toUpperCase().match(this.state.search.toUpperCase())){
            return <NoteListItem key={note._id} note={note} />
          }
        })
      )
    } else {
      return <NoteListEmptyItem />
    }
  }

  render(){
    return (
      <div className="item-list">
        <NoteListHeader />
        <div className="item-list__search-bar">
          <div>
            <input
              value={this.state.search}
              type="text"
              placeholder="search"
              onChange={this.handleSearch}/>
            <button
              className="button button--secondary"
              onClick={() => this.setState({search: ''})}>
              {this.state.search ? 'X' : 'O'}
            </button>



          </div>
        </div>
        {this.renderNotes()}
      </div>
    )
  }


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
