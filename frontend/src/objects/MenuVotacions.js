import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroup'
import './MenuVotacions.css'
import BotoVotacio from "./BotoVotacio";

function alertClicked(i) {
    alert(i);
}

class MenuVotacions extends Component {
    state = {votations: []}

    componentDidMount () {
        fetch('/votations')
            .then(res => res.json())
            .then(votations => this.setState({ votations }));
    }


    render() {
        return (
            <div>
                <div>
                    <p className="TitolMenu">Select an open vote</p>
                    <div>
                            <ListGroup className = "Menu">
                                {this.state.votations.map( v =>
                                    <ListGroupItem className = "llista"
                                        onClick={() => alertClicked()} href ="#" key={v.id}>{v.name}
                                    </ListGroupItem>)}
                            </ListGroup>
                    </div>
                </div>
            </div>
        );
    }

}

export default MenuVotacions;