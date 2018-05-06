import React, { Component } from 'react';
//import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroup'
import '../App.css'

function alertClicked(i) {
    alert(i);
}

class BotoVotacio extends Component {
    render() {
        return (
            <div>
            <ListGroupItem onClick={() => alertClicked("USA PRESIDENT")} className="llista" >USA PRESIDENT</ListGroupItem>
            <ListGroupItem onClick={() => alertClicked("CEO ELECTION")} className="llista" >CEO ELECTION</ListGroupItem>
             <ListGroupItem onClick={() => alertClicked("MY DOG'S NAME")} className="llista" >MY DOG'S NAME</ListGroupItem>
             <ListGroupItem onClick={() => alertClicked("NEW HARRY POTTER FILM?")} className="llista">NEW HARRY POTTER FILM?</ListGroupItem>
             <ListGroupItem onClick={() => alertClicked("SHOULD TAXES INCREASE?")} className="llista">SHOULD TAXES INCREASE?</ListGroupItem>
             <ListGroupItem onClick={() => alertClicked("GRUPS FESTA FIB 2018")} className="llista" >GRUPS FESTA FIB 2018</ListGroupItem>
            </div>
                );
    }
}

export default BotoVotacio;