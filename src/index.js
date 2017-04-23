import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import * as firebasedb from './firebasedb';
import NewNoteInput from './components/new_note_input';
import Note from './components/note';
import './style.scss';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["createNote", "deleteNote"] }] */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      maxZ: 1,
    };

    this.onStartUpdate = this.onStartUpdate.bind(this);
    this.onDragUpdate = this.onDragUpdate.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
    firebasedb.fetchZ((z) => {
      this.setState({ maxZ: z });
    });
  }

  onStartUpdate(id, note) {
    if (note.zIndex !== (this.state.maxZ - 1)) {
      const fields = { zIndex: this.state.maxZ };
      firebasedb.updateMaxZ(this.state.maxZ + 1);
      const newNote = Object.assign({}, this.state.notes.id, fields);
      firebasedb.updateNote(id, newNote);
    }
  }

  onDragUpdate(id, newX, newY) {
    const fields = {
      x: newX,
      y: newY,
    };
    const newNote = Object.assign({}, this.state.notes.id, fields);
    firebasedb.updateNote(id, newNote);
  }

  onTitleChange(id, value) {
    const fields = { title: value };
    const newNote = Object.assign({}, this.state.notes.id, fields);
    firebasedb.updateNote(id, newNote);
  }

  onTextChange(id, value) {
    const fields = { text: value };
    const newNote = Object.assign({}, this.state.notes.id, fields);
    firebasedb.updateNote(id, newNote);
  }

  startEdit(id) {
    const fields = { isEditing: true };
    const newNote = Object.assign({}, this.state.notes.id, fields);
    firebasedb.updateNote(id, newNote);
  }

  endEdit(id) {
    const fields = { isEditing: false };
    const newNote = Object.assign({}, this.state.notes.id, fields);
    firebasedb.updateNote(id, newNote);
  }

  createNote(newtitle) {
    const newNote = {
      title: newtitle,
      text: '',
      x: 178,
      y: 0,
      zIndex: this.state.maxZ,
      isEditing: false,
    };
    firebasedb.updateMaxZ(this.state.maxZ + 1);
    firebasedb.createNote(newNote);
  }

  deleteNote(id) {
    firebasedb.deleteNote(id);
  }

  render() {
    // Based on: https://github.com/mzabriskie/react-draggable/blob/master/example/example.js
    const dragHandlers = { onStartUpdate: this.onStartUpdate, onDragUpdate: this.onDragUpdate };
    const editHandlers = { startEdit: this.startEdit, endEdit: this.endEdit, onTitleChange: this.onTitleChange, onTextChange: this.onTextChange };

    let notesRend;
    if (this.state.notes.size > 0) {
      notesRend = this.state.notes.entrySeq().map(([id, note]) => {
        return <Note key={id} id={id} note={note} onDelete={() => this.deleteNote(id)} {...editHandlers} {...dragHandlers} />;
      });
    } else {
      notesRend = '';
    }

    return (
      <div className="react-data">
        <header>
          <h1>My Notes</h1>
          <NewNoteInput onSubmission={title => this.createNote(title)} />
        </header>
        {notesRend}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
