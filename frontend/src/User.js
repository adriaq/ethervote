import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {Glyphicon} from 'react-bootstrap';
import './styles/User.css';
import Header from "./components/Header";
import {getOpenedPolls, getClosedPolls} from "./web3Functions"


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votations: [],
            closeVotations: [],
            privilegeLevel: '',
        };
    }

    /* componentDidMount() {
        this.state.votations = getOpenedPolls();
        this.state.closeVotations = getClosedPolls();
    }*/

    render() {

        return (
            <div>
                <Header/>

                <div className="col-lg-6">

                    <h3> OPEN POLLS </h3>

                    <ListGroup>
                        {this.state.votations.map( v =>
                            <ListGroupItem tag="a" key={v.id}>
                                {v.name} <a href={"/openPolls?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                            </ListGroupItem>)}
                    </ListGroup>
                </div>

                <div className="col-lg-6">
                    <h3> RESULTS </h3>
                    <ListGroup>
                        <ListGroup>
                            {this.state.closeVotations.map( v =>
                                <ListGroupItem tag="a" key={v.id}>
                                    {v.name} <a href={"/pollsResult?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                                </ListGroupItem>)}
                        </ListGroup>
                    </ListGroup>
                </div>

                <div>
                    <Button color="danger" className="back" href="/admin" > Back </Button>
                </div>

            </div>
        );
    }
}

export default User;
