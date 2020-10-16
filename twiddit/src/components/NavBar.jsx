import React, { Component } from "react";
import './css/NavBar.css';

class NavBar extends Component {
  render() {
    return (
        <nav className="navbar fixed-top">
            <a className="navbar-brand" href="#">Twiddit</a>

            <div className="login">
                <button className="btn my-2 my-sm-0">Sign up</button>
                <button className="btn my-2 my-sm-0">Log in</button>
            </div>
        </nav>
        );
    }
}
        

export default NavBar;