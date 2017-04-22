import React, { Component } from 'react';

class NewNoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = { newtitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    // console.log(event.target.value);
    this.setState({ newtitle: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    // console.log(event.target.title.value);
    this.props.onSubmission(event.target.title.value);
    this.setState({ newtitle: '' });
  }

  render() {
    return (
      <div className="new-note-container">
        <form className="new-note-input" onSubmit={this.onSubmit} onChange={this.onInputChange}>
          <input type="text" name="title" placeholder="new note title" value={this.state.newtitle} autoComplete="off" />
          <input className="button" type="submit" value="Create Note" />
        </form>
      </div>
    );
  }
}

export default NewNoteInput;
