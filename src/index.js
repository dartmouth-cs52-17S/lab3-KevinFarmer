import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import NewNoteInput from './components/new_note_input';
import Note from './components/note';
import './style.scss';

let count = 0;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };
  }

  createNote(newtitle) {
    console.log('New note');
    console.log(newtitle);

    this.setState({
      notes: this.state.notes.set(count, {
        title: newtitle,
        text: 'I is a note',
        x: 20,
        y: 20,
        zIndex: 26,
      }),
    });
    count += 1;
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }


  updatePos(id, newX, newY) {
    const newNote = Object.assign({}, this.state.note.id, {
      x: newX,
      y: newY,
    });
    this.setState({
      notes: this.state.notes.update(id, newNote),
    });
  }


  render() {
    let notesRend;
    if (this.state.notes.size > 0) {
      notesRend = this.state.notes.entrySeq().map(([id, note]) => {
        return <Note key={id} note={note} onDelete={() => this.deleteNote(id)} updatePos={(newX, newY) => this.updatePos(id, newX, newY)} />;  // for instance maybe
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
