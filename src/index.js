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

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["createNote"] }] */
  createNote(newtitle) {
    console.log('New note');
    console.log(newtitle);

    this.setState({
      notes: this.state.notes.set(count, {
        title: newtitle,
        text: 'I is a note',
        x: 400,
        y: 12,
        zIndex: 26,
      }),
    });
    count += 1;
  }

  render() {
    let notesRend;
    if (this.state.notes.size > 0) {
      notesRend = this.state.notes.entrySeq().map(([id, note]) => {
        return <Note id={id} note={note} />;  // for instance maybe
      });
    } else {
      notesRend = '';
    }

    console.log(this.state.notes);

    return (
      <div>
        <NewNoteInput onSubmission={title => this.createNote(title)} />
        {notesRend}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
