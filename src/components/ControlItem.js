import React, { Component } from 'react';

class ControlItem extends Component {
  state = { selected: "" };

  componentWillMount() {
    const currentBook = this.props.currentBook;
    this.setState({ selected: currentBook.shelf });
  }

  handleChange = (event) => {
    if (this.props.onChangeShelf) {
      this.setState({ selected: event.target.value});
      this.props.onChangeShelf(event.target.value, this.props.currentBook);
    }
  }

  render () {
    const { selected } = this.state;
    return (
      <div className="book-shelf-changer">
        <select value={selected} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          {
            selected === 'currentlyReading' ? <option value="currentlyReading">&#10004;Currently reading</option>
            : <option value="currentlyReading">&nbsp;&nbsp;Currently reading</option>
          }
          {
            selected === 'wantToRead' ? <option value="wantToRead">&#10004;Want to Read</option>
            : <option value="wantToRead">&nbsp;&nbsp;Want to Read</option>
          }
          {
            selected === 'read' ? <option value="read">&#10004;Read</option>
            : <option value="read">&nbsp;&nbsp;Read</option>
          }
          <option value="none">&nbsp;&nbsp;None</option>
      </select>
      </div>
    );
  }
}

export default ControlItem;
