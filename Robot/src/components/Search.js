import React, { Component } from "react";

export class Search extends Component {
  state = {
    search: ""
  };

  TTForm = e => {
    this.setState({
      search: e.target.value
    });
  };

  SearchUsers = e => {
    e.preventDefault();
    this.props.getUserSearch(this.state.search);
  };
  render() {
    const { search } = this.state;

    return (
      <div>
        <form onSubmit={this.SearchUsers}>
          <input
            type="text"
            className="form-control"
            onChange={this.TTForm}
            value={search}
            placeholder="Search"
          />
          <button className="btn btn-primary ">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
