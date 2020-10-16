import React, { Component } from "react";
import './css/Communities.css';
import { ImPlus } from "react-icons/im";

class Communities extends Component {
  render() {
    return (
        <div class="communities second-row">
            <div class="card-body">
                <h3 class="card-title">Popular Communities</h3>
                <div class="row justify-content-between">
                    <h4><a href=""># The Walking Dead</a></h4>
                    <button type="button" class="btn btn-second"><ImPlus size="12px"/></button>
                </div>
                <div class="row justify-content-between">
                    <h4><a href=""># Ariana Grande</a></h4>
                    <button type="button" class="btn btn-second"><ImPlus size="12px"/></button>
                </div>
                <div class="row justify-content-between">
                    <h4><a href=""># Pokemon</a></h4>
                    <button type="button" class="btn btn-second"><ImPlus size="12px"/></button>
                </div>
                <div class="row justify-content-between">
                    <h4><a href=""># Raptors</a></h4>
                    <button type="button" class="btn btn-second"><ImPlus size="12px"/></button>
                </div>
            </div>
        </div>
    );
    }
}

export default Communities;