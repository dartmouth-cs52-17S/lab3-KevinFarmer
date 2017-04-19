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

    this.onDragUpdate = this.onDragUpdate.bind(this);
  }


  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["onStartUpdate", "onDragUpdate", "onStopUpdate"] }] */
  onStartUpdate() {
    console.log('onStartDrag- index');
  }

  onDragUpdate(e, ui, id) {
    console.log('onDrag- index');
    // console.log(ui);
    // console.log(id);
    const fields = {
      x: ui.x,
      y: ui.y,
    };

    console.log(fields);
    this.setState({ // From assingment page
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
    console.log(this.state.notes);
  }

  onStopUpdate() {
    console.log('onStopDrag- index');
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


  render() {
    // Based on: https://github.com/mzabriskie/react-draggable/blob/master/example/example.js
    const dragHandlers = { onStartUpdate: this.onStartUpdate, onDragUpdate: this.onDragUpdate, onStopUpdate: this.onStopUpdate };

    let notesRend;
    if (this.state.notes.size > 0) {
      notesRend = this.state.notes.entrySeq().map(([id, note]) => {
        return <Note key={id} id={id} note={note} onDelete={() => this.deleteNote(id)} {...dragHandlers} />;
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
