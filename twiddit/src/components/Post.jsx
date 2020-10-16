import React, { Component } from "react";
import './css/Post.css';
import { CgHeart } from "react-icons/cg";
import { AiOutlineRetweet } from "react-icons/ai";
class Post extends Component {
  render() {
    return (
        <div className="post">
            <div className="row justify-content-between">
                <div className="row">
                    <h4 className="post-title">Jodie Xiang &ensp; @username</h4>
                    <button type="button" className="btn btn-second post-title"># The Walking Dead</button>
                </div>
                <p className="post-date post-title">Sep 24/2020</p>
            </div>
            <h5>Hello, my name is Jodie! I am a third year uni student.</h5>
            <div className="row post-stats">
                <button type="button" className="btn btn-third post-reshares"><AiOutlineRetweet size="16px"/> 9 Reshares</button>
                <button type="button" className="btn btn-third post-likes"><CgHeart size="16px"/> 15 Likes</button>
            </div>
        </div>
    );
    }
}

export default Post;