import React, { Component } from "react";
import Robot from "./Robot";
import listRobot from "./listRobot";
import Search from "./Search";

export class Robots extends Component {
  state = {
    users: listRobot
  };

  searchUserForm = Valeur => {
    const SearchUser = this.state.users.filter(user => {
      return user.name.toLowerCase().indexOf(Valeur.toLowerCase()) !== -1;
    });
    if (Valeur !== "") {
      this.setState({
        users: SearchUser
      });
    } else
      this.setState({
        users: listRobot
      });
  };

  render() {
    return (
      <div>
        <div className="row ">
          <div className="col-lg-4 ">
            <Search getUserSearch={this.searchUserForm} />
          </div>
        </div>
        <div className="row ">
          {this.state.users.map(user => (
            <div className="card col-lg-2  ">
              <Robot user={user} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Robots;
