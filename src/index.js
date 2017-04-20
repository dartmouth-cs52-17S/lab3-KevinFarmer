import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
// import * as firebasedb from './firebasedb';
import NewNoteInput from './components/new_note_input';
import Note from './components/note';
import './style.scss';

let noteCount = 0;
let maxZ = 1;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };

    this.onDragUpdate = this.onDragUpdate.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["onStartUpdate", "onDragUpdate", "onStopUpdate"] }] */
  onStartUpdate() {
    // console.log('onStartDrag- index');
  }

  onDragUpdate(id, newX, newY) {
    // console.log('onDrag- index');
    // console.log(newX);
    // console.log(newY);
    const fields = {
      x: newX,
      y: newY,
    };

    // console.log(fields);
    this.setState({ // From assignment page
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
    // console.log(this.state.notes);
  }

  onStopUpdate() {
    // console.log('onStopDrag- index');
  }

  onTitleChange(id, value) {
    const fields = { title: value };
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  onTextChange(id, value) {
    const fields = { text: value };
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  startEdit(id) {
    const fields = { isEditing: true };
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  endEdit(id) {
    const fields = { isEditing: false };
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  createNote(newtitle) {
    console.log('New note');
    console.log(newtitle);

    this.setState({
      notes: this.state.notes.set(noteCount, {
        title: newtitle,
        text: '# large ',
        x: 20,
        y: 20,
        zIndex: maxZ,
        isEditing: false,
      }),
    });
    noteCount += 1;
    maxZ += 1;
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  render() {
    // Based on: https://github.com/mzabriskie/react-draggable/blob/master/example/example.js
    const dragHandlers = { onStartUpdate: this.onStartUpdate, onDragUpdate: this.onDragUpdate, onStopUpdate: this.onStopUpdate };
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
      <div>
        <NewNoteInput onSubmission={title => this.createNote(title)} />
        {notesRend}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
