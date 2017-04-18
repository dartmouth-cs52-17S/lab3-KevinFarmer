import React from 'react';
import Draggable from 'react-draggable';

const Note = (props) => {
  return (
    <Draggable
      handle=".note-mover"
      grid={[25, 25]}
      defaultPosition={{ x: 20, y: 20 }}
      position={{ x: 20, y: 20 }}
      /* onStart={this.onStartDrag}
      onDrag={this.onDrag}
      onStop={this.onStopDrag} */
    >
      <div>
        <p>{props.note.title}</p>
      </div>
    </Draggable>
  );
};

export default Note;
