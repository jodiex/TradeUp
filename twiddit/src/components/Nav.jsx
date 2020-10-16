import React, { Component } from "react";
import './css/Nav.css';
import { BiHome } from "react-icons/bi";
import { CgProfile, CgHeart } from "react-icons/cg";

class Nav extends Component {
  render() {
    return (
        <div class="btn-group-vertical" role="group">
            <button type="button" class="btn"><BiHome size="18px"/> Home</button>
            <button type="button" class="btn"><CgProfile size="18px"/> Profile</button>
            <button type="button" class="btn"><CgHeart size="18px"/> Likes</button>
        </div>
    );
    }
}

export default Nav;