import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

/* eslint react/no-danger: 0 */
class Note extends Component {
  constructor(props) {
    super(props);

    this.onStart = this.onStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onTitleChange(event) {
    this.props.onTitleChange(this.props.id, event.target.value);
  }

  onTextChange(event) {
    this.props.onTextChange(this.props.id, event.target.value);
  }

  onStart() {
    this.props.onStartUpdate(this.props.id, this.props.note);
  }

  onDrag(e, ui) {
    const newX = Math.max(3, ui.x);
    const newY = Math.max(-70, ui.y);
    this.props.onDragUpdate(this.props.id, newX, newY);
  }

  onDelete(event) {
    event.stopPropagation();
    this.props.onDelete();
  }

/* eslint jsx-a11y/no-static-element-interactions: 0 */
  renderNoteContent() {
    if (this.props.note.isEditing) {
      return (
        <div className="note" onClick={this.onStart} style={{ zIndex: this.props.note.zIndex }}>
          <div className="heading">
            <form onSubmit={(event) => { event.preventDefault(); }}>
              <input type="text" name="title" value={this.props.note.title} onChange={this.onTitleChange} />
            </form>
            <div>
              <i onClick={() => this.props.endEdit(this.props.id)} className="fa fa-check" aria-hidden="true" />
              <i className="fa fa-arrows note-mover" aria-hidden="true" />
            </div>
          </div>
          <Textarea value={this.props.note.text} onChange={this.onTextChange} />
        </div>
      );
    } else {
      return (
        <div className="note" onClick={this.onStart} style={{ zIndex: this.props.note.zIndex }}>
          <div className="heading">
            <p>{this.props.note.title}</p>
            <div>
              <i onClick={this.onDelete} className="fa fa-trash-o" aria-hidden="true" />
              <i onClick={() => this.props.startEdit(this.props.id)} className="fa fa-pencil" aria-hidden="true" />
              <i className="fa fa-arrows note-mover" aria-hidden="true" />
            </div>
          </div>
          <div className="note-text" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    }
  }


  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        bounds="body"
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStart}
        onDrag={this.onDrag}
      >
        {this.renderNoteContent()}
      </Draggable>
    );
  }
}

export default Note;
