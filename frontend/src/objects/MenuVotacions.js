import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroup'
import '../App.css'
import BotoVotacio from "./BotoVotacio";

class MenuVotacions extends Component {

    render() {
        return (
            <div>
                <div>
                    <p className="TitolMenu">Select an open vote</p>
                    <ul className="Menu">
                        <ListGroup>
                            <BotoVotacio/>
                        </ListGroup>
                    </ul>
                </div>
            </div>
        );
    }

}

export default MenuVotacions;