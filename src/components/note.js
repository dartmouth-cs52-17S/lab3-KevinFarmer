import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';

/* eslint react/self-closing-comp: 0 */
class Note extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 20, y: 20 };

    this.onStart = this.onStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStop = this.onStop.bind(this);
  }

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onStart", "onDrag", "onStop"] }] */
  onStart() {
    console.log('onStartDrag');
  }

  onDrag(e, ui) {
    console.log('onDrag');
    // console.log(ui.x);
    // console.log(ui.y);

    this.setState({
      x: ui.x,
      y: ui.y,
    });
  }

  onStop() {
    console.log('onStopDrag');
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        bounds="body"
        defaultPosition={{ x: 200, y: 200 }}
        position={{ x: this.state.x, y: this.state.y }} // {{ x: props.note.x, y: props.note.y }}
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
