import React, { Component } from "react";
import './css/Nav.css';

class Nav extends Component {
  render() {
    return (
        <div class="btn-group-vertical" role="group">
            <button type="button" class="btn">Home</button>
            <button type="button" class="btn">Profile</button>
            <button type="button" class="btn">Likes</button>
        </div>
    );
    }
}

export default Nav;