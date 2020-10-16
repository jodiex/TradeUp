import React, { Component } from "react";
import './css/Communities.css';
import { ImPlus } from "react-icons/im";
import { MdPeople } from "react-icons/md";

class Communities extends Component {
  render() {
    return (
        <div className="communities second-row">
            <div className="card-body">
                <h3 className="card-title">Popular Communities <MdPeople size="22px"/></h3>
                <div className="row justify-content-between">
                    <h4><a href=""># The Walking Dead</a></h4>
                    <button type="button" className="btn btn-second"><ImPlus size="12px"/></button>
                </div>
                <div className="row justify-content-between">
                    <h4><a href=""># Ariana Grande</a></h4>
                    <button type="button" className="btn btn-second"><ImPlus size="12px"/></button>
                </div>
                <div className="row justify-content-between">
                    <h4><a href=""># Pokemon</a></h4>
                    <button type="button" className="btn btn-second"><ImPlus size="12px"/></button>
                </div>
                <div className="row justify-content-between">
                    <h4><a href=""># Raptors</a></h4>
                    <button type="button" className="btn btn-second"><ImPlus size="12px"/></button>
                </div>
            </div>
        </div>
    );
    }
}

export default Communities;