import React, { Component } from "react";
import './css/NavBar.css';

class NavBar extends Component {
  render() {
    return (
        <nav class="navbar">
            <a class="navbar-brand" href="#">Twiddit</a>

            <div class="login">
                <button class="btn my-2 my-sm-0">Sign up</button>
                <button class="btn my-2 my-sm-0">Log in</button>
            </div>
        </nav>
        );
    }
}
        

export default NavBar;