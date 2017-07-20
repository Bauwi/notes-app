import {Meteor} from 'meteor/meteor'
import expect from 'expect'

import {Notes} from './notes'

if (Meteor.isServer) {
  describe('notes', function() {
    const noteOne = {_id: 'testnote1', title: 'My title', body: 'my body for note', updatedAt: 0, userId: 'testuserid1'}
    const noteTwo = {_id: 'testnote2', title: 'Things to buy', body: 'couch', updatedAt: 0, userId: 'testuserid2'}

    beforeEach(function() {
      Notes.remove({})
      Notes.insert(noteOne)
      Notes.insert(noteTwo)
    })

    it('should insert new note', function() {
      const userId = 'testId'
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId})
      expect(Notes.findOne({_id, userId})).toExist()

    })

    it('should not insert not if not auth', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']()
      }).toThrow()
    })

    it('should remove note if invalid _id', function() {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id])

      expect(Notes.findOne({_id: noteOne._id})).toNotExist()
    })

    it('should not remove note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id])
      }).toThrow()
    })

    it('should not remove note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId})
      }).toThrow()
    })

    it('should update note', function() {
      const title = "this is an updtaed title"
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ])

      const note = Notes.findOne(noteOne._id)

      expect(note.updatedAt).toBeGreaterThan(0)
      expect(note).toInclude({
        title,
        body: noteOne.body
      })
    })

    it('should throw error if extra update', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          name: 'randomname'
        }).toThrow()
      })
    })

    it('should not udpate note if wrong user', function () {
      const title = "this is an updtaed title"
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testId'
      }, [
        noteOne._id,
        { title }
      ])

      const note = Notes.findOne(noteOne._id)

      expect(note).toInclude(noteOne)
    })

    it('should not udpate note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId})
      }).toThrow()
    })

    it('should not update note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id])
      }).toThrow()
    })

    it('should return a users notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId})
      const notes = res.fetch()

      expect(notes.length).toBe(1)
      expect(notes[0]).toEqual(noteOne)
    })

    it('should return no notes for user that has none', function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: 'randomId'})
      const notes = res.fetch()

      expect(notes.length).toBe(0)
    })

  })
}
