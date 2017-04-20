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
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTitleChange(event) {
    // console.log(event.target.value);
    this.props.onTitleChange(this.props.id, event.target.value);
  }

  onTextChange(event) {
    // console.log(event.target.value);
    this.props.onTextChange(this.props.id, event.target.value);
  }

  onStart() {
    this.props.onStartUpdate();
  }

  onDrag(e, ui) {
    /* console.log(this.props.id);
    const width = document.getElementById(this.props.id).offsetWidth;
    const height = document.getElementById(this.props.id).offsetHeight;
    console.log(width);
    console.log(height); */
    const newX = Math.max(3, ui.x);
    const newY = Math.max(-70, ui.y);
    this.props.onDragUpdate(this.props.id, newX, newY);
  }

  onStop() {
    this.props.onStopUpdate();
  }


  renderNoteContent() {
    if (this.props.note.isEditing) {
      return (
        <div className="note">
          <div className="heading">
            <form onSubmit={(event) => { event.preventDefault(); }}>
              <input type="text" name="title" value={this.props.note.title} onChange={this.onTitleChange} />
            </form>
            <div>
              <i onClick={() => this.props.endEdit(this.props.id)} className="fa fa-check" aria-hidden="true"></i>
              <i className="fa fa-arrows note-mover" aria-hidden="true"></i>
            </div>
          </div>
          <Textarea value={this.props.note.text} onChange={this.onTextChange} >
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
              <i onClick={() => this.props.startEdit(this.props.id)} className="fa fa-pencil" aria-hidden="true"></i>
              <i className="fa fa-arrows note-mover" aria-hidden="true"></i>
            </div>
          </div>
          <div className="note-text" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
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
