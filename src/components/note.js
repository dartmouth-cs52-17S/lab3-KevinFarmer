import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

/* eslint react/self-closing-comp: 0 */
/* eslint react/no-danger: 0 */
class Note extends Component {
  constructor(props) {
    super(props);

    this.onStart = this.onStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStop = this.onStop.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
  }

  onStart() {
    this.props.onStartUpdate();
  }

  onDrag(e, ui) {
    const newX = Math.max(3, ui.x);
    const newY = Math.max(-70, ui.y);
    this.props.onDragUpdate(this.props.id, newX, newY);
  }

  onStop() {
    this.props.onStopUpdate();
  }

  startEdit() {
    this.props.startEdit(this.props.id);
  }

  endEdit() {
    this.props.endEdit(this.props.id);
  }


  renderNoteContent() {
    if (this.props.note.isEditing) {
      return (
        <div className="note">
          <div className="heading">
            <p>{this.props.note.title}</p>
            <div>
              <i onClick={this.endEdit} className="fa fa-check" aria-hidden="true"></i>
              <i className="fa fa-arrows note-mover" aria-hidden="true"></i>
            </div>
          </div>
          <Textarea defaultValue={this.props.note.text} >
          </Textarea>
        </div>
      );
    } else {
      return (
        <div className="note">
          <div className="heading">
            <p>{this.props.note.title}</p>
            <div>
              <i onClick={this.props.onDelete} className="fa fa-trash-o" aria-hidden="true"></i>
              <i onClick={this.startEdit} className="fa fa-pencil" aria-hidden="true"></i>
              <i className="fa fa-arrows note-mover" aria-hidden="true"></i>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    }
  }


  render() {
    // console.log(this.props.note.x);
    // console.log(this.props.note.y);

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
        {this.renderNoteContent()}
      </Draggable>
    );
  }
}

export default Note;
