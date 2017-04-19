import React from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';

/* eslint react/self-closing-comp: 0 */
const Note = (props) => {
  const onStartDrag = () => {
    console.log('onStartDrag');
    const x = 0;
    const y = 1;
    return props.updatePos(x, y);
  };

  const onDrag = () => {
    console.log('onDrag');
    const x = 0;
    const y = 1;
    return props.updatePos(x, y);
  };

  const onStopDrag = () => {
    console.log('onStopDrag');
    const x = 0;
    const y = 1;
    return props.updatePos(x, y);
  };

  return (
    <Draggable
      handle=".note-mover"
      grid={[25, 25]}
      defaultPosition={{ x: 20, y: 20 }}
      position={{ x: props.note.x, y: props.note.y }}
      onStart={onStartDrag}
      onDrag={onDrag}
      onStop={onStopDrag}
    >
      <div className="note">
        <div className="heading">
          <p>{props.note.title}</p>
          <div>
            <i onClick={props.onDelete} className="fa fa-trash-o" aria-hidden="true"></i>
            <i className="fa fa-pencil" aria-hidden="true"></i>
            <i className="fa fa-arrows" aria-hidden="true"></i>
          </div>
        </div>
        <Textarea value={props.note.text}></Textarea>
      </div>
    </Draggable>
  );
};

export default Note;
