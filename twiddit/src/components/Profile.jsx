import React, { Component } from "react";
import './css/Profile.css';
import profilePic from "./../harley.png";

class Profile extends Component {
  render() {
    return (
        <div>
            <div class="profile">
                <div class="profile-img text-center">
                    <img src={profilePic} alt="Profile picture" />
                </div>
                <div class="card-body">
                    <h3 class="card-title text-center">Jodie Xiang</h3>
                    <h5 class="card-text text-center username">@username</h5>
                    <h5 class="card-text user-desc">Hello, my name is Jodie! I am a third year uni student.</h5>
                    <div class="follow-button">
                        <button type="button" class="btn btn-second">Follow</button>
                    </div>
                </div>
            </div>
            <div class="btn-group-vertical second-row" role="group">
                <button type="button" class="btn">653 Following</button>
                <button type="button" class="btn">18.6k Followers</button>
            </div>
        </div>
    );
    }
}

export default Profile;