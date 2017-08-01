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
          <option value="" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );

    //Please notes: the following code can be used when you are running on windows machine.
    //Because on windows machine, there won't be a check mark once an item is selected.
    //So you will have to use a html code &#10004;to show the check mark.
    //But on a Macbook, it just works with above code.

    /*return (
      <div className="book-shelf-changer">
        <select value={selected} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          {
            selected === 'currentlyReading' ? <option value="currentlyReading">&#10004;Currently Reading</option>
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
    );*/
  }
}

export default ControlItem;
