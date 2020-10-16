import React, { Component } from "react";
import './css/Post.css';
import { CgHeart } from "react-icons/cg";
import { AiOutlineRetweet } from "react-icons/ai";
class Post extends Component {
  render() {
    return (
        <div class="post">
            <div class="row justify-content-between">
                <div className="row">
                    <h4 class="post-title">Jodie Xiang &ensp; @username</h4>
                    <button type="button" class="btn btn-second post-title"># The Walking Dead</button>
                </div>
                <p class="post-date post-title">Sep 24/2020</p>
            </div>
            <h5>Hello, my name is Jodie! I am a third year uni student.</h5>
            <div class="row post-stats">
                <h6 class="post-reshares"><AiOutlineRetweet size="16px"/> 9 Reshares</h6>
                <h6 class="post-likes"><CgHeart size="16px"/> 15 Likes</h6>
            </div>
        </div>
    );
    }
}

export default Post;