import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';

/* eslint react/self-closing-comp: 0 */
class Note extends Component {
  constructor(props) {
    super(props);

    this.onStart = this.onStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  onStart() {
    this.props.onStartUpdate();
  }

  onDrag(e, ui) {
    this.props.onDragUpdate(e, ui, this.props.id);
  }

  onStop() {
    this.props.onStopUpdate();
  }

  render() {
    console.log(this.props.note.x);
    console.log(this.props.note.y);

    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        bounds="body"
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStart}
        onDrag={this.onDrag}
        onStop={this.onStop}
      >
        <div className="note">
          <div className="heading">
            <p>{this.props.note.title}</p>
            <div>
              <i onClick={this.props.onDelete} className="fa fa-trash-o" aria-hidden="true"></i>
              <i className="fa fa-pencil" aria-hidden="true"></i>
              <i className="fa fa-arrows note-mover" aria-hidden="true"></i>
            </div>
          </div>
          <Textarea value={this.props.note.text}></Textarea>
        </div>
      </Draggable>
    );
  }
}

export default Note;
