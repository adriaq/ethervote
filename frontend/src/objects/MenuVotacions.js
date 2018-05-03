import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroup'
import '../App.css'

class MenuVotacions extends Component {

    render() {
        return (
            <div>
                <div >
                    <ul className="Menu">
                        <ListGroup>
                            <ListGroupItem className="llista" >USA PRESIDENT</ListGroupItem>
                        </ListGroup>
                    </ul>
                </div>
            </div>
        );
    }

}

export default MenuVotacions;